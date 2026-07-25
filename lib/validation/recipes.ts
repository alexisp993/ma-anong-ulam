import { z } from "zod";

export const recipeIdSchema = z.string().uuid();

export const recipeQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
});
