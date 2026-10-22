import { ContactForm } from "@/components/contact-form";
import { PageHero, SectionLabel } from "@/components/sections";
import { createMetadata, site } from "@/lib/site";
import { ArrowUpRight, MapPin } from "lucide-react";

export const metadata = createMetadata({
  title: "Contact LGI — Start a Brand or Creator Partnership",
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
    <>
      <PageHero
        title={
          <>
            Let’s Start a{" "}
            <br />
            <em>Conversation.</em>
          </>
        }
        description="Whether you’re looking for creators or new brand opportunities, the LGI team is here to help."
        image="hero-community"
        alt="Friends looking together toward the sky"
        cta="Tell us what’s next"
        href="#main-content"
      />
      <section
        id="main-content"
        className="contact-section section-wrap light-section"
      >
        <SectionLabel>GOOD THINGS START WITH A CONVERSATION</SectionLabel>
        <div className="contact-heading">
          <h2>
            You’re in the
            <br />
            right place.
          </h2>
          <p>
            Looking for creators or new brand opportunities?
            <br />
            Choose your path and tell us a little about yourself.
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
    </>
  );
}
