// scripts/reverse-logo.mjs
// Inverts MVP LOGO 001.png into a knockout stencil:
//   logo shapes     -> fully transparent (holes)
//   everything else -> opaque white (#FFFFFF)
// Output alpha = 255 - sourceAlpha, so edges stay anti-aliased.
//
// Run from the project root:  node scripts/reverse-logo.mjs

import sharp from "sharp";
import path from "node:path";

const SRC = "assets-src/photos/polestar-logo/MVP LOGO 001.png";
const OUT = "assets-src/photos/polestar-logo/MVP LOGO 001 - stencil.png";

const FILL = { r: 255, g: 255, b: 255 }; // opaque area color (change if you want)

const img = sharp(SRC).ensureAlpha();
const { width, height } = await img.metadata();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { channels } = info; // 4 (RGBA)

const out = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  const srcAlpha = data[i * channels + 3];
  out[i * 4 + 0] = FILL.r;
  out[i * 4 + 1] = FILL.g;
  out[i * 4 + 2] = FILL.b;
  out[i * 4 + 3] = 255 - srcAlpha; // invert: shape -> 0 (hole), bg -> 255 (opaque)
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(OUT);

console.log(`Wrote ${path.resolve(OUT)} (${width}x${height})`);
