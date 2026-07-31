import { prisma } from "@/lib/prisma";
import { COST_BASIS_G, COST_BASIS_ML, type AllowedUnit } from "@/scripts/units";
import type { GroceryCategory } from "@/lib/constants";
import { getPantryForUser } from "@/lib/pantry";

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
  Pantry: "Staples",
  Grain: "Staples",
  "Canned Good": "Staples",
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
  purchased: boolean;
  // True if this ingredient is already in the user's pantry — the item still
  // shows (we don't track pantry quantity, so we can't know it's fully
  // covered), but the UI flags it so the user can check if what they have
  // is enough before buying more.
  inPantry: boolean;
}

export interface GroceryListView {
  groceryListId: string;
  items: GroceryItem[];
}

interface AggregatedLine {
  ingredientId: string;
  name: string;
  category: string;
  quantity: number;
  unit: AllowedUnit;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

// Picks a readable display unit for a summed weight, same threshold logic
// a shopper would use mentally (switch to kg once it's "a kilo or more").
function pickWeightDisplay(grams: number): { quantity: number; unit: AllowedUnit } {
  if (grams >= 1000) return { quantity: round2(grams / 1000), unit: "kg" };
  return { quantity: round2(grams), unit: "g" };
}

// Same idea for volume — collapses an accumulated "26 tbsp" into "1.63 cup",
// picking the largest cooking-measurement unit the total actually fills.
function pickVolumeDisplay(ml: number): { quantity: number; unit: AllowedUnit } {
  if (ml >= 1000) return { quantity: round2(ml / 1000), unit: "L" };
  if (ml >= 240) return { quantity: round2(ml / 240), unit: "cup" };
  if (ml >= 15) return { quantity: round2(ml / 15), unit: "tbsp" };
  if (ml >= 5) return { quantity: round2(ml / 5), unit: "tsp" };
  return { quantity: round2(ml), unit: "ml" };
}

interface IngredientAccumulator {
  name: string;
  category: string;
  grams: number;
  ml: number;
  // Count-style units (pcs, clove, can, pack, bundle, head, slice) aren't
  // metrically convertible into each other, so each stays its own line —
  // this is the one case §6.5.8's "merge duplicates" genuinely can't apply.
  countLines: Map<AllowedUnit, number>;
}

// Combines duplicate ingredient lines across a set of recipes (§6.5.8).
// Weight units (g/kg) and volume units (tsp/tbsp/cup/ml/L) are normalized to
// a common base (grams / milliliters) before summing, so "0.23 kg" and
// "350 g" of the same ingredient collapse into one line instead of showing
// as two separate, confusing entries.
async function aggregateIngredients(recipeIds: string[]): Promise<AggregatedLine[]> {
  const lines = await prisma.recipeIngredient.findMany({
    where: { recipeId: { in: recipeIds } },
    include: { ingredient: true },
  });

  const byIngredient = new Map<string, IngredientAccumulator>();
  for (const line of lines) {
    const unit = line.unit as AllowedUnit;
    const quantity = Number(line.quantity);
    const acc = byIngredient.get(line.ingredientId) ?? {
      name: line.ingredient.name,
      category: line.ingredient.category,
      grams: 0,
      ml: 0,
      countLines: new Map<AllowedUnit, number>(),
    };

    if (unit in COST_BASIS_G) {
      acc.grams += quantity * COST_BASIS_G[unit]!;
    } else if (unit in COST_BASIS_ML) {
      acc.ml += quantity * COST_BASIS_ML[unit]!;
    } else {
      acc.countLines.set(unit, (acc.countLines.get(unit) ?? 0) + quantity);
    }
    byIngredient.set(line.ingredientId, acc);
  }

  const result: AggregatedLine[] = [];
  for (const [ingredientId, acc] of byIngredient) {
    if (acc.grams > 0) {
      const { quantity, unit } = pickWeightDisplay(acc.grams);
      result.push({ ingredientId, name: acc.name, category: acc.category, quantity, unit });
    }
    if (acc.ml > 0) {
      const { quantity, unit } = pickVolumeDisplay(acc.ml);
      result.push({ ingredientId, name: acc.name, category: acc.category, quantity, unit });
    }
    for (const [unit, quantity] of acc.countLines) {
      result.push({ ingredientId, name: acc.name, category: acc.category, quantity: round2(quantity), unit });
    }
  }
  return result;
}

// Guest / not-yet-persisted path: pure compute, no DB writes. There's no
// GroceryListItem row backing it, so `id` is synthesized from
// (ingredientId, unit) — an ingredient can appear more than once if
// different recipes measure it in different units (see aggregateIngredients
// above), so ingredientId alone would collide.
//
// Guests' pantry lives in browser localStorage (lib/guest-storage.ts), not
// the DB, so this server-side function can't know their pantry — it always
// returns inPantry: false, and the client merges in the real flag (mirrors
// the existing guest `purchased` merge in app/grocery-list/page.tsx).
export async function computeGroceryList(recipeIds: string[]): Promise<GroceryListView> {
  const aggregated = await aggregateIngredients(recipeIds);
  const items: GroceryItem[] = aggregated.map((entry) => ({
    id: `${entry.ingredientId}:${entry.unit}`,
    ingredientId: entry.ingredientId,
    name: entry.name,
    category: mapGroceryCategory(entry.category),
    quantity: round2(entry.quantity),
    unit: entry.unit,
    purchased: false,
    inPantry: false,
  }));
  return { groceryListId: "", items };
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

  const pantryItems = await getPantryForUser(userId);
  const pantryIngredientIds = new Set(pantryItems.map((item) => item.ingredientId));

  const groceryList = await prisma.$transaction(async (tx) => {
    await tx.groceryList.deleteMany({ where: { userId, mealPlanId } });
    return tx.groceryList.create({
      data: {
        userId,
        mealPlanId,
        estimatedTotal: 0,
        groceryItems: {
          create: aggregated.map((entry) => ({
            ingredientId: entry.ingredientId,
            quantity: round2(entry.quantity),
            unit: entry.unit,
            estimatedCost: 0,
            purchased: false,
          })),
        },
      },
      include: { groceryItems: { include: { ingredient: true } } },
    });
  });

  return {
    groceryListId: groceryList.id,
    items: groceryList.groceryItems.map((item) => ({
      id: item.id,
      ingredientId: item.ingredientId,
      name: item.ingredient.name,
      category: mapGroceryCategory(item.ingredient.category),
      quantity: Number(item.quantity),
      unit: item.unit,
      purchased: item.purchased,
      inPantry: pantryIngredientIds.has(item.ingredientId),
    })),
  };
}

// Powers "resume my saved grocery list on load", scoped to one specific
// plan rather than "most recent for user" — a regenerated plan must not
// surface a stale list left over from an older, replaced plan.
export async function getGroceryListForPlan(
  userId: string,
  mealPlanId: string
): Promise<GroceryListView | null> {
  const groceryList = await prisma.groceryList.findFirst({
    where: { userId, mealPlanId },
    include: { groceryItems: { include: { ingredient: true } } },
  });
  if (!groceryList) return null;

  const pantryItems = await getPantryForUser(userId);
  const pantryIngredientIds = new Set(pantryItems.map((item) => item.ingredientId));

  return {
    groceryListId: groceryList.id,
    items: groceryList.groceryItems.map((item) => ({
      id: item.id,
      ingredientId: item.ingredientId,
      name: item.ingredient.name,
      category: mapGroceryCategory(item.ingredient.category),
      quantity: Number(item.quantity),
      unit: item.unit,
      purchased: item.purchased,
      inPantry: pantryIngredientIds.has(item.ingredientId),
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

  const pantryItems = await getPantryForUser(userId);
  const pantryIngredientIds = new Set(pantryItems.map((item) => item.ingredientId));

  return {
    groceryListId: groceryList.id,
    items: groceryList.groceryItems.map((item) => ({
      id: item.id,
      ingredientId: item.ingredientId,
      name: item.ingredient.name,
      category: mapGroceryCategory(item.ingredient.category),
      quantity: Number(item.quantity),
      unit: item.unit,
      purchased: item.purchased,
      inPantry: pantryIngredientIds.has(item.ingredientId),
    })),
  };
}

// BR-GL-004: purchased status shall not affect quantities.
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
