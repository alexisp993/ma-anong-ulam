// Recipe Validator stage of the Recipe Import Pipeline. Checks data/recipes.json,
// data/ingredients.json, and data/categories.json against the constraints in
// DATABASE_SCHEMA.md (§1.7, §4.5, §4.6) and PRODUCT_BLUEPRINT.md (§8.14).
// Exits non-zero if any check fails.

import * as fs from "fs";
import * as path from "path";
import { ALLOWED_UNITS } from "./units";

const DATA_DIR = path.join(__dirname, "..", "data");

const MEAL_STYLES = ["Dry", "With Sauce", "Soup"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const REQUIRED_RECIPE_FIELDS = [
  "id", "name", "description", "category", "mealStyle", "estimatedCost",
  "prepTime", "cookTime", "servings", "difficulty", "imageUrl", "instructions",
];

interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  mealStyle: string;
  estimatedCost: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  imageUrl: string;
  instructions: string[];
  ingredients: { name: string; quantity: number; unit: string }[];
}

interface Ingredient {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
}

interface Category {
  id: string;
  name: string;
}

function readJson<T>(file: string): T {
  const full = path.join(DATA_DIR, file);
  const text = fs.readFileSync(full, "utf-8");
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    throw new Error(`Invalid JSON in ${file}: ${(err as Error).message}`);
  }
}

function main() {
  const errors: string[] = [];

  const recipes = readJson<Recipe[]>("recipes.json");
  const ingredients = readJson<Ingredient[]>("ingredients.json");
  const categories = readJson<Category[]>("categories.json");

  const validIngredientNames = new Set(ingredients.map((i) => i.name));
  const validCategoryNames = new Set(categories.map((c) => c.name));

  // Duplicate checks
  const recipeIds = new Set<string>();
  const recipeNames = new Set<string>();
  for (const r of recipes) {
    if (recipeIds.has(r.id)) errors.push(`Duplicate Recipe id: ${r.id}`);
    recipeIds.add(r.id);
    if (recipeNames.has(r.name)) errors.push(`Duplicate Recipe name: ${r.name}`);
    recipeNames.add(r.name);
  }

  const ingredientIds = new Set<string>();
  const ingredientNames = new Set<string>();
  for (const i of ingredients) {
    if (ingredientIds.has(i.id)) errors.push(`Duplicate Ingredient id: ${i.id}`);
    ingredientIds.add(i.id);
    if (ingredientNames.has(i.name)) errors.push(`Duplicate Ingredient name: ${i.name}`);
    ingredientNames.add(i.name);
  }

  const categoryIds = new Set<string>();
  const categoryNames = new Set<string>();
  for (const c of categories) {
    if (categoryIds.has(c.id)) errors.push(`Duplicate Category id: ${c.id}`);
    categoryIds.add(c.id);
    if (categoryNames.has(c.name)) errors.push(`Duplicate Category name: ${c.name}`);
    categoryNames.add(c.name);
  }

  // Per-recipe validation
  for (const r of recipes) {
    const label = `Recipe "${r.name || r.id}"`;

    for (const field of REQUIRED_RECIPE_FIELDS) {
      const value = (r as unknown as Record<string, unknown>)[field];
      if (value === null || value === undefined || value === "") {
        errors.push(`${label}: missing required field "${field}"`);
      }
    }

    if (!MEAL_STYLES.includes(r.mealStyle)) {
      errors.push(`${label}: invalid mealStyle "${r.mealStyle}" (expected one of ${MEAL_STYLES.join(", ")})`);
    }

    if (!DIFFICULTIES.includes(r.difficulty)) {
      errors.push(`${label}: invalid difficulty "${r.difficulty}" (expected one of ${DIFFICULTIES.join(", ")})`);
    }

    if (!validCategoryNames.has(r.category)) {
      errors.push(`${label}: category "${r.category}" not present in categories.json`);
    }

    if (!(r.estimatedCost >= 0)) errors.push(`${label}: estimatedCost must be >= 0`);
    if (!(r.prepTime >= 0)) errors.push(`${label}: prepTime must be >= 0`);
    if (!(r.cookTime >= 0)) errors.push(`${label}: cookTime must be >= 0`);
    if (!(r.servings > 0)) errors.push(`${label}: servings must be > 0`);

    if (!Array.isArray(r.instructions) || r.instructions.length === 0) {
      errors.push(`${label}: instructions must be a non-empty ordered array`);
    }

    if (!Array.isArray(r.ingredients) || r.ingredients.length === 0) {
      errors.push(`${label}: must contain at least one ingredient`);
    } else {
      for (const line of r.ingredients) {
        if (!validIngredientNames.has(line.name)) {
          errors.push(`${label}: references unknown ingredient "${line.name}"`);
        }
        if (!(line.quantity > 0)) {
          errors.push(`${label}: ingredient "${line.name}" quantity must be > 0`);
        }
        if (!ALLOWED_UNITS.includes(line.unit as (typeof ALLOWED_UNITS)[number])) {
          errors.push(`${label}: ingredient "${line.name}" has invalid unit "${line.unit}"`);
        }
      }
    }
  }

  // Per-ingredient validation
  for (const i of ingredients) {
    if (!i.name) errors.push(`Ingredient ${i.id}: missing name`);
    if (!i.category) errors.push(`Ingredient ${i.id}: missing category`);
    if (!(i.estimatedCost >= 0)) errors.push(`Ingredient ${i.id}: estimatedCost must be >= 0`);
  }

  if (errors.length > 0) {
    console.error(`Validation FAILED with ${errors.length} error(s):\n`);
    for (const e of errors) console.error(` - ${e}`);
    process.exit(1);
  }

  console.log(
    `Validation PASSED: ${recipes.length} recipes, ${ingredients.length} ingredients, ${categories.length} categories. Zero errors.`
  );
}

main();
