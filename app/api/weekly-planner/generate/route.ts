import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { generateWeeklyPlan } from "@/lib/weekly-planner";
import { generatePlanSchema } from "@/lib/validation/weekly-planner";

// POST /api/weekly-planner/generate — public/stateless, unlike
// API_REFERENCE.md §6.2 (auth-required, returns a mealPlanId). Nothing is
// persisted here: PRODUCT_BLUEPRINT.md treats "Generate" and "Save" as
// distinct actions (§6.4, FR-WP-006/007), and guests need to generate a
// plan without an account at all. A real mealPlanId only exists once
// POST /api/weekly-planner/save is called, so the response is just
// { days } — no mealPlanId to return yet.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = generatePlanSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid request.", 400);

  try {
    const days = await generateWeeklyPlan(parsed.data);
    return apiSuccess({ days });
  } catch {
    return apiServerError();
  }
}
