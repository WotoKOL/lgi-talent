import {
  CallToAction,
  PageHero,
  SectionLabel,
} from "@/components/sections";
import { CompanyIntroduction } from "@/components/company-introduction";
import { CompanyValues } from "@/components/company-values";
import { TeamAccordion } from "@/components/team-accordion";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "About Our Global Influencer Agency",
  description:
    "From Greater Los Angeles to global markets. Meet LGI, the team connecting brands and creators through strategy, relationships, and local execution.",
  path: "/about",
});
const team = [
  {
    name: "Daniel Carter",
    role: "Brand Strategy Director",
    image: "daniel-carter",
    text: "Turns market insights and business goals into creator strategies for product launches, market entry, and long-term brand programs.",
  },
  {
    name: "Maya Brooks",
    role: "Brand Partnerships Director",
    image: "maya-brooks",
    text: "Connects client needs, campaign scope, and teams from the first conversation through ongoing partnerships.",
  },
  {
    name: "Sofia Ramirez",
    role: "Creator Management Director",
    image: "sofia-ramirez",
    text: "Supports creators with brand matching, negotiations, and content usage across YouTube, Instagram, and TikTok.",
  },
  {
    name: "Ethan Miller",
    role: "U.S. Operations Director",
    image: "ethan-miller",
    text: "Brings creators, production crews, and local teams together for trade shows, pop-ups, and product launches.",
  },
];
export default function AboutPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Linking Brands
            <br />
            <em>Empowering Creators</em>
          </>
        }
        description="From Los Angeles, connecting brands, creators, and culture worldwide."
        image="about-city"
        alt="Modern architecture in Los Angeles"
      />
      <CompanyIntroduction />
      <CompanyValues />
      <section className="team-section section-wrap light-section">
        <SectionLabel number="03">
          THE PEOPLE BEHIND EVERY PARTNERSHIP
        </SectionLabel>
        <div className="section-heading">
          <h2>
            The People Behind{" "}
            <br />
            Every Partnership.
          </h2>
          <p>
            We connect brand goals with authentic creator voices through
            strategy, relationships, and local execution.
          </p>
        </div>
        <TeamAccordion members={team} />
      </section>
      <CallToAction />
    </>
  );
}
