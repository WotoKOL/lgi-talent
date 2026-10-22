"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

const driftDuration = 650;
const driftStagger = 55;

export function LogoSequence({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid) return;

    if (
      typeof window.matchMedia !== "function" ||
      typeof IntersectionObserver === "undefined" ||
      typeof grid.animate !== "function" ||
      grid.getBoundingClientRect().bottom <= 0
    ) {
      grid.dataset.logoSequence = "complete";
      return;
    }

    const logos = Array.from(grid.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    let started = false;
    let finished = false;

    function finish() {
      finished = true;
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      grid!.dataset.logoSequence = "complete";
    }

    function enter() {
      if (started || finished) return;
      started = true;
      observer?.disconnect();
      if (preference.matches) {
        finish();
        return;
      }
      grid!.dataset.logoSequence = "playing";
      animations.forEach((animation) => animation.play());
    }

    function onPreferenceChange(event: MediaQueryListEvent) {
      if (event.matches) finish();
    }

    preference.addEventListener("change", onPreferenceChange);
    grid.addEventListener("focusin", finish);
    if (preference.matches || !logos.length || grid.contains(document.activeElement)) {
      finish();
    } else {
      try {
        // Grid placement follows DOM order at every breakpoint: each row drifts
        // down from left to right, then continues with the next row.
        logos.forEach((logo, index) => {
          const animation = logo.animate([
            { opacity: 0, transform: "translate3d(0, -24px, 0)" },
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
          ], {
            duration: driftDuration,
            delay: index * driftStagger,
            easing: "cubic-bezier(.22,.8,.25,1)",
            fill: "both",
          });
          // Prepare before paint, keeping server-rendered logos visible when
          // JavaScript or motion support is unavailable.
          animation.pause();
          animation.currentTime = 0;
          animations.add(animation);
          animation.addEventListener("finish", () => {
            animations.delete(animation);
            animation.cancel();
            if (!animations.size) finish();
          }, { once: true });
        });
        observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) enter();
        }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
        observer.observe(grid);
      } catch {
        finish();
      }
    }

    return () => {
      finish();
      preference.removeEventListener("change", onPreferenceChange);
      grid.removeEventListener("focusin", finish);
    };
  }, []);

  return <div ref={ref} className="logo-grid" data-logo-sequence="idle">{children}</div>;
}
