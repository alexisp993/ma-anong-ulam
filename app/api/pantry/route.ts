import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { getPantryForUser } from "@/lib/pantry";
import { addPantryItemSchema } from "@/lib/validation/pantry";

// GET /api/pantry — API_REFERENCE.md §5.2, auth required.
export async function GET() {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  try {
    const items = await getPantryForUser(session.user.id);
    return apiSuccess(items);
  } catch {
    return apiServerError();
  }
}

// POST /api/pantry — API_REFERENCE.md §5.3, auth required. All rejection
// cases (missing/unknown ingredientId, already in pantry) are 400 here,
// per that section — distinct from Favorites' 404-for-missing-resource.
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const body = await request.json().catch(() => null);
  const parsed = addPantryItemSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid request.", 400);

  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { id: parsed.data.ingredientId },
    });
    if (!ingredient) return apiError("Ingredient not found.", 400);

    const existing = await prisma.pantryItem.findUnique({
      where: { userId_ingredientId: { userId: session.user.id, ingredientId: ingredient.id } },
    });
    if (existing) return apiError("Ingredient is already in your pantry.", 400);

    const item = await prisma.pantryItem.create({
      data: { userId: session.user.id, ingredientId: ingredient.id },
    });
    return apiSuccess({ id: item.id, ingredientId: item.ingredientId }, 201);
  } catch {
    return apiServerError();
  }
}
