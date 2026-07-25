import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { pickReplacementMeal } from "@/lib/weekly-planner";
import { replaceMealComputeSchema } from "@/lib/validation/weekly-planner";

// POST /api/weekly-planner/replace-meal — public/stateless gap-fill,
// mirroring the generate split above. Used to replace one slot in a plan
// that hasn't been saved yet (guests always; registered users before their
// first Save). Once a plan is saved, editing goes through the authed
// PUT /api/weekly-planner/{mealPlanId}/meals instead.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = replaceMealComputeSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid request.", 400);

  try {
    const meal = await pickReplacementMeal(parsed.data);
    return apiSuccess(meal);
  } catch {
    return apiServerError();
  }
}
