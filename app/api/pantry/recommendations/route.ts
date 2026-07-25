import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { getPantryRecommendations } from "@/lib/pantry";
import { pantryRecommendationsSchema } from "@/lib/validation/pantry";

// POST /api/pantry/recommendations — public/stateless compute step, unlike
// API_REFERENCE.md §5.5 (which marks it auth-required). PRODUCT_BLUEPRINT.md
// gives guests full Pantry functionality via local storage, so this accepts
// an explicit ingredientIds list from either guest or registered clients
// (registered clients fetch their saved pantry via the authed GET /api/pantry
// first, then pass those ids here) rather than reading a session pantry.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = pantryRecommendationsSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid request.", 400);

  try {
    const recommendations = await getPantryRecommendations(parsed.data.ingredientIds);
    return apiSuccess(recommendations);
  } catch {
    return apiServerError();
  }
}
