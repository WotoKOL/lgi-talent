"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          element.animate(
            [
              { opacity: 0, transform: "translateY(30px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 750,
              delay,
              easing: "cubic-bezier(.2,.8,.2,1)",
              fill: "backwards",
            },
          );
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        const start = performance.now();
        function update(now: number) {
          const progress = Math.min((now - start) / 1600, 1);
          element!.textContent =
            Math.round(value * (1 - (1 - progress) ** 3)).toLocaleString(
              "en-US",
            ) + suffix;
          if (progress < 1) frame = requestAnimationFrame(update);
        }
        frame = requestAnimationFrame(update);
        observer.disconnect();
      },
      { threshold: 0.8 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix]);
  return (
    <span ref={ref}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
