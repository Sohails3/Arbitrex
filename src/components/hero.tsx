"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, ShieldCheck } from "lucide-react";
import { DataRow, PanelBar } from "@/components/data-row";
import { Reveal } from "@/components/reveal";
import { SplitWords } from "@/components/split-words";

// PLACEHOLDER DATA — illustrative rows only.
const ROWS = [
  { name: "Northfield Ltd", value: "£4.2m", variant: "filed", initials: "NF", color: "#7A1E32" },
  { name: "Halden Group", value: "£11.8m", variant: "estimated", initials: "HL", color: "#0891b2" },
  { name: "Bramley & Co", value: "£2.6m", variant: "register", initials: "BR", color: "#d97706" },
  { name: "Calverton Holdings", value: "£8.9m", variant: "filed", initials: "CV", color: "#059669" },
] as const;

export function Hero() {
  const [shift, setShift] = useState(0);
  const ticking = useRef(false);

  // Panel counter-drifts against the scroll, clamped so it never separates
  // from its column.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        if (window.innerWidth > 1024) {
          setShift(Math.max(-40, Math.min(40, window.scrollY * -0.06)));
        } else {
          setShift(0);
        }
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden pt-[calc(4.75rem+5rem)] pb-20">
      {/* The one non-neutral background in the system — a very soft wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[30%] -right-[10%] size-[60vw] max-h-[800px] max-w-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(122 30 50 / 0.06), transparent 65%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1120px] grid-cols-[1.05fr_0.95fr] items-center gap-16 px-8 max-lg:grid-cols-1 max-lg:gap-12 max-md:px-5">
        <div>
          <Reveal variant="fade" as="span" className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#f1e4e5] px-3 py-1 text-[10px] font-medium tracking-wide text-[#7d5f62] uppercase">
            <span className="dot-pulse size-1.5 rounded-full bg-emerald-400" />
            Now onboarding partner firms
          </Reveal>

          {/* PLACEHOLDER COPY — replace with real positioning */}
          <h1 className="mb-5 text-[clamp(2.1rem,1.3rem+3.2vw,3.5rem)] leading-[1.12] tracking-[-0.025em]">
            <SplitWords
              segments={[
                { text: "Company intelligence you can " },
                { text: "show your work", accent: true },
                { text: " on." },
              ]}
            />
          </h1>

          <Reveal delay={500} as="p" className="mb-8 max-w-[32rem] text-lg leading-[1.65] text-slate-400">
            Arbitrex brings filed accounts, official register records and modelled
            estimates into one view — and shows the source beside every figure, so a
            verified fact never looks like a guess.
          </Reveal>

          <Reveal delay={600} className="mb-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-1.5 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-gold-400"
            >
              Request access
              <ArrowRight
                size={14}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#product"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-navy-700 bg-navy-900 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors duration-150 hover:border-gold-600 hover:text-gold-400"
            >
              See how it works
            </a>
          </Reveal>

          <Reveal delay={700} as="ul" className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} strokeWidth={1.75} className="shrink-0 text-gold-400" />
              Provenance on every value
            </li>
            <li className="flex items-center gap-2">
              <BarChart3 size={16} strokeWidth={1.75} className="shrink-0 text-gold-400" />
              Screening across the register
            </li>
          </Reveal>
        </div>

        <div style={{ transform: `translate3d(0, ${shift}px, 0)` }}>
          <Reveal variant="right" delay={300} className="surface-card overflow-hidden">
            <PanelBar left="Screen — results" right="4 matches" />
            {ROWS.map((row, i) => (
              <Reveal key={row.name} variant="row" delay={600 + i * 100}>
                <DataRow
                  name={row.name}
                  value={row.value}
                  variant={row.variant}
                  avatar={{ initials: row.initials, color: row.color }}
                />
              </Reveal>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
