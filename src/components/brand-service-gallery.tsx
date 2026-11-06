"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion";

const campaigns = [
  {
    title: "Influencer Marketing",
    text: "We build creator strategies from planning and talent selection to content and reporting.",
    image: "service-influencer",
    anchor: "influencer-marketing",
  },
  {
    title: "Product Launch Campaigns",
    text: "Drive awareness and conversation through unboxings, reviews, tutorials, and real-world content.",
    image: "service-launch",
    anchor: "product-launch",
  },
  {
    title: "Social Media Campaigns",
    text: "Build brand awareness and trust through consistent, authentic creator content.",
    image: "service-social",
    anchor: "social-media",
  },
  {
    title: "Trade Show & Event Marketing",
    text: "From CES and IFA to on-site content, we handle creator outreach, event coverage, and execution.",
    image: "service-tradeshow",
    anchor: "trade-show-events",
  },
  {
    title: "Brand Events & Creator Activations",
    text: "Bring local creators to pop-ups, launches, sports events, and brand experiences.",
    image: "service-events",
    anchor: "creator-activations",
  },
  {
    title: "Long-Term Creator Partnerships",
    text: "Build lasting creator relationships, content assets, and brand presence over time.",
    image: "service-partnerships",
    anchor: "long-term-partnerships",
  },
];

const mobileQuery = "(max-width: 700px)";

function subscribeToViewport(onChange: () => void) {
  const viewport = window.matchMedia(mobileQuery);
  viewport.addEventListener("change", onChange);
  return () => viewport.removeEventListener("change", onChange);
}

function getMobileSnapshot() {
  return window.matchMedia(mobileQuery).matches;
}

function getServerSnapshot() {
  return false;
}

function BrandServiceCard({ index }: { index: number }) {
  const { title, text, image, anchor } = campaigns[index];
  return (
    <Reveal>
      <Link
        className={`brand-service-card brand-service-card-${index + 1}`}
        id={anchor}
        href={`/contact?service=${anchor}`}
        aria-label={`Discuss ${title}`}
      >
        <div className="brand-service-image">
          <Image
            src={`/images/${image}.webp`}
            fill
            sizes="(max-width: 700px) 100vw, 33vw"
            alt=""
          />
        </div>
        <div className="brand-service-copy">
          <span className="brand-service-index">0{index + 1} / OUR SERVICE</span>
          <h3>{title}<ArrowUpRight size={22} aria-hidden="true" /></h3>
          <p>{text}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function BrandServiceGallery() {
  const mobile = useSyncExternalStore(
    subscribeToViewport,
    getMobileSnapshot,
    getServerSnapshot,
  );

  return (
    <div className="brand-service-list">
      {mobile ? (
        <div className="brand-service-column">
          {campaigns.map((campaign, index) => (
            <BrandServiceCard key={campaign.anchor} index={index} />
          ))}
        </div>
      ) : (
        [0, 1, 2].map((column) => (
          <div className="brand-service-column" key={column}>
            {[column, column + 3].map((index) => (
              <BrandServiceCard key={campaigns[index].anchor} index={index} />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
