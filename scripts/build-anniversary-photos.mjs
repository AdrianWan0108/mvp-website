// scripts/build-anniversary-photos.mjs
// Builds every image the /anniversary page serves from the originals in
// assets-src/photos/mvp-anniversary (camera frames, host headshots pulled from
// the clinics' sites, and clinic-logo screenshots).
//
// next.config.ts sets `images.unoptimized: true` for the static export, so a
// file ships at its authored size — the six camera frames alone are 33MB.
// Everything here is cut to its largest rendered size instead:
//
//   hero-*    900x1350  diagonal slices in the page hero. A slice is at most
//                       ~520px wide by 520px tall, so 900 covers ~1.75x DPR.
//   offers-*  1600x1067 half-width photo beside the offers list.
//   social-*  1200x630  link-preview card. JPEG, not webp: some chat apps
//                       still refuse webp for Open Graph images.
//   host-*    320x320   round avatars, rendered at 64px (covers 3x DPR with
//   coach-*             room for a larger treatment later).
//   logo-*    native    clinic logos. The sources are small screenshots, so
//                       they are cleaned up (background lifted to pure white,
//                       margins trimmed) and never upscaled.
//
// Sources are matched by a unique fragment of the filename rather than the
// full name: the macOS screenshot names contain a narrow no-break space
// (U+202F) before "PM" that is easy to lose when retyping.
//
// Re-runnable — outputs are overwritten and stale ones pruned. Keep the output
// names in sync with the "Anniversary" block in app/lib/images.ts.
//
// Run from the project root:  node scripts/build-anniversary-photos.mjs

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = "assets-src/photos/mvp-anniversary";
const OUT_DIR = "public/assets/mvp-anniversary";

const sourceFiles = fs.readdirSync(SRC_DIR);

/** Resolve a source by a fragment that must match exactly one file. */
function source(fragment) {
  const matches = sourceFiles.filter((name) => name.includes(fragment));
  if (matches.length !== 1) {
    throw new Error(`"${fragment}" matched ${matches.length} files in ${SRC_DIR}`);
  }
  return path.join(SRC_DIR, matches[0]);
}

// --- Hero slices: full portrait frame, downscaled. ---
const HERO = [
  { from: "_005646", to: "hero-barrel-session.webp" },
  { from: "IMG_5199", to: "hero-community-talk.webp" },
  { from: "IMG_3745", to: "hero-mat-class.webp" },
  { from: "_004115", to: "hero-barrel-hands-on.webp" },
  { from: "_001631", to: "hero-spine-model.webp" },
];

// --- Host avatars: square crop boxes in source pixels, sized so each head
// fills about the same share of the circle. ---
const HOSTS = [
  { from: "Tony-Fu", to: "host-tony-fu.webp", left: 720, top: 110, size: 420 },
  { from: "Matthew-Johnston", to: "host-matthew-johnston.webp", left: 730, top: 95, size: 420 },
  { from: "Jessica", to: "host-jessica-tsang.webp", left: 155, top: 25, size: 460 },
  { from: "julianna", to: "host-julianna-chan.webp", left: 45, top: 60, size: 600 },
  { from: "Lianne", to: "host-lianne-chan.webp", left: 5, top: 15, size: 315 },
];

// --- Clinic logos: `bg` is the screenshot's background grey, lifted to white
// so the logo sits seamlessly on the page. ---
const LOGOS = [
  { from: "5.48.32", to: "logo-cornerstone-physiotherapy.webp", bg: 255 },
  { from: "5.49.18", to: "logo-family-physiotherapy.webp", bg: 246 },
  { from: "5.49.51", to: "logo-first-markham-physiotherapy.webp", bg: 247 },
  { from: "5.51.09", to: "logo-striowski-associates-physiotherapy.webp", bg: 255 },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

const written = new Set();
let total = 0;

async function report(to, pipeline) {
  if (written.has(to)) throw new Error(`duplicate output filename: ${to}`);
  written.add(to);
  const dest = path.join(OUT_DIR, to);
  const { width, height } = await pipeline.toFile(dest);
  const kb = Math.round(fs.statSync(dest).size / 1024);
  total += kb;
  console.log(`${String(kb + " KB").padStart(7)}  ${String(width + "x" + height).padEnd(9)}  ${to}`);
}

for (const { from, to } of HERO) {
  await report(
    to,
    sharp(source(from))
      .rotate() // the camera frames are stored sideways with an EXIF flag
      .resize({ width: 900, height: 1350, fit: "cover" })
      .webp({ quality: 76 }),
  );
}

await report(
  "offers-reformer-studio.webp",
  sharp(source("_005795"))
    .rotate()
    .resize({ width: 1600, height: 1067, fit: "cover" })
    .webp({ quality: 76 }),
);

// Landscape band through the middle of the portrait mat-class frame: the row
// of raised arms, which survives the square-ish crops some apps apply.
await report(
  "social-share.jpg",
  sharp(await sharp(source("IMG_3745")).rotate().toBuffer())
    .extract({ left: 0, top: 1350, width: 4000, height: 2100 })
    .resize({ width: 1200, height: 630 })
    .jpeg({ quality: 82, mozjpeg: true }),
);

// Gary leads the movement session after every talk. His avatar is cut from the
// team headshot the site already ships, so the page doesn't download that
// 1141x1600 portrait to fill a 48px circle.
const AVATARS = [
  ...HOSTS.map((host) => ({ ...host, file: source(host.from) })),
  { file: "public/assets/team/gary-headshot.webp", to: "coach-gary-fok.webp", left: 215, top: 215, size: 760 },
];

for (const { file, to, left, top, size } of AVATARS) {
  await report(
    to,
    sharp(file)
      .extract({ left, top, width: size, height: size })
      .resize({ width: 320, height: 320, withoutEnlargement: true })
      .webp({ quality: 82 }),
  );
}

for (const { from, to, bg } of LOGOS) {
  // Flatten the (opaque) alpha channel, scale so the background grey lands on
  // 255, then trim the now-white margins.
  const cleaned = await sharp(source(from))
    .flatten({ background: "#ffffff" })
    .linear(255 / bg, 0)
    .toBuffer();
  await report(
    to,
    sharp(cleaned).trim({ background: "#ffffff", threshold: 12 }).webp({ lossless: true }),
  );
}

// Drop anything left behind by an earlier lineup — including originals dropped
// straight into public/, which must live in assets-src/ instead.
for (const stale of fs.readdirSync(OUT_DIR)) {
  if (written.has(stale)) continue;
  fs.unlinkSync(path.join(OUT_DIR, stale));
  console.log(`${"removed".padStart(7)}  ${stale}`);
}

console.log(`\nDone. ${written.size} files, ${total} KB total.`);
