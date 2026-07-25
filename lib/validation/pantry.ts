import { z } from "zod";

export const addPantryItemSchema = z.object({
  ingredientId: z.string().uuid(),
});

export const pantryItemIdSchema = z.string().uuid();

export const pantryRecommendationsSchema = z.object({
  ingredientIds: z.array(z.string().uuid()).min(1),
});
