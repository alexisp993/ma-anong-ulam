import { z } from "zod";
import { MEAL_STYLES } from "@/lib/constants";

// PRODUCT_BLUEPRINT.md §6.2.16: Budget required & > 0, Family Size required
// 1-20, Meal Style optional. (API_REFERENCE.md's request shape lists
// mealStyle as required, but the Blueprint is explicit that it's optional —
// following the Blueprint here.)
export const kahitAnoSchema = z.object({
  budget: z.number().positive(),
  familySize: z.number().int().min(1).max(20),
  mealStyle: z.enum(MEAL_STYLES).optional(),
  excludeIds: z.array(z.string().uuid()).optional(),
});
