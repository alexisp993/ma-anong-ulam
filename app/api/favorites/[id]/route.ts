import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { favoriteIdSchema } from "@/lib/validation/favorites";

// DELETE /api/favorites/{favoriteId} — API_REFERENCE.md §8.4, auth required.
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const { id } = await params;
  const parsedId = favoriteIdSchema.safeParse(id);
  if (!parsedId.success) return apiError("Invalid favorite ID.", 400);

  try {
    const favorite = await prisma.favorite.findUnique({ where: { id: parsedId.data } });
    if (!favorite || favorite.userId !== session.user.id) {
      return apiError("Favorite not found.", 404);
    }

    await prisma.favorite.delete({ where: { id: parsedId.data } });
    return apiSuccess({});
  } catch {
    return apiServerError();
  }
}
