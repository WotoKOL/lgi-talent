"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { brandServices, creatorServices } from "@/lib/content";
import "./capabilities.css";

type Audience = "brand" | "creator";

const audiences: Audience[] = ["brand", "creator"];
const audienceContent = {
  brand: {
    title: "Every Brand Partnership —",
    emphasis: ["Strategic, Creative,", "and Built to Execute."],
    description:
      "From target markets to final delivery, LGI coordinates creator resources, content collaboration, and on-the-ground execution for brands.",
    services: brandServices,
    href: "/brand-services",
    cta: "Explore Brand Services",
  },
  creator: {
    title: "Focus on Creating.",
    emphasis: ["Leave the Business", "to LGI."],
    description:
      "From choosing the right brands to completing each collaboration, LGI provides representation tailored to your positioning and partnership needs.",
    services: creatorServices,
    href: "/creators",
    cta: "Explore Creator Management",
  },
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const preference = window.matchMedia(reducedMotionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionSnapshot() {
  return true;
}

function useCapabilityReveal(sectionRef: RefObject<HTMLElement | null>) {
  const revealedRef = useRef(new WeakSet<HTMLElement>());
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      reduced ||
      getReducedMotionSnapshot() ||
      !("IntersectionObserver" in window) ||
      typeof Element.prototype.animate !== "function"
    ) return;

    let active = true;
    const revealed = revealedRef.current;
    const registered = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();

    function clearAnimation(element: HTMLElement) {
      animations.get(element)?.cancel();
      animations.delete(element);
      element.removeAttribute("data-capability-reveal-state");
    }

    function reveal(element: HTMLElement) {
      revealed.add(element);
      observer.unobserve(element);
      clearAnimation(element);
      if (!active || getReducedMotionSnapshot() || element.matches(":focus-within")) return;

      const kind = element.dataset.capabilityReveal;
      const card = kind === "card";
      const columns = window.matchMedia("(max-width: 620px)").matches
        ? 1
        : window.matchMedia("(max-width: 1000px)").matches ? 2 : 3;
      const order = Number(element.dataset.capabilityRevealOrder ?? 0);
      const delay = card
        ? (order % columns) * 85
        : Number(element.dataset.capabilityRevealDelay ?? 0);
      const tilt = card ? (order % 2 === 0 ? -1.1 : 1.1) : 0;
      const distance = card ? 52 : kind === "title" ? 42 : 30;
      const scale = card ? 0.965 : kind === "tabs" ? 0.99 : 1;

      element.dataset.capabilityRevealState = "animating";
      const animation = element.animate(
        [
          {
            opacity: 0,
            transform: `translate3d(0, ${distance}px, 0) rotate(${tilt}deg) scale(${scale})`,
          },
          { opacity: 1, transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)" },
        ],
        {
          duration: card ? 820 : kind === "tabs" ? 760 : 680,
          delay,
          easing: "cubic-bezier(.16,1,.3,1)",
          fill: "both",
        },
      );
      animations.set(element, animation);
      animation.onfinish = () => {
        if (animations.get(element) === animation) clearAnimation(element);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!active || getReducedMotionSnapshot()) return;
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting || revealed.has(element)) continue;
          // Stop observing at the first entrance, including while it animates.
          // Scrolling away must never hide or restart content already revealed.
          reveal(element);
        }
      },
      { threshold: 0.12 },
    );

    function registerTargets() {
      if (!active || !section || getReducedMotionSnapshot()) return;
      // AnimatePresence mounts the next panel after the previous one exits.
      // Register that panel when it arrives, without changing its transition.
      for (const element of section.querySelectorAll<HTMLElement>("[data-capability-reveal]")) {
        if (registered.has(element)) continue;
        registered.add(element);
        const bounds = element.getBoundingClientRect();
        if (revealed.has(element) || bounds.top < window.innerHeight) {
          // Also preserve visible or already-passed content after hydration or
          // a motion preference change; it does not need a scroll entrance.
          revealed.add(element);
          clearAnimation(element);
          continue;
        }
        element.dataset.capabilityRevealState = "pending";
        observer.observe(element);
      }
      for (const element of registered) {
        if (section.contains(element)) continue;
        observer.unobserve(element);
        clearAnimation(element);
        registered.delete(element);
      }
    }

    function revealFocused(event: FocusEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-capability-reveal]");
      if (element && section?.contains(element)) {
        revealed.add(element);
        observer.unobserve(element);
        clearAnimation(element);
      }
    }

    registerTargets();
    const panelObserver = new MutationObserver(registerTargets);
    panelObserver.observe(section, { childList: true, subtree: true });
    section.addEventListener("focusin", revealFocused);

    return () => {
      active = false;
      observer.disconnect();
      panelObserver.disconnect();
      section.removeEventListener("focusin", revealFocused);
      registered.forEach(clearAnimation);
    };
  }, [sectionRef, reduced]);

  return reduced;
}

export function Capabilities() {
  const [audience, setAudience] = useState<Audience>("brand");
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useCapabilityReveal(sectionRef);
  const content = audienceContent[audience];
  const entrance = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  };

  function selectAudience(next: Audience) {
    if (next === audience) return;
    setAudience(next);
    const section = sectionRef.current;
    if (
      section &&
      window.matchMedia("(max-width: 620px)").matches &&
      section.getBoundingClientRect().top < -80
    ) {
      section.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  return (
    <section
      ref={sectionRef}
      className="capabilities section-wrap"
      id="what-we-do"
      aria-label="Our core capabilities"
    >
      <div className="capability-section-top" data-capability-reveal="top">
        <div className="section-label">
          <span>02</span>OUR CORE CAPABILITIES
        </div>
        <span className="capability-section-mark" aria-hidden="true">
          ✳
        </span>
      </div>

      <div
        className="capability-switch"
        role="tablist"
        aria-label="Choose brand services or creator management"
        data-capability-reveal="tabs"
        data-capability-reveal-delay="75"
      >
        {audiences.map((item, index) => {
          const selected = item === audience;
          return (
            <button
              key={item}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${item}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectAudience(item)}
              onKeyDown={(event) => {
                if (
                  !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
                ) return;
                event.preventDefault();
                const next =
                  event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
                selectAudience(audiences[next]);
                tabs.current[next]?.focus();
              }}
            >
              {selected ? (
                <motion.span
                  className="capability-switch-fill"
                  layoutId={`${id}-selection`}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 340, damping: 35 }
                  }
                />
              ) : null}
              <span className="capability-switch-index" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="capability-switch-name">
                <span>For</span>{" "}
                <span>{item === "brand" ? "Brands" : "Creators"}</span>
              </span>
              <span className="capability-switch-arrow" aria-hidden="true">
                <ArrowDownRight size={30} strokeWidth={1.6} />
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${audience}`}
        tabIndex={0}
        className="capability-panel"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={audience}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.12 } }}
            variants={{
              hidden: { opacity: reduced ? 1 : 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: reduced ? 0 : 0.045 },
              },
            }}
          >
            <motion.div
              className="capability-overview"
              variants={entrance}
              transition={{ duration: reduced ? 0 : 0.35 }}
            >
              <h2 data-capability-reveal="title" data-capability-reveal-delay="90">
                <span>{content.title}</span>{" "}
                <em>
                  {content.emphasis.map((line, index) => (
                    <span key={line}>
                      {index > 0 ? " " : ""}{line}
                    </span>
                  ))}
                </em>
              </h2>
              <p data-capability-reveal="description" data-capability-reveal-delay="190">
                {content.description}
              </p>
            </motion.div>

            <div className="capability-cards">
              {content.services.map((service, index) => (
                <motion.article
                  className="capability-card"
                  key={service.title}
                  variants={entrance}
                  transition={{ duration: reduced ? 0 : 0.4 }}
                >
                  <Link
                    href={content.href}
                    data-capability-reveal="card"
                    data-capability-reveal-order={index}
                  >
                    <div className="capability-card-image">
                      <Image
                        src={`/images/${service.image}.webp`}
                        fill
                        alt=""
                        sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"
                      />
                      <span className="capability-card-number" aria-hidden="true">
                        0{index + 1}<span> / 06</span>
                      </span>
                      <span className="capability-card-arrow" aria-hidden="true">
                        <ArrowUpRight size={22} strokeWidth={1.6} />
                      </span>
                    </div>
                    <div className="capability-card-copy">
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <motion.div
              className="capability-more"
              variants={entrance}
              transition={{ duration: reduced ? 0 : 0.3 }}
            >
              <span data-capability-reveal="footer">Discover what we can do together.</span>
              <Link href={content.href} data-capability-reveal="footer" data-capability-reveal-delay="90">
                {content.cta}
                <span aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
