import { z } from "zod";

export const addFavoriteSchema = z.object({
  recipeId: z.string().uuid(),
});

export const favoriteIdSchema = z.string().uuid();
