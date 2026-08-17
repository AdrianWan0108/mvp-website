// scripts/build-collage-photos.mjs
// Builds the small photo derivatives behind the masked home-page mosaic
// ("Be our MVP", app/components/home/gallery-wall.tsx).
//
// That collage is an 8x4 grid inside the MVP monogram, so a tile is only
// ~152x104 CSS px at the widest desktop layout. next.config.ts sets
// `images.unoptimized: true` for the static export, meaning every file ships at
// its authored size with no resizing — pointing the collage at the full-size
// set would cost ~1.8MB for imagery nobody sees at size. These 600px
// derivatives cover 3x DPR with room to spare, at about a quarter of the
// weight.
//
// Sources come from two roots, named per entry:
//   shipped — public/assets, the tree the site serves (downscale only)
//   master  — assets-src, the camera originals kept outside public/ so they
//             never reach a build (downscale + EXIF rotate, same reason as
//             scripts/orient-photos.cjs)
//
// Re-runnable — outputs are overwritten and stale ones pruned. Keep SOURCES in
// sync with `collagePhotos` in app/lib/images.ts.
//
// Run from the project root:  node scripts/build-collage-photos.mjs

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOTS = { shipped: "public/assets", master: "assets-src" };
const OUT_DIR = `${ROOTS.shipped}/collage`;

const WIDTH = 600; // long-edge cap; see header for why 600 is enough
const QUALITY = 72;

// `from` is relative to its `root`, `to` is the flat output filename.
// Grouped for readability only — render order lives in app/lib/images.ts.
const SOURCES = [
  // --- Movement / poses ---
  { root: "shipped", from: "poses/gary-pose.webp", to: "gary-pose-1.webp" },
  { root: "master", from: "photos/pilates-pose/Gary/gary-pose-3.jpg", to: "gary-pose-3.webp" },
  { root: "master", from: "photos/pilates-pose/Gary/gary-pose-5.jpg", to: "gary-pose-5.webp" },
  { root: "master", from: "photos/pilates-pose/Gary/gary-pose-7.jpg", to: "gary-pose-7.webp" },
  { root: "master", from: "photos/pilates-pose/Gary/gary-pose-11.jpg", to: "gary-pose-11.webp" },
  { root: "master", from: "photos-optimized/pilates-pose/Dorothy/dorothy-pose-1.webp", to: "dorothy-pose-1.webp" },
  { root: "master", from: "photos/pilates-pose/Dorothy/dorothy-pose-3.jpg", to: "dorothy-pose-3.webp" },
  { root: "master", from: "photos/pilates-pose/Dorothy/dorothy-pose-5.jpg", to: "dorothy-pose-5.webp" },
  { root: "master", from: "photos/pilates-pose/Dorothy/dorothy-pose-6.jpg", to: "dorothy-pose-6.webp" },
  { root: "shipped", from: "poses/florence-pose.webp", to: "florence-pose-1.webp" },
  { root: "master", from: "photos/pilates-pose/Florence/florance-pose-2.jpg", to: "florence-pose-2.webp" },
  { root: "master", from: "photos/pilates-pose/Florence/florance-pose-3.jpg", to: "florence-pose-3.webp" },

  // --- Team ---
  { root: "shipped", from: "team/team-under-polestar-sign.webp", to: "team-polestar-sign.webp" },
  { root: "shipped", from: "team/team-mvp-polestar.webp", to: "team-mvp-polestar.webp" },
  { root: "shipped", from: "team/gary-in-action.webp", to: "gary-in-action.webp" },
  // Dorothy's "in action" frame is a tall portrait that crops to a bare
  // shoulder at the tile's 1.46:1 — her headshot holds the face instead.
  { root: "shipped", from: "team/dorothy-headshot.webp", to: "dorothy-headshot.webp" },
  { root: "shipped", from: "team/florence-in-action.webp", to: "florence-in-action.webp" },

  // --- Teaching ---
  { root: "shipped", from: "teaching/private-session-dorothy.webp", to: "dorothy-private-1.webp" },
  { root: "master", from: "photos/instructor-teaching-students-private-class/Dorothy/dorothy-private-2.jpg", to: "dorothy-private-2.webp" },
  { root: "shipped", from: "teaching/group-class-dorothy-hero.webp", to: "dorothy-group-1.webp" },
  { root: "master", from: "photos/instructor-teaching-students-group-class/Dorathy/dorothy-group-2.jpg", to: "dorothy-group-2.webp" },
  { root: "master", from: "photos/instructor-teaching-students-group-class/Gary/gary-group-1.JPG", to: "gary-group-1.webp" },
  { root: "master", from: "photos/instructor-teaching-students-group-class/Gary/gary-group-5.JPG", to: "gary-group-5.webp" },

  // --- Studio ---
  { root: "shipped", from: "studio/reformer-floor.webp", to: "reformer-environment.webp" },
  { root: "shipped", from: "studio/entrance-wall.webp", to: "entrance-wall.webp" },
  { root: "shipped", from: "studio/spine-model-detail.webp", to: "spine-figure.webp" },
  { root: "shipped", from: "studio/heritage-wall.webp", to: "heritage-wall.webp" },

  // --- Equipment ---
  { root: "shipped", from: "equipment/reformer-1.webp", to: "reformer-1.webp" },
  { root: "shipped", from: "equipment/gyrotonic-1.webp", to: "gyrotonic-1.webp" },
  { root: "shipped", from: "equipment/konnector-1.webp", to: "konnector-1.webp" },
  { root: "shipped", from: "equipment/wunda-chair-1.webp", to: "wunda-chair-1.webp" },
  { root: "shipped", from: "equipment/barrel.webp", to: "barrel-1.webp" },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

const expected = new Set();
for (const { to } of SOURCES) {
  if (expected.has(to)) throw new Error(`duplicate output filename: ${to}`);
  expected.add(to);
}

let total = 0;
for (const { root, from, to } of SOURCES) {
  const base = ROOTS[root];
  if (!base) throw new Error(`unknown root "${root}" for ${from}`);
  const src = path.join(base, from);
  if (!fs.existsSync(src)) throw new Error(`missing source: ${root}:${from}`);

  const dest = path.join(OUT_DIR, to);
  const { width, height } = await sharp(src)
    .rotate() // honors EXIF orientation on the camera originals
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(dest);

  const kb = Math.round(fs.statSync(dest).size / 1024);
  total += kb;
  console.log(`${String(kb + " KB").padStart(7)}  ${width}x${height}  ${to}`);
}

// Drop derivatives left behind by an earlier lineup, so the folder always
// mirrors SOURCES exactly.
for (const stale of fs.readdirSync(OUT_DIR)) {
  if (expected.has(stale)) continue;
  fs.unlinkSync(path.join(OUT_DIR, stale));
  console.log(`${"removed".padStart(7)}  ${stale}`);
}

console.log(`\nDone. ${SOURCES.length} files, ${total} KB total.`);
