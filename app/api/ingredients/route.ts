import { apiSuccess, apiServerError } from "@/lib/api-response";
import { searchIngredients } from "@/lib/ingredients";

// GET /api/ingredients?search= — gap-fill endpoint, public (matches the
// public/read-only nature of GET /api/recipes).
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const ingredients = await searchIngredients(search);
    return apiSuccess(ingredients);
  } catch {
    return apiServerError();
  }
}
