import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal, Counter } from "./motion";
import { LogoSequence } from "./logo-sequence";

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
  decoration = true,
  children,
}: {
  number?: string;
  decoration?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      {number ? (
        <span>{number}</span>
      ) : decoration ? (
        <span className="tiny-star">✳</span>
      ) : null}
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
        preload={priority}
      />
    </div>
  );
}
export function BrandWall({ full = false }: { full?: boolean }) {
  const logos = [
    ["samsung", "Samsung"],
    ["stanley", "Stanley"],
    ["gymshark", "Gymshark"],
    ["huawei", "Huawei"],
    ["byd", "BYD"],
    ["hisense", "Hisense"],
    ["lenovo", "Lenovo"],
    ["haier", "Haier"],
    ["tcl", "TCL"],
    ["tiktok", "TikTok"],
    ["dji", "DJI"],
    ["anker", "Anker"],
    ["alibaba", "Alibaba Group"],
    ["temu", "Temu"],
    ["oppo", "OPPO"],
    ["ugreen", "UGREEN"],
    ["xiaomi", "Xiaomi"],
  ];
  return (
    <section
      className={`brand-partners${full ? " brand-partners--full" : ""}`}
      aria-labelledby="brand-partners-title"
    >
      <Reveal className="brand-partners__heading">
        <h2 id="brand-partners-title">Trusted by global brands.</h2>
      </Reveal>
      <div className="brand-partners__rows">
        {[logos.slice(0, 9), logos.slice(9)].map((row, index) => (
          <LogoSequence
            key={index}
            variant="home"
            direction={index === 0 ? "left" : "right"}
            label={`Partner brands, row ${index + 1}. Hover or focus to pause scrolling.`}
          >
            {row.map(([file, name]) => (
              <div key={file} className="brand-partners__logo">
                <Image
                  src={`/logos/transparent/${file}.png`}
                  alt={name}
                  width={160}
                  height={80}
                  sizes="(max-width: 700px) 132px, 160px"
                />
              </div>
            ))}
          </LogoSequence>
        ))}
      </div>
    </section>
  );
}
export function Stats() {
  return (
    <section className="stats section-wrap" aria-label="LGI in numbers">
      <Reveal className="stats-numbers" variant="scale" stagger={160}>
        <Link href="/brand-services" className="stat-pathway">
          <span className="stat-caption">Brands worked with</span>
          <strong>
            <Counter value={8245} suffix="+" />
          </strong>
          <span className="stat-destination">
            For Brands
            <span className="stat-arrow" aria-hidden="true">
              <ArrowUpRight size={20} />
            </span>
          </span>
        </Link>
        <Link href="/creators" className="stat-pathway">
          <span className="stat-caption">Exclusive creators signed</span>
          <strong>
            <Counter value={200} suffix="+" />
          </strong>
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
export function CallToAction({
  creator = false,
}: {
  creator?: boolean;
}) {
  return (
    <section
      className={`cta-section section-wrap${creator ? " cta-section-creator" : ""}`}
    >
      <Reveal className="cta-layout" stagger={150} duration={1050}>
        <SectionLabel>YOUR NEXT CHAPTER</SectionLabel>
        <h2>
          {creator ? (
            <>
              <span>You create.</span>{" "}
              <em>Let’s connect.</em>
            </>
          ) : (
            <>
              <span>Ready to go</span>{" "}
              <em>global?</em>
            </>
          )}
        </h2>
        <div className="cta-action">
          <p>
            {creator
              ? "Bring your point of view. We’ll bring the brand connections and business support."
              : "Tell us where you want to go. We’ll bring the right people to get you there."}
          </p>
          <Link
            href={`/contact${creator ? "?audience=creator" : ""}`}
            className="cta-link"
          >
            <span>
              {creator ? "Start Your Creator Journey" : "Start A Conversation"}
            </span>
            <span className="cta-link-arrow" aria-hidden="true">
              <ArrowUpRight size={28} strokeWidth={1.5} />
            </span>
          </Link>
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
  grayscale = false,
  cta,
  href,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  image: string;
  alt: string;
  grayscale?: boolean;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="page-hero">
      <Image
        className={`page-hero-image${grayscale ? " page-hero-image-grayscale" : ""}`}
        src={`/images/${image}.webp`}
        fill
        preload
        sizes="100vw"
        alt={alt}
      />
      <div className="page-hero-shade" aria-hidden="true" />
      <div className="page-hero-content">
        {eyebrow ? (
          <span className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {eyebrow}
          </span>
        ) : null}
        <h1>{title}</h1>
        <p>{description}</p>
        {cta && href ? <ActionLink href={href}>{cta}</ActionLink> : null}
      </div>
      <a
        href="#main-content"
        className="hero-scroll"
        aria-label="Explore this page"
      >
        <span className="hero-scroll-icon" aria-hidden="true">
          <span className="hero-scroll-arrow">
            <ArrowDown size={18} />
          </span>
        </span>
        <span>SCROLL TO EXPLORE</span>
      </a>
    </section>
  );
}
