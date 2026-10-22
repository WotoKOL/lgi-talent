import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Counter, Reveal } from "./motion";
import "./company-introduction.css";

export function CompanyIntroduction() {
  return (
    <section
      className="company-introduction"
      id="main-content"
      aria-labelledby="company-introduction-title"
    >
      <div className="company-introduction__layout">
        <Reveal className="company-introduction__heading">
          <p className="company-introduction__eyebrow">
            <span>01</span> COMPANY OVERVIEW
          </p>
          <h2 id="company-introduction-title">
            About <span>LGI.</span>
          </h2>
        </Reveal>

        <Reveal className="company-introduction__lead" delay={100}>
          <p>
            LGI, short for LINKING GLOBAL INFLUENCERS, is a global influencer
            marketing and creator management agency headquartered in Greater Los
            Angeles, California.
          </p>
        </Reveal>

        <Reveal className="company-introduction__visual" variant="image">
          <Image
            src="/images/about-company-office.png"
            alt="Modern office building with an LGI sign, palm trees, and an American flag"
            fill
            unoptimized
            sizes="(max-width: 900px) 100vw, 48vw"
          />
          <p className="company-introduction__location">
            <span aria-hidden="true" /> Greater Los Angeles, California
          </p>
        </Reveal>

        <div className="company-introduction__details">
          <Reveal className="company-introduction__copy" delay={100}>
            <p className="company-introduction__reach">
              Having served 8,245+ brands and representing 200+ active exclusive
              creators, LGI focuses on the U.S. and European markets.
            </p>
            <p>
              We connect brands with the right creators to build authentic
              influence and lasting business value. For brands, we provide global
              influencer marketing and local U.S. execution. For creators, we
              provide brand opportunities, business management, and long-term
              career support.
            </p>
          </Reveal>

          <Reveal className="company-introduction__metrics" stagger={140}>
            <Link href="/brand-services" className="company-introduction__metric">
              <strong><Counter value={8245} suffix="+" /></strong>
              <span className="company-introduction__metric-label">Brands Served</span>
              <span className="company-introduction__destination">
                For Brands
                <span aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.5} /></span>
              </span>
            </Link>
            <Link href="/creators" className="company-introduction__metric">
              <strong><Counter value={200} suffix="+" /></strong>
              <span className="company-introduction__metric-label">Active Exclusive Creators</span>
              <span className="company-introduction__destination">
                For Creators
                <span aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.5} /></span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
