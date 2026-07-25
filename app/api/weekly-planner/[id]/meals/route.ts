import { auth } from "@/lib/auth";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { replaceSavedMeal } from "@/lib/weekly-planner";
import { mealPlanIdSchema, replaceSavedMealSchema } from "@/lib/validation/weekly-planner";

// PUT /api/weekly-planner/{mealPlanId}/meals — API_REFERENCE.md §6.4, auth
// required. Replaces one slot in an already-saved plan (BR-WP-005: saved
// plans remain editable).
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const { id } = await params;
  const parsedId = mealPlanIdSchema.safeParse(id);
  if (!parsedId.success) return apiError("Invalid meal plan ID.", 400);

  const body = await request.json().catch(() => null);
  const parsedBody = replaceSavedMealSchema.safeParse(body);
  if (!parsedBody.success) return apiError("Invalid request.", 400);

  try {
    const updated = await replaceSavedMeal(
      session.user.id,
      parsedId.data,
      parsedBody.data.day,
      parsedBody.data.mealType,
      parsedBody.data.recipeId
    );
    if (!updated) return apiError("Meal plan not found.", 404);
    return apiSuccess({});
  } catch {
    return apiServerError();
  }
}
