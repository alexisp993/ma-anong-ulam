import { auth } from "@/lib/auth";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { setItemPurchased } from "@/lib/grocery-list";
import {
  groceryListIdSchema,
  groceryItemIdSchema,
  updatePurchasedSchema,
} from "@/lib/validation/grocery-list";

// PUT /api/grocery-lists/{groceryListId}/items/{itemId} — API_REFERENCE.md
// §7.3, auth required. Body: { purchased }.
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const { id, itemId } = await params;
  const parsedListId = groceryListIdSchema.safeParse(id);
  const parsedItemId = groceryItemIdSchema.safeParse(itemId);
  if (!parsedListId.success || !parsedItemId.success) {
    return apiError("Invalid grocery list or item ID.", 400);
  }

  const body = await request.json().catch(() => null);
  const parsedBody = updatePurchasedSchema.safeParse(body);
  if (!parsedBody.success) return apiError("Invalid request.", 400);

  try {
    const updated = await setItemPurchased(
      session.user.id,
      parsedListId.data,
      parsedItemId.data,
      parsedBody.data.purchased
    );
    if (!updated) return apiError("Grocery list or item not found.", 404);
    return apiSuccess({});
  } catch {
    return apiServerError();
  }
}
