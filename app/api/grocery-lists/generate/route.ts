import { auth } from "@/lib/auth";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { computeGroceryList, generateGroceryListForPlan } from "@/lib/grocery-list";
import { generateGroceryListSchema } from "@/lib/validation/grocery-list";

// POST /api/grocery-lists/generate — API_REFERENCE.md §7.1 documents
// { mealPlanId } only (auth required). PRODUCT_BLUEPRINT.md gives guests
// full Grocery List functionality via local storage, and guests have no
// DB-backed meal plan — so this also accepts { recipeIds } as a public,
// stateless alternative (mirrors the Pantry/Weekly Planner compute split).
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = generateGroceryListSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid request.", 400);

  try {
    if (parsed.data.mealPlanId) {
      const session = await auth();
      if (!session?.user) return apiError("Authentication required.", 401);

      const list = await generateGroceryListForPlan(session.user.id, parsed.data.mealPlanId);
      if (!list) return apiError("Meal plan not found.", 404);
      return apiSuccess(list);
    }

    const list = await computeGroceryList(parsed.data.recipeIds!);
    return apiSuccess(list);
  } catch {
    return apiServerError();
  }
}
