// Philippine grocery/wet-market price estimates (PHP) used by the Cost
// Calculator stage. These are estimates, not sourced from a live price feed
// — consistent with the pipeline's "Estimated Cost" requirement.
//
// Three pricing bases:
//   - "weight": ratePerGram, priced in PHP per gram (display cost = per kg)
//   - "volume": ratePerMl, priced in PHP per milliliter (display cost = per liter)
//   - "count":  ratePerUnit, priced in PHP per the ingredient's countUnit
//
// `overrides` lets a line written in a different unit still be costed, by
// giving the count/weight-equivalent of one raw unit (e.g. Garlic priced per
// clove, but some recipes measure it in tsp/tbsp of minced garlic).

import { AllowedUnit, COST_BASIS_G, COST_BASIS_ML } from "./units";

export type PricingEntry =
  | { basis: "weight"; ratePerGram: number; overrides?: Partial<Record<AllowedUnit, number>> }
  | { basis: "volume"; ratePerMl: number; overrides?: Partial<Record<AllowedUnit, number>> }
  | { basis: "count"; countUnit: AllowedUnit; ratePerUnit: number; overrides?: Partial<Record<AllowedUnit, number>> };

export const PRICING: Record<string, PricingEntry> = {
  "Chicken": { basis: "weight", ratePerGram: 0.18 },
  "Pig Liver": { basis: "weight", ratePerGram: 0.22 },
  "Pork": { basis: "weight", ratePerGram: 0.28 },
  "Pork Belly": { basis: "weight", ratePerGram: 0.32 },
  "Beef Short Ribs": { basis: "weight", ratePerGram: 0.38 },
  "Beef Sirloin": { basis: "weight", ratePerGram: 0.42 },
  "Oxtail": { basis: "weight", ratePerGram: 0.35 },
  "Lechon Kawali": { basis: "weight", ratePerGram: 0.3 },
  "Pig Face": { basis: "weight", ratePerGram: 0.15 },
  "Chicken Liver": { basis: "weight", ratePerGram: 0.14 },
  "Spaghetti Noodles": { basis: "weight", ratePerGram: 0.09 },
  "Ground Pork": { basis: "weight", ratePerGram: 0.26 },
  "Luncheon Meat": { basis: "weight", ratePerGram: 0.26 },
  "Pancit Canton Noodles": { basis: "weight", ratePerGram: 0.12 },
  "Kalabasa": { basis: "weight", ratePerGram: 0.04, overrides: { pcs: 1500, cup: 150 } },

  "Soy Sauce": { basis: "volume", ratePerMl: 0.09 },
  "Vinegar": { basis: "volume", ratePerMl: 0.05 },
  "Cooking Oil": { basis: "volume", ratePerMl: 0.11 },
  "Water": { basis: "volume", ratePerMl: 0 },
  "Rice Wash": { basis: "volume", ratePerMl: 0 },
  "Fish Sauce": { basis: "volume", ratePerMl: 0.17 },
  "Malunggay Leaves": { basis: "volume", ratePerMl: 0.02 },
  "Hot Pepper Leaves": { basis: "volume", ratePerMl: 0.02 },
  "Shrimp Paste": { basis: "volume", ratePerMl: 0.35 },
  "Coconut Milk": { basis: "volume", ratePerMl: 0.15 },
  "Coconut Cream": { basis: "volume", ratePerMl: 0.17 },
  "Red Wine": { basis: "volume", ratePerMl: 0.2 },
  "Manzanilla Olives": { basis: "volume", ratePerMl: 0.3 },
  "Liver Spread": { basis: "volume", ratePerMl: 0.3 },
  "Ground Peanuts": { basis: "volume", ratePerMl: 0.12 },
  "Peanut Butter": { basis: "volume", ratePerMl: 0.2 },
  "Annatto Seeds": { basis: "volume", ratePerMl: 0.05 },
  "Toasted Ground Rice": { basis: "volume", ratePerMl: 0.04 },
  "Chicharon": { basis: "volume", ratePerMl: 0.17 },
  "Liquid Seasoning": { basis: "volume", ratePerMl: 0.25 },
  "Mayonnaise": { basis: "volume", ratePerMl: 0.19 },
  "Butter": { basis: "volume", ratePerMl: 0.3 },
  "Beef Broth": { basis: "volume", ratePerMl: 0.08 },
  "Chicken Broth": { basis: "volume", ratePerMl: 0.08 },
  "Parsley": { basis: "volume", ratePerMl: 0.02 },
  "Oyster Sauce": { basis: "volume", ratePerMl: 0.2 },
  "Cheddar Cheese": { basis: "volume", ratePerMl: 0.35 },
  "Onion Powder": { basis: "volume", ratePerMl: 0.1 },
  "Chili Flakes": { basis: "volume", ratePerMl: 0.1 },
  "Ground Black Pepper": { basis: "volume", ratePerMl: 0.2 },
  "Peppercorns": { basis: "volume", ratePerMl: 0.2 },
  "Sugar": { basis: "volume", ratePerMl: 0.02 },
  "Salt": { basis: "volume", ratePerMl: 0.01 },

  "Garlic": { basis: "count", countUnit: "clove", ratePerUnit: 2, overrides: { tsp: 1, tbsp: 3 } },
  "Potatoes": { basis: "count", countUnit: "pcs", ratePerUnit: 12, overrides: { cup: 1 } },
  "Carrot": { basis: "count", countUnit: "pcs", ratePerUnit: 8, overrides: { cup: 1 } },
  "Tomato Sauce": { basis: "count", countUnit: "can", ratePerUnit: 25, overrides: { cup: 1 } },

  "Bay Leaves": { basis: "count", countUnit: "pcs", ratePerUnit: 1 },
  "Onion": { basis: "count", countUnit: "pcs", ratePerUnit: 8 },
  "Ginger": { basis: "count", countUnit: "pcs", ratePerUnit: 3 },
  "Green Papaya": { basis: "count", countUnit: "pcs", ratePerUnit: 25 },
  "Hotdogs": { basis: "count", countUnit: "pcs", ratePerUnit: 8 },
  "Lemon": { basis: "count", countUnit: "pcs", ratePerUnit: 8 },
  "Bell Pepper": { basis: "count", countUnit: "pcs", ratePerUnit: 15 },
  "Thyme": { basis: "count", countUnit: "pcs", ratePerUnit: 2 },
  "Sitaw": { basis: "count", countUnit: "pcs", ratePerUnit: 3 },
  "Okra": { basis: "count", countUnit: "pcs", ratePerUnit: 2 },
  "Eggplant": { basis: "count", countUnit: "pcs", ratePerUnit: 10 },
  "Ampalaya": { basis: "count", countUnit: "pcs", ratePerUnit: 15 },
  "Kamote": { basis: "count", countUnit: "pcs", ratePerUnit: 15 },
  "Tomatoes": { basis: "count", countUnit: "pcs", ratePerUnit: 8 },
  "Thai Chili Pepper": { basis: "count", countUnit: "pcs", ratePerUnit: 1 },
  "Serrano Pepper": { basis: "count", countUnit: "pcs", ratePerUnit: 2 },
  "Banana Flower Bud": { basis: "count", countUnit: "pcs", ratePerUnit: 20 },
  "Star Anise": { basis: "count", countUnit: "pcs", ratePerUnit: 2 },
  "Celery": { basis: "count", countUnit: "pcs", ratePerUnit: 5 },
  "Saba Banana": { basis: "count", countUnit: "pcs", ratePerUnit: 6 },
  "Cabbage": { basis: "count", countUnit: "pcs", ratePerUnit: 40 },
  "Chinese Sausage": { basis: "count", countUnit: "pcs", ratePerUnit: 15 },
  "Shrimp": { basis: "count", countUnit: "pcs", ratePerUnit: 8, overrides: { kg: 65 } },
  "Snap Peas": { basis: "count", countUnit: "pcs", ratePerUnit: 1 },
  "Pechay": { basis: "count", countUnit: "bundle", ratePerUnit: 20 },
  "String Beans": { basis: "count", countUnit: "bundle", ratePerUnit: 20, overrides: { pcs: 1 } },
  "Bok Choy": { basis: "count", countUnit: "bundle", ratePerUnit: 25 },
  "Spaghetti Sauce": { basis: "count", countUnit: "pack", ratePerUnit: 90 },

  "Milkfish": { basis: "count", countUnit: "pcs", ratePerUnit: 130 },
  "Eggs": { basis: "count", countUnit: "pcs", ratePerUnit: 8 },
  "Calamansi": { basis: "count", countUnit: "pcs", ratePerUnit: 1 },
  "Daikon Radish": { basis: "count", countUnit: "pcs", ratePerUnit: 15 },
  "Long Green Chili": { basis: "count", countUnit: "pcs", ratePerUnit: 1 },
  "Cauliflower": { basis: "count", countUnit: "pcs", ratePerUnit: 60 },
  "Spring Roll Wrapper": { basis: "count", countUnit: "pcs", ratePerUnit: 2 },
  "Kangkong": { basis: "count", countUnit: "bundle", ratePerUnit: 15 },
  "Taro Leaves": { basis: "count", countUnit: "bundle", ratePerUnit: 45 },
  "Tamarind Soup Mix": { basis: "count", countUnit: "pack", ratePerUnit: 12 },

  "Rice Noodles": { basis: "weight", ratePerGram: 0.13 },
  "Mung Beans": { basis: "weight", ratePerGram: 0.1, overrides: { cup: 200 } },

  "Flour": { basis: "volume", ratePerMl: 0.025 },
  "Banana Ketchup": { basis: "volume", ratePerMl: 0.08 },
  "Brown Sugar": { basis: "volume", ratePerMl: 0.03 },
  "Cornstarch": { basis: "volume", ratePerMl: 0.03 },
};

// Shared cost calculation for one ingredient line (quantity + unit). Used by
// both scripts/generate-costs.ts (seed-time recipe cost rollup) and the
// app's Grocery List (lib/grocery-list.ts, runtime per-ingredient cost
// estimate) — kept here as the single source of truth rather than
// duplicated, per CLAUDE.md's "never duplicate business logic."
export function lineCost(name: string, quantity: number, unit: AllowedUnit): number {
  const pricing = PRICING[name];
  if (!pricing) {
    throw new Error(`No pricing entry for ingredient "${name}"`);
  }

  if (pricing.basis === "weight") {
    if (unit in COST_BASIS_G) {
      return quantity * COST_BASIS_G[unit]! * pricing.ratePerGram;
    }
    const gramsPerUnit = pricing.overrides?.[unit];
    if (gramsPerUnit !== undefined) {
      return quantity * gramsPerUnit * pricing.ratePerGram;
    }
    throw new Error(`No weight conversion for unit "${unit}" on ingredient "${name}"`);
  }

  if (pricing.basis === "volume") {
    if (unit in COST_BASIS_ML) {
      return quantity * COST_BASIS_ML[unit]! * pricing.ratePerMl;
    }
    throw new Error(`No volume conversion for unit "${unit}" on ingredient "${name}"`);
  }

  // count basis
  if (unit === pricing.countUnit) {
    return quantity * pricing.ratePerUnit;
  }
  const countEquivalent = pricing.overrides?.[unit];
  if (countEquivalent !== undefined) {
    return quantity * countEquivalent * pricing.ratePerUnit;
  }
  throw new Error(`No count conversion for unit "${unit}" on ingredient "${name}"`);
}
