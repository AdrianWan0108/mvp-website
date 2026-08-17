/**
 * Auto-orient EXIF-rotated JPEGs in assets-src/photos.
 *
 * Many phone/camera portraits are stored sideways with an EXIF orientation
 * flag. Browsers usually honor it, but image optimizers (incl. Next's) may not,
 * which renders them rotated. This rewrites affected files with upright pixels
 * and no orientation tag. Already-upright files are left untouched.
 *
 * Re-runnable and safe to keep — run again whenever new photos are added:
 *   node scripts/orient-photos.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "assets-src", "photos");

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full));
    else if (/\.jpe?g$/i.test(entry.name)) out.push(full);
  }
  return out;
}

(async () => {
  const files = walk(ROOT);
  let rotated = 0;
  for (const file of files) {
    const buf = fs.readFileSync(file);
    const meta = await sharp(buf).metadata();
    if (meta.orientation && meta.orientation !== 1) {
      const out = await sharp(buf).rotate().jpeg({ quality: 88 }).toBuffer();
      fs.writeFileSync(file, out);
      rotated++;
      console.log(
        `oriented: ${path.relative(ROOT, file)} (was orientation ${meta.orientation})`,
      );
    }
  }
  console.log(`\nDone. ${rotated} of ${files.length} files re-oriented.`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
