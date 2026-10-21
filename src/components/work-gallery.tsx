"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { campaignTypes } from "@/lib/content";
import { Photo } from "./sections";

export function WorkGallery() {
  const [filter, setFilter] = useState("All");
  const [audience, setAudience] = useState("Brands");
  const items =
    audience === "Brands"
      ? campaignTypes
      : [
          {
            title: "Brand deals that fit your world",
            category: "Online",
            image: "creator-opportunities",
            text: "Connect with global brands that share your interests and respect your audience.",
          },
          {
            title: "Beyond the feed",
            category: "Offline",
            image: "creator-looking-for",
            text: "Meet brands in person through events, experiences, and creative collaborations.",
          },
          {
            title: "Space to build what comes next",
            category: "Online",
            image: "creator-growth",
            text: "Explore repeat partnerships and long-term commercial opportunities with a dedicated team.",
          },
        ];
  return (
    <>
      <div className="work-controls">
        <div className="audience-tabs" aria-label="Partnership type">
          {["Brands", "Creators"].map((a) => (
            <button
              key={a}
              aria-pressed={audience === a}
              className={audience === a ? "is-selected" : ""}
              onClick={() => {
                setAudience(a);
                setFilter("All");
              }}
            >
              {a === "Brands" ? "Brand partnerships" : "Creator opportunities"}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <div className="filter-tabs" aria-label="Filter campaign formats">
          {["All", "Online", "Offline"].map((f) => (
            <button
              key={f}
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="work-grid" aria-live="polite">
        {items
          .filter((i) => filter === "All" || i.category === filter)
          .map((item) => (
            <Link
              href={`/contact${audience === "Creators" ? "?audience=creator" : ""}`}
              key={item.title}
              className="work-card"
            >
              <Photo name={item.image} alt={item.title} />
              <div className="work-card-meta">
                <span>
                  {item.category} /{" "}
                  {audience === "Brands"
                    ? "CAMPAIGN FORMAT"
                    : "CREATOR SUPPORT"}
                </span>
                <ArrowUpRight size={21} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Link>
          ))}
      </div>
      <div className="work-enquiry">
        <p>Looking for examples in your industry?</p>
        <Link href="/contact" className="text-link">
          Ask our team for a relevant selection
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </>
  );
}
