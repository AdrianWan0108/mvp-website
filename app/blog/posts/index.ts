import { monSheongWorkshop } from "./mon-sheong-55-pilates-workshop";
import type { BlogPost } from "./types";

export type { BlogPost };

/**
 * Every published post. To add one: create a file beside this one exporting
 * a `BlogPost`, add it here, and build its photos with
 * scripts/build-blog-photos.mjs. Order here doesn't matter; the list is
 * sorted newest first.
 */
export const posts: BlogPost[] = [monSheongWorkshop].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/** "November 15, 2026". Parsed as a calendar date so no timezone can shift it. */
export function formatPostDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
