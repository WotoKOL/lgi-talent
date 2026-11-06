"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies, type CaseAudience } from "@/lib/case-studies";
import { caseDetailHref, caseListHref, type CaseFilter } from "@/lib/case-study-navigation";
import styles from "./work-gallery.module.css";

const filters = [
  { label: "All", value: "All" },
  { label: "Online", value: "Online" },
  { label: "On-site", value: "Offline" },
] as const;

const audiences = ["Brands", "Creators"] as const;

export function WorkGallery({
  initialAudience = "Brands",
  initialFilter = "All",
}: {
  initialAudience?: CaseAudience;
  initialFilter?: CaseFilter;
}) {
  const [filter, setFilter] = useState<CaseFilter>(initialFilter);
  const [audience, setAudience] = useState<CaseAudience>(initialAudience);
  const items = caseStudies.filter((item) => item.audience === audience);

  function updateSelection(nextAudience: CaseAudience, nextFilter: CaseFilter) {
    setAudience(nextAudience);
    setFilter(nextFilter);
    const href = caseListHref(nextAudience, nextFilter).split("#")[0];
    window.history.replaceState(null, "", `${href}${window.location.hash}`);
  }

  return (
    <>
      <div className={styles.controls}>
        <div
          className={styles.audiences}
          role="group"
          aria-label="Partnership type"
        >
          {audiences.map((value) => (
            <button
              key={value}
              type="button"
              className={styles.audience}
              aria-pressed={value === audience}
              aria-controls="case-grid"
              onClick={() => updateSelection(value, "All")}
            >
              {value === "Brands" ? "Brand partnerships" : "Creator opportunities"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filter campaign formats"
        >
          {filters.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              className={styles.filter}
              aria-pressed={value === filter}
              aria-controls="case-grid"
              onClick={() => updateSelection(audience, value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div id="case-grid" className={styles.grid} aria-live="polite">
        {items
          .filter((i) => filter === "All" || i.category === filter)
          .map((item) => (
            <Link
              href={caseDetailHref(item.slug, filter)}
              key={item.slug}
              className={styles.card}
            >
              <div className={styles.cover}>
                <Image
                  src={`/images/case-formats/${item.image}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, (max-width: 1440px) 33vw, 414px"
                />
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span>
                    {item.category} /{" "}
                    {audience === "Brands" ? "CAMPAIGN FORMAT" : "CREATOR SUPPORT"}
                  </span>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </div>
                <h3 className={styles.title}>{item.cardTitle}</h3>
                <p className={styles.description}>{item.cardDescription}</p>
              </div>
            </Link>
          ))}
      </div>
      <div className={styles.enquiry}>
        <p>Looking for examples in your industry?</p>
        <Link href="/contact" className="text-link">
          Ask our team for a relevant selection
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </>
  );
}
