/**
 * Base path for large media (video) assets. Defaults to the static export's
 * local /public path; set NEXT_PUBLIC_MEDIA_BASE_URL to an R2/CDN origin at
 * deploy time to serve these files from there instead.
 */
const mediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "/mvp-website/assets/videos";

export const coreValuesVideo = {
  mp4: `${mediaBase}/core-values.mp4`,
  poster: `${mediaBase}/core-values-poster.jpg`,
};
