"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { navigation } from "@/lib/content";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
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
    };
  }, [open]);

  return (
    <>
      <header className="site-header" inert={open}>
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
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
          <Link className="header-cta" href="/contact">
            Let’s talk <ArrowUpRight size={17} />
          </Link>
          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
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
            <span className="eyebrow">GOOD CONNECTIONS START HERE</span>
            <button
              className="menu-close"
              aria-label="Close navigation"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
            >
              <X size={23} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {[
              { href: "/", label: "Home" },
              ...navigation,
              { href: "/contact", label: "Let’s talk" },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <small>0{i + 1}</small>
                {item.label}
                <ArrowUpRight />
              </Link>
            ))}
          </nav>
          <p>Los Angeles roots. Global connections.</p>
        </div>
      ) : null}
    </>
  );
}
