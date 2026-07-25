// Prisma Seeder stage of the Recipe Import Pipeline. Reads data/recipes.json
// and data/ingredients.json and upserts Recipe, Ingredient, and
// RecipeIngredient rows. Idempotent: safe to run repeatedly without creating
// duplicates, matching by natural key (Ingredient.name, Recipe.name).

import * as fs from "fs";
import * as path from "path";
import { PrismaClient } from "@prisma/client";

const DATA_DIR = path.join(__dirname, "..", "data");
const prisma = new PrismaClient();

interface Ingredient {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
}

interface RecipeIngredientLine {
  name: string;
  quantity: number;
  unit: string;
}

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
  ingredients: RecipeIngredientLine[];
}

async function main() {
  const recipes: Recipe[] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "recipes.json"), "utf-8"));
  const ingredients: Ingredient[] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "ingredients.json"), "utf-8"));

  // DATABASE_SCHEMA.md §4.4 does not declare a unique constraint on
  // Recipe.name or Ingredient.name, so idempotency is handled here in
  // application logic (find-then-create/update) rather than via a DB-level
  // upsert, which would require adding an undocumented unique index.
  const ingredientDbIds = new Map<string, string>();

  for (const ing of ingredients) {
    const existing = await prisma.ingredient.findFirst({ where: { name: ing.name } });
    const row = existing
      ? await prisma.ingredient.update({
          where: { id: existing.id },
          data: { category: ing.category, estimatedCost: ing.estimatedCost },
        })
      : await prisma.ingredient.create({
          data: { name: ing.name, category: ing.category, estimatedCost: ing.estimatedCost },
        });
    ingredientDbIds.set(ing.name, row.id);
  }

  for (const recipe of recipes) {
    const existingRecipe = await prisma.recipe.findFirst({ where: { name: recipe.name } });
    const recipeData = {
      description: recipe.description,
      category: recipe.category,
      mealStyle: recipe.mealStyle,
      estimatedCost: recipe.estimatedCost,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      imageUrl: recipe.imageUrl,
      instructions: recipe.instructions.join("\n"),
    };
    const recipeRow = existingRecipe
      ? await prisma.recipe.update({ where: { id: existingRecipe.id }, data: recipeData })
      : await prisma.recipe.create({ data: { name: recipe.name, ...recipeData } });

    // Idempotent join-table sync: replace this recipe's ingredient lines
    // with the current normalized set.
    await prisma.recipeIngredient.deleteMany({ where: { recipeId: recipeRow.id } });

    for (const line of recipe.ingredients) {
      const ingredientId = ingredientDbIds.get(line.name);
      if (!ingredientId) {
        throw new Error(`Ingredient "${line.name}" was not seeded before recipe "${recipe.name}"`);
      }
      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipeRow.id,
          ingredientId,
          quantity: line.quantity,
          unit: line.unit,
        },
      });
    }
  }

  console.log(`Seeded ${ingredients.length} ingredients and ${recipes.length} recipes.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
