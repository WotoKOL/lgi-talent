"use client";

import { useEffect, useRef } from "react";
import "./home-scroll-motion.css";

type ScrollGroup = {
  element: HTMLElement;
  kind: "hero" | "band" | "creator" | "work" | "cta";
  direction?: number;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function HomeScrollMotion() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const home = progress?.closest<HTMLElement>("main");
    if (!progress || !home?.querySelector(".home-hero")) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const groups: ScrollGroup[] = [];
    const visible = new Set<ScrollGroup>();
    const properties = new Map<HTMLElement, Set<string>>();
    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let frame = 0;
    let enabled = false;
    let disposed = false;

    function addGroup(selector: string, kind: ScrollGroup["kind"]) {
      home!.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        groups.push({
          element,
          kind,
          direction: kind === "work" && index % 2 ? -0.85 : 1,
        });
      });
    }

    addGroup(".home-hero", "hero");
    addGroup(".statement-band", "band");
    addGroup(".creator-feature-photo", "creator");
    addGroup(".home-work-grid .photo", "work");
    addGroup(".cta-section", "cta");

    const groupByElement = new Map(groups.map((group) => [group.element, group]));
    const photoWindow = home.querySelector<HTMLElement>(".hero-photo-window");

    function write(element: HTMLElement, property: string, value: string) {
      if (!properties.has(element)) properties.set(element, new Set());
      properties.get(element)!.add(property);
      element.style.setProperty(property, value);
    }

    function update() {
      frame = 0;
      if (!enabled || disposed || document.hidden) return;

      const viewportHeight = window.innerHeight;
      const mobile = window.innerWidth <= 760;
      const scrollRange = Math.max(
        1,
        document.documentElement.scrollHeight - viewportHeight,
      );
      const readingProgress = clamp(window.scrollY / scrollRange);

      // Read visible geometry together before making any visual writes.
      const measurements = Array.from(visible, (group) => ({
        group,
        rect: group.element.getBoundingClientRect(),
      }));

      write(progress!, "--home-read-progress", readingProgress.toFixed(5));

      for (const { group, rect } of measurements) {
        const through = clamp(
          (viewportHeight - rect.top) / (viewportHeight + rect.height),
        );
        const centered = through * 2 - 1;

        if (group.kind === "hero") {
          const exit = clamp(-rect.top / Math.max(1, rect.height * 0.8));
          write(
            group.element,
            "--home-hero-y",
            `${(exit * (mobile ? 14 : 44)).toFixed(2)}px`,
          );
          write(
            group.element,
            "--home-hero-opacity",
            (1 - exit * (mobile ? 0.08 : 0.2)).toFixed(3),
          );
          // The rail's existing pause control also holds its scroll offset.
          if (photoWindow?.dataset.paused !== "true") {
            write(
              group.element,
              "--home-rail-y",
              `${(-exit * (mobile ? 5 : 15)).toFixed(2)}px`,
            );
          }
        } else if (group.kind === "band") {
          write(
            group.element,
            "--home-band-x",
            `${(centered * (mobile ? 16 : 42)).toFixed(2)}px`,
          );
          write(
            group.element,
            "--home-band-turn",
            `${(centered * (mobile ? 45 : 110)).toFixed(2)}deg`,
          );
        } else if (group.kind === "creator" || group.kind === "work") {
          // Overscan in CSS exceeds the maximum offset, including at the edges.
          const amplitude = Math.min(
            mobile ? 12 : 30,
            rect.height * (mobile ? 0.022 : 0.045),
          );
          write(
            group.element,
            "--home-photo-y",
            `${(centered * amplitude * (group.direction ?? 1)).toFixed(2)}px`,
          );
          if (group.kind === "creator") {
            write(
              group.element,
              "--home-sticker-turn",
              `${(centered * (mobile ? 2 : 4)).toFixed(2)}deg`,
            );
          }
        } else if (group.kind === "cta") {
          // Preserve the watermark's existing rotation and move its whole layer.
          write(
            group.element,
            "--home-cta-y",
            `${(centered * (mobile ? 12 : 36)).toFixed(2)}px`,
          );
        }
      }
    }

    function schedule() {
      if (!enabled || disposed || frame || document.hidden) return;
      frame = window.requestAnimationFrame(update);
    }

    function onVisibilityChange() {
      if (document.hidden && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (!document.hidden) {
        schedule();
      }
    }

    function stop() {
      enabled = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      observer?.disconnect();
      resizeObserver?.disconnect();
      observer = null;
      resizeObserver = null;
      visible.clear();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      home!.classList.remove("lgi-home-motion");
      delete progress!.dataset.active;
      properties.forEach((names, element) => {
        names.forEach((property) => element.style.removeProperty(property));
      });
      properties.clear();
    }

    function start() {
      if (enabled || disposed) return;
      enabled = true;
      home!.classList.add("lgi-home-motion");
      progress!.dataset.active = "true";
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const group = groupByElement.get(entry.target as HTMLElement);
          if (!group) continue;
          if (entry.isIntersecting) visible.add(group);
          else visible.delete(group);
        }
        schedule();
      });
      groups.forEach(({ element }) => observer!.observe(element));
      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(home!);
      resizeObserver.observe(document.documentElement);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      document.addEventListener("visibilitychange", onVisibilityChange);
      schedule();
    }

    function onPreferenceChange() {
      if (preference.matches) stop();
      else start();
    }

    preference.addEventListener("change", onPreferenceChange);
    onPreferenceChange();
    document.fonts.ready.then(schedule);

    return () => {
      disposed = true;
      preference.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, []);

  return (
    <div
      ref={progressRef}
      className="home-scroll-progress"
      aria-hidden="true"
    />
  );
}
