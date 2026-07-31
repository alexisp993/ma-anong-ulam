// Shared enum-like constants, safe to import from both client and server code
// (no Prisma import here — keep this file dependency-free).

// PRODUCT_BLUEPRINT.md §6.1.6 / FRONTEND_SPEC.md Recipe Browser category filter.
export const RECIPE_CATEGORIES = [
  "Chicken",
  "Pork",
  "Beef",
  "Seafood",
  "Vegetables",
  "Egg",
  "Noodles",
  "Others",
] as const;

// PRODUCT_BLUEPRINT.md §6.2.12 / DATABASE_SCHEMA.md §8.14 enum.
export const MEAL_STYLES = ["Dry", "With Sauce", "Soup"] as const;

// DATABASE_SCHEMA.md §8.14 enum.
export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"] as const;

// DATABASE_SCHEMA.md §8.14 enums (Weekly Planner).
export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
export const MEAL_TYPES = ["Lunch", "Dinner"] as const;

// PRODUCT_BLUEPRINT.md §6.5.7 — fixed grocery list grouping, order must stay
// consistent app-wide.
export const GROCERY_CATEGORIES = [
  "Meat",
  "Seafood",
  "Vegetables",
  "Fruits",
  "Dairy",
  "Staples",
  "Seasonings",
  "Others",
] as const;
export type GroceryCategory = (typeof GROCERY_CATEGORIES)[number];

// Recipe card "Optional Indicators" — FRONTEND_SPEC.md §6.1.4: "generated
// from recipe data rather than manually assigned." Thresholds are a
// presentational judgment call, not a documented value.
export const BUDGET_FRIENDLY_MAX_COST = 200;
export const QUICK_MEAL_MAX_MINUTES = 30;

// Weekly Planner "Meal Focus" — a category-composition preference, NOT a
// nutrition claim (no protein/carb/calorie data exists anywhere in the
// dataset). Deliberately named and scoped as a rough proxy: meat/seafood/egg
// categories vs. vegetable/noodle categories, nothing more precise.
export const MEAL_FOCUS_OPTIONS = ["Any", "Protein-forward", "Vegetable-forward"] as const;
export type MealFocus = (typeof MEAL_FOCUS_OPTIONS)[number];

const PROTEIN_FORWARD_CATEGORIES: readonly string[] = ["Chicken", "Pork", "Beef", "Seafood", "Egg"];
const VEGETABLE_FORWARD_CATEGORIES: readonly string[] = ["Vegetables", "Noodles"];

export function matchesMealFocus(category: string, focus: MealFocus): boolean {
  if (focus === "Protein-forward") return PROTEIN_FORWARD_CATEGORIES.includes(category);
  if (focus === "Vegetable-forward") return VEGETABLE_FORWARD_CATEGORIES.includes(category);
  return false;
}

// Recipe Submission image upload limits — PRODUCT_BLUEPRINT.md §10.21.
export const MAX_RECIPE_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_RECIPE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export function difficultyBadgeVariant(difficulty: string): "easy" | "medium" | "hard" {
  if (difficulty === "Easy") return "easy";
  if (difficulty === "Hard") return "hard";
  return "medium";
}
