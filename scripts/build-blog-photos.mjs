// scripts/build-blog-photos.mjs
// Builds the images blog posts serve from the originals in assets-src/photos/blog.
//
// next.config.ts sets `images.unoptimized: true` for the static export, so a
// file ships at its authored size. Each photo is cut to its largest rendered
// size instead:
//
//   *.webp      long edge 1600  in-article photos, preserving source ratios.
//                               Text spans up to 832px; wide images 1216px.
//   social.jpg  1200x630        link-preview card. JPEG, not webp: some chat
//                               apps still refuse webp for Open Graph images.
//
// File names are descriptive on purpose: image file names are a (small)
// search signal, and they read better than camera numbers in a URL.
//
// Sources are matched by camera number (e.g. "IMG_5040"), which is unique.
// Re-runnable: outputs are overwritten and stale ones pruned. Keep the output
// names in sync with the post files in app/blog/posts/.
//
// Run from the project root:  node scripts/build-blog-photos.mjs

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const POSTS = [
  {
    slug: "mon-sheong-55-plus-workshop",
    photos: [
      { from: "IMG_5222", to: "mon-sheong-55-workshop-participants.webp" },
      { from: "5-IMG_5194.jpg", to: "mon-sheong-members-standing-practice.webp" },
      { from: "19-IMG_5199.jpg", to: "gary-fok-guiding-seated-participant.webp" },
      { from: "20-IMG_5194-tight.jpg", to: "mon-sheong-members-standing-practice-tight.webp" },
      { from: "IMG_5040", to: "gary-fok-spine-model-mon-sheong-workshop.webp" },
      { from: "IMG_5164", to: "mon-sheong-55-workshop-room-markham.webp" },
      { from: "IMG_5248", to: "seniors-pilates-breathing-posture.webp" },
      { from: "IMG_5226", to: "older-adults-moving-together-pilates.webp" },
      { from: "IMG_5073", to: "gentle-pilates-floor-work-seniors.webp" },
      { from: "IMG_5121", to: "instructor-hands-on-guidance-senior.webp" },
      { from: "IMG_4984", to: "gary-fok-adjusting-alignment.webp" },
      { from: "IMG_4914", to: "gary-fok-answering-questions.webp" },
      { from: "IMG_5108", to: "gary-fok-polestar-pilates-instructor.webp" },
      { from: "IMG_5011", to: "gary-fok-sharing-a-laugh.webp" },
      { from: "IMG_5276", to: "mon-sheong-55-members-certificates.webp" },
    ],
    // Keep the full participant-focused composition in the social preview.
    social: { from: "IMG_5222", background: "#315344" },
  },
];

const SRC_ROOT = "assets-src/photos/blog";
const OUT_ROOT = "public/assets/blog";
const LONG_EDGE = 1600;

for (const post of POSTS) {
  const srcDir = path.join(SRC_ROOT, post.slug);
  const outDir = path.join(OUT_ROOT, post.slug);
  const sources = fs.readdirSync(srcDir);

  /** Resolve a source by a fragment that must match exactly one file. */
  const source = (fragment) => {
    const matches = sources.filter((name) => name.includes(fragment));
    if (matches.length !== 1) {
      throw new Error(`"${fragment}" matched ${matches.length} files in ${srcDir}`);
    }
    return path.join(srcDir, matches[0]);
  };

  fs.mkdirSync(outDir, { recursive: true });
  const written = new Set();

  for (const photo of post.photos) {
    const out = path.join(outDir, photo.to);
    const info = await sharp(source(photo.from))
      .rotate()
      .resize(LONG_EDGE, LONG_EDGE, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    written.add(photo.to);
    console.log(`${out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
  }

  const socialOut = path.join(outDir, "social.jpg");
  const info = await sharp(source(post.social.from))
    .rotate()
    .resize(1200, 630, { fit: "contain", background: post.social.background })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(socialOut);
  written.add("social.jpg");
  console.log(`${socialOut}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);

  for (const name of fs.readdirSync(outDir)) {
    // Preserve newly supplied originals; only prune generated WebP derivatives.
    if (!written.has(name) && name.endsWith(".webp")) {
      fs.rmSync(path.join(outDir, name));
      console.log(`pruned ${name}`);
    }
  }
}
