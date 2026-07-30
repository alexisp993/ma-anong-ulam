import { prisma } from "@/lib/prisma";
import type { Recipe } from "@prisma/client";

// Field shapes match API_REFERENCE.md §3 (RecipeSummary / RecipeDetail) exactly.
export interface RecipeSummary {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
  prepTime: number;
  cookTime: number;
  difficulty: string;
  imageUrl: string;
}

export interface RecipeIngredientLine {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeDetail extends RecipeSummary {
  description: string;
  mealStyle: string;
  servings: number;
  instructions: string;
  ingredients: RecipeIngredientLine[];
}

function toSummary(recipe: Recipe): RecipeSummary {
  return {
    id: recipe.id,
    name: recipe.name,
    category: recipe.category,
    estimatedCost: Number(recipe.estimatedCost),
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    difficulty: recipe.difficulty,
    imageUrl: recipe.imageUrl,
  };
}

export async function getRecipes(filters: {
  search?: string;
  category?: string;
}): Promise<RecipeSummary[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      status: "PUBLISHED",
      ...(filters.search
        ? { name: { contains: filters.search, mode: "insensitive" } }
        : {}),
      ...(filters.category ? { category: filters.category } : {}),
    },
    orderBy: { name: "asc" },
  });
  return recipes.map(toSummary);
}

export async function getRecipeById(id: string): Promise<RecipeDetail | null> {
  const recipe = await prisma.recipe.findFirst({
    where: { id, status: "PUBLISHED" },
    include: { recipeIngredients: { include: { ingredient: true } } },
  });
  if (!recipe) return null;

  return {
    ...toSummary(recipe),
    description: recipe.description,
    mealStyle: recipe.mealStyle,
    servings: recipe.servings,
    instructions: recipe.instructions,
    ingredients: recipe.recipeIngredients.map((line) => ({
      name: line.ingredient.name,
      quantity: Number(line.quantity),
      unit: line.unit,
    })),
  };
}
