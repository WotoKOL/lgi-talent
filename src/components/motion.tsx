"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

type RevealVariant = "rise" | "left" | "right" | "scale" | "image";
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  stagger?: number;
  duration?: number;
};

const easing = "cubic-bezier(.16,1,.3,1)";
const numberFormatter = new Intl.NumberFormat("en-US");

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
  stagger = 0,
  duration = 900,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (
      !element ||
      typeof window.matchMedia !== "function" ||
      typeof IntersectionObserver === "undefined" ||
      typeof element.animate !== "function"
    ) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const milliseconds = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;
    const animationDuration = milliseconds(duration);
    if (preference.matches || animationDuration === 0) return;

    // Content remains visible in server HTML and without JavaScript. Prepare it
    // only after hydration, before the next paint, without changing its layout.
    // Already-passed content must stay visible when restoring a scroll position.
    if (element.getBoundingClientRect().bottom <= 0) return;

    const childElements = Array.from(element.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    );
    const interval = milliseconds(stagger);
    const targets = interval > 0 && childElements.length ? childElements : [element];
    const originals = targets.map((target) => {
      const computed = window.getComputedStyle(target);
      return {
        target,
        opacity: target.style.getPropertyValue("opacity"),
        priority: target.style.getPropertyPriority("opacity"),
        visibleOpacity: computed.opacity,
        transform: computed.transform === "none" ? "" : computed.transform,
      };
    });
    const pending = new Set(targets);
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    let started = false;
    let disposed = false;

    function restoreOpacity(original: (typeof originals)[number]) {
      if (!pending.delete(original.target)) return;
      if (original.opacity) {
        original.target.style.setProperty("opacity", original.opacity, original.priority);
      } else {
        original.target.style.removeProperty("opacity");
      }
    }

    function showImmediately() {
      started = true;
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      originals.forEach(restoreOpacity);
    }

    function enter() {
      if (started || disposed) return;
      started = true;
      observer?.disconnect();
      if (preference.matches) {
        showImmediately();
        return;
      }

      try {
        originals.forEach((original, index) => {
          const base = original.transform;
          const transforms: Record<RevealVariant, string> = {
            rise: `translate3d(0, 56px, 0) ${base}`,
            left: `translate3d(-64px, 0, 0) ${base}`,
            right: `translate3d(64px, 0, 0) ${base}`,
            scale: `translate3d(0, 40px, 0) scale(.92) ${base}`,
            image: `translate3d(0, 44px, 0) scale(1.055) ${base}`,
          };
          const from: Keyframe = { opacity: 0, transform: transforms[variant].trim() };
          const to: Keyframe = { opacity: original.visibleOpacity, transform: base || "none" };
          if (variant === "image") {
            from.clipPath = "inset(0 0 96% 0)";
            to.clipPath = "inset(-12% -12% -12% -12%)";
          }
          const animation = original.target.animate([from, to], {
            duration: animationDuration,
            delay: milliseconds(delay) + index * interval,
            easing,
            fill: "both",
          });
          animations.add(animation);
          // The animation's backwards fill now hides each delayed target, so its
          // original inline opacity can be restored before the first frame.
          restoreOpacity(original);
          animation.addEventListener("finish", () => {
            animations.delete(animation);
            // Drop fill effects, transforms, and image clipping; protruding
            // stickers and CSS hover states can then render normally again.
            animation.cancel();
          }, { once: true });
        });
      } catch {
        // A browser lacking any requested animation feature still gets content.
        showImmediately();
      }
    }

    function motionChanged(event: MediaQueryListEvent) {
      if (event.matches) showImmediately();
    }

    element.addEventListener("focusin", showImmediately);
    preference.addEventListener("change", motionChanged);

    if (element.contains(document.activeElement)) {
      showImmediately();
    } else {
      targets.forEach((target) => target.style.setProperty("opacity", "0"));
      // A zero threshold triggers even a very tall section as soon as its edge
      // enters the viewport, instead of requiring an unreachable visible ratio.
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) enter();
      }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
      observer.observe(element);
    }

    return () => {
      disposed = true;
      showImmediately();
      element.removeEventListener("focusin", showImmediately);
      preference.removeEventListener("change", motionChanged);
    };
  }, [delay, duration, stagger, variant]);

  return <div ref={ref} className={className}>{children}</div>;
}

export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || typeof window.matchMedia !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finalText = numberFormatter.format(value) + suffix;
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    let finished = false;
    let started = false;

    function showFinalValue() {
      finished = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      element!.textContent = finalText;
    }

    function motionChanged(event: MediaQueryListEvent) {
      if (event.matches) showFinalValue();
    }

    preference.addEventListener("change", motionChanged);
    // Keep the complete value in server HTML and when restoring a visible or
    // already-passed section. Only reset below the viewport, before paint, so a
    // visible final value never jumps backwards when hydration attaches.
    if (
      preference.matches ||
      typeof IntersectionObserver === "undefined" ||
      element.getBoundingClientRect().top < window.innerHeight
    ) {
      showFinalValue();
    } else {
      element.textContent = numberFormatter.format(0) + suffix;
      observer = new IntersectionObserver((entries) => {
        if (finished || started || !entries.some((entry) => entry.isIntersecting)) return;
        started = true;
        observer?.disconnect();
        const start = performance.now();
        function update(now: number) {
          if (finished) return;
          const progress = Math.min((now - start) / 1800, 1);
          if (progress >= 1) {
            showFinalValue();
          } else {
            element!.textContent = numberFormatter.format(
              Math.round(value * (1 - (1 - progress) ** 3)),
            ) + suffix;
            frame = requestAnimationFrame(update);
          }
        }
        frame = requestAnimationFrame(update);
      }, { threshold: 0.35, rootMargin: "0px 0px -12% 0px" });
      observer.observe(element);
    }
    return () => {
      showFinalValue();
      preference.removeEventListener("change", motionChanged);
    };
  }, [value, suffix]);

  const finalText = numberFormatter.format(value) + suffix;
  return (
    <span>
      <span className="counter-accessible-value">{finalText}</span>
      <span ref={ref} aria-hidden="true">{finalText}</span>
    </span>
  );
}
