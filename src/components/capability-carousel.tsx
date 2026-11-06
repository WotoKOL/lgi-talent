"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { brandServices } from "@/lib/content";

type Drag = {
  pointerId: number;
  startX: number;
  startY: number;
  scrollLeft: number;
  active: boolean;
};

function cardPositions(track: HTMLDivElement) {
  const cards = Array.from(track.children) as HTMLElement[];
  const firstOffset = cards[0]?.offsetLeft ?? 0;
  const maximum = track.scrollWidth - track.clientWidth;
  return [...new Set([
    0,
    ...cards.map((card) => Math.min(maximum, card.offsetLeft - firstOffset)),
    maximum,
  ])];
}

export function CapabilityCarousel({
  id,
  services,
  href,
  label,
  reduced,
}: {
  id: string;
  services: typeof brandServices;
  href: string;
  label: string;
  reduced: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const suppressClickRef = useRef(false);
  const [edges, setEdges] = useState({ start: true, end: false });
  const entrance = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateEdges() {
      if (!track) return;
      const start = track.scrollLeft <= 2;
      const end = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      setEdges((previous) => previous.start === start && previous.end === end
        ? previous : { start, end });
      if (targetRef.current !== null && Math.abs(track.scrollLeft - targetRef.current) < 2) {
        targetRef.current = null;
      }
    }

    const observer = new ResizeObserver(() => {
      targetRef.current = null;
      updateEdges();
    });
    observer.observe(track);
    Array.from(track.children).forEach((card) => observer.observe(card));
    track.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateEdges);
    };
  }, []);

  function scrollCards(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const positions = cardPositions(track);
    const current = targetRef.current ?? track.scrollLeft;
    const target = direction === 1
      ? positions.find((position) => position > current + 2) ?? positions.at(-1)!
      : positions.findLast((position) => position < current - 2) ?? 0;
    // Keep the requested destination while smooth scrolling, so rapid clicks
    // advance from the last request rather than an intermediate animation frame.
    targetRef.current = target;
    track.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !event.isPrimary) return;
    targetRef.current = null;
    suppressClickRef.current = false;
    // Touch keeps native horizontal swiping and vertical page scrolling.
    if (event.pointerType === "touch") return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: event.currentTarget.scrollLeft,
      active: false,
    };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if ((event.buttons & 1) === 0) {
      finishDrag(event);
      return;
    }
    const distance = event.clientX - drag.startX;
    if (!drag.active) {
      if (Math.abs(distance) < 6 || Math.abs(distance) <= Math.abs(event.clientY - drag.startY)) return;
      drag.active = true;
      suppressClickRef.current = true;
      event.currentTarget.dataset.dragging = "true";
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    event.currentTarget.scrollTo({ left: drag.scrollLeft - distance, behavior: "instant" });
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    const track = event.currentTarget;
    const current = track.scrollLeft;
    delete track.dataset.dragging;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    if (drag.active) {
      const nearest = cardPositions(track).reduce((best, position) =>
        Math.abs(position - current) < Math.abs(best - current) ? position : best);
      targetRef.current = nearest;
      track.scrollTo({ left: nearest, behavior: reduced ? "auto" : "smooth" });
    }
  }

  return (
    <>
      <div className="capability-slider-controls">
        <span>Explore our services</span>
        <div>
          <button type="button" aria-label="Previous services" aria-controls={id} disabled={edges.start} onClick={() => scrollCards(-1)}>
            <ArrowLeft size={20} />
          </button>
          <button type="button" aria-label="Next services" aria-controls={id} disabled={edges.end} onClick={() => scrollCards(1)}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        id={id}
        className="capability-cards"
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
        onWheel={() => { targetRef.current = null; }}
        onKeyDown={() => { targetRef.current = null; }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (!suppressClickRef.current || event.detail === 0) return;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {services.map((service, index) => (
          <motion.article
            className="capability-card"
            key={service.title}
            variants={entrance}
            transition={{ duration: reduced ? 0 : 0.4 }}
          >
            <Link href={href} draggable={false} data-capability-reveal="card" data-capability-reveal-order={index}>
              <div className="capability-card-image">
                <Image src={`/images/${service.image}.webp`} fill alt="" draggable={false} sizes="(max-width: 620px) 300px, 340px" />
              </div>
              <div className="capability-card-copy">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </>
  );
}
