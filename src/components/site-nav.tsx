"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#product", label: "Product" },
  { href: "#provenance", label: "Provenance" },
  { href: "#process", label: "How it works" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lastY = useRef(0);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Nav chrome: hairline once scrolled, retracts downward, returns on scroll up.
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setStuck(y > 8);
        if (!openRef.current && y > 240 && y > lastY.current + 4) setHidden(true);
        else if (y < lastY.current - 4 || y <= 240) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section is centred in the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-100 flex h-19 items-center",
        "bg-navy-950/85 backdrop-blur-md backdrop-saturate-150",
        "border-b border-transparent",
        "transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-brand)]",
        stuck && "border-navy-800 shadow-card",
        hidden && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-8 px-8 max-md:px-5">
        <a href="#" className="group inline-flex items-center gap-3" aria-label="Arbitrex home">
          <Image
            src="/assets/logo-256.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 rounded-xl transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-105"
          />
          <span className="text-base font-bold tracking-wide text-slate-100">Arbitrex</span>
        </a>

        <nav className="mx-auto flex items-center gap-1 max-md:hidden" aria-label="Primary">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                active === href
                  ? "bg-gold-400/10 text-gold-400"
                  : "text-slate-500 hover:bg-navy-850 hover:text-slate-200",
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gold-500 px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-gold-400"
          >
            Request access
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="hidden size-11 items-center justify-center rounded-sm border border-navy-700 bg-navy-900 text-slate-300 max-md:inline-flex"
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>
        </div>

        {open && (
          <div className="absolute inset-x-4 top-19 flex flex-col gap-1 rounded-2xl border border-navy-800 bg-navy-900 p-2 shadow-elevated md:hidden">
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-500 hover:bg-navy-850 hover:text-slate-200"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
