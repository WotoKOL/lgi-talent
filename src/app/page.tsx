import { HomeHeroBackground } from "@/components/home-hero-background";
import Link from "next/link";
import localFont from "next/font/local";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Capabilities } from "@/components/capabilities";
import { HomeTalentCarousel } from "@/components/home-talent-carousel";
import {
  ActionLink,
  BrandWall,
  CallToAction,
  Photo,
  SectionLabel,
  Stats,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { HomeScrollMotion } from "@/components/home-scroll-motion";
import "./home.css";

const heroHeading = localFont({
  src: "../../public/fonts/home-heading-black.ttf",
  weight: "900",
  variable: "--font-home-heading",
  display: "swap",
});

export default function Home() {
  return (
    <>
      <section className={`home-hero home-hero-influencer ${heroHeading.variable}`}>
        <HomeHeroBackground />
        <Reveal className="hero-title-wrap" stagger={140} duration={1100}>
          <h1>
            <span>Influencer</span>{" "}
            <span>Marketing</span>
          </h1>
          <div className="hero-description">
            <p>
              LGI is a U.S.-based global influencer marketing and creator
              management agency.
              <br className="desktop-break" />
              {" "}
              We connect brands with creators and creators with brands.
            </p>
            <div className="hero-buttons">
              <ActionLink href="/contact">
                Start A Brand Collaboration
              </ActionLink>
              <ActionLink href="/contact?audience=creator" secondary>
                Start Your Creator Journey
              </ActionLink>
            </div>
          </div>
        </Reveal>
        <a
          href="#connections"
          className="home-hero-scroll"
          aria-label="Explore our brand connections"
        >
          <span className="scroll-orbit" aria-hidden="true">
            <span className="scroll-arrow">
              <ArrowDown size={20} />
            </span>
          </span>
        </a>
      </section>
      <div id="connections">
        <BrandWall />
        <Stats />
      </div>
      <Reveal className="statement-band" variant="scale" duration={850}>
        <span>LOCALIZED MARKETING.</span>
        <span className="band-star">✳</span>
        <span>INFINITE POSSIBILITIES.</span>
        <span className="band-star">✳</span>
      </Reveal>
      <Capabilities />
      <HomeTalentCarousel className={heroHeading.variable} />
      <section id="brands-and-creators" className="home-work home-audience section-wrap" aria-labelledby="home-audience-heading">
        <Reveal variant="left" duration={1000}>
          <div className="section-heading">
            <div>
              <SectionLabel decoration={false}>BRANDS & CREATORS</SectionLabel>
              <h2 id="home-audience-heading">
                LET’S BUILD <em>WHAT’S NEXT</em>
              </h2>
            </div>
            <p>
              Connecting global brands and creators to turn influence into lasting impact.
            </p>
          </div>
        </Reveal>
        <Reveal
          className="home-work-grid"
          variant="image"
          stagger={170}
          duration={1100}
        >
          <Link
            href="/brand-services"
            className="feature-work-card"
            aria-labelledby="home-brands-label home-brands-title home-brands-cta"
            aria-describedby="home-brands-description"
          >
            <Photo
              name="brand-hero"
              alt="A team planning a brand campaign together"
            />
            <div className="work-overlay">
              <span id="home-brands-label">FOR BRANDS</span>
              <h3 id="home-brands-title" className="work-card-title">
                Turn attention
                <br />
                into impact.
              </h3>
              <p id="home-brands-description" className="work-card-description">
                Build creator partnerships and campaigns that move your brand forward.
              </p>
              <span className="work-card-cta">
                <span id="home-brands-cta">Explore Brand Services</span>
                <span className="round-arrow" aria-hidden="true"><ArrowUpRight /></span>
              </span>
            </div>
          </Link>
          <Link
            href="/creators"
            className="feature-work-card"
            aria-labelledby="home-creators-label home-creators-title home-creators-cta"
            aria-describedby="home-creators-description"
          >
            <Photo
              name="creators-hero"
              alt="Two creators recording a conversation in a podcast studio"
            />
            <div className="work-overlay">
              <span id="home-creators-label">FOR CREATORS</span>
              <h3 id="home-creators-title" className="work-card-title">
                Create your way.
                <br />
                Grow with LGI.
              </h3>
              <p id="home-creators-description" className="work-card-description">
                Find brand opportunities and business support, with more space to create.
              </p>
              <span className="work-card-cta">
                <span id="home-creators-cta">Explore Creator Management</span>
                <span className="round-arrow" aria-hidden="true"><ArrowUpRight /></span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
      <section className="faq-section section-wrap">
        <Reveal stagger={120} variant="left">
          <SectionLabel>GOOD TO KNOW</SectionLabel>
          <h2>
            A few things.
            <br />
            Before we connect.
          </h2>
        </Reveal>
        <Reveal className="faq-list" stagger={100}>
          {[
            [
              "Who does LGI work with?",
              "We work with global brands and creators across consumer technology, lifestyle, beauty, home, outdoor, and other industries. Our focus is on the U.S. and European markets.",
            ],
            [
              "Can you support a campaign on the ground in the U.S.?",
              "Yes. Our Greater Los Angeles team coordinates creator hosting, on-site filming, trade show coverage, brand events, and local execution.",
            ],
            [
              "How do creators join LGI?",
              "Share your channel and a little about yourself through our creator application. We review your content, audience, and partnership goals, then reach out if there is a fit.",
            ],
            [
              "Where should a brand campaign start?",
              "Start with a conversation. Share your brand, target market, and goals. We’ll discuss the right approach, creator mix, and scope together.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </Reveal>
      </section>
      <CallToAction />
      <HomeScrollMotion />
    </>
  );
}
