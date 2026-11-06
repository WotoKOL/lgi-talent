import { PageHero, Photo, SectionLabel } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { BrandPartnershipProcess } from "@/components/brand-partnership-process";
import { BrandCampaignCTA } from "@/components/brand-campaign-cta";
import { BrandServiceGallery } from "@/components/brand-service-gallery";
import { brandServices } from "@/lib/content";
import { createMetadata } from "@/lib/site";
import "./brand-services.css";

export const metadata = createMetadata({
  title: "Global Influencer Marketing & Brand Services",
  description:
    "Creator strategy, content collaboration, and local U.S. execution. LGI connects your brand with the right creators in the U.S. and Europe.",
  path: "/brand-services",
});
export default function BrandsPage() {
  return (
    <>
      <PageHero
        title={
          <>
            GO GLOBAL.
            <br />
            WITH THE
            <br />
            <em>RIGHT CREATORS.</em>
          </>
        }
        description="LGI helps brands go to market with creator strategy, talent matching, content creation, U.S.-based management, and global reach—all in one place."
        image="brand-hero"
        alt="A marketing team planning a brand campaign together"
        grayscale
        cta="Start a campaign"
        href="/contact"
      />
      <section id="main-content" className="section-wrap light-section">
        <Reveal>
          <SectionLabel number="01">
            A PLAN WITH PEOPLE AT ITS HEART
          </SectionLabel>
          <div className="section-heading">
            <h2>
              One team.
              <br />
              Every part of the story.
            </h2>
            <p>
              From target markets to final delivery, we bring creator resources,
              creative thinking, and on-the-ground execution together.
            </p>
          </div>
        </Reveal>
        <div className="service-grid light-service-grid">
          {brandServices.map((s) => (
            <Reveal key={s.title}>
              <Photo name={s.image} alt={s.title} />
              <span className="eyebrow">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section
        className="brand-service-section section-wrap"
        aria-labelledby="brand-services-heading"
      >
        <Reveal>
          <SectionLabel number="02">BUILT AROUND YOUR NEXT MOVE</SectionLabel>
          <div className="section-heading">
            <h2 id="brand-services-heading">
              Our Service
            </h2>
            <p>
              A launch, an event, a new audience. We build the creator program
              around the moment that matters to you.
            </p>
          </div>
        </Reveal>
        <BrandServiceGallery />
      </section>
      <BrandPartnershipProcess />
      <BrandCampaignCTA />
    </>
  );
}
