import { prisma } from "@/lib/prisma";

// Matches API_REFERENCE.md §8.2 Favorite object: RecipeSummary fields plus
// the favorite's own id and the recipeId it points at.
export interface FavoriteWithRecipe {
  id: string;
  recipeId: string;
  name: string;
  category: string;
  estimatedCost: number;
  prepTime: number;
  cookTime: number;
  difficulty: string;
  imageUrl: string;
}

export async function getFavoritesForUser(userId: string): Promise<FavoriteWithRecipe[]> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { recipe: true },
    orderBy: { createdAt: "desc" },
  });

  return favorites.map((favorite) => ({
    id: favorite.id,
    recipeId: favorite.recipeId,
    name: favorite.recipe.name,
    category: favorite.recipe.category,
    estimatedCost: Number(favorite.recipe.estimatedCost),
    prepTime: favorite.recipe.prepTime,
    cookTime: favorite.recipe.cookTime,
    difficulty: favorite.recipe.difficulty,
    imageUrl: favorite.recipe.imageUrl,
  }));
}
