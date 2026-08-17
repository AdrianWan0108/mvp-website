// scripts/gen-logo-shapes.mjs
// Splits the MVP logo into one positive mask PNG per connected shape, plus a
// full-logo mask, all cropped to a shared canvas so they register perfectly.
// Also prints metadata (aspect ratio + hover-column edges) for the component.
//
// Run from the project root:  node scripts/gen-logo-shapes.mjs

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "assets-src/photos/polestar-logo/MVP LOGO 001.png";
const OUT_DIR = "assets-src/photos/polestar-logo/shapes";
const ALPHA_T = 40; // a pixel is "ink" if alpha > this
const MIN_AREA_FRAC = 0.002; // ignore specks smaller than 0.2% of canvas
const PAD = 12; // px padding around the union bounding box

fs.mkdirSync(OUT_DIR, { recursive: true });

const img = sharp(SRC).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// --- connected-component labeling (8-neighbour, iterative) ---
const ink = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) ink[i] = data[i * C + 3] > ALPHA_T ? 1 : 0;

const label = new Int32Array(W * H).fill(-1);
const comps = [];
const stack = [];
let cur = 0;
for (let start = 0; start < W * H; start++) {
  if (!ink[start] || label[start] >= 0) continue;
  stack.length = 0;
  stack.push(start);
  label[start] = cur;
  let area = 0,
    minx = W,
    maxx = 0,
    miny = H,
    maxy = 0;
  while (stack.length) {
    const p = stack.pop();
    const x = p % W;
    const y = (p / W) | 0;
    area++;
    if (x < minx) minx = x;
    if (x > maxx) maxx = x;
    if (y < miny) miny = y;
    if (y > maxy) maxy = y;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = x + dx,
          ny = y + dy;
        if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
        const q = ny * W + nx;
        if (ink[q] && label[q] < 0) {
          label[q] = cur;
          stack.push(q);
        }
      }
    }
  }
  comps.push({ id: cur, area, box: [minx, miny, maxx, maxy] });
  cur++;
}

// keep meaningful shapes, order left -> right by center x
const big = comps
  .filter((k) => k.area > W * H * MIN_AREA_FRAC)
  .sort((a, b) => (a.box[0] + a.box[2]) / 2 - (b.box[0] + b.box[2]) / 2);

console.log(`Found ${big.length} shapes (of ${comps.length} components).`);

// shared union bounding box (+ padding, clamped)
let ux0 = W,
  uy0 = H,
  ux1 = 0,
  uy1 = 0;
for (const k of big) {
  ux0 = Math.min(ux0, k.box[0]);
  uy0 = Math.min(uy0, k.box[1]);
  ux1 = Math.max(ux1, k.box[2]);
  uy1 = Math.max(uy1, k.box[3]);
}
ux0 = Math.max(0, ux0 - PAD);
uy0 = Math.max(0, uy0 - PAD);
ux1 = Math.min(W - 1, ux1 + PAD);
uy1 = Math.min(H - 1, uy1 + PAD);
const cropX = ux0,
  cropY = uy0,
  cropW = ux1 - ux0 + 1,
  cropH = uy1 - uy0 + 1;

// helper: write a mask containing only the given set of component ids, cropped
async function writeMask(ids, file) {
  const buf = Buffer.alloc(cropW * cropH * 4); // zeroed => transparent
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const sp = (cropY + y) * W + (cropX + x);
      if (ids.has(label[sp])) {
        const o = (y * cropW + x) * 4;
        buf[o] = 255;
        buf[o + 1] = 255;
        buf[o + 2] = 255;
        buf[o + 3] = data[sp * C + 3]; // keep original (anti-aliased) alpha
      }
    }
  }
  await sharp(buf, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png()
    .toFile(path.join(OUT_DIR, file));
}

// per-shape masks + full mask
const meta = { aspect: +(cropW / cropH).toFixed(4), shapes: [] };
for (let i = 0; i < big.length; i++) {
  await writeMask(new Set([big[i].id]), `shape-${i + 1}.png`);
  const cx = (big[i].box[0] + big[i].box[2]) / 2;
  meta.shapes.push({ centerPct: +(((cx - cropX) / cropW) * 100).toFixed(2) });
}
await writeMask(new Set(big.map((k) => k.id)), "logo-full.png");

// hover-column edges: midpoints between adjacent shape centers (% of crop width)
const centers = meta.shapes.map((s) => s.centerPct);
meta.columnEdges = centers.map((c, i) => {
  const left = i === 0 ? 0 : (centers[i - 1] + c) / 2;
  const right = i === centers.length - 1 ? 100 : (c + centers[i + 1]) / 2;
  return { left: +left.toFixed(2), width: +(right - left).toFixed(2) };
});

fs.writeFileSync(path.join(OUT_DIR, "shapes.json"), JSON.stringify(meta, null, 2));

console.log(`Crop ${cropW}x${cropH}  aspect ${meta.aspect}`);
console.log("Wrote:", fs.readdirSync(OUT_DIR).join(", "));
console.log(JSON.stringify(meta, null, 2));
