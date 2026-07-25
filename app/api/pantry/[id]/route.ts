import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { pantryItemIdSchema } from "@/lib/validation/pantry";

// DELETE /api/pantry/{pantryItemId} — API_REFERENCE.md §5.4, auth required.
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const { id } = await params;
  const parsedId = pantryItemIdSchema.safeParse(id);
  if (!parsedId.success) return apiError("Invalid pantry item ID.", 400);

  try {
    const item = await prisma.pantryItem.findUnique({ where: { id: parsedId.data } });
    if (!item || item.userId !== session.user.id) {
      return apiError("Pantry item not found.", 404);
    }

    await prisma.pantryItem.delete({ where: { id: parsedId.data } });
    return apiSuccess({});
  } catch {
    return apiServerError();
  }
}
