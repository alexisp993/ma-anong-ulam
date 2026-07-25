import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { registerSchema } from "@/lib/validation/auth";

// POST /api/auth/register — API_REFERENCE.md §2.1. (Login/logout go through
// Auth.js's own Credentials + JWT flow via app/api/auth/[...nextauth],
// which the client calls via next-auth/react's signIn()/signOut() — not
// separate custom /api/auth/login and /api/auth/logout routes, since
// Auth.js already implements that behavior correctly, including CSRF
// protection a hand-rolled duplicate wouldn't get for free.)
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid request.", 400);

  try {
    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existing) return apiError("An account with this email already exists.", 400);

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const user = await prisma.user.create({
      data: { email: parsed.data.email, passwordHash },
    });
    return apiSuccess({ id: user.id, email: user.email }, 201);
  } catch {
    return apiServerError();
  }
}
