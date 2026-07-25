import { auth } from "@/lib/auth";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { getSavedWeeklyPlan } from "@/lib/weekly-planner";
import { mealPlanIdSchema } from "@/lib/validation/weekly-planner";

// GET /api/weekly-planner/{mealPlanId} — API_REFERENCE.md §6.3, auth required.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const { id } = await params;
  const parsedId = mealPlanIdSchema.safeParse(id);
  if (!parsedId.success) return apiError("Invalid meal plan ID.", 400);

  try {
    const plan = await getSavedWeeklyPlan(session.user.id, parsedId.data);
    if (!plan) return apiError("Meal plan not found.", 404);
    return apiSuccess(plan);
  } catch {
    return apiServerError();
  }
}
