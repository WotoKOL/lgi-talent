import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion";
import "./brand-campaign-cta.css";

export function BrandCampaignCTA() {
  return (
    <section
      className="brand-campaign-cta"
      aria-labelledby="brand-campaign-cta-title"
    >
      <div className="brand-campaign-cta__inner">
        <Reveal className="brand-campaign-cta__copy" stagger={110} duration={850}>
          <h2 id="brand-campaign-cta-title">
            <span>Your Next Global</span>{" "}
            <span>Campaign Starts</span>{" "}
            <span>Here</span>
          </h2>
          <p>
            Whether you’re entering the U.S. market, launching a product globally,
            or looking for the right creators for an international trade show,
            LGI works with you from strategy to execution to make it happen.
          </p>
          <Link className="brand-campaign-cta__button" href="/contact">
            <span>Get a Custom Proposal</span>
            <ArrowUpRight size={21} strokeWidth={1.7} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal
          className="brand-campaign-cta__visual"
          variant="image"
          delay={100}
          duration={950}
        >
          <div className="brand-campaign-cta__photo">
            <Image
              src="/images/brand-campaign-proposal.png"
              alt="A man signing an agreement while a business partner reviews it beside him"
              fill
              unoptimized
              sizes="(max-width: 800px) 100vw, 44vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
