"use client";

import { useEffect, useRef } from "react";

function connectionPaths(width = 1000) {
  const x = (value: number) => Number((value * width / 1000).toFixed(3));
  return [
    `M${x(166.667)} 22H${x(500)}`,
    `M${x(500)} 22H${x(833.333)}`,
    `M${x(833.333)} 22H${x(966)}Q${x(990)} 22 ${x(990)} 46V108Q${x(990)} 130 ${x(966)} 130H${x(34)}Q${x(10)} 130 ${x(10)} 154V190Q${x(10)} 214 ${x(34)} 214H${x(125)}`,
    `M${x(125)} 214H${x(375)}`,
    `M${x(375)} 214H${x(625)}`,
    `M${x(625)} 214H${x(875)}`,
  ];
}

function chevronPath(width = 1000) {
  const x = (value: number) => Number((value * width / 1000).toFixed(3));
  return `M${x(326)} 16l${x(6)} 6-${x(6)} 6M${x(660)} 16l${x(6)} 6-${x(6)} 6M${x(244)} 208l${x(6)} 6-${x(6)} 6M${x(494)} 208l${x(6)} 6-${x(6)} 6M${x(744)} 208l${x(6)} 6-${x(6)} 6`;
}

const connections = connectionPaths();
const nodeDuration = 900;
const flowSpeed = 200; // Screen pixels per second, including the folded connector.
const signalLength = 24;

function cycleFrames(frames: Keyframe[], start: number, duration: number, cycle: number) {
  return [
    { ...frames[0], offset: 0 },
    ...frames.map((frame) => ({ ...frame, offset: (start + (frame.offset ?? 0) * duration) / cycle })),
    { ...frames[frames.length - 1], offset: 1 },
  ];
}

const nodeFrames: Keyframe[] = [
  { offset: 0, backgroundColor: "#121310", color: "#fff200", transform: "scale(1)", boxShadow: "0 0 0 0 #fff20000" },
  { offset: 0.28, backgroundColor: "#fff200", color: "#121310", transform: "scale(1.13)", boxShadow: "0 0 0 8px #fff20035" },
  { offset: 0.68, backgroundColor: "#fff200", color: "#121310", transform: "scale(1.08)", boxShadow: "0 0 0 11px #fff20016" },
  { offset: 1, backgroundColor: "#121310", color: "#fff200", transform: "scale(1)", boxShadow: "0 0 0 0 #fff20000" },
];

export function BrandProcessFlow({ steps }: { steps: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const flow = element;

    if (
      typeof IntersectionObserver === "undefined" ||
      typeof window.matchMedia !== "function" ||
      typeof flow.animate !== "function"
    ) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 761px)");
    const svg = flow.querySelector<SVGSVGElement>(".brand-process__connections");
    const tracks = Array.from(flow.querySelectorAll<SVGPathElement>(".brand-process__track"));
    const chevrons = flow.querySelector<SVGPathElement>(".brand-process__chevrons");
    const nodes = Array.from(flow.querySelectorAll<HTMLElement>(".brand-process__number"));
    const desktopEdges = Array.from(flow.querySelectorAll<SVGPathElement>(".brand-process__current"));
    const mobileEdges = Array.from(flow.querySelectorAll<HTMLElement>(".brand-process__mobile-current"));
    const animations: Animation[] = [];
    let inView = false;
    let initialized = false;
    let delay = 0;
    let layout = "";
    const observer = new IntersectionObserver((entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      syncPlayback();
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

    function cancelAnimations() {
      animations.forEach((animation) => animation.cancel());
      animations.length = 0;
    }

    function buildAnimations() {
      const previous = animations[0];
      const progress = previous?.effect?.getComputedTiming().progress ?? 0;
      const remainingDelay = previous ? Math.max(0, delay - Number(previous.currentTime ?? 0)) : 0;
      cancelAnimations();

      const width = flow.getBoundingClientRect().width;
      const paths = connectionPaths(width);
      // Match SVG units to CSS pixels so curves and straight lines share one speed.
      svg?.setAttribute("viewBox", `0 0 ${width} 304`);
      chevrons?.setAttribute("d", chevronPath(width));
      paths.forEach((path, index) => {
        tracks[index]?.setAttribute("d", path);
        desktopEdges[index]?.setAttribute("d", path);
      });

      const edges = desktop.matches ? desktopEdges : mobileEdges;
      const lengths = edges.map((edge) => desktop.matches
        ? (edge as SVGPathElement).getTotalLength()
        : edge.parentElement!.clientHeight);
      const travels = lengths.map((length) => (length + signalLength) / flowSpeed * 1000);
      const cycle = nodes.length * nodeDuration + travels.reduce((total, travel) => total + travel, 0);
      delay = initialized ? remainingDelay : 1050;
      initialized = true;
      let cursor = 0;

      function animate(target: Element, frames: Keyframe[], start: number, duration: number) {
        const animation = target.animate(cycleFrames(frames, start, duration, cycle), {
          delay, duration: cycle, iterations: Infinity, easing: "linear", fill: "none",
        });
        animation.pause();
        animation.currentTime = previous && !remainingDelay ? delay + progress * cycle : 0;
        animations.push(animation);
      }

      try {
        nodes.forEach((node, index) => {
          animate(node, nodeFrames, cursor, nodeDuration);
          cursor += nodeDuration;
          if (index === nodes.length - 1) return;

          const edge = edges[index];
          const travel = travels[index];
          if (edge) {
            const dash = signalLength / lengths[index] * 100;
            if (desktop.matches) (edge as SVGPathElement).style.strokeDasharray = `${dash} ${100 + dash}`;
            const frames: Keyframe[] = desktop.matches ? [
              { offset: 0, strokeDashoffset: String(dash), opacity: 0 },
              { offset: 0.08, strokeDashoffset: String(dash - (100 + dash) * 0.08), opacity: 1 },
              { offset: 0.9, strokeDashoffset: String(dash - (100 + dash) * 0.9), opacity: 1 },
              { offset: 1, strokeDashoffset: "-100", opacity: 0 },
            ] : [
              { offset: 0, transform: "translate3d(0, -24px, 0)", opacity: 0 },
              { offset: 0.1, opacity: 1 },
              { offset: 0.9, opacity: 1 },
              { offset: 1, transform: `translate3d(0, ${edge.parentElement!.clientHeight}px, 0)`, opacity: 0 },
            ];
            animate(edge, frames, cursor, travel);
          }
          cursor += travel;
        });
      } catch {
        cancelAnimations();
      }
    }

    function syncPlayback() {
      if (preference.matches) {
        cancelAnimations();
        flow.dataset.flowState = "complete";
        return;
      }
      if (!animations.length && inView) buildAnimations();
      const active = inView && !document.hidden;
      const now = document.timeline.currentTime;
      animations.forEach((animation) => {
        if (active && animation.playState !== "running") {
          const currentTime = Number(animation.currentTime ?? 0);
          animation.play();
          if (now !== null) animation.startTime = Number(now) - currentTime;
        } else if (!active && animation.playState === "running") {
          animation.pause();
        }
      });
      flow.dataset.flowState = animations.length ? (active ? "playing" : "paused") : "idle";
    }

    function refreshLayout() {
      const bounds = flow.getBoundingClientRect();
      const nextLayout = `${bounds.width.toFixed(1)}:${bounds.height.toFixed(1)}:${desktop.matches}`;
      if (layout === nextLayout) return;
      layout = nextLayout;
      if (animations.length) buildAnimations();
      syncPlayback();
    }

    flow.dataset.flowState = "idle";
    preference.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("resize", refreshLayout);
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(refreshLayout);
    resizeObserver?.observe(flow);
    observer.observe(flow);

    return () => {
      observer.disconnect();
      resizeObserver?.disconnect();
      cancelAnimations();
      preference.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      window.removeEventListener("resize", refreshLayout);
    };
  }, []);

  return (
    <div className="brand-process__flow" ref={ref} data-flow-state="idle">
      <svg
        className="brand-process__connections"
        viewBox="0 0 1000 304"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {connections.map((path) => <path className="brand-process__track" key={path} d={path} />)}
        <path className="brand-process__chevrons" d={chevronPath()} />
        {connections.map((path) => (
          <path
            className="brand-process__current"
            key={`current-${path}`}
            d={path}
            pathLength={100}
          />
        ))}
      </svg>
      <ol className="brand-process__steps" role="list">
        {steps.map((step, index) => (
          <li className="brand-process__step" key={step}>
            <span className="brand-process__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{step}</h3>
            {index < steps.length - 1 ? (
              <span className="brand-process__mobile-edge" aria-hidden="true">
                <span className="brand-process__mobile-current" />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
