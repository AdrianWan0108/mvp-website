/**
 * Outbound CTA destinations.
 *
 * MVP books through Mindbody. Until the client supplies the real Mindbody
 * URLs, every booking/registration CTA points to a clearly-marked
 * placeholder so the whole funnel can be re-pointed from this one file.
 *
 * `isPlaceholder()` lets components surface a small "demo link" hint in the
 * prototype so the client isn't surprised by a dead click.
 */

// TODO: replace with the studio's real Mindbody site/widget URLs.
const MINDBODY_PLACEHOLDER =
  "https://www.mindbodyonline.com/explore/locations/motion-vitality-pilates";

export const links = {
  // --- Mindbody funnel (placeholders) ---
  book: MINDBODY_PLACEHOLDER,
  schedule: MINDBODY_PLACEHOLDER,
  register: MINDBODY_PLACEHOLDER,
  firstTimer: MINDBODY_PLACEHOLDER,
  buyClasses: MINDBODY_PLACEHOLDER,

  // --- Google Business Profile ---
  // TODO: swap for the studio's one-tap review link, which opens the star
  // dialog directly: https://search.google.com/local/writereview?placeid=<ID>
  // (get <ID> from the Google Business Profile dashboard, "Ask for reviews").
  // Until then this lands on the profile, where "Write a review" is one click.
  googleReview:
    "https://www.google.com/maps/search/?api=1&query=Motion+Vitality+Pilates",

  // --- Real external links (verified from the live site) ---
  polestarRegister:
    "https://polestarpilates.com/product/2026-fall-comprehensive-program/",
  polestarInfo: "https://polestarpilates.com/",
  polestarLocations: "https://polestarpilates.com/locations/",
  konnector: "https://www.konnectmethod.com",
  gyrotonic: "https://www.gyrotonic.com",
} as const;

export type LinkKey = keyof typeof links;

/** True for CTAs still pointing at the Mindbody placeholder. */
export function isPlaceholder(key: LinkKey): boolean {
  return links[key] === MINDBODY_PLACEHOLDER;
}
