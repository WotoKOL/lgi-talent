import { LegalPage } from "@/components/legal";
import { createMetadata } from "@/lib/site";
export const metadata = createMetadata({
  title: "Website Terms",
  path: "/terms",
});
export default function Terms() {
  return (
    <LegalPage
      title="Website terms."
      intro="These terms apply to browsing the LGI website and submitting an enquiry."
      sections={[
        {
          title: "Website information",
          text: "The website introduces LGI’s services and partnership approach. Information is provided for general guidance and may change. Brand names and logos belong to their respective owners.",
        },
        {
          title: "Enquiries and applications",
          text: "Submitting a campaign enquiry or creator application does not create a representation agreement, booking, or service commitment. Any collaboration is subject to review and a separate written agreement.",
        },
        {
          title: "Responsible use",
          text: "Please use the website lawfully, provide accurate enquiry information, and avoid sending unsolicited, harmful, or confidential third-party material. Do not attempt to disrupt the website or gain unauthorized access.",
        },
        {
          title: "Content and links",
          text: "Website content may not be reused in a misleading way or in a way that infringes the rights of LGI, creators, or other owners. External services and links are governed by their respective providers.",
        },
        {
          title: "Availability",
          text: "We take reasonable care to maintain the website, but uninterrupted availability and complete accuracy cannot be guaranteed. Nothing in these terms limits rights or liability that cannot lawfully be limited.",
        },
      ]}
    />
  );
}
