import { z } from "zod";

// API_REFERENCE.md §7.1 documents { mealPlanId } only. Extended to also
// accept { recipeIds } for guests, who have no DB-backed meal plan to
// reference — see app/api/grocery-lists/generate/route.ts.
export const generateGroceryListSchema = z
  .object({
    mealPlanId: z.string().uuid().optional(),
    recipeIds: z.array(z.string().uuid()).min(1).optional(),
  })
  .refine((data) => Boolean(data.mealPlanId) !== Boolean(data.recipeIds), {
    message: "Provide either mealPlanId or recipeIds, not both.",
  });

export const groceryListIdSchema = z.string().uuid();
export const groceryItemIdSchema = z.string().uuid();
export const mealPlanIdParamSchema = z.string().uuid();

export const updatePurchasedSchema = z.object({
  purchased: z.boolean(),
});
