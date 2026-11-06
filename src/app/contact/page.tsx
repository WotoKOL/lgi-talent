import { ContactForm } from "@/components/contact-form";
import { createMetadata, site } from "@/lib/site";
import { ArrowUpRight, MapPin } from "lucide-react";
import "./contact.css";

export const metadata = createMetadata({
  title: "Contact Us — Start a Brand or Creator Partnership",
  description:
    "Have a campaign in mind or ready for your next creator opportunity? Get in touch with the LGI team in Greater Los Angeles.",
  path: "/contact",
});
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string }>;
}) {
  const { audience } = await searchParams;
  return (
    <div className="contact-page">
      <section
        id="main-content"
        className="contact-page__inquiry"
        aria-labelledby="contact-title"
      >
        <div className="contact-page__heading">
          <p className="eyebrow">LET’S MAKE SOMETHING HAPPEN</p>
          <h1 id="contact-title">Contact Us.</h1>
          <p className="contact-page__description">
            Great partnerships start with a conversation.
            <br />
            Tell us about your brand, your content, or what comes next.
          </p>
        </div>
        <ContactForm
          key={audience}
          audience={audience === "creator" ? "creator" : "brand"}
        />
        <div className="contact-details">
          <div>
            <span className="eyebrow">PREFER EMAIL?</span>
            <a href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={23} />
            </a>
          </div>
          <div>
            <span className="eyebrow">
              <MapPin size={14} /> GREATER LOS ANGELES, CALIFORNIA
            </span>
            <p>
              17800 Castleton St, Ste 665
              <br />
              City of Industry, CA 91748, United States
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
