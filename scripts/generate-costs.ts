// Cost Calculator stage of the Recipe Import Pipeline. Reads data/recipes.json
// and data/ingredients.json (produced by normalize-recipes.ts), computes
// Ingredient.estimatedCost and rolls up Recipe.estimatedCost + costPerServing
// is intentionally not stored (schema has no such column) — only
// Recipe.estimatedCost per DATABASE_SCHEMA.md §2.2.

import * as fs from "fs";
import * as path from "path";
import { PRICING, lineCost } from "./pricing";
import { AllowedUnit } from "./units";

const DATA_DIR = path.join(__dirname, "..", "data");

interface Ingredient {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
}

interface RecipeIngredientLine {
  name: string;
  quantity: number;
  unit: AllowedUnit;
}

interface Recipe {
  id: string;
  name: string;
  estimatedCost: number;
  ingredients: RecipeIngredientLine[];
  [key: string]: unknown;
}

function displayCost(name: string): number {
  const pricing = PRICING[name];
  if (pricing.basis === "weight") return Math.round(pricing.ratePerGram * 1000 * 100) / 100;
  if (pricing.basis === "volume") return Math.round(pricing.ratePerMl * 1000 * 100) / 100;
  return Math.round(pricing.ratePerUnit * 100) / 100;
}

function main() {
  const recipes: Recipe[] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "recipes.json"), "utf-8"));
  const ingredients: Ingredient[] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "ingredients.json"), "utf-8"));

  for (const ingredient of ingredients) {
    ingredient.estimatedCost = displayCost(ingredient.name);
  }

  for (const recipe of recipes) {
    const total = recipe.ingredients.reduce(
      (sum, line) => sum + lineCost(line.name, line.quantity, line.unit),
      0
    );
    recipe.estimatedCost = Math.round(total * 100) / 100;
  }

  fs.writeFileSync(path.join(DATA_DIR, "recipes.json"), JSON.stringify(recipes, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "ingredients.json"), JSON.stringify(ingredients, null, 2));

  console.log(`Priced ${ingredients.length} ingredients and rolled up costs for ${recipes.length} recipes.`);
}

main();
