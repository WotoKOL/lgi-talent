"use client";

import { useEffect, useState } from "react";
import styles from "./case-contents.module.css";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "approach", label: "Our approach" },
  { id: "delivery", label: "Content & delivery" },
  { id: "outcome", label: "The outcome" },
];

export function CaseContents() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        const current = sections.find(({ id }) => visible.has(id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.nav} aria-label="In this story">
      {sections.map(({ id, label }, index) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          onClick={() => setActive(id)}
        >
          <span aria-hidden="true">0{index + 1}</span>
          {label}
        </a>
      ))}
    </nav>
  );
}
