"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

export function Capabilities() {
  const [audience, setAudience] = useState<Audience>("brand");
  const reduced = useReducedMotion();
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const content = audienceContent[audience];
  const entrance = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
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
      <div className="capability-section-top">
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
              <h2>
                <span>{content.title}</span>{" "}
                <em>
                  {content.emphasis.map((line, index) => (
                    <span key={line}>
                      {index > 0 ? " " : ""}{line}
                    </span>
                  ))}
                </em>
              </h2>
              <p>{content.description}</p>
            </motion.div>

            <div className="capability-cards">
              {content.services.map((service, index) => (
                <motion.article
                  className="capability-card"
                  key={service.title}
                  variants={entrance}
                  transition={{ duration: reduced ? 0 : 0.4 }}
                >
                  <Link href={content.href}>
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
              <span>Discover what we can do together.</span>
              <Link href={content.href}>
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
