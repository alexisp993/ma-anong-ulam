import { auth } from "@/lib/auth";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { saveWeeklyPlan } from "@/lib/weekly-planner";
import { savePlanSchema } from "@/lib/validation/weekly-planner";

// POST /api/weekly-planner/save — auth required. Path/body differ from
// API_REFERENCE.md §6.5 (documented as {mealPlanId}/save with no body):
// since generate() no longer creates a draft mealPlanId server-side (see
// that route's comment), this is the actual creation step and needs the
// full plan in the body. Returns the newly created mealPlanId.
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const body = await request.json().catch(() => null);
  const parsed = savePlanSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid request.", 400);

  try {
    const mealPlanId = await saveWeeklyPlan(
      session.user.id,
      parsed.data.weeklyBudget,
      parsed.data.familySize,
      parsed.data.days
    );
    return apiSuccess({ mealPlanId });
  } catch {
    return apiServerError();
  }
}
