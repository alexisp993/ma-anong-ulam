// Recipe Normalizer + Ingredient Dictionary + Unit Normalizer stages of the
// Recipe Import Pipeline. Reads data/raw-recipes.json and produces
// data/recipes.json, data/ingredients.json, data/categories.json, and
// data/attribution.json. Costs are filled in later by generate-costs.ts.

import * as fs from "fs";
import * as path from "path";
import { INGREDIENT_DICTIONARY } from "./ingredient-dictionary";
import { UNIT_ALIASES, AllowedUnit } from "./units";

const DATA_DIR = path.join(__dirname, "..", "data");

interface RawRecipe {
  name: string;
  category: string;
  mealStyle: string;
  difficulty: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  description: string;
  imageUrl: string;
  source: string;
  sourceUrl: string;
  rawIngredients: string[];
  instructions: string[];
}

interface NormalizedIngredientLine {
  name: string;
  quantity: number;
  unit: AllowedUnit;
}

interface NormalizedRecipe {
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
  ingredients: NormalizedIngredientLine[];
}

function parseQuantity(text: string): { quantity: number; rest: string } {
  let match = text.match(/^(\d+)\s+(\d+)\/(\d+)\s+(.*)$/);
  if (match) {
    const [, whole, num, den, rest] = match;
    return { quantity: Number(whole) + Number(num) / Number(den), rest };
  }

  match = text.match(/^(\d+)\/(\d+)\s+(.*)$/);
  if (match) {
    const [, num, den, rest] = match;
    return { quantity: Number(num) / Number(den), rest };
  }

  match = text.match(/^(\d+(?:\.\d+)?)\s+(.*)$/);
  if (match) {
    const [, qty, rest] = match;
    return { quantity: Number(qty), rest };
  }

  throw new Error(`Could not parse leading quantity from ingredient line: "${text}"`);
}

function parseIngredientLine(raw: string): NormalizedIngredientLine {
  const mainPart = raw.split(",")[0].trim();
  const { quantity, rest } = parseQuantity(mainPart);

  const tokens = rest.trim().split(/\s+/);
  const unitToken = tokens[0].toLowerCase();
  const namePhrase = tokens.slice(1).join(" ").trim().toLowerCase();

  const unitInfo = UNIT_ALIASES[unitToken];
  if (!unitInfo) {
    throw new Error(`Unknown unit "${unitToken}" in ingredient line: "${raw}"`);
  }

  const ingredientInfo = INGREDIENT_DICTIONARY[namePhrase];
  if (!ingredientInfo) {
    throw new Error(`Unmapped ingredient name "${namePhrase}" in ingredient line: "${raw}"`);
  }

  return {
    name: ingredientInfo.canonical,
    quantity: Math.round(quantity * unitInfo.factor * 100) / 100,
    unit: unitInfo.unit,
  };
}

function slugCounter(prefix: string) {
  let count = 0;
  return () => {
    count += 1;
    return `${prefix}_${String(count).padStart(3, "0")}`;
  };
}

function main() {
  const rawRecipes: RawRecipe[] = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, "raw-recipes.json"), "utf-8")
  );

  const nextRecipeId = slugCounter("recipe");
  const nextIngredientId = slugCounter("ingredient");

  const ingredientIds = new Map<string, string>(); // canonical name -> id
  const ingredientCategories = new Map<string, string>(); // canonical name -> category
  const categorySet = new Set<string>();

  const recipes: NormalizedRecipe[] = [];
  const attribution: { recipeId: string; recipeName: string; source: string; sourceUrl: string }[] = [];

  for (const raw of rawRecipes) {
    const id = nextRecipeId();
    categorySet.add(raw.category);

    const ingredients = raw.rawIngredients.map((line) => {
      const parsed = parseIngredientLine(line);
      if (!ingredientIds.has(parsed.name)) {
        ingredientIds.set(parsed.name, nextIngredientId());
        ingredientCategories.set(parsed.name, INGREDIENT_DICTIONARY[
          Object.keys(INGREDIENT_DICTIONARY).find(
            (key) => INGREDIENT_DICTIONARY[key].canonical === parsed.name
          )!
        ].category);
      }
      return parsed;
    });

    recipes.push({
      id,
      name: raw.name,
      description: raw.description,
      category: raw.category,
      mealStyle: raw.mealStyle,
      estimatedCost: 0,
      prepTime: raw.prepTime,
      cookTime: raw.cookTime,
      servings: raw.servings,
      difficulty: raw.difficulty,
      imageUrl: raw.imageUrl,
      instructions: raw.instructions,
      ingredients,
    });

    attribution.push({
      recipeId: id,
      recipeName: raw.name,
      source: raw.source,
      sourceUrl: raw.sourceUrl,
    });
  }

  const ingredients = Array.from(ingredientIds.entries()).map(([name, id]) => ({
    id,
    name,
    category: ingredientCategories.get(name)!,
    estimatedCost: 0,
  }));

  const categories = Array.from(categorySet).sort().map((name, index) => ({
    id: `category_${String(index + 1).padStart(3, "0")}`,
    name,
  }));

  fs.writeFileSync(path.join(DATA_DIR, "recipes.json"), JSON.stringify(recipes, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "ingredients.json"), JSON.stringify(ingredients, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "categories.json"), JSON.stringify(categories, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "attribution.json"), JSON.stringify(attribution, null, 2));

  console.log(`Normalized ${recipes.length} recipes, ${ingredients.length} unique ingredients, ${categories.length} categories.`);
}

main();
