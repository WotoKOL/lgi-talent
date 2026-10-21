import type { MetadataRoute } from "next";
import { absoluteUrl, hasPublicOrigin } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(hasPublicOrigin
        ? { allow: "/", disallow: "/api/" }
        : { disallow: "/" }),
    },
    ...(hasPublicOrigin ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
