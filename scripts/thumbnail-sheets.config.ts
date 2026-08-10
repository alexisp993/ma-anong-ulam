// Source contact sheets in thumbnails/, with their captions transcribed by
// hand in reading order (left-to-right, top-to-bottom).
//
// Labels are POSITIONAL: labels[i] names the i-th detected cell. The grid
// itself is measured at runtime by extract-ingredient-images.ts, so only the
// text lives here. Run the extractor with --dry-run first; it reports the
// detected cell count and flags any mismatch against labels.length.
//
// Use "" for a cell that should be skipped. Sheets with `labels: []` are not
// transcribed yet and are skipped by a real run.

export interface SheetConfig {
  file: string;
  labels: string[];
  // Fraction of each cell row to trim off the bottom, for sheets where the
  // caption can't be split off automatically — soft drop-shadows under the
  // subject bridge the gap to the caption, fusing them into one band. Leave
  // unset to let the extractor detect the illustration band itself.
  captionFraction?: number;
}

export const SHEETS: SheetConfig[] = [
  {
    file: "vegetables_thumbnail.png",
    labels: [
      // row 1
      "Ampalaya", "Baguio Beans", "Bataw", "Bok Choy", "Broccoli",
      "Cabbage", "Carrots", "Cauliflower", "Celery", "Cucumber",
      // row 2
      "Eggplant", "Gabi", "Green Beans", "Kangkong", "Lettuce",
      "Mustasa", "Okra", "Onion Leeks", "Pechay", "Radish",
      // row 3
      "Sitaw", "Snow Peas", "Spinach", "Talong (Long)", "Tomato",
      "Upo", "Sayote", "Patola", "Kalabasa", "Kamote",
      // row 4
      "Sweet Corn", "Alugbati", "Atsal / Pechay Baguio", "Bayabas Tops", "Bulaklak ng Kalabasa",
      "Dahon ng Kamote", "Dahon ng Malunggay", "Dahon ng Sili", "Kale", "Labanos (Dahon)",
      // row 5
      "Luy-a", "Ogpos", "Pako", "Pechay Tagalog", "Siling Haba",
      "Siling Labuyo", "Ulasimang Bato", "Ube Leaves", "Dilanghapa", "Talbos ng Kamote",
      // row 6
      "Kamias", "Katuray", "Kundol", "Luffa", "Monggo Sprouts",
      "Mustasa (Buong Dahon)", "Narra Leaves", "Puso ng Saging", "Romaine Lettuce", "Rucola",
    ],
  },
  {
    file: "dairy_and_eggs_thumbnail.png",
    captionFraction: 0.24,
    labels: [
      // row 1
      "Milk", "Evaporated Milk", "Condensed Milk", "All Purpose Cream",
      "Heavy Cream", "Cooking Cream", "Powdered Milk", "Butter (Unsalted)",
      // row 2
      "Butter (Salted)", "Margarine", "Cream Cheese", "Sour Cream",
      "Cottage Cheese", "Cheddar Cheese (Grated)", "Parmesan Cheese", "Mozzarella Cheese (Grated)",
      // row 3
      "Quickmelt Cheese", "Cheddar Cheese (Slices)", "Mozzarella Cheese (Slices)", "Ghee",
      "Buttermilk", "Whey", "Yogurt", "Kefir",
      // row 4
      "Whole Egg", "Egg Yolk", "Egg White", "Beaten Egg",
      "Dried Egg Powder", "Liquid Whole Egg", "Salted Egg", "Duck Egg",
    ],
  },
  // Not yet transcribed — run `--dry-run` to get each sheet's cell count,
  // then fill labels in reading order.
  { file: "fruits_thumbnail.png", labels: [] },
  { file: "herbs_spices_aromatics thumbnail.png", labels: [] },
  { file: "meat_poultry_seafood_thumbnail.png", labels: [] },
  { file: "oil_fat_baking_ingredients_thumbnail.png", labels: [] },
  { file: "seasonings_and_condiments_thumbnail.png", labels: [] },
  { file: "staples_and_grains_thumbnail.png", labels: [] },
  { file: "tofu_beans_and_legumes_thumbnail.png", labels: [] },
  // Skipped: "meat_poultry_seafood_thumbnail (2).png" is a near-duplicate of
  // meat_poultry_seafood_thumbnail.png. Don't re-add it.
];
