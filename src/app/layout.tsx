import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/sections";
import { OrganizationSchema } from "@/components/organization-schema";
import { site, absoluteUrl, hasPublicOrigin } from "@/lib/site";
import "./globals.css";

const display = localFont({
  src: "../../public/fonts/display-bold.ttf",
  weight: "800",
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: [
    { path: "../../public/fonts/body-regular.ttf", weight: "400" },
    { path: "../../public/fonts/body-medium.ttf", weight: "500" },
  ],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "LGI — Linking Brands. Empowering Creators.",
    template: "%s | LGI",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LGI",
    title: "LGI — Linking Brands. Empowering Creators.",
    description: site.description,
    url: absoluteUrl("/"),
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "LGI — Linking brands. Empowering creators.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: hasPublicOrigin, follow: hasPublicOrigin },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable}`}
    >
      <body id="top">
        <OrganizationSchema />
        <a className="skip-link" href="#page-content">
          Skip to content
        </a>
        <Navigation />
        <main id="page-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
