// Crops individual ingredient thumbnails out of the contact sheets in
// thumbnails/ into public/images/ingredients/.
//
//   npx tsx scripts/extract-ingredient-images.ts --sheet vegetables --dry-run
//   npx tsx scripts/extract-ingredient-images.ts --sheet vegetables
//
// Grid geometry is measured, not hand-coded: the sheets disagree on column
// count, row count, card tint, and whether they carry mid-sheet section
// headers, so a fixed grid silently produces half-cropped images. Instead:
//
//   1. row-profile the sheet to find bands of content;
//   2. keep the tall bands (a cell row = illustration, sometimes with its
//      caption merged in) and discard short ones (titles, section headers,
//      caption-only strips);
//   3. column-profile *within those rows only*, so full-width header bars
//      and long captions can't bridge the gutters between columns;
//   4. per cell, row-profile again and keep just the illustration band,
//      which drops the caption without needing a hardcoded caption height.
//
// --dry-run writes a QA contact sheet of the crops instead of the crops
// themselves. Always eyeball it before committing a sheet's output.

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { SHEETS, type SheetConfig } from "./thumbnail-sheets.config";

const OUT_DIR = path.join("public", "images", "ingredients");
const QA_DIR = path.join("scripts", "qa");
const BACKGROUND_MIN = 236;
const CELL_ROW_MIN_HEIGHT = 55;
// Captions sit in the bottom slice of a cell row; a band starting past this
// fraction of the row's height is treated as caption, not illustration.
const CAPTION_BAND_START = 0.72;
const OUTPUT_SIZE = 256;

interface Band {
  start: number;
  end: number;
}

function bands(density: number[], threshold: number, minLength: number): Band[] {
  const out: Band[] = [];
  let start: number | null = null;
  for (let i = 0; i < density.length; i++) {
    const isContent = density[i] > threshold;
    if (isContent && start === null) start = i;
    if (!isContent && start !== null) {
      out.push({ start, end: i - 1 });
      start = null;
    }
  }
  if (start !== null) out.push({ start, end: density.length - 1 });
  return out.filter((b) => b.end - b.start + 1 >= minLength);
}

interface Grey {
  data: Buffer;
  width: number;
  height: number;
  channels: number;
}

function at(g: Grey, x: number, y: number): number {
  return g.data[(y * g.width + x) * g.channels];
}

function rowDensity(g: Grey, region: { x0: number; x1: number; y0: number; y1: number }): number[] {
  const out: number[] = [];
  for (let y = region.y0; y <= region.y1; y++) {
    let count = 0;
    for (let x = region.x0; x <= region.x1; x++) if (at(g, x, y) < BACKGROUND_MIN) count++;
    out.push(count);
  }
  return out;
}

// Per-cell row profile measured against the cell's OWN background rather
// than a global threshold. Cards are tinted differently per sheet and pale
// subjects (a white bowl on a cream card) sit within a few levels of their
// backdrop, so a fixed cutoff either misses the subject entirely or fuses it
// with the caption beneath.
function localRowDensity(
  g: Grey,
  region: { x0: number; x1: number; y0: number; y1: number },
  delta: number
): number[] {
  const histogram = new Array(256).fill(0);
  for (let y = region.y0; y <= region.y1; y++) {
    for (let x = region.x0; x <= region.x1; x++) histogram[at(g, x, y)]++;
  }
  let background = 0;
  for (let v = 1; v < 256; v++) if (histogram[v] > histogram[background]) background = v;

  const out: number[] = [];
  for (let y = region.y0; y <= region.y1; y++) {
    let count = 0;
    for (let x = region.x0; x <= region.x1; x++) {
      if (Math.abs(at(g, x, y) - background) > delta) count++;
    }
    out.push(count);
  }
  return out;
}

function colDensity(g: Grey, rows: Band[]): number[] {
  const out = new Array(g.width).fill(0);
  for (const row of rows) {
    for (let y = row.start; y <= row.end; y++) {
      for (let x = 0; x < g.width; x++) if (at(g, x, y) < BACKGROUND_MIN) out[x]++;
    }
  }
  return out;
}

async function loadGrey(file: string): Promise<Grey> {
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

export interface Cell {
  left: number;
  top: number;
  width: number;
  height: number;
  row: number;
  col: number;
}

export async function detectCells(file: string, captionFraction?: number): Promise<Cell[]> {
  const g = await loadGrey(file);

  const fullRows = rowDensity(g, { x0: 0, x1: g.width - 1, y0: 0, y1: g.height - 1 });
  const cellRows = bands(fullRows, g.width * 0.004, CELL_ROW_MIN_HEIGHT).map((b) => ({
    start: b.start,
    end: b.end,
  }));

  const cols = bands(colDensity(g, cellRows), 4, 40);

  const cells: Cell[] = [];
  for (let r = 0; r < cellRows.length; r++) {
    const row = cellRows[r];
    const rowHeightFull = row.end - row.start + 1;

    for (let c = 0; c < cols.length; c++) {
      const col = cols[c];

      if (captionFraction) {
        cells.push({
          left: col.start,
          top: row.start,
          width: col.end - col.start + 1,
          height: Math.round(rowHeightFull * (1 - captionFraction)),
          row: r,
          col: c,
        });
        continue;
      }

      // Re-profile this single cell so the caption (a short band beneath the
      // illustration) can be dropped precisely rather than by a fixed offset.
      // Profile the cell's interior only. On tinted-card sheets the card's
      // rounded border runs vertically through every row — including the gap
      // between illustration and caption — which would otherwise bridge them
      // into one band and leave the caption baked into the crop.
      const cellWidth = col.end - col.start + 1;
      const inset = Math.round(cellWidth * 0.12);
      const inner = localRowDensity(
        g,
        { x0: col.start + inset, x1: col.end - inset, y0: row.start, y1: row.end },
        6
      );
      const innerBands = bands(inner, Math.max(2, (cellWidth - 2 * inset) * 0.04), 4);
      if (innerBands.length === 0) continue;

      // Discriminate the caption by POSITION, not height: these sheets always
      // put the illustration on top and the caption beneath it, and a
      // two-line caption is taller than a short pale illustration, so a
      // height rule picks the wrong band. A pale illustration can also split
      // into several bands, so span everything that starts above the cutoff.
      const rowHeight = row.end - row.start + 1;
      const captionCutoff = rowHeight * CAPTION_BAND_START;
      const illustration = innerBands.filter((b) => b.start < captionCutoff);
      const kept = illustration.length > 0 ? illustration : innerBands;
      const top = kept[0].start;
      const bottom = kept[kept.length - 1].end;

      cells.push({
        left: col.start,
        top: row.start + top,
        width: col.end - col.start + 1,
        height: bottom - top + 1,
        row: r,
        col: c,
      });
    }
  }

  // Clamp to the canvas — a band can round past the edge, and sharp rejects
  // an out-of-bounds extract outright rather than cropping to fit.
  return cells
    .map((cell) => {
      const left = Math.max(0, Math.min(cell.left, g.width - 1));
      const top = Math.max(0, Math.min(cell.top, g.height - 1));
      return {
        ...cell,
        left,
        top,
        width: Math.max(1, Math.min(cell.width, g.width - left)),
        height: Math.max(1, Math.min(cell.height, g.height - top)),
      };
    })
    .filter((cell) => cell.width > 8 && cell.height > 8);
}

function slugify(label: string): string {
  return label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[()/]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function processSheet(sheet: SheetConfig, dryRun: boolean) {
  const file = path.join("thumbnails", sheet.file);
  const cells = await detectCells(file, sheet.captionFraction);

  console.log(`\n${sheet.file}`);
  console.log(`  detected ${cells.length} cells, config lists ${sheet.labels.length} labels`);
  if (cells.length !== sheet.labels.length) {
    console.log(`  ⚠ COUNT MISMATCH — labels are positional, so fix this before a real run.`);
  }

  if (dryRun) {
    fs.mkdirSync(QA_DIR, { recursive: true });
    const cols = Math.max(...cells.map((c) => c.col)) + 1;
    const thumb = 120;
    const composites = await Promise.all(
      cells.map(async (cell) => ({
        input: await sharp(file)
          .extract({ left: cell.left, top: cell.top, width: cell.width, height: cell.height })
          .resize(thumb, thumb, { fit: "contain", background: "#ffffff" })
          .png()
          .toBuffer(),
        left: cell.col * thumb,
        top: cell.row * thumb,
      }))
    );
    const rows = Math.max(...cells.map((c) => c.row)) + 1;
    const qaPath = path.join(QA_DIR, `${slugify(sheet.file)}-qa.png`);
    await sharp({
      create: {
        width: cols * thumb,
        height: rows * thumb,
        channels: 3,
        background: "#ffffff",
      },
    })
      .composite(composites)
      .png()
      .toFile(qaPath);
    console.log(`  QA sheet → ${qaPath}`);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let written = 0;
  for (let i = 0; i < cells.length; i++) {
    const label = sheet.labels[i];
    if (!label) continue; // "" marks an empty/ignored cell
    const cell = cells[i];
    const out = path.join(OUT_DIR, `${slugify(label)}.webp`);
    const region = { left: cell.left, top: cell.top, width: cell.width, height: cell.height };

    const render = (trim: boolean) => {
      const pipeline = sharp(file).extract(region);
      // trim() tightens the margin, but sharp throws "bad extract area" when
      // a crop is near-uniform and nothing survives the trim — fall back to
      // the untrimmed crop rather than losing the image.
      return (trim ? pipeline.trim({ threshold: 12 }) : pipeline)
        .resize(OUTPUT_SIZE, OUTPUT_SIZE, { fit: "contain", background: "#ffffff" })
        .webp({ quality: 82 })
        .toFile(out);
    };

    try {
      await render(true);
    } catch {
      await render(false);
    }
    written++;
  }
  console.log(`  wrote ${written} images → ${OUT_DIR}`);
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const sheetArg = process.argv.indexOf("--sheet");
  const only = sheetArg !== -1 ? process.argv[sheetArg + 1] : null;

  const targets = only ? SHEETS.filter((s) => s.file.includes(only)) : SHEETS;
  if (targets.length === 0) throw new Error(`No sheet matching "${only}"`);

  for (const sheet of targets) await processSheet(sheet, dryRun);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
