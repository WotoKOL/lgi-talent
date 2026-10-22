"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import "./team-accordion.css";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  text: string;
};

export function TeamAccordion({ members }: { members: TeamMember[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % members.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + members.length) % members.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = members.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    buttons.current[nextIndex]?.focus({ preventScroll: true });
  }

  return (
    <div className="team-accordion" role="group" aria-label="Meet the LGI team">
      {members.map((person, index) => {
        const active = activeIndex === index;
        const panelId = `${id}-details-${index}`;

        return (
          <article
            className={`team-accordion__panel${active ? " is-active" : ""}`}
            key={person.name}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" || event.pointerType === "pen") {
                setActiveIndex(index);
              }
            }}
          >
            <Image
              className="team-accordion__portrait"
              src={`/images/${person.image}.png`}
              alt={`${person.name}, ${person.role}`}
              fill
              unoptimized
              sizes="(max-width: 700px) 100vw, 60vw"
            />
            <span className="team-accordion__shade" aria-hidden="true" />
            <span className="team-accordion__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="team-accordion__symbol" aria-hidden="true" />
            <span className="team-accordion__collapsed-name" aria-hidden="true">
              {person.name}
            </span>
            <div
              className="team-accordion__details"
              id={panelId}
              aria-hidden={!active}
            >
              <span className="team-accordion__role">{person.role}</span>
              <h3>{person.name}</h3>
              <p>{person.text}</p>
            </div>
            <button
              className="team-accordion__trigger"
              type="button"
              aria-label={`${person.name}, ${person.role}`}
              aria-expanded={active}
              aria-controls={panelId}
              ref={(element) => { buttons.current[index] = element; }}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
          </article>
        );
      })}
    </div>
  );
}
