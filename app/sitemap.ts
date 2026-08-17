import type { MetadataRoute } from "next";
import { site } from "./lib/site";

export const dynamic = "force-static";

// Old routes (/about, /about/our-story, /about/our-team, /polestar,
// /polestar/teacher-training) are redirect stubs with noindex — excluded here.
const routes = [
  "",
  "/classes",
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
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
