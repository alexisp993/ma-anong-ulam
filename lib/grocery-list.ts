import { prisma } from "@/lib/prisma";
import { lineCost } from "@/scripts/pricing";
import type { AllowedUnit } from "@/scripts/units";
import type { GroceryCategory } from "@/lib/constants";

// Maps the pipeline's free-text Ingredient.category values (Poultry, Beef,
// Vegetable, Condiment, ...) onto PRODUCT_BLUEPRINT.md §6.5.7's fixed
// 8-category grocery grouping. Display-time only — doesn't change stored data.
const INGREDIENT_CATEGORY_MAP: Record<string, GroceryCategory> = {
  Poultry: "Meat",
  Beef: "Meat",
  Pork: "Meat",
  "Processed Meat": "Meat",
  Seafood: "Seafood",
  Vegetable: "Vegetables",
  Fruit: "Fruits",
  Dairy: "Dairy",
  Pantry: "Pantry Items",
  Grain: "Pantry Items",
  "Canned Good": "Pantry Items",
  Condiment: "Seasonings",
  Spice: "Seasonings",
  Egg: "Others",
};

function mapGroceryCategory(ingredientCategory: string): GroceryCategory {
  return INGREDIENT_CATEGORY_MAP[ingredientCategory] ?? "Others";
}

export interface GroceryItem {
  id: string;
  ingredientId: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  unit: string;
  estimatedCost: number;
  purchased: boolean;
}

export interface GroceryListView {
  groceryListId: string;
  estimatedTotal: number;
  items: GroceryItem[];
}

interface AggregatedLine {
  ingredientId: string;
  name: string;
  category: string;
  quantity: number;
  unit: AllowedUnit;
}

// Combines duplicate ingredient lines across a set of recipes (§6.5.8).
// Grouped by (ingredient, unit) — the same ingredient measured in different
// units across recipes stays as separate rows rather than being incorrectly
// summed (e.g. "5 clove Garlic" and "2 tbsp Garlic" can't just be added).
async function aggregateIngredients(recipeIds: string[]): Promise<AggregatedLine[]> {
  const lines = await prisma.recipeIngredient.findMany({
    where: { recipeId: { in: recipeIds } },
    include: { ingredient: true },
  });

  const merged = new Map<string, AggregatedLine>();
  for (const line of lines) {
    const unit = line.unit as AllowedUnit;
    const key = `${line.ingredientId}:${unit}`;
    const quantity = Number(line.quantity);
    const existing = merged.get(key);
    if (existing) {
      existing.quantity += quantity;
    } else {
      merged.set(key, {
        ingredientId: line.ingredientId,
        name: line.ingredient.name,
        category: line.ingredient.category,
        quantity,
        unit,
      });
    }
  }
  return Array.from(merged.values());
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

// Guest / not-yet-persisted path: pure compute, no DB writes. There's no
// GroceryListItem row backing it, so `id` is synthesized from
// (ingredientId, unit) — an ingredient can appear more than once if
// different recipes measure it in different units (see aggregateIngredients
// above), so ingredientId alone would collide.
export async function computeGroceryList(recipeIds: string[]): Promise<GroceryListView> {
  const aggregated = await aggregateIngredients(recipeIds);
  const items: GroceryItem[] = aggregated.map((entry) => ({
    id: `${entry.ingredientId}:${entry.unit}`,
    ingredientId: entry.ingredientId,
    name: entry.name,
    category: mapGroceryCategory(entry.category),
    quantity: round2(entry.quantity),
    unit: entry.unit,
    estimatedCost: round2(lineCost(entry.name, entry.quantity, entry.unit)),
    purchased: false,
  }));
  const estimatedTotal = round2(items.reduce((sum, item) => sum + item.estimatedCost, 0));
  return { groceryListId: "", estimatedTotal, items };
}

// Registered path: persists the list, replacing any previous one for the
// same meal plan (BR-GL-005).
export async function generateGroceryListForPlan(
  userId: string,
  mealPlanId: string
): Promise<GroceryListView | null> {
  const mealPlan = await prisma.weeklyMealPlan.findUnique({
    where: { id: mealPlanId },
    include: { weeklyMeals: true },
  });
  if (!mealPlan || mealPlan.userId !== userId) return null;

  const recipeIds = mealPlan.weeklyMeals.map((meal) => meal.recipeId);
  const aggregated = await aggregateIngredients(recipeIds);
  const priced = aggregated.map((entry) => ({
    ...entry,
    estimatedCost: round2(lineCost(entry.name, entry.quantity, entry.unit)),
  }));
  const estimatedTotal = round2(priced.reduce((sum, entry) => sum + entry.estimatedCost, 0));

  const groceryList = await prisma.$transaction(async (tx) => {
    await tx.groceryList.deleteMany({ where: { userId, mealPlanId } });
    return tx.groceryList.create({
      data: {
        userId,
        mealPlanId,
        estimatedTotal,
        groceryItems: {
          create: priced.map((entry) => ({
            ingredientId: entry.ingredientId,
            quantity: round2(entry.quantity),
            unit: entry.unit,
            estimatedCost: entry.estimatedCost,
            purchased: false,
          })),
        },
      },
      include: { groceryItems: { include: { ingredient: true } } },
    });
  });

  return {
    groceryListId: groceryList.id,
    estimatedTotal: Number(groceryList.estimatedTotal),
    items: groceryList.groceryItems.map((item) => ({
      id: item.id,
      ingredientId: item.ingredientId,
      name: item.ingredient.name,
      category: mapGroceryCategory(item.ingredient.category),
      quantity: Number(item.quantity),
      unit: item.unit,
      estimatedCost: Number(item.estimatedCost),
      purchased: item.purchased,
    })),
  };
}

export async function getGroceryList(
  userId: string,
  groceryListId: string
): Promise<GroceryListView | null> {
  const groceryList = await prisma.groceryList.findUnique({
    where: { id: groceryListId },
    include: { groceryItems: { include: { ingredient: true } } },
  });
  if (!groceryList || groceryList.userId !== userId) return null;

  return {
    groceryListId: groceryList.id,
    estimatedTotal: Number(groceryList.estimatedTotal),
    items: groceryList.groceryItems.map((item) => ({
      id: item.id,
      ingredientId: item.ingredientId,
      name: item.ingredient.name,
      category: mapGroceryCategory(item.ingredient.category),
      quantity: Number(item.quantity),
      unit: item.unit,
      estimatedCost: Number(item.estimatedCost),
      purchased: item.purchased,
    })),
  };
}

// BR-GL-004: purchased status shall not affect quantities or estimated costs.
export async function setItemPurchased(
  userId: string,
  groceryListId: string,
  itemId: string,
  purchased: boolean
): Promise<boolean> {
  const groceryList = await prisma.groceryList.findUnique({ where: { id: groceryListId } });
  if (!groceryList || groceryList.userId !== userId) return false;

  const item = await prisma.groceryListItem.findUnique({ where: { id: itemId } });
  if (!item || item.groceryListId !== groceryListId) return false;

  await prisma.groceryListItem.update({ where: { id: itemId }, data: { purchased } });
  return true;
}
