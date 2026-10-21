import {
  CallToAction,
  PageHero,
  Photo,
  SectionLabel,
  Stats,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
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
        eyebrow="ABOUT LGI / LINKING GLOBAL INFLUENCERS"
        title={
          <>
            LOS ANGELES ROOTS.
            <br />
            <em>GLOBAL CONNECTIONS.</em>
          </>
        }
        description="We bring brands, creators, and culture together. From Greater Los Angeles to wherever your next idea takes you."
        image="about-city"
        alt="Modern architecture in Los Angeles"
      />
      <section
        className="about-story section-wrap light-section"
        id="main-content"
      >
        <Reveal>
          <SectionLabel number="01">A LITTLE ABOUT US</SectionLabel>
          <h2>
            Influence starts
            <br />
            with understanding.
          </h2>
        </Reveal>
        <div className="about-story-body">
          <p className="large-copy">
            The right partnership starts with people who understand each other.
          </p>
          <p>
            LGI stands for Linking Global Influencers. We’re a global influencer
            marketing and creator management agency based in Greater Los
            Angeles, California, focused on the U.S. and European markets.
          </p>
          <p>
            We help brands find creators who understand their products and
            connect with their audiences. And we help creators find
            opportunities that respect their voice and build lasting business
            value.
          </p>
          <p>
            Strategy. Relationships. Local execution. That’s how we turn an
            introduction into something more.
          </p>
        </div>
      </section>
      <Stats />
      <section className="values-section section-wrap">
        <SectionLabel number="02">WHAT KEEPS US CONNECTED</SectionLabel>
        <div className="section-heading">
          <h2>
            Good work starts
            <br />
            with shared values.
          </h2>
        </div>
        <div className="values-grid">
          {[
            [
              "Authenticity",
              "Real voices. Honest stories. Connections people can trust.",
            ],
            [
              "Professionalism",
              "Clear communication and careful execution, from start to finish.",
            ],
            [
              "Respect",
              "For the brand, the creator, and the audience on the other side.",
            ],
            [
              "Long-term thinking",
              "Partnerships with room to grow beyond a single campaign.",
            ],
            [
              "A global perspective",
              "Local understanding. Cultural curiosity. A wider point of view.",
            ],
          ].map(([title, text], i) => (
            <Reveal key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="team-section section-wrap light-section">
        <SectionLabel number="03">
          THE PEOPLE BEHIND EVERY PARTNERSHIP
        </SectionLabel>
        <div className="section-heading">
          <h2>
            People who get brands.
            <br />
            And get creators.
          </h2>
          <p>
            A team that connects business goals with creative voices, through
            strategy, relationships, and local execution.
          </p>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <Reveal key={person.name}>
              <Photo
                name={person.image}
                alt={`${person.name}, ${person.role}`}
              />
              <h3>{person.name}</h3>
              <span className="team-role">{person.role}</span>
              <p>{person.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
