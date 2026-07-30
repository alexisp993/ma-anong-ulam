import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth";
import { apiSuccess, apiError, apiServerError } from "@/lib/api-response";
import { MAX_RECIPE_IMAGE_BYTES, ALLOWED_RECIPE_IMAGE_TYPES } from "@/lib/constants";

// POST /api/recipes/submit/image — uploads a recipe submission photo to
// Vercel Blob and returns its URL for use in the Submit Recipe request.
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return apiError("Authentication required.", 401);

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return apiError("No image file provided.", 400);

  if (!ALLOWED_RECIPE_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_RECIPE_IMAGE_TYPES)[number])) {
    return apiError("Image must be JPEG, PNG, or WebP.", 400);
  }
  if (file.size > MAX_RECIPE_IMAGE_BYTES) {
    return apiError("Image must be smaller than 5MB.", 400);
  }

  try {
    const blob = await put(`recipe-submissions/${randomUUID()}-${file.name}`, file, {
      access: "public",
    });
    return apiSuccess({ url: blob.url });
  } catch {
    return apiServerError();
  }
}
