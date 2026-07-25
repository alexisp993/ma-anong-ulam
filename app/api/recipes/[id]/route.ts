import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { getRecipeById } from "@/lib/recipes";
import { recipeIdSchema } from "@/lib/validation/recipes";

// GET /api/recipes/{recipeId} — API_REFERENCE.md §3.3
// Malformed UUID -> 400, well-formed but no match -> 404 (§11.5).
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsedId = recipeIdSchema.safeParse(id);
  if (!parsedId.success) {
    return apiError("Invalid recipe ID.", 400);
  }

  try {
    const recipe = await getRecipeById(parsedId.data);
    if (!recipe) {
      return apiError("Recipe not found.", 404);
    }
    return apiSuccess(recipe);
  } catch {
    return apiServerError();
  }
}
