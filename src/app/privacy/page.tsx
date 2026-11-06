import { LegalPage } from "@/components/legal";
import { createMetadata } from "@/lib/site";
export const metadata = createMetadata({
  title: "Privacy Notice",
  path: "/privacy",
});
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy notice."
      intro="This notice explains how information is handled when you visit this website or contact LGI."
      sections={[
        {
          title: "Information you provide",
          text: "When you contact us, you may provide your name, email address, company, product category, channel link, WhatsApp number, and message. Please only share information relevant to your enquiry.",
        },
        {
          title: "How information is used",
          text: "We use enquiry information to understand your request, respond to you, and discuss potential brand or creator partnerships. We do not sell enquiry information.",
        },
        {
          title: "How an enquiry is delivered",
          text: "The contact form securely sends your enquiry to Forminit, our form-processing provider, which stores the information so the LGI team can review and respond to your request. Forminit also processes technical submission details to deliver the service and protect against spam. If you choose an email link instead, your email is sent through your chosen email provider.",
        },
        {
          title: "Technical information",
          text: "Our hosting provider may process technical request information, such as IP addresses, browser details, and access times, to serve and protect the website. This website does not include advertising trackers or analytics cookies.",
        },
        {
          title: "Your choices",
          text: "You may contact us to request access to, correction of, or deletion of information you have provided, subject to applicable requirements. We retain enquiry information only as needed for the enquiry, the resulting business relationship, or legal requirements.",
        },
        {
          title: "Contact",
          text: "LGI, 17800 Castleton St, Ste 665, City of Industry, CA 91748, United States. Email: market@lgi.com.",
        },
      ]}
    />
  );
}
