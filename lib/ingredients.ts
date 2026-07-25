import { prisma } from "@/lib/prisma";

export interface IngredientOption {
  id: string;
  name: string;
}

// Backs the Pantry "ingredient selector" (FRONTEND_SPEC.md §11.4). Not in
// API_REFERENCE.md — a necessary gap-fill, since POST /api/pantry requires
// a valid ingredientId with no documented way to look one up.
export async function searchIngredients(query?: string): Promise<IngredientOption[]> {
  const ingredients = await prisma.ingredient.findMany({
    where: query ? { name: { contains: query, mode: "insensitive" } } : {},
    orderBy: { name: "asc" },
    take: 50,
  });
  return ingredients.map((ingredient) => ({ id: ingredient.id, name: ingredient.name }));
}
