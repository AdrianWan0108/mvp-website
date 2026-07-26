import type { FinderScope } from "@/app/lib/plan-finder";

/**
 * DOM ids shared between the server-rendered sections and the client
 * selection context, which is why they live in a plain module: a function
 * exported from a "use client" file can only be rendered or passed as a prop,
 * not called from the server page that builds the markup.
 */

/** A section's wrapper, and the scroll target the plan finder aims at. */
export function sectionAnchorId(scope: FinderScope): string {
  return `pricing-${scope}`;
}

/** A section's heading, so scrolling can also move focus there. */
export function sectionHeadingId(scope: FinderScope): string {
  return `${scope}-heading`;
}
