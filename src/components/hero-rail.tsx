"use client";
import Image from "next/image";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
const portraits = [
  ["hero-fashion", "A creator in sunglasses enjoying the sunshine"],
  ["hero-gamer", "A gaming creator outdoors"],
  ["hero-lifestyle", "A lifestyle creator wearing a yellow T-shirt"],
  ["hero-skater", "A skateboarder enjoying a sunny day"],
  ["hero-community", "Friends connecting under a blue sky"],
  ["hero-traveler", "A lifestyle creator outdoors"],
  ["hero-friends", "Creators spending time together"],
  ["hero-couple", "Two friends in the sunshine"],
];

const labels = [
  "OWN YOUR VOICE",
  "PLAY YOUR WAY",
  "MAKE IT MATTER",
  "KEEP MOVING",
  "STAY CONNECTED",
  "GO SOMEWHERE",
  "FIND YOUR PEOPLE",
  "CREATE TOGETHER",
];
export function HeroRail() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="hero-rail">
      <div
        className="hero-photo-window"
        aria-label="The people and perspectives behind every connection"
        data-paused={paused}
      >
        <div className="hero-photo-track">
          {[...portraits, ...portraits].map(([name, alt], i) => (
            <div
              className={`hero-portrait portrait-${i % 8}`}
              key={`${name}-${i}`}
              aria-hidden={i >= portraits.length ? true : undefined}
            >
              <Image
                src={`/images/${name}.webp`}
                fill
                alt={i >= portraits.length ? "" : alt}
                priority={i < 5}
                loading="eager"
                sizes="(max-width: 700px) 160px, 230px"
              />
              <span className="portrait-label">{labels[i % 8]}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="motion-toggle"
        aria-label={paused ? "Resume photo animation" : "Pause photo animation"}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
      </button>
    </div>
  );
}
