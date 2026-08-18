"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, ShieldCheck } from "lucide-react";
import { DataRow, PanelBar } from "@/components/data-row";
import { Reveal } from "@/components/reveal";
import { SplitWords } from "@/components/split-words";
import { TOOLS } from "@/lib/tools";
import { cn } from "@/lib/utils";

// PLACEHOLDER DATA — illustrative rows only.
const SCREEN_ROWS = [
  { name: "Northfield Ltd", value: "£4.2m", variant: "filed", initials: "NF", color: "#7A1E32" },
  { name: "Halden Group", value: "£11.8m", variant: "estimated", initials: "HL", color: "#0891b2" },
  { name: "Bramley & Co", value: "£2.6m", variant: "register", initials: "BR", color: "#d97706" },
  { name: "Calverton Holdings", value: "£8.9m", variant: "filed", initials: "CV", color: "#059669" },
] as const;

// Illustrative of a sell-side run — the engine ranks acquirers out of 40.
const FIT_ROWS = [
  { name: "Shopify", country: "Canada", score: 32 },
  { name: "Stripe", country: "United States", score: 32 },
  { name: "Adyen", country: "Netherlands", score: 30 },
  { name: "Intuit", country: "United States", score: 29 },
] as const;

const ROTATE_MS = 6000;

export function Hero() {
  const [shift, setShift] = useState(0);
  const [panel, setPanel] = useState(0);
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

  // The panel alternates between the two tools, so the hero never reads as
  // though Arbitrex is a single product. Manual selection stops the rotation.
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setPanel((p) => (p + 1) % TOOLS.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [auto]);

  return (
    <section className="relative pt-[calc(4.75rem+5rem)] pb-20">
      <div className="container-page relative grid grid-cols-[1.05fr_0.95fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-12">
        <div>
          <Reveal variant="fade" as="span" className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#f1e4e5] px-3 py-1 text-[10px] font-medium tracking-wide text-[#7d5f62] uppercase">
            <span className="dot-pulse size-1.5 rounded-full bg-emerald-400" />
            Now onboarding partner firms
          </Reveal>

          <h1 className="mb-5 text-[clamp(2.1rem,1.3rem+3.2vw,3.5rem)] leading-[1.12] tracking-[-0.025em]">
            <SplitWords
              segments={[
                { text: "We build the tools that take " },
                { text: "process work off the desk", accent: true },
                { text: "." },
              ]}
            />
          </h1>

          <Reveal delay={500} as="p" className="mb-8 max-w-[34rem] text-lg leading-[1.65] text-slate-400">
            Arbitrex builds software for investment banks and private equity firms —
            bespoke systems, automation of the manual work around them, and AI applied
            where it genuinely earns its place. The tools on this site are two we built
            ourselves, and the clearest examples of how we work.
          </Reveal>

          <Reveal delay={600} className="mb-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-1.5 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-gold-400"
            >
              Start a conversation
              <ArrowRight
                size={14}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-navy-700 bg-navy-900 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors duration-150 hover:border-gold-600 hover:text-gold-400"
            >
              What we do
            </Link>
          </Reveal>

          <Reveal delay={700} as="ul" className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">
            <li className="flex items-center gap-2">
              <ShieldCheck size={16} strokeWidth={1.75} className="shrink-0 text-gold-400" />
              Built by former PE and IB operators
            </li>
            <li className="flex items-center gap-2">
              <BarChart3 size={16} strokeWidth={1.75} className="shrink-0 text-gold-400" />
              Bespoke builds, automation and AI
            </li>
          </Reveal>
        </div>

        <div style={{ transform: `translate3d(0, ${shift}px, 0)` }}>
          <Reveal variant="right" delay={300}>
            {/* Tool switcher — doubles as the label for what the panel is showing. */}
            <div className="mb-3 flex flex-wrap gap-2" role="tablist" aria-label="Example tools">
              {TOOLS.map(({ slug, nav }, i) => (
                <button
                  key={slug}
                  type="button"
                  role="tab"
                  aria-selected={panel === i}
                  onClick={() => {
                    setPanel(i);
                    setAuto(false);
                  }}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors duration-200",
                    panel === i
                      ? "border-gold-600 bg-gold-400/10 text-gold-400"
                      : "border-navy-700 bg-navy-950 text-slate-500 hover:text-slate-300",
                  )}
                >
                  {nav}
                </button>
              ))}
            </div>

            <div className="relative">
              {/* Origination — a screen result set */}
              <HeroPanel active={panel === 0} first>
                <PanelBar left="Screen — results" right="4 matches" />
                {SCREEN_ROWS.map((row) => (
                  <DataRow
                    key={row.name}
                    name={row.name}
                    value={row.value}
                    variant={row.variant}
                    avatar={{ initials: row.initials, color: row.color }}
                  />
                ))}
              </HeroPanel>

              {/* Strategic fit — a ranked, scored counterparty list */}
              <HeroPanel active={panel === 1}>
                <PanelBar left="Strategic fit — ranked acquirers" right="10 scored" />
                {FIT_ROWS.map((row, i) => (
                  <div
                    key={row.name}
                    className="grid h-11 grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-800 px-5 last:border-b-0"
                  >
                    <span className="text-xs font-semibold tabular-nums text-slate-500">
                      {i + 1}
                    </span>
                    <span className="flex min-w-0 items-baseline gap-2">
                      <span className="truncate text-sm font-medium text-slate-200">{row.name}</span>
                      <span className="truncate text-[11px] text-slate-500">{row.country}</span>
                    </span>
                    <span className="flex items-center gap-2.5">
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-navy-800 max-sm:hidden">
                        <span
                          className="block h-full rounded-full bg-gold-400 transition-[width] duration-[900ms] ease-[var(--ease-brand)]"
                          style={{ width: panel === 1 ? `${(row.score / 40) * 100}%` : 0 }}
                        />
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-slate-100">
                        {row.score}
                        <span className="text-xs text-slate-500">/40</span>
                      </span>
                    </span>
                  </div>
                ))}
              </HeroPanel>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Both panels occupy the same box: the first stays in flow to set the height,
 * the rest are absolutely positioned over it and cross-fade.
 */
function HeroPanel({
  active,
  first = false,
  children,
}: {
  active: boolean;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden={!active}
      className={cn(
        "surface-card overflow-hidden transition-[opacity,transform] duration-700 ease-[var(--ease-brand)]",
        first ? "relative" : "absolute inset-0",
        active
          ? "opacity-100"
          : "pointer-events-none translate-y-3 scale-[0.99] opacity-0",
      )}
    >
      {children}
    </div>
  );
}
