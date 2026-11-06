import type { Metadata } from "next";
import { caseStudiesEnabled } from "./features";

function getSiteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured) {
    try {
      const url = new URL(configured);
      if (url.protocol === "https:" || url.protocol === "http:") {
        return url.origin;
      }
    } catch {
      // A missing or invalid deployment origin should not break local previews.
    }
  }

  return "http://localhost:3000";
}

const origin = getSiteOrigin();
const hostname = new URL(origin).hostname;

export const hasPublicOrigin = ![
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
].includes(hostname);

export const site = {
  name: "Linking Global Influencer",
  fullName: "Linking Global Influencer",
  shortName: "LGI",
  tagline: "Linking brands. Empowering creators.",
  description:
    "Linking Global Influencer (LGI) is a global influencer marketing and creator management agency based in Greater Los Angeles. We connect brands with creators, authentic content, and local expertise across the U.S. and Europe.",
  origin,
  url: origin,
  email: "market@lgi.com",
  location: "Greater Los Angeles, California",
  address: {
    streetAddress: "17800 Castleton St Ste 665",
    addressLocality: "City of Industry",
    addressRegion: "CA",
    postalCode: "91748",
    addressCountry: "US",
  },
} as const;

export const siteRoutes = [
  "/",
  "/brand-services",
  "/creators",
  ...(caseStudiesEnabled ? ["/case-studies"] : []),
  "/about",
  "/contact",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${site.origin}/`).toString();
}

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description = site.description,
  path = "/",
  image = "/opengraph-image",
}: PageMetadataOptions): Metadata {
  const pageUrl = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.fullName,
      title,
      description,
      url: pageUrl,
      images: [{ url: absoluteUrl(image), alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
    robots: { index: hasPublicOrigin, follow: hasPublicOrigin },
  };
}
