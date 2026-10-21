import { LegalPage } from "@/components/legal";
import { createMetadata } from "@/lib/site";
export const metadata = createMetadata({
  title: "Cookie Notice",
  path: "/cookies",
});
export default function Cookies() {
  return (
    <LegalPage
      title="Cookie notice."
      intro="A straightforward website, with no advertising or analytics cookies."
      sections={[
        {
          title: "Cookies on this website",
          text: "This website does not set advertising, analytics, or personalization cookies. You can browse its pages and prepare a contact email without accepting optional cookies.",
        },
        {
          title: "Hosting and external services",
          text: "The hosting environment may use strictly necessary technical mechanisms to deliver pages and keep the service secure. Opening an external email application or website is subject to that provider’s own privacy and cookie practices.",
        },
        {
          title: "Managing cookies",
          text: "You can review or remove stored cookies through your browser settings. If optional tracking is added in the future, this notice and the relevant consent choices should be updated before it is enabled.",
        },
      ]}
    />
  );
}
