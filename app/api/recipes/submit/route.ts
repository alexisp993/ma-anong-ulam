import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { submitRecipeSchema } from "@/lib/validation/recipe-submissions";
import { lineCost } from "@/scripts/pricing";

// POST /api/recipes/submit — creates a new recipe with Pending status.
// Estimated Cost is always server-computed from ingredient quantities,
// never accepted as client input (CLAUDE.md Recipe Submission Rules).
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const body = await request.json();
  const parsed = submitRecipeSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid recipe submission.", 400);
  const data = parsed.data;

  const ingredients = await prisma.ingredient.findMany({
    where: { id: { in: data.ingredients.map((line) => line.ingredientId) } },
  });
  const ingredientsById = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));
  if (ingredientsById.size !== new Set(data.ingredients.map((line) => line.ingredientId)).size) {
    return apiError("One or more ingredients could not be found.", 400);
  }

  let estimatedCost = 0;
  try {
    for (const line of data.ingredients) {
      const ingredient = ingredientsById.get(line.ingredientId)!;
      estimatedCost += lineCost(ingredient.name, line.quantity, line.unit);
    }
  } catch {
    return apiError("One or more ingredients can't be priced with the given unit.", 400);
  }

  try {
    const recipe = await prisma.recipe.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        mealStyle: data.mealStyle,
        estimatedCost: Math.round(estimatedCost * 100) / 100,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        servings: data.servings,
        difficulty: data.difficulty,
        imageUrl: data.imageUrl,
        instructions: data.instructions,
        status: "PENDING",
        submittedByUserId: session.user.id,
        recipeIngredients: {
          create: data.ingredients.map((line) => ({
            ingredientId: line.ingredientId,
            quantity: line.quantity,
            unit: line.unit,
          })),
        },
      },
    });
    return apiSuccess({ id: recipe.id, status: recipe.status }, 201);
  } catch {
    return apiServerError();
  }
}
