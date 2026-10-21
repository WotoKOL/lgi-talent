"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { brandServices, creatorServices } from "@/lib/content";

export function Capabilities() {
  const [audience, setAudience] = useState<"brand" | "creator">("brand");
  const reduced = useReducedMotion();
  const services = audience === "brand" ? brandServices : creatorServices;
  return (
    <section className="capabilities section-wrap" id="what-we-do">
      <div className="section-label">
        <span>02</span>TWO SIDES. ONE CONNECTION.
      </div>
      <div className="section-heading">
        <h2>
          Made for brands.
          <br />
          Built for creators.
        </h2>
        <div className="capability-intro">
          <p>
            Big ideas need the right people.
            <br />
            We make the introduction. And so much more.
          </p>
          <div
            className="audience-tabs"
            role="tablist"
            aria-label="Explore our services"
          >
            {(["brand", "creator"] as const).map((a) => (
              <button
                key={a}
                role="tab"
                id={`tab-${a}`}
                aria-selected={a === audience}
                aria-controls="capability-panel"
                tabIndex={a === audience ? 0 : -1}
                onClick={() => setAudience(a)}
                onKeyDown={(e) => {
                  if (
                    ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const next =
                      e.key === "Home"
                        ? "brand"
                        : e.key === "End"
                          ? "creator"
                          : audience === "brand"
                            ? "creator"
                            : "brand";
                    setAudience(next);
                    document.getElementById(`tab-${next}`)?.focus();
                  }
                }}
              >
                {a === "brand" ? "For Brands" : "For Creators"}
                <ArrowUpRight size={17} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        id="capability-panel"
        role="tabpanel"
        aria-labelledby={`tab-${audience}`}
        tabIndex={0}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="service-grid"
            key={audience}
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: reduced ? 1 : 0 }}
            transition={{ duration: 0.23 }}
          >
            {services.map((s) => (
              <Link
                className="service-card"
                key={s.title}
                href={audience === "brand" ? "/brand-services" : "/creators"}
              >
                <div className="service-image">
                  <Image
                    src={`/images/${s.image}.webp`}
                    fill
                    alt={s.title}
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                  <span className="card-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <span className="eyebrow">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="capabilities-bottom">
        <span>A connection is just the beginning.</span>
        <Link
          href={audience === "brand" ? "/brand-services" : "/creators"}
          className="text-link"
        >
          {audience === "brand"
            ? "Explore brand services"
            : "Explore creator management"}
          <ArrowUpRight size={19} />
        </Link>
      </div>
    </section>
  );
}
