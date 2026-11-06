import {
  ActionLink,
  CallToAction,
  PageHero,
  Photo,
  SectionLabel,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { CreatorApplicationProcess } from "@/components/creator-application-process";
import { CreatorDirectory } from "@/components/creator-directory";
import { creatorServices } from "@/lib/content";
import { createMetadata } from "@/lib/site";
import { Check } from "lucide-react";
import localFont from "next/font/local";
import "./creators.css";

const creatorHeading = localFont({
  src: "../../../public/fonts/home-heading-black.ttf",
  weight: "900",
  variable: "--font-home-heading",
  display: "swap",
});

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
        alt="Two creators recording a conversation in a light-filled podcast studio"
        cta="Start Your Creator Journey"
        href="/contact?audience=creator"
      />
      <section id="main-content" className="creator-support section-wrap light-section">
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
            <Reveal className="creator-service" key={s.title}>
              <Photo name={s.image} alt={s.title} />
              <span className="eyebrow">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CreatorDirectory className={creatorHeading.variable} />
      <section className="creator-fit section-wrap">
        <Reveal className="creator-fit__intro">
          <SectionLabel>WHO WE’RE LOOKING FOR</SectionLabel>
          <h2>Sound like you?</h2>
          <p>
            Your perspective is your strength. We’re here to help you build
            lasting partnerships around it.
          </p>
        </Reveal>
        <Reveal className="creator-fit__details">
          <ul className="creator-fit__list">
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
        </Reveal>
      </section>
      <CreatorApplicationProcess />
      <CallToAction creator />
    </div>
  );
}
