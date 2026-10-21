import { HeroRail } from "@/components/hero-rail";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { Capabilities } from "@/components/capabilities";
import {
  ActionLink,
  BrandWall,
  CallToAction,
  Photo,
  SectionLabel,
  Stats,
} from "@/components/sections";
import { Reveal } from "@/components/motion";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-glow" />
        <div className="hero-topline">
          <span>
            <span className="status-dot" />
            LOS ANGELES ROOTS. GLOBAL REACH.
          </span>
          <span>BRANDS × CREATORS × CULTURE</span>
        </div>
        <div className="hero-title-wrap">
          <h1>
            <span>
              LINKING BRANDS
              <span className="hero-title-star" aria-hidden="true">
                ✳
              </span>
            </span>
            <span className="gradient-text">EMPOWERING CREATORS.</span>
          </h1>
          <div className="hero-description">
            <p>
              Real people. Real connections. Global possibilities.
              <br />
              We’re LGI, a global influencer marketing
              <br className="desktop-break" /> and creator management agency.
            </p>
            <div className="hero-buttons">
              <ActionLink href="/contact">
                Start a brand collaboration
              </ActionLink>
              <ActionLink href="/contact?audience=creator" secondary>
                Start your creator journey
              </ActionLink>
            </div>
          </div>
        </div>
        <HeroRail />
        <div className="hero-bottomline">
          <span>DIFFERENT VOICES. SHARED AMBITION.</span>
          <a href="#connections">
            MEET YOUR NEXT CONNECTION <ArrowDown size={15} />
          </a>
          <span>CALIFORNIA BASED. GLOBALLY CONNECTED.</span>
        </div>
      </section>
      <div id="connections">
        <BrandWall />
        <Stats />
      </div>
      <div className="statement-band">
        <span>LOCAL KNOW-HOW.</span>
        <span className="band-star">✳</span>
        <span>GLOBAL POSSIBILITIES.</span>
        <span className="band-star">✳</span>
      </div>
      <Capabilities />
      <section className="creator-feature section-wrap">
        <Reveal className="creator-feature-photo">
          <Photo
            name="creator-looking-for"
            alt="Creators reviewing ideas together"
          />
          <div className="photo-sticker">
            <span>YOUR VOICE.</span>
            <span>YOUR NEXT CHAPTER.</span>
            <ArrowUpRight size={26} />
          </div>
        </Reveal>
        <Reveal className="creator-feature-copy">
          <SectionLabel number="03">FOR THE PEOPLE WHO CREATE</SectionLabel>
          <h2>
            YOU DO YOU.
            <br />
            WE’LL DO
            <br />
            <em>THE REST.</em>
          </h2>
          <p>
            You bring the ideas. We bring brand opportunities, business support,
            and a team that gets it. More time for what you love. More space for
            what’s next.
          </p>
          <ActionLink href="/creators">Meet your next chapter</ActionLink>
          <div className="platform-list">
            <span>YouTube</span>
            <span>Instagram</span>
            <span>TikTok</span>
            <MoveUpRight size={20} />
          </div>
        </Reveal>
      </section>
      <section className="home-work section-wrap">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="04">FROM IDEAS TO IMPACT</SectionLabel>
              <h2>
                FROM THE FEED.
                <br />
                TO THE <em>REAL WORLD.</em>
              </h2>
            </div>
            <Link href="/case-studies" className="text-link">
              Explore our approach
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </Reveal>
        <div className="home-work-grid">
          <Link href="/brand-services" className="feature-work-card">
            <Photo
              name="service-tradeshow"
              alt="Brand representatives and creators at a consumer technology trade show"
            />
            <span className="work-overlay">
              <span>ON THE GROUND</span>
              <strong>
                Big moments.
                <br />
                Made personal.
              </strong>
              <span className="round-arrow">
                <ArrowUpRight />
              </span>
            </span>
          </Link>
          <Link href="/brand-services" className="feature-work-card">
            <Photo
              name="service-launch"
              alt="A content creator presenting a technology product"
            />
            <span className="work-overlay">
              <span>ON YOUR SCREEN</span>
              <strong>
                Great products.
                <br />
                The right voices.
              </strong>
              <span className="round-arrow">
                <ArrowUpRight />
              </span>
            </span>
          </Link>
        </div>
      </section>
      <section className="faq-section section-wrap">
        <div>
          <SectionLabel>GOOD TO KNOW</SectionLabel>
          <h2>
            A few things.
            <br />
            Before we connect.
          </h2>
        </div>
        <div className="faq-list">
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
        </div>
      </section>
      <CallToAction />
    </>
  );
}
