"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, type KeyboardEvent, type PointerEvent, type RefObject } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { homeTalent, type HomeTalent } from "@/lib/home-talent";
import { Reveal } from "./motion";
import "./home-talent-carousel.css";

type Drag = {
  pointerId: number;
  startX: number;
  startY: number;
  scrollLeft: number;
  active: boolean;
};

type TalentEntrance = {
  pending: boolean;
  onReady: ((completed: boolean) => void) | null;
};

const autoAdvanceDelay = 3400;
const middleCopy = 2;

type TalentProfile = HomeTalent & { bio?: string };

type TalentCarouselProps = {
  className?: string;
  profiles?: TalentProfile[];
  id?: string;
  title?: string;
  description?: string;
  theme?: "light" | "dark";
};

function cycleWidth(track: HTMLDivElement) {
  const first = track.children[0] as HTMLElement | undefined;
  const middle = track.children[Number(track.dataset.talentCount)] as HTMLElement | undefined;
  return first && middle
    ? middle.getBoundingClientRect().left - first.getBoundingClientRect().left
    : 0;
}

function normalizeLoop(track: HTMLDivElement) {
  const width = cycleWidth(track);
  const origin = width * middleCopy;
  const current = track.scrollLeft;
  if (width > 0 && (current < origin - 2 || current >= origin + width - 2)) {
    const cycles = Math.floor((current - origin + 2) / width);
    const normalized = current - cycles * width;
    track.scrollTo({ left: normalized, behavior: "instant" });
  }
}

function cardPositions(track: HTMLDivElement) {
  const cards = Array.from(track.children) as HTMLElement[];
  const firstOffset = cards[0]?.getBoundingClientRect().left ?? 0;
  const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
  return [...new Set([
    0,
    ...cards.map((card) => Math.min(maximum, Math.max(0, card.getBoundingClientRect().left - firstOffset))),
    maximum,
  ])];
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function useTalentEntrance(trackRef: RefObject<HTMLDivElement | null>) {
  const entranceRef = useRef<TalentEntrance>({ pending: false, onReady: null });

  useLayoutEffect(() => {
    const entrance = entranceRef.current;
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined" || typeof track.animate !== "function") return;
    const interactionRoot = track.parentElement ?? track;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || track.getBoundingClientRect().bottom <= 0 || interactionRoot.contains(document.activeElement)) return;

    // Reveal the same middle copy used by the carousel. Animate its inner
    // surfaces so scale/translation cannot change the track's card positions.
    track.scrollTo({ left: cycleWidth(track) * middleCopy, behavior: "instant" });
    const surfaces = Array.from(track.querySelectorAll<HTMLElement>(".home-talent-card-surface"));
    const animations = new Set<Animation>();
    let started = false;
    let observer: IntersectionObserver | null = null;

    function clearEntrance() {
      started = true;
      observer?.disconnect();
      surfaces.forEach((surface) => surface.removeAttribute("data-talent-entrance"));
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }

    function finishEntrance(completed: boolean) {
      if (!entrance.pending) return;
      entrance.pending = false;
      entrance.onReady?.(completed);
    }

    function showImmediately() {
      clearEntrance();
      finishEntrance(false);
    }

    function enter() {
      if (started || !track) return;
      if (preference.matches) {
        showImmediately();
        return;
      }
      started = true;
      observer?.disconnect();
      const bounds = track.getBoundingClientRect();
      const visibleSurfaces = surfaces.filter((surface) => {
        const card = surface.parentElement!.getBoundingClientRect();
        return card.right > bounds.left && card.left < bounds.right;
      });
      // Clear every copy before starting: later slides and loop buffers stay
      // visible and never acquire another entrance animation at the seam.
      surfaces.forEach((surface) => surface.removeAttribute("data-talent-entrance"));
      try {
        visibleSurfaces.forEach((surface, index) => {
          const animation = surface.animate([
            { opacity: 0, transform: "translate3d(0, 40px, 0) scale(.975)" },
            { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
          ], {
            duration: 820,
            delay: index * 85,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "both",
          });
          animations.add(animation);
          animation.onfinish = () => {
            if (!animations.delete(animation)) return;
            animation.cancel();
            if (animations.size === 0) finishEntrance(true);
          };
        });
        if (visibleSurfaces.length === 0) finishEntrance(false);
      } catch {
        showImmediately();
      }
    }

    entrance.pending = true;
    surfaces.forEach((surface) => surface.setAttribute("data-talent-entrance", "pending"));
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) enter();
    }, { threshold: 0.12 });
    observer.observe(track);
    // Interacting must always expose the content immediately.
    interactionRoot.addEventListener("focusin", showImmediately);
    interactionRoot.addEventListener("pointerdown", showImmediately, { passive: true });
    preference.addEventListener("change", showImmediately);

    return () => {
      // Cleanup must not publish a completion or schedule a carousel advance.
      clearEntrance();
      entrance.pending = false;
      interactionRoot.removeEventListener("focusin", showImmediately);
      interactionRoot.removeEventListener("pointerdown", showImmediately);
      preference.removeEventListener("change", showImmediately);
    };
  }, [trackRef]);

  return entranceRef;
}

export function HomeTalentCarousel({ className = "" }: { className?: string }) {
  return <TalentCarousel className={className} />;
}

export function TalentCarousel({
  className = "",
  profiles = homeTalent,
  id = "home-talent",
  title = "SOME OF OUR TALENT",
  description,
  theme = "light",
}: TalentCarouselProps) {
  const trackId = `${id}-profiles`;
  const headingId = `${id}-heading`;
  const profileCount = profiles.length;
  // Buffer copies fill wide screens and let either end loop without reversing.
  const talentSlides = [0, 1, 2, 3, 4].flatMap((copy) =>
    profiles.map((creator, index) => ({ creator, index, copy })),
  );
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const suppressClickRef = useRef(false);
  const entranceRef = useTalentEntrance(trackRef);

  const scrollToPosition = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;
    targetRef.current = target;
    track.scrollTo({ left: target, behavior: scrollBehavior() });
  }, []);

  const scrollCards = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    if (targetRef.current === null) normalizeLoop(track);
    const positions = cardPositions(track);
    const current = targetRef.current ?? track.scrollLeft;
    const target = direction === 1
      ? positions.find((position) => position > current + 2) ?? positions.at(-1)!
      : positions.findLast((position) => position < current - 2) ?? 0;
    // Preserve the requested destination so fast clicks advance a full card.
    scrollToPosition(target);
  }, [scrollToPosition]);

  useEffect(() => {
    const entrance = entranceRef.current;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let hovered = false;
    let focused = section.contains(document.activeElement);
    let pointerDown = false;
    let width = 0;
    let autoTimer = 0;
    let settleTimer = 0;
    let advanceAfterEntrance = false;

    function stopAuto() {
      window.clearTimeout(autoTimer);
      autoTimer = 0;
    }

    function canAdvance() {
      return !entrance.pending && visible && !hovered && !focused &&
        !pointerDown && !document.hidden && !preference.matches;
    }

    function queueAuto() {
      stopAuto();
      if (!canAdvance()) return;
      autoTimer = window.setTimeout(() => {
        if (!canAdvance()) return;
        advanceAfterEntrance = false;
        scrollCards(1);
        queueAuto();
      }, advanceAfterEntrance ? 0 : autoAdvanceDelay);
    }

    function onEntranceReady(completed: boolean) {
      // Use the actual last animation's finish, with no extra reading delay.
      // A zero-delay timer lets focus/pointer pause handlers finish first.
      advanceAfterEntrance = completed;
      queueAuto();
    }

    function settle() {
      if (!track || pointerDown || dragRef.current?.active) return;
      targetRef.current = null;
      normalizeLoop(track);
      queueAuto();
    }

    function onScroll() {
      stopAuto();
      window.clearTimeout(settleTimer);
      // This also covers browsers without the scrollend event.
      settleTimer = window.setTimeout(settle, 140);
    }

    function measure() {
      if (!track) return;
      const nextWidth = cycleWidth(track);
      if (!nextWidth || Math.abs(nextWidth - width) < 0.5) return;
      const relative = width ? (track.scrollLeft - width * middleCopy) / width : 0;
      width = nextWidth;
      targetRef.current = null;
      track.scrollTo({ left: width * (middleCopy + relative), behavior: "instant" });
      normalizeLoop(track);
      queueAuto();
    }

    function onPointerEnter(event: globalThis.PointerEvent) {
      if (event.pointerType === "touch") return;
      hovered = true;
      stopAuto();
    }

    function onPointerLeave(event: globalThis.PointerEvent) {
      if (event.pointerType === "touch") return;
      hovered = false;
      queueAuto();
    }

    function onFocusIn() {
      focused = true;
      advanceAfterEntrance = false;
      stopAuto();
    }

    function onFocusOut(event: FocusEvent) {
      focused = event.relatedTarget instanceof Node && !!section?.contains(event.relatedTarget);
      queueAuto();
    }

    function onPointerDown() {
      pointerDown = true;
      advanceAfterEntrance = false;
      stopAuto();
    }

    function onPointerUp() {
      if (!pointerDown) return;
      pointerDown = false;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 140);
    }

    entrance.onReady = onEntranceReady;
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    if (track.firstElementChild) resizeObserver.observe(track.firstElementChild);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      queueAuto();
    }, { threshold: 0.15 });
    visibilityObserver.observe(section);
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("wheel", queueAuto, { passive: true });
    section.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    section.addEventListener("pointerenter", onPointerEnter);
    section.addEventListener("pointerleave", onPointerLeave);
    section.addEventListener("focusin", onFocusIn);
    section.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", queueAuto);
    preference.addEventListener("change", queueAuto);

    return () => {
      stopAuto();
      entrance.onReady = null;
      window.clearTimeout(settleTimer);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("wheel", queueAuto);
      section.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      section.removeEventListener("pointerenter", onPointerEnter);
      section.removeEventListener("pointerleave", onPointerLeave);
      section.removeEventListener("focusin", onFocusIn);
      section.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", queueAuto);
      preference.removeEventListener("change", queueAuto);
    };
  }, [scrollCards, entranceRef]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !event.isPrimary) return;
    targetRef.current = null;
    suppressClickRef.current = false;
    // Touch uses native momentum scrolling without blocking vertical scrolling.
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
      scrollToPosition(nearest);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      scrollCards(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const track = trackRef.current;
      if (track) {
        const width = cycleWidth(track);
        const origin = width * middleCopy;
        const first = track.children[profileCount * middleCopy] as HTMLElement;
        const last = track.children[profileCount * (middleCopy + 1) - 1] as HTMLElement;
        scrollToPosition(event.key === "Home" ? origin : origin + last.getBoundingClientRect().left - first.getBoundingClientRect().left);
      }
    }
  }

  return (
    <section ref={sectionRef} id={id} className={`home-talent${theme === "dark" ? " home-talent-dark" : ""} ${className}`} aria-labelledby={headingId} aria-roledescription="carousel">
      <Reveal className="home-talent-heading" duration={800}>
        <h2 id={headingId}>{title}</h2>
        {description ? <p className="home-talent-description">{description}</p> : null}
      </Reveal>
      <div className="home-talent-slider">
        <div
          ref={trackRef}
          id={trackId}
          className="home-talent-track"
          data-talent-count={profileCount}
          role="region"
          aria-label="Creator profiles. Use the left and right arrow keys to explore."
          tabIndex={0}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
          onWheel={() => { targetRef.current = null; }}
          onKeyDown={handleKeyDown}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={(event) => {
            if (!suppressClickRef.current || event.detail === 0) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }}
        >
          {talentSlides.map(({ creator, index, copy }) => (
            <article
              key={`${copy}-${creator.id}`}
              className="home-talent-card"
              data-talent-copy={copy !== middleCopy ? "true" : undefined}
              role="group"
              aria-roledescription="slide"
              aria-hidden={copy !== middleCopy ? true : undefined}
              aria-label={`${index + 1} of ${profileCount}`}
            >
              <div className="home-talent-card-surface">
                <div className="home-talent-photo">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    fill
                    draggable={false}
                    sizes="(max-width: 620px) 78vw, 300px"
                    style={{ objectPosition: creator.objectPosition ?? "center" }}
                  />
                </div>
                <div className="home-talent-copy">
                  <h3>{creator.name}</h3>
                  <p>{creator.category} <span>· {creator.followers} followers</span></p>
                  {creator.bio ? <p className="home-talent-bio">{creator.bio}</p> : null}
                  <a
                    className="home-talent-profile"
                    href={creator.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    tabIndex={copy !== middleCopy ? -1 : undefined}
                    onFocus={copy !== middleCopy ? () => {
                      // Pointer users can open visible copies; keep assistive
                      // focus on the equivalent, accessible profile link.
                      const original = trackRef.current?.children[profileCount * middleCopy + index];
                      original?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
                    } : undefined}
                    aria-label={`View ${creator.name}’s profile (opens in a new tab)`}
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="home-talent-arrow home-talent-arrow-previous"
          aria-label="Previous talent"
          aria-controls={trackId}
          onClick={() => scrollCards(-1)}
        >
          <ArrowLeft size={27} strokeWidth={1.35} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="home-talent-arrow home-talent-arrow-next"
          aria-label="Next talent"
          aria-controls={trackId}
          onClick={() => scrollCards(1)}
        >
          <ArrowRight size={27} strokeWidth={1.35} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
