import { z } from "zod";
import { RECIPE_CATEGORIES, MEAL_STYLES, DIFFICULTY_LEVELS } from "@/lib/constants";
import { ALLOWED_UNITS } from "@/scripts/units";

export const submitRecipeIngredientSchema = z.object({
  ingredientId: z.string().uuid(),
  quantity: z.number().positive(),
  unit: z.enum(ALLOWED_UNITS),
});

export const submitRecipeSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1),
  category: z.enum(RECIPE_CATEGORIES),
  mealStyle: z.enum(MEAL_STYLES),
  difficulty: z.enum(DIFFICULTY_LEVELS),
  prepTime: z.number().int().positive(),
  cookTime: z.number().int().positive(),
  servings: z.number().int().min(1),
  instructions: z.string().trim().min(1),
  imageUrl: z.string().url(),
  ingredients: z.array(submitRecipeIngredientSchema).min(1),
});
