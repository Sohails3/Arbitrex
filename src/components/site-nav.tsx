"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { TOOLS } from "@/lib/tools";

// The two tools sit at the top level rather than under a "Products" menu —
// the point of the site is that there is more than one of them.
const LINKS = [
  { href: "/services", label: "Services" },
  ...TOOLS.map(({ href, nav }) => ({ href, label: nav })),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  // next.config sets trailingSlash, so usePathname reports "/services/". Strip
  // it so the comparison against LINKS ("/services") matches.
  const pathname = usePathname().replace(/\/+$/, "") || "/";
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
      <div className="container-page flex items-center justify-between gap-6">
        <Link href="/" className="group inline-flex items-center gap-3" aria-label="Arbitrex home">
          <Image
            src="/assets/logo-256.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 rounded-xl transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-105"
          />
          <span className="text-base font-bold tracking-wide text-slate-100">Arbitrex</span>
        </Link>

        {/* Six items now the tools are top level, so this collapses at lg. */}
        <nav className="mx-auto flex items-center gap-0.5 max-lg:hidden" aria-label="Primary">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-xl px-2.5 py-2.5 text-sm whitespace-nowrap transition-colors duration-150",
                  "after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:rounded-full",
                  "after:origin-left after:scale-x-0 after:bg-gold-400",
                  "after:transition-transform after:duration-300 after:ease-[var(--ease-brand)]",
                  active
                    ? "font-semibold text-gold-400 after:scale-x-100"
                    : "font-medium text-slate-500 hover:bg-navy-850 hover:text-slate-200 hover:after:scale-x-100 hover:after:bg-navy-600",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gold-500 px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-gold-400"
          >
            Get in touch
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="hidden size-11 items-center justify-center rounded-sm border border-navy-700 bg-navy-900 text-slate-300 max-lg:inline-flex"
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>
        </div>

        {open && (
          <div className="absolute inset-x-4 top-19 flex flex-col gap-1 rounded-2xl border border-navy-800 bg-navy-900 p-2 shadow-elevated lg:hidden">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm",
                  pathname === href
                    ? "bg-gold-400/10 font-semibold text-gold-400"
                    : "font-medium text-slate-500 hover:bg-navy-850 hover:text-slate-200",
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
