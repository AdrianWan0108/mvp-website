# assets-src — source material, not shipped

This tree holds the camera masters and retired derivatives behind the images in
`public/assets`. It sits **outside `public/`** on purpose.

`next.config.ts` sets `output: "export"`, which copies everything under
`public/` into the static export verbatim. When the masters lived in
`public/assets/photos`, every 6000×4000 original was published with the site —
the export was 388MB, of which roughly 350MB no page ever requested. Keeping
masters here makes that mistake impossible to repeat: a file has to be
deliberately encoded into `public/assets` to reach a browser.

## The two trees

| | `public/assets` | `assets-src` |
|---|---|---|
| Contents | only what a page actually renders | masters, retired derivatives, unused video |
| Format | webp (png where alpha or a CSS mask needs it) | whatever the camera or designer produced |
| Sizing | capped at display size | untouched |
| Ships to browsers | yes | never |

## Layout

Paths mirror the folder structure that existed before the July 2026 cleanup
(`photos/…`, `photos-optimized/…`, `videos/…`), so anything that referenced an
original by its old path still resolves after swapping the root.

## Regenerating derivatives

`scripts/build-collage-photos.mjs` reads from both trees and tags each source
with a `root` of `shipped` or `master`. `scripts/orient-photos.cjs`,
`gen-logo-shapes.mjs`, and `reverse-logo.mjs` operate on this tree only.

## Adding a photo to the site

1. Drop the original here.
2. Encode a display-sized copy into the right `public/assets/<category>/` folder
   — webp, long edge capped near its largest rendered size, quality ~80.
3. Add it to the manifest in `app/lib/images.ts` with alt text.

Nothing reads this tree at build time, so it can be moved to cold storage if the
repo needs to shrink. Note that the masters are also in git history, so deleting
them here does not shrink an existing clone.
