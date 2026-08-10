// Diagnostic helper for authoring scripts/thumbnail-sheets.config.ts.
// Projection-profiles a contact sheet to find the whitespace gutters between
// cells, so grid coordinates are measured rather than guessed.
//
//   npx tsx scripts/analyze-sheet-grid.ts "thumbnails/vegetables_thumbnail.png"

import sharp from "sharp";

const BACKGROUND_MIN = 236; // >= this grey is treated as page/card background
const MIN_GAP = 6; // ignore hairline gaps inside a single illustration

interface Band {
  start: number;
  end: number;
}

function bandsOfContent(density: number[], threshold: number): Band[] {
  const bands: Band[] = [];
  let start: number | null = null;
  for (let i = 0; i < density.length; i++) {
    const isContent = density[i] > threshold;
    if (isContent && start === null) start = i;
    if (!isContent && start !== null) {
      bands.push({ start, end: i - 1 });
      start = null;
    }
  }
  if (start !== null) bands.push({ start, end: density.length - 1 });
  return bands.filter((b) => b.end - b.start >= MIN_GAP);
}

async function main() {
  const file = process.argv[2];
  if (!file) throw new Error("Usage: tsx scripts/analyze-sheet-grid.ts <sheet.png>");

  const { data, info } = await sharp(file)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const colDensity = new Array(width).fill(0);
  const rowDensity = new Array(height).fill(0);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = data[(y * width + x) * channels];
      if (value < BACKGROUND_MIN) {
        colDensity[x]++;
        rowDensity[y]++;
      }
    }
  }

  const rowBands = bandsOfContent(rowDensity, height * 0.004);
  const colBands = bandsOfContent(colDensity, width * 0.004);

  console.log(`${file}  ${width}x${height}`);
  console.log(`\nROW bands (${rowBands.length}) — headers are the short ones:`);
  for (const b of rowBands) {
    console.log(`  top ${String(b.start).padStart(4)}  height ${String(b.end - b.start + 1).padStart(4)}`);
  }
  console.log(`\nCOLUMN bands (${colBands.length}):`);
  for (const b of colBands) {
    console.log(`  left ${String(b.start).padStart(4)}  width ${String(b.end - b.start + 1).padStart(4)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
