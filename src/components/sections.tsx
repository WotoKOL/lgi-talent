import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal, Counter } from "./motion";

export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-outline" : "button-primary"}`}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      {number ? <span>{number}</span> : <span className="tiny-star">✳</span>}
      {children}
    </div>
  );
}
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={`/images/${name}.webp`}
        fill
        alt={alt}
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 40vw"
        priority={priority}
      />
    </div>
  );
}
export function BrandWall({ full = false }: { full?: boolean }) {
  const logos = [
    "samsung",
    "stanley",
    "gymshark",
    "huawei",
    "byd",
    "hisense",
    "lenovo",
    "haier",
    "tcl",
    "tiktok",
    "dji",
    "anker",
    "alibaba",
    "temu",
    "oppo",
    "ugreen",
    "xiaomi",
  ];
  return (
    <section
      className={`brand-wall ${full ? "brand-wall-full" : ""}`}
      aria-label="Brand network"
    >
      <div className="brand-wall-heading">
        <div>
          <span className="eyebrow">IN GOOD COMPANY</span>
          <h2>
            Trusted by global brands.
            <br />
            <span>Connected by LGI.</span>
          </h2>
        </div>
        <p className="brand-wall-description">
          From consumer tech and smart home to digital platforms and global
          e-commerce, LGI works with brands across industries to bring their
          products, stories, and creators to audiences around the world.
        </p>
      </div>
      <div className="logo-grid">
        {logos.slice(0, full ? 17 : 12).map((name) => (
          <div key={name} className="partner-logo">
            <Image
              src={`/logos/${name}.png`}
              alt={
                name === "byd"
                  ? "BYD"
                  : name === "dji"
                    ? "DJI"
                    : name === "tcl"
                      ? "TCL"
                      : name === "tiktok"
                        ? "TikTok"
                        : name[0].toUpperCase() + name.slice(1)
              }
              width={140}
              height={70}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
export function Stats() {
  return (
    <section className="stats section-wrap">
      <Reveal className="stats-intro">
        <SectionLabel number="01">THE POWER OF CONNECTION</SectionLabel>
        <h2>
          Good people.
          <br />
          Great things.
        </h2>
        <p>
          We bring brands and creators together.
          <br />
          Then help them make something matter.
        </p>
      </Reveal>
      <Reveal className="stats-numbers">
        <Link href="/brand-services" className="stat-pathway">
          <strong>
            <Counter value={8245} suffix="+" />
          </strong>
          <span className="stat-caption">Brands worked with</span>
          <span className="stat-destination">
            For Brands
            <span className="stat-arrow" aria-hidden="true">
              <ArrowUpRight size={20} />
            </span>
          </span>
        </Link>
        <Link href="/creators" className="stat-pathway">
          <strong>
            <Counter value={200} suffix="+" />
          </strong>
          <span className="stat-caption">Exclusive creators signed</span>
          <span className="stat-destination">
            For Creators
            <span className="stat-arrow" aria-hidden="true">
              <ArrowUpRight size={20} />
            </span>
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
export function CallToAction({ creator = false }: { creator?: boolean }) {
  return (
    <section className="cta-section section-wrap">
      <Reveal>
        <SectionLabel>YOUR NEXT CHAPTER</SectionLabel>
        <h2>
          {creator ? (
            <>
              YOU CREATE.
              <br />
              LET’S <em>CONNECT.</em>
            </>
          ) : (
            <>
              READY TO
              <br />
              GO <em>GLOBAL?</em>
            </>
          )}
        </h2>
        <div className="cta-bottom">
          <p>
            {creator
              ? "Bring your point of view. We’ll bring the brand connections and business support."
              : "Tell us where you want to go. We’ll bring the right people to get you there."}
          </p>
          <ActionLink href={`/contact${creator ? "?audience=creator" : ""}`}>
            {creator ? "Start your creator journey" : "Start a conversation"}
          </ActionLink>
        </div>
      </Reveal>
      <span className="cta-asterisk" aria-hidden="true">
        ✳
      </span>
    </section>
  );
}
export function Process({
  steps,
  creator = false,
}: {
  steps: string[];
  creator?: boolean;
}) {
  return (
    <section className="process-section section-wrap">
      <Reveal>
        <SectionLabel number="03">HOW WE WORK</SectionLabel>
        <div className="section-heading">
          <h2>
            {creator ? (
              <>
                Your next step.
                <br />
                Taken together.
              </>
            ) : (
              <>
                From the first hello
                <br />
                to the final recap.
              </>
            )}
          </h2>
          <p>
            {creator
              ? "A thoughtful process to find the right fit. Our team reviews your content, audience, and goals before discussing representation."
              : "One team, one clear process. From shaping the plan to bringing every detail together."}
          </p>
        </div>
      </Reveal>
      <ol className="process-grid">
        {steps.map((s, i) => (
          <li key={s}>
            <span>0{i + 1}</span>
            <h3>{s}</h3>
            <ArrowUpRight size={20} />
          </li>
        ))}
      </ol>
      {creator ? (
        <p className="process-note">
          Applying does not guarantee representation. If your profile fits, our
          team will be in touch.
        </p>
      ) : null}
    </section>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  alt,
  cta,
  href,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  image: string;
  alt: string;
  cta?: string;
  href?: string;
  compact?: boolean;
}) {
  return (
    <section className={`page-hero ${compact ? "page-hero-compact" : ""}`}>
      <Image
        className="page-hero-image"
        src={`/images/${image}.webp`}
        fill
        priority
        sizes="100vw"
        alt={alt}
      />
      <div className="page-hero-shade" />
      <div className="page-hero-content">
        <span className="eyebrow">
          <span className="status-dot" />
          {eyebrow}
        </span>
        <h1>{title}</h1>
        <p>{description}</p>
        {cta && href ? <ActionLink href={href}>{cta}</ActionLink> : null}
      </div>
      <a
        href="#main-content"
        className="hero-scroll"
        aria-label="Explore this page"
      >
        <ArrowDown size={18} />
        <span>SCROLL TO EXPLORE</span>
      </a>
    </section>
  );
}
