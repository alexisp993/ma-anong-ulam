import { auth } from "@/lib/auth";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { getGroceryList } from "@/lib/grocery-list";
import { groceryListIdSchema } from "@/lib/validation/grocery-list";

// GET /api/grocery-lists/{groceryListId} — API_REFERENCE.md §7.2, auth required.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const { id } = await params;
  const parsedId = groceryListIdSchema.safeParse(id);
  if (!parsedId.success) return apiError("Invalid grocery list ID.", 400);

  try {
    const list = await getGroceryList(session.user.id, parsedId.data);
    if (!list) return apiError("Grocery list not found.", 404);
    return apiSuccess(list);
  } catch {
    return apiServerError();
  }
}
