import { auth } from "@/lib/auth";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { getGroceryListForPlan } from "@/lib/grocery-list";
import { mealPlanIdParamSchema } from "@/lib/validation/grocery-list";

// GET /api/grocery-lists/by-plan/{mealPlanId} — lets the Grocery List page
// resume the list already generated for the current plan instead of forcing
// a manual regenerate. data: null (200) means "no list yet for this plan."
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ mealPlanId: string }> }
) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const { mealPlanId } = await params;
  const parsed = mealPlanIdParamSchema.safeParse(mealPlanId);
  if (!parsed.success) return apiError("Invalid meal plan ID.", 400);

  try {
    const list = await getGroceryListForPlan(session.user.id, parsed.data);
    return apiSuccess(list);
  } catch {
    return apiServerError();
  }
}
