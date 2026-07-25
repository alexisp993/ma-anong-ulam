import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { getKahitAnoRecommendations } from "@/lib/recommendation-engine";
import { kahitAnoSchema } from "@/lib/validation/kahit-ano";

// POST /api/kahit-ano — API_REFERENCE.md §4.1. Public: no authentication
// required (BR-RE-006 — guests and registered users get identical logic).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = kahitAnoSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid request.", 400);

  try {
    const recommendations = await getKahitAnoRecommendations(parsed.data);
    return apiSuccess(recommendations);
  } catch {
    return apiServerError();
  }
}
