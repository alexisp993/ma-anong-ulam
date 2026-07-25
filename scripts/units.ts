// Standard units allowed by the recipe pipeline (task-defined convention).
export const ALLOWED_UNITS = [
  "g", "kg", "ml", "L", "tsp", "tbsp", "cup",
  "pc", "pcs", "clove", "can", "pack", "bundle", "head", "slice",
] as const;

export type AllowedUnit = (typeof ALLOWED_UNITS)[number];

// Maps every raw unit word encountered in data/raw-recipes.json to an allowed
// unit plus the multiplier needed to convert the raw quantity into that unit.
export const UNIT_ALIASES: Record<string, { unit: AllowedUnit; factor: number }> = {
  "g": { unit: "g", factor: 1 },
  "gram": { unit: "g", factor: 1 },
  "grams": { unit: "g", factor: 1 },
  "kg": { unit: "kg", factor: 1 },
  "kilogram": { unit: "kg", factor: 1 },
  "kilograms": { unit: "kg", factor: 1 },
  "lb": { unit: "kg", factor: 0.453592 },
  "lbs": { unit: "kg", factor: 0.453592 },
  "pound": { unit: "kg", factor: 0.453592 },
  "pounds": { unit: "kg", factor: 0.453592 },
  "oz": { unit: "g", factor: 28.3495 },
  "ounce": { unit: "g", factor: 28.3495 },
  "ounces": { unit: "g", factor: 28.3495 },
  "ml": { unit: "ml", factor: 1 },
  "l": { unit: "L", factor: 1 },
  "liter": { unit: "L", factor: 1 },
  "liters": { unit: "L", factor: 1 },
  "litre": { unit: "L", factor: 1 },
  "litres": { unit: "L", factor: 1 },
  "quart": { unit: "L", factor: 0.946353 },
  "quarts": { unit: "L", factor: 0.946353 },
  "tsp": { unit: "tsp", factor: 1 },
  "teaspoon": { unit: "tsp", factor: 1 },
  "teaspoons": { unit: "tsp", factor: 1 },
  "tbsp": { unit: "tbsp", factor: 1 },
  "tablespoon": { unit: "tbsp", factor: 1 },
  "tablespoons": { unit: "tbsp", factor: 1 },
  "cup": { unit: "cup", factor: 1 },
  "cups": { unit: "cup", factor: 1 },
  "pc": { unit: "pcs", factor: 1 },
  "pcs": { unit: "pcs", factor: 1 },
  "piece": { unit: "pcs", factor: 1 },
  "pieces": { unit: "pcs", factor: 1 },
  "thumb": { unit: "pcs", factor: 1 },
  "thumbs": { unit: "pcs", factor: 1 },
  "sprig": { unit: "pcs", factor: 1 },
  "sprigs": { unit: "pcs", factor: 1 },
  "stalk": { unit: "pcs", factor: 1 },
  "stalks": { unit: "pcs", factor: 1 },
  "clove": { unit: "clove", factor: 1 },
  "cloves": { unit: "clove", factor: 1 },
  "can": { unit: "can", factor: 1 },
  "cans": { unit: "can", factor: 1 },
  "pack": { unit: "pack", factor: 1 },
  "packs": { unit: "pack", factor: 1 },
  "bundle": { unit: "bundle", factor: 1 },
  "bundles": { unit: "bundle", factor: 1 },
  "head": { unit: "head", factor: 1 },
  "heads": { unit: "head", factor: 1 },
  "slice": { unit: "slice", factor: 1 },
  "slices": { unit: "slice", factor: 1 },
};

// For cost estimation only: every allowed unit's price basis, grouped so
// units within a group can be priced from one per-base-unit rate.
// Volume units (tsp/tbsp/cup/ml/L) share one "ml" basis; weight units share
// one "g" basis; count-style units (pcs/clove/can/pack/bundle/head/slice)
// are each priced independently since they aren't metrically convertible.
export const COST_BASIS_ML: Partial<Record<AllowedUnit, number>> = {
  tsp: 5,
  tbsp: 15,
  cup: 240,
  ml: 1,
  L: 1000,
};

export const COST_BASIS_G: Partial<Record<AllowedUnit, number>> = {
  g: 1,
  kg: 1000,
};
