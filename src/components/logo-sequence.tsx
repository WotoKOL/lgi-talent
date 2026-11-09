"use client";

import { useId, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import "./logo-sequence.css";

export function LogoSequence({
  children,
  variant = "default",
  direction = "left",
  label,
}: {
  children: ReactNode;
  variant?: "default" | "home";
  direction?: "left" | "right";
  label?: string;
}) {
  const [paused, setPaused] = useState(false);
  const trackId = useId();
  const controlLabel = paused
    ? "Resume brand logo scrolling"
    : "Pause brand logo scrolling";

  return (
    <div
      className={`logo-marquee${variant === "home" ? " logo-marquee--home" : ""}`}
      data-paused={paused}
      data-direction={direction}
    >
      <div
        className="logo-marquee__window"
        tabIndex={variant === "home" ? 0 : undefined}
        role={variant === "home" ? "group" : undefined}
        aria-label={
          variant === "home"
            ? label ?? "Partner brands. Hover or focus to pause scrolling."
            : undefined
        }
      >
        <div className="logo-marquee__track" id={trackId}>
          <div className="logo-marquee__group">{children}</div>
          <div className="logo-marquee__group" aria-hidden="true" inert>
            {children}
          </div>
        </div>
      </div>
      {variant === "default" ? (
        <button
          className="logo-marquee__toggle"
          type="button"
          aria-label={controlLabel}
          aria-controls={trackId}
          aria-pressed={paused}
          title={controlLabel}
          onClick={() => setPaused((previous) => !previous)}
        >
          {paused ? (
            <Play size={14} aria-hidden="true" />
          ) : (
            <Pause size={14} aria-hidden="true" />
          )}
        </button>
      ) : null}
    </div>
  );
}
