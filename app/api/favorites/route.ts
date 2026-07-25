import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { getFavoritesForUser } from "@/lib/favorites";
import { addFavoriteSchema } from "@/lib/validation/favorites";

// GET /api/favorites — API_REFERENCE.md §8.1, auth required.
export async function GET() {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  try {
    const favorites = await getFavoritesForUser(session.user.id);
    return apiSuccess(favorites);
  } catch {
    return apiServerError();
  }
}

// POST /api/favorites — API_REFERENCE.md §8.3, auth required.
// Body: { recipeId }. 400 for validation/already-favorited, 404 if the
// recipe itself doesn't exist (per §8.3's distinct Possible Responses).
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const body = await request.json().catch(() => null);
  const parsed = addFavoriteSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid request.", 400);

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: parsed.data.recipeId },
    });
    if (!recipe) return apiError("Recipe not found.", 404);

    const existing = await prisma.favorite.findUnique({
      where: { userId_recipeId: { userId: session.user.id, recipeId: recipe.id } },
    });
    if (existing) return apiError("Recipe is already in your favorites.", 400);

    const favorite = await prisma.favorite.create({
      data: { userId: session.user.id, recipeId: recipe.id },
    });
    return apiSuccess({ id: favorite.id, recipeId: favorite.recipeId }, 201);
  } catch {
    return apiServerError();
  }
}
