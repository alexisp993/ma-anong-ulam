import { prisma } from "@/lib/prisma";
import type { RecipeSummary } from "@/lib/recipes";

export interface PantryItemView {
  id: string;
  ingredientId: string;
  name: string;
  // Ingredient.category, surfaced so the Pantry page can group and filter.
  // Not a schema change — the column already exists.
  category: string;
}

export async function getPantryForUser(userId: string): Promise<PantryItemView[]> {
  const items = await prisma.pantryItem.findMany({
    where: { userId },
    include: { ingredient: true },
    orderBy: { createdAt: "asc" },
  });
  return items.map((item) => ({
    id: item.id,
    ingredientId: item.ingredientId,
    name: item.ingredient.name,
    category: item.ingredient.category,
  }));
}

export interface PantryRecommendation extends RecipeSummary {
  matchedCount: number;
  totalCount: number;
  missingIngredients: string[];
}

// PRODUCT_BLUEPRINT.md §6.3.11 ranking: most-matched ingredients first, then
// fewest missing, then lower cost, then shorter total time. Recipes with no
// matching ingredients at all are excluded — "recommendations based on your
// pantry" implies at least some overlap.
export async function getPantryRecommendations(
  ingredientIds: string[]
): Promise<PantryRecommendation[]> {
  const pantrySet = new Set(ingredientIds);
  const recipes = await prisma.recipe.findMany({
    where: { status: "PUBLISHED" },
    include: { recipeIngredients: { include: { ingredient: true } } },
  });

  const scored = recipes
    .map((recipe) => {
      const total = recipe.recipeIngredients.length;
      const matched = recipe.recipeIngredients.filter((line) =>
        pantrySet.has(line.ingredientId)
      ).length;
      const missing = recipe.recipeIngredients
        .filter((line) => !pantrySet.has(line.ingredientId))
        .map((line) => line.ingredient.name);
      return { recipe, matched, total, missing };
    })
    .filter((entry) => entry.matched > 0);

  scored.sort((a, b) => {
    if (b.matched !== a.matched) return b.matched - a.matched;
    if (a.missing.length !== b.missing.length) return a.missing.length - b.missing.length;
    const costDiff = Number(a.recipe.estimatedCost) - Number(b.recipe.estimatedCost);
    if (costDiff !== 0) return costDiff;
    return a.recipe.prepTime + a.recipe.cookTime - (b.recipe.prepTime + b.recipe.cookTime);
  });

  return scored.map((entry) => ({
    id: entry.recipe.id,
    name: entry.recipe.name,
    category: entry.recipe.category,
    estimatedCost: Number(entry.recipe.estimatedCost),
    prepTime: entry.recipe.prepTime,
    cookTime: entry.recipe.cookTime,
    difficulty: entry.recipe.difficulty,
    imageUrl: entry.recipe.imageUrl,
    matchedCount: entry.matched,
    totalCount: entry.total,
    missingIngredients: entry.missing,
  }));
}
