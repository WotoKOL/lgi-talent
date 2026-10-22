"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { navigation } from "@/lib/content";

const primaryNavigation = [{ href: "/", label: "Home" }, ...navigation];
const lightHeaderRoutes = new Set(["/privacy", "/cookies", "/terms"]);

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = toggleRef.current;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const wideScreen = window.matchMedia("(min-width: 1041px)");
    function onWideScreen(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    wideScreen.addEventListener("change", onWideScreen);
    const first = menuRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
      if (event.key === "Tab") {
        const links =
          menuRef.current?.querySelectorAll<HTMLElement>("button, a");
        if (!links?.length) return;
        if (event.shiftKey && document.activeElement === links[0]) {
          event.preventDefault();
          links[links.length - 1].focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === links[links.length - 1]
        ) {
          event.preventDefault();
          links[0].focus();
        }
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", keydown);
      wideScreen.removeEventListener("change", onWideScreen);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`site-header${lightHeaderRoutes.has(pathname) ? " site-header-light" : ""}`}
        inert={open}
      >
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            className="header-cta"
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            <span>Let’s talk</span>
            <span className="header-cta-arrow" aria-hidden="true">
              <ArrowUpRight size={16} />
            </span>
          </Link>
          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((previous) => !previous)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {open ? (
        <div
          className="mobile-menu"
          id="mobile-navigation"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="mobile-menu-top">
            <Brand onClick={() => setOpen(false)} />
            <button
              className="menu-close"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
            >
              <X size={23} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {[
              ...primaryNavigation,
              { href: "/contact", label: "Let’s talk" },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <small>0{i + 1}</small>
                {item.label}
                <ArrowUpRight />
              </Link>
            ))}
          </nav>
          <p>
            <span className="status-dot" aria-hidden="true" />
            Los Angeles roots. Global connections.
          </p>
        </div>
      ) : null}
    </>
  );
}
