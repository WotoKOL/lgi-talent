import type { MetadataRoute } from "next";
import { absoluteUrl, siteRoutes } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { caseStudiesEnabled } from "@/lib/features";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...siteRoutes,
    ...(caseStudiesEnabled ? caseStudies.map(({ slug }) => `/case-studies/${slug}`) : []),
  ];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path === "/contact" ? 0.7 : 0.8,
  }));
}
