import {
  ActionLink,
  CallToAction,
  PageHero,
  Photo,
  SectionLabel,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { CreatorBrandNetwork } from "@/components/creator-brand-network";
import { CreatorApplicationProcess } from "@/components/creator-application-process";
import { creatorServices } from "@/lib/content";
import { createMetadata } from "@/lib/site";
import { Check, ArrowUpRight } from "lucide-react";
import "./creators.css";

export const metadata = createMetadata({
  title: "Creator Management & Brand Partnerships",
  description:
    "Focus on creating. LGI helps creators find global brand deals, negotiate partnerships, manage projects, and build a lasting creative business.",
  path: "/creators",
});
export default function CreatorsPage() {
  return (
    <div className="creators-page">
      <PageHero
        title={
          <>
            Focus on Creating.
            <br />
            <em>Leave the rest to LGI.</em>
          </>
        }
        description="Join LGI to connect with leading global brands, get professional support on the business side, and unlock more opportunities to grow your career long term."
        image="creators-hero"
        alt="A creator adjusting a camera on a tabletop tripod in a sunlit studio"
        cta="Apply to join LGI"
        href="/contact?audience=creator"
      />
      <section id="main-content" className="section-wrap light-section">
        <Reveal>
          <SectionLabel number="01">YOUR IDEAS. OUR SUPPORT.</SectionLabel>
          <div className="section-heading">
            <h2>
              Keep your voice.
              <br />
              Grow your possibilities.
            </h2>
            <p>
              We take care of the business side, so you can give your best to
              the thing that brought you here: creating.
            </p>
          </div>
        </Reveal>
        <div className="service-grid light-service-grid creator-services-grid">
          {creatorServices.map((s) => (
            <Reveal key={s.title}>
              <Photo name={s.image} alt={s.title} />
              <span className="eyebrow">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CreatorBrandNetwork />
      <section className="creator-network section-wrap">
        <SectionLabel number="02">
          DIFFERENT VOICES. SHARED AMBITION.
        </SectionLabel>
        <div className="section-heading">
          <h2>
            A WORLD OF
            <br />
            <em>POINTS OF VIEW.</em>
          </h2>
          <p>
            200+ exclusive creators. Different passions, platforms, and
            perspectives. One network that makes more possible.
          </p>
        </div>
        <div className="network-photo-grid">
          {[
            ["hero-gamer", "Gaming & tech"],
            ["hero-fashion", "Fashion & lifestyle"],
            ["hero-traveler", "Travel & adventure"],
            ["hero-skater", "Sports & outdoor"],
          ].map(([img, label]) => (
            <div key={img}>
              <Photo name={img} alt={`${label} creator imagery`} />
              <span>
                {label}
                <ArrowUpRight size={17} />
              </span>
            </div>
          ))}
        </div>
        <div className="network-bottom">
          <p>
            YouTube · Instagram · TikTok
            <br />
            <span>North America, Europe, and beyond.</span>
          </p>
          <ActionLink href="/contact?audience=creator">
            Find your place with us
          </ActionLink>
        </div>
      </section>
      <section className="creator-fit section-wrap">
        <Photo
          name="creator-looking-for"
          alt="Creators discussing a project together"
        />
        <div>
          <SectionLabel>WHO WE’RE LOOKING FOR</SectionLabel>
          <h2>Sound like you?</h2>
          <ul>
            {[
              "Consistently create high-quality content",
              "Value audience trust and professional integrity",
              "Communicate professionally and deliver on brand partnerships",
              "Looking to grow your brand partnerships",
            ].map((t) => (
              <li key={t}>
                <Check size={20} />
                {t}
              </li>
            ))}
          </ul>
          <ActionLink href="/contact?audience=creator">
            Let’s get to know you
          </ActionLink>
        </div>
      </section>
      <CreatorApplicationProcess />
      <CallToAction creator />
    </div>
  );
}
