import type { ComponentType } from "react";
import type { Photo } from "@/app/lib/images";

/** Intrinsic dimensions preserve the photographer's supplied composition. */
export type BlogPhoto = Photo & { width: number; height: number };

/** Everything the blog index, post page, metadata, sitemap and JSON-LD need
 *  to know about a post. The body itself is a component, so a post can use
 *  links and layout freely without a markdown pipeline. */
export type BlogPost = {
  /** URL segment: /blog/<slug>. Never change it once published. */
  slug: string;
  /** On-page headline (the H1). */
  title: string;
  /** <title> shown in Google. Falls back to `title`. Keep under ~60 chars. */
  seoTitle?: string;
  /** Meta description and card excerpt. Keep under ~160 chars. */
  description: string;
  /** Short label above the title, e.g. "Community". */
  category: string;
  /** ISO date (YYYY-MM-DD) the post was published. */
  publishedAt: string;
  /** ISO date of the last meaningful edit, if any. */
  updatedAt?: string;
  author: { type: "Person" | "Organization"; name: string; href?: string };
  /** Whole minutes; shown next to the date. */
  readingMinutes: number;
  /** Hero photo, also used on the index card. */
  hero: BlogPhoto;
  /** 1200x630 JPEG for link previews. */
  socialImage: string;
  Body: ComponentType;
};
