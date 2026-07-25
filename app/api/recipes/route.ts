import { NextRequest } from "next/server";
import { apiSuccess, apiServerError } from "@/lib/api-response";
import { getRecipes } from "@/lib/recipes";

// GET /api/recipes?search=&category= — API_REFERENCE.md §3.1
// Empty/omitted search or category values return all recipes (§3.2).
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;

    const recipes = await getRecipes({ search, category });
    return apiSuccess(recipes);
  } catch {
    return apiServerError();
  }
}
