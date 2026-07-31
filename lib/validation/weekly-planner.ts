import { z } from "zod";
import { DAYS_OF_WEEK, MEAL_TYPES, MEAL_FOCUS_OPTIONS } from "@/lib/constants";

const dayEnum = z.enum(DAYS_OF_WEEK);
const mealTypeEnum = z.enum(MEAL_TYPES);
const mealFocusEnum = z.enum(MEAL_FOCUS_OPTIONS);

export const generatePlanSchema = z.object({
  weeklyBudget: z.number().positive(),
  familySize: z.number().int().min(1).max(20),
  mealFocus: mealFocusEnum.optional(),
});

export const replaceMealComputeSchema = z.object({
  weeklyBudget: z.number().positive(),
  familySize: z.number().int().min(1).max(20),
  excludeRecipeIds: z.array(z.string().uuid()),
  mealFocus: mealFocusEnum.optional(),
});

const plannedMealSchema = z.object({ recipeId: z.string().uuid() });

export const savePlanSchema = z.object({
  weeklyBudget: z.number().positive(),
  familySize: z.number().int().min(1).max(20),
  days: z
    .array(
      z.object({
        day: dayEnum,
        lunch: plannedMealSchema,
        dinner: plannedMealSchema,
      })
    )
    .length(7),
});

export const mealPlanIdSchema = z.string().uuid();

export const replaceSavedMealSchema = z.object({
  day: dayEnum,
  mealType: mealTypeEnum,
  recipeId: z.string().uuid(),
});
