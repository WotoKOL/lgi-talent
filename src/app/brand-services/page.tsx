import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Photo, SectionLabel } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { BrandPartnershipProcess } from "@/components/brand-partnership-process";
import { BrandCampaignCTA } from "@/components/brand-campaign-cta";
import { brandServices } from "@/lib/content";
import { createMetadata } from "@/lib/site";
import "./brand-services.css";

export const metadata = createMetadata({
  title: "Global Influencer Marketing & Brand Services",
  description:
    "Creator strategy, content collaboration, and local U.S. execution. LGI connects your brand with the right creators in the U.S. and Europe.",
  path: "/brand-services",
});
const campaigns = [
  [
    "Influencer Marketing",
    "We build creator strategies from planning and talent selection to content and reporting.",
    "service-influencer",
  ],
  [
    "Product Launch Campaigns",
    "Drive awareness and conversation through unboxings, reviews, tutorials, and real-world content.",
    "service-launch",
  ],
  [
    "Social Media Campaigns",
    "Build brand awareness and trust through consistent, authentic creator content.",
    "service-social",
  ],
  [
    "Trade Show & Event Marketing",
    "From CES and IFA to on-site content, we handle creator outreach, event coverage, and execution.",
    "service-tradeshow",
  ],
  [
    "Brand Events & Creator Activations",
    "Bring local creators to pop-ups, launches, sports events, and brand experiences.",
    "service-events",
  ],
  [
    "Long-Term Creator Partnerships",
    "Build lasting creator relationships, content assets, and brand presence over time.",
    "service-partnerships",
  ],
];
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
        alt="Two creators capturing a moment with a camera"
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
              Where do you
              <br />
              want to go?
            </h2>
            <p>
              A launch, an event, a new audience. We build the creator program
              around the moment that matters to you.
            </p>
          </div>
        </Reveal>
        <div className="brand-service-list">
          {campaigns.map(([title, text, img], i) => (
            <Reveal key={title}>
              <Link
                className="brand-service-row"
                href="/contact"
                aria-label={`Discuss ${title}`}
                aria-describedby={`brand-service-description-${i + 1}`}
              >
                <span className="brand-service-number" aria-hidden="true">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="brand-service-image">
                  <Image
                    src={`/images/${img}.png`}
                    fill
                    sizes="(max-width: 600px) 96px, (max-width: 1000px) 150px, 190px"
                    alt=""
                  />
                </span>
                <div className="brand-service-copy">
                  <h3>{title}</h3>
                  <p id={`brand-service-description-${i + 1}`}>{text}</p>
                </div>
                <span className="brand-service-action" aria-hidden="true">
                  <span>Let’s Talk</span>
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <BrandPartnershipProcess />
      <BrandCampaignCTA />
    </>
  );
}
