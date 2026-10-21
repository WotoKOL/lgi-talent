import {
  ActionLink,
  BrandWall,
  CallToAction,
  PageHero,
  Photo,
  Process,
  SectionLabel,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { brandServices, brandSteps } from "@/lib/content";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Global Influencer Marketing & Brand Services",
  description:
    "Creator strategy, content collaboration, and local U.S. execution. LGI connects your brand with the right creators in the U.S. and Europe.",
  path: "/brand-services",
});
const campaigns = [
  [
    "Influencer marketing",
    "From creator strategy to content, execution, and reporting.",
    "service-influencer",
  ],
  [
    "Product launches",
    "Unboxings, reviews, tutorials, and real-world product stories.",
    "service-launch",
  ],
  [
    "Social media campaigns",
    "Consistent, authentic content that builds awareness and trust.",
    "service-social",
  ],
  [
    "Trade shows & events",
    "Creator outreach and on-site coverage at CES, IFA, and beyond.",
    "service-tradeshow",
  ],
  [
    "Brand activations",
    "Bring local creators to pop-ups, launches, and brand experiences.",
    "service-events",
  ],
  [
    "Long-term partnerships",
    "Lasting relationships, valuable content, and a growing brand presence.",
    "service-partnerships",
  ],
];
export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="FOR BRANDS / GLOBAL INFLUENCER MARKETING"
        title={
          <>
            GO GLOBAL.
            <br />
            WITH THE
            <br />
            <em>RIGHT CREATORS.</em>
          </>
        }
        description="Your next market. Your next launch. The people who make it happen. Creator strategy, content, and U.S. execution, all in one place."
        image="brand-hero"
        alt="Two creators capturing a moment with a camera"
        cta="Start a campaign"
        href="/contact"
      />
      <div id="main-content">
        <BrandWall />
      </div>
      <section className="section-wrap light-section">
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
      <section className="campaign-section section-wrap">
        <Reveal>
          <SectionLabel number="02">BUILT AROUND YOUR NEXT MOVE</SectionLabel>
          <div className="section-heading">
            <h2>
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
        <div className="campaign-list">
          {campaigns.map(([title, text, img], i) => (
            <Reveal className="campaign-row" key={title}>
              <span className="campaign-number">0{i + 1}</span>
              <Photo name={img} alt={title} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <ActionLink href="/contact">Let’s talk</ActionLink>
            </Reveal>
          ))}
        </div>
      </section>
      <Process steps={brandSteps} />
      <CallToAction />
    </>
  );
}
