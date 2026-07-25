import { prisma } from "@/lib/prisma";
import type { RecipeSummary } from "@/lib/recipes";
import type { MEAL_STYLES } from "@/lib/constants";

// PRODUCT_BLUEPRINT.md Part 7 deliberately gives no scoring formula — only
// qualitative ranking rules ("closer to budget ranks higher," "matching
// meal style ranks higher," never return an empty list). This module is
// the concrete, deterministic implementation of those rules.

export type MealStyle = (typeof MEAL_STYLES)[number];

export interface KahitAnoInput {
  budget: number;
  familySize: number;
  mealStyle?: MealStyle;
  excludeIds?: string[];
}

export interface RecommendedRecipe extends RecipeSummary {
  reason: string;
}

interface ScorableRecipe extends RecipeSummary {
  mealStyle: string;
  servings: number;
}

interface ScoreOptions {
  considerMealStyle: boolean;
  budgetTolerance: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// Closer to budget scores higher; going over budget decays twice as fast
// as coming in under it, per §7.6 "significantly above budget ranks lower."
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

function scoreRecipe(recipe: ScorableRecipe, input: KahitAnoInput, options: ScoreOptions): number {
  const bScore = budgetScore(recipe.estimatedCost, input.budget * options.budgetTolerance);
  const sScore = servingsScore(recipe.servings, input.familySize);
  const styleBonus =
    options.considerMealStyle && input.mealStyle && recipe.mealStyle === input.mealStyle ? 0.25 : 0;
  return bScore * 0.5 + sScore * 0.3 + styleBonus;
}

function buildReason(recipe: ScorableRecipe, input: KahitAnoInput): string {
  const reasons: string[] = [];
  const overBudgetRatio = recipe.estimatedCost / input.budget;

  if (overBudgetRatio <= 1.1) {
    reasons.push(`fits your ₱${input.budget} budget`);
  } else if (overBudgetRatio <= 1.5) {
    reasons.push("close to your budget");
  }

  if (Math.abs(recipe.servings - input.familySize) <= 1) {
    reasons.push(`great for a family of ${input.familySize}`);
  }

  if (input.mealStyle && recipe.mealStyle === input.mealStyle) {
    reasons.push(`matches your preferred ${input.mealStyle.toLowerCase()} style`);
  }

  if (recipe.prepTime + recipe.cookTime <= 30) {
    reasons.push("ready in about 30 minutes");
  }

  if (reasons.length === 0) {
    reasons.push("a practical everyday Filipino meal");
  }

  const [first, ...rest] = reasons;
  const capitalized = first.charAt(0).toUpperCase() + first.slice(1);
  return rest.length > 0 ? `${capitalized} and ${rest[0]}.` : `${capitalized}.`;
}

// Deterministic ties broken by name (BR-KA-003 / BR-RE-002: same inputs
// must produce the same ranked results).
function rankPool(pool: ScorableRecipe[], input: KahitAnoInput, options: ScoreOptions) {
  return pool
    .map((recipe) => ({ recipe, score: scoreRecipe(recipe, input, options) }))
    .sort((a, b) => b.score - a.score || a.recipe.name.localeCompare(b.recipe.name));
}

// §7.9 No-match handling: progressively relax meal style, then budget
// tolerance, rather than ever returning an empty list. Stops as soon as an
// attempt yields at least 3 viable (non-negligible score) matches.
function runAttempts(pool: ScorableRecipe[], input: KahitAnoInput): ScorableRecipe[] {
  const attempts: ScoreOptions[] = [
    { considerMealStyle: true, budgetTolerance: 1 },
    { considerMealStyle: false, budgetTolerance: 1 },
    { considerMealStyle: false, budgetTolerance: 1.5 },
    { considerMealStyle: false, budgetTolerance: 3 },
  ];

  let best: ScorableRecipe[] = [];
  for (const options of attempts) {
    const ranked = rankPool(pool, input, options);
    const viable = ranked.filter((entry) => entry.score > 0.15).map((entry) => entry.recipe);
    if (viable.length > best.length) best = viable;
    if (viable.length >= 3) return viable;
  }

  if (best.length > 0) return best;

  // Absolute fallback: closest matches regardless of threshold.
  return rankPool(pool, input, { considerMealStyle: false, budgetTolerance: 3 }).map(
    (entry) => entry.recipe
  );
}

function toScorable(recipe: {
  id: string;
  name: string;
  category: string;
  estimatedCost: unknown;
  prepTime: number;
  cookTime: number;
  difficulty: string;
  imageUrl: string;
  mealStyle: string;
  servings: number;
}): ScorableRecipe {
  return {
    id: recipe.id,
    name: recipe.name,
    category: recipe.category,
    estimatedCost: Number(recipe.estimatedCost),
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    difficulty: recipe.difficulty,
    imageUrl: recipe.imageUrl,
    mealStyle: recipe.mealStyle,
    servings: recipe.servings,
  };
}

// §7.7: Kahit Ano returns 3–5 recipes.
export async function getKahitAnoRecommendations(
  input: KahitAnoInput
): Promise<RecommendedRecipe[]> {
  const recipes = await prisma.recipe.findMany();
  const allScorable = recipes.map(toScorable);

  const excludeSet = new Set(input.excludeIds ?? []);
  const preferredPool =
    excludeSet.size > 0 ? allScorable.filter((recipe) => !excludeSet.has(recipe.id)) : allScorable;

  let best = runAttempts(preferredPool, input);
  // "Deprioritized where practical" (§6.2.14) — only fall back to
  // previously-shown recipes if excluding them leaves too few results.
  if (best.length < 3 && excludeSet.size > 0) {
    best = runAttempts(allScorable, input);
  }

  return best.slice(0, 5).map((recipe) => ({ ...recipe, reason: buildReason(recipe, input) }));
}
