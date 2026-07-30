import { prisma } from "@/lib/prisma";
import type { RecipeSummary } from "@/lib/recipes";
import { DAYS_OF_WEEK } from "@/lib/constants";

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];
export type MealType = "Lunch" | "Dinner";

export interface PlannedMeal {
  recipeId: string;
  name: string;
  estimatedCost: number;
  imageUrl: string;
}

export interface DayPlan {
  day: DayOfWeek;
  lunch: PlannedMeal;
  dinner: PlannedMeal;
}

export interface SavedWeeklyPlan {
  mealPlanId: string;
  weeklyBudget: number;
  familySize: number;
  days: DayPlan[];
}

interface ScorableRecipe extends RecipeSummary {
  servings: number;
  ingredientIds: string[];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function budgetScore(cost: number, budget: number): number {
  if (budget <= 0) return 0;
  const diff = cost - budget;
  if (diff <= 0) return clamp(1 - Math.abs(diff) / budget, 0, 1);
  return clamp(1 - (diff / budget) * 2, 0, 1);
}

function servingsScore(servings: number, familySize: number): number {
  if (familySize <= 0) return 0;
  return clamp(1 - Math.abs(servings - familySize) / familySize, 0, 1);
}

// Small bonus for sharing ingredients with the day's other meal, per the
// Weekly Planner Rules' "encourage ingredient reuse across meals."
function reuseBonus(recipe: ScorableRecipe, sameDayIngredientIds: Set<string>): number {
  if (sameDayIngredientIds.size === 0) return 0;
  const overlap = recipe.ingredientIds.filter((id) => sameDayIngredientIds.has(id)).length;
  return clamp(overlap / Math.max(recipe.ingredientIds.length, 1), 0, 1) * 0.1;
}

function pickBestRecipe(
  pool: ScorableRecipe[],
  perMealBudget: number,
  familySize: number,
  usedIds: Set<string>,
  sameDayIngredientIds: Set<string>
): ScorableRecipe {
  const available = pool.filter((recipe) => !usedIds.has(recipe.id));
  // BR-WP-003 (minimize duplicates) is a soft preference — if we run out of
  // unused recipes, fall back to the full pool rather than erroring.
  const candidates = available.length > 0 ? available : pool;

  const scored = candidates
    .map((recipe) => ({
      recipe,
      score:
        budgetScore(recipe.estimatedCost, perMealBudget) * 0.6 +
        servingsScore(recipe.servings, familySize) * 0.3 +
        reuseBonus(recipe, sameDayIngredientIds),
    }))
    .sort((a, b) => b.score - a.score || a.recipe.name.localeCompare(b.recipe.name));

  return scored[0].recipe;
}

async function loadScorableRecipes(): Promise<ScorableRecipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: { status: "PUBLISHED" },
    include: { recipeIngredients: true },
  });
  return recipes.map((recipe) => ({
    id: recipe.id,
    name: recipe.name,
    category: recipe.category,
    estimatedCost: Number(recipe.estimatedCost),
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    difficulty: recipe.difficulty,
    imageUrl: recipe.imageUrl,
    servings: recipe.servings,
    ingredientIds: recipe.recipeIngredients.map((line) => line.ingredientId),
  }));
}

function toPlannedMeal(recipe: ScorableRecipe): PlannedMeal {
  return {
    recipeId: recipe.id,
    name: recipe.name,
    estimatedCost: recipe.estimatedCost,
    imageUrl: recipe.imageUrl,
  };
}

// Public/stateless compute step (see app/api/weekly-planner/generate/route.ts
// for why this doesn't persist). Deterministic: fixed slot order, no
// randomness, ties broken by name.
export async function generateWeeklyPlan(input: {
  weeklyBudget: number;
  familySize: number;
}): Promise<DayPlan[]> {
  const pool = await loadScorableRecipes();
  const perMealBudget = input.weeklyBudget / 14;
  const usedIds = new Set<string>();
  const days: DayPlan[] = [];

  for (const day of DAYS_OF_WEEK) {
    const lunch = pickBestRecipe(pool, perMealBudget, input.familySize, usedIds, new Set());
    usedIds.add(lunch.id);

    const dinner = pickBestRecipe(
      pool,
      perMealBudget,
      input.familySize,
      usedIds,
      new Set(lunch.ingredientIds)
    );
    usedIds.add(dinner.id);

    days.push({ day, lunch: toPlannedMeal(lunch), dinner: toPlannedMeal(dinner) });
  }

  return days;
}

// Single-slot replacement — shared by the public "replace before saving"
// compute endpoint and the authed PUT .../meals persistence endpoint.
export async function pickReplacementMeal(input: {
  weeklyBudget: number;
  familySize: number;
  excludeRecipeIds: string[];
}): Promise<PlannedMeal> {
  const pool = await loadScorableRecipes();
  const perMealBudget = input.weeklyBudget / 14;
  const usedIds = new Set(input.excludeRecipeIds);
  const recipe = pickBestRecipe(pool, perMealBudget, input.familySize, usedIds, new Set());
  return toPlannedMeal(recipe);
}

interface SavableDay {
  day: DayOfWeek;
  lunch: { recipeId: string };
  dinner: { recipeId: string };
}

export async function saveWeeklyPlan(
  userId: string,
  weeklyBudget: number,
  familySize: number,
  days: SavableDay[]
): Promise<string> {
  const mealPlan = await prisma.weeklyMealPlan.create({
    data: {
      userId,
      weeklyBudget,
      familySize,
      weeklyMeals: {
        create: days.flatMap((day) => [
          { dayOfWeek: day.day, mealType: "Lunch", recipeId: day.lunch.recipeId },
          { dayOfWeek: day.day, mealType: "Dinner", recipeId: day.dinner.recipeId },
        ]),
      },
    },
  });
  return mealPlan.id;
}

export async function getSavedWeeklyPlan(
  userId: string,
  mealPlanId: string
): Promise<SavedWeeklyPlan | null> {
  const plan = await prisma.weeklyMealPlan.findUnique({
    where: { id: mealPlanId },
    include: { weeklyMeals: { include: { recipe: true } } },
  });
  if (!plan || plan.userId !== userId) return null;

  const days: DayPlan[] = DAYS_OF_WEEK.map((day) => {
    const lunchMeal = plan.weeklyMeals.find(
      (meal) => meal.dayOfWeek === day && meal.mealType === "Lunch"
    )!;
    const dinnerMeal = plan.weeklyMeals.find(
      (meal) => meal.dayOfWeek === day && meal.mealType === "Dinner"
    )!;
    return {
      day,
      lunch: {
        recipeId: lunchMeal.recipeId,
        name: lunchMeal.recipe.name,
        estimatedCost: Number(lunchMeal.recipe.estimatedCost),
        imageUrl: lunchMeal.recipe.imageUrl,
      },
      dinner: {
        recipeId: dinnerMeal.recipeId,
        name: dinnerMeal.recipe.name,
        estimatedCost: Number(dinnerMeal.recipe.estimatedCost),
        imageUrl: dinnerMeal.recipe.imageUrl,
      },
    };
  });

  return {
    mealPlanId: plan.id,
    weeklyBudget: Number(plan.weeklyBudget),
    familySize: plan.familySize,
    days,
  };
}

// Powers "resume my last plan on load" — reuses getSavedWeeklyPlan rather
// than duplicating the day-mapping logic. WeeklyMealPlan.userId has no
// unique constraint (saveWeeklyPlan always creates a new row), so "current"
// is defined as the most recently created plan.
export async function getMostRecentWeeklyPlan(userId: string): Promise<SavedWeeklyPlan | null> {
  const plan = await prisma.weeklyMealPlan.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  if (!plan) return null;
  return getSavedWeeklyPlan(userId, plan.id);
}

// Returns false if the plan doesn't exist / isn't owned by this user, or the
// recipeId is invalid — callers translate that into the right HTTP status.
export async function replaceSavedMeal(
  userId: string,
  mealPlanId: string,
  day: DayOfWeek,
  mealType: MealType,
  recipeId: string
): Promise<boolean> {
  const plan = await prisma.weeklyMealPlan.findUnique({ where: { id: mealPlanId } });
  if (!plan || plan.userId !== userId) return false;

  const recipe = await prisma.recipe.findFirst({ where: { id: recipeId, status: "PUBLISHED" } });
  if (!recipe) return false;

  await prisma.weeklyMeal.updateMany({
    where: { mealPlanId, dayOfWeek: day, mealType },
    data: { recipeId },
  });
  return true;
}
