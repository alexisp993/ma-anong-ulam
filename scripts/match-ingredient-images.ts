// Reconciles the extracted thumbnail slugs against the canonical ingredient
// names, writing lib/data/ingredient-image-map.json.
//
//   npx tsx scripts/match-ingredient-images.ts
//   npx tsx scripts/match-ingredient-images.ts --write
//
// Reads names from scripts/ingredient-dictionary.ts (the pipeline's source of
// truth) so it runs without a database. Existing hand-made entries in the map
// are preserved — only new matches are added.
//
// Sheet captions and canonical names disagree constantly (sheet "Carrots" vs
// "Carrot"; sheet "Talong (Long)" vs canonical "Eggplant"), so exact matching
// alone recovers very little. The ladder below handles the mechanical cases;
// ALIASES covers the Filipino/English splits that no rule can infer.

import fs from "fs";
import path from "path";
import { INGREDIENT_DICTIONARY } from "./ingredient-dictionary";

const IMAGES_DIR = path.join("public", "images", "ingredients");
const MAP_PATH = path.join("lib", "data", "ingredient-image-map.json");

// canonical ingredient name -> thumbnail slug
const ALIASES: Record<string, string> = {
  Eggplant: "talong-long",
  "Long Green Chili": "siling-haba",
  "Thai Chili Pepper": "siling-labuyo",
  "Serrano Pepper": "siling-haba",
  "String Beans": "sitaw",
  Sitaw: "sitaw",
  "Malunggay Leaves": "dahon-ng-malunggay",
  "Hot Pepper Leaves": "dahon-ng-sili",
  "Kamote Tops": "talbos-ng-kamote",
  "Banana Flower Bud": "puso-ng-saging",
  "Daikon Radish": "radish",
  "Bean Sprouts": "monggo-sprouts",
  "Green Beans": "green-beans",
  "Snap Peas": "snow-peas",
  Pechay: "pechay",
  "Bok Choy": "bok-choy",
  Cabbage: "cabbage",
  Eggs: "whole-egg",
  Butter: "butter-salted",
  "Cheddar Cheese": "cheddar-cheese-grated",
  "Evaporated Milk": "evaporated-milk",
};

function normalize(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[()/]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugToWords(slug: string): string {
  return slug.replace(/-/g, " ");
}

function singular(text: string): string {
  if (text.endsWith("ies")) return `${text.slice(0, -3)}y`;
  if (text.endsWith("es") && !text.endsWith("ses")) return text.slice(0, -2);
  if (text.endsWith("s") && !text.endsWith("ss")) return text.slice(0, -1);
  return text;
}

function main() {
  const write = process.argv.includes("--write");

  const canonicalNames = Array.from(
    new Set(Object.values(INGREDIENT_DICTIONARY).map((entry) => entry.canonical))
  ).sort();

  const slugs = fs.existsSync(IMAGES_DIR)
    ? fs
        .readdirSync(IMAGES_DIR)
        .filter((f) => f.endsWith(".webp"))
        .map((f) => f.replace(/\.webp$/, ""))
    : [];

  // Index each slug under both its own wording and its singular form, so
  // canonical "Carrot" finds the sheet's "Carrots".
  const bySlugWords = new Map<string, string>();
  for (const slug of slugs) {
    const words = normalize(slugToWords(slug));
    if (!bySlugWords.has(words)) bySlugWords.set(words, slug);
    const sing = singular(words);
    if (!bySlugWords.has(sing)) bySlugWords.set(sing, slug);
  }

  const existing: Record<string, string> = fs.existsSync(MAP_PATH)
    ? JSON.parse(fs.readFileSync(MAP_PATH, "utf8"))
    : {};

  const result: Record<string, string> = { ...existing };
  const matched: string[] = [];
  const unmatched: string[] = [];

  for (const name of canonicalNames) {
    if (result[name]) {
      matched.push(`${name} -> ${result[name]} (kept)`);
      continue;
    }

    // Exact before alias, so a literal filename always wins over a
    // hand-written mapping that may only be an approximation.
    const key = normalize(name);
    const direct = bySlugWords.get(key) ?? bySlugWords.get(singular(key));
    if (direct) {
      result[name] = direct;
      matched.push(`${name} -> ${direct} (exact)`);
      continue;
    }

    const alias = ALIASES[name];
    if (alias && slugs.includes(alias)) {
      result[name] = alias;
      matched.push(`${name} -> ${alias} (alias)`);
      continue;
    }

    // No fuzzy/prefix matching on purpose: it paired "Onion" with
    // "onion-leeks", and a confidently wrong picture is worse than the icon
    // fallback. Anything genuinely missing belongs in ALIASES.
    unmatched.push(name);
  }

  const used = new Set(Object.values(result));
  const unused = slugs.filter((slug) => !used.has(slug));

  console.log(`Canonical ingredients: ${canonicalNames.length}`);
  console.log(`Thumbnails available:  ${slugs.length}`);
  console.log(`\nMATCHED (${matched.length}):`);
  for (const line of matched) console.log(`  ${line}`);
  console.log(`\nUNMATCHED — will fall back to an icon (${unmatched.length}):`);
  console.log(`  ${unmatched.join(", ")}`);
  console.log(`\nUNUSED thumbnails (${unused.length}):`);
  console.log(`  ${unused.join(", ")}`);

  if (write) {
    const sorted = Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
    fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });
    fs.writeFileSync(MAP_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
    console.log(`\nWrote ${Object.keys(sorted).length} entries -> ${MAP_PATH}`);
  } else {
    console.log(`\n(dry run — pass --write to update ${MAP_PATH})`);
  }
}

main();
