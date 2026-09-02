import type { MetadataRoute } from "next";
import { site } from "./lib/site";
import { instructors } from "./about/team/instructors";

export const dynamic = "force-static";

// Superseded routes (/about, /about/our-story, /about/our-team, /polestar,
// /polestar/teacher-training) and the retired /classes page are 301s handled
// in public/_redirects — excluded here so the sitemap lists only live pages.
const routes = [
  "",
  "/pricing",
  "/schedule",
  "/education",
  "/education/polestar-comprehensive-training",
  "/about/studio",
  "/about/team",
  "/contact",
  "/faq",
  "/terms",
  "/policies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Instructor bios are derived from the same list the pages are generated
  // from, so the sitemap follows the roster instead of drifting from it.
  const all = [
    ...routes,
    ...instructors.map((instructor) => `/about/team/${instructor.slug}`),
  ];

  return all.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
