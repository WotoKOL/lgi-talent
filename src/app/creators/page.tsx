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
import { creatorServices, creatorSteps } from "@/lib/content";
import { createMetadata } from "@/lib/site";
import { Check, ArrowUpRight } from "lucide-react";

export const metadata = createMetadata({
  title: "Creator Management & Brand Partnerships",
  description:
    "Focus on creating. LGI helps creators find global brand deals, negotiate partnerships, manage projects, and build a lasting creative business.",
  path: "/creators",
});
export default function CreatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="FOR CREATORS / YOUR NEXT CHAPTER"
        title={
          <>
            FOCUS ON
            <br />
            <em>CREATING.</em>
            <br />
            WE’VE GOT YOU.
          </>
        }
        description="Global brand connections. A team in your corner. More room to build a career on your own terms."
        image="creator-hero"
        alt="A creator capturing content in a studio"
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
        <div className="service-grid light-service-grid">
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
      <BrandWall full />
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
              "You create quality content, consistently.",
              "You put your audience’s trust first.",
              "You bring professionalism to partnerships.",
              "You’re ready for more brand opportunities.",
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
      <Process steps={creatorSteps} creator />
      <CallToAction creator />
    </>
  );
}
