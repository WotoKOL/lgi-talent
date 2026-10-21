import "server-only";
import { absoluteUrl, site } from "@/lib/site";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  alternateName: site.fullName,
  url: absoluteUrl("/"),
  description: site.description,
  logo: absoluteUrl("/logos/lgi-mark.png"),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    ...site.address,
  },
  areaServed: ["United States", "Europe"],
};

const serializedOrganization = JSON.stringify(organization).replace(
  /</g,
  "\\u003c",
);

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializedOrganization }}
    />
  );
}
