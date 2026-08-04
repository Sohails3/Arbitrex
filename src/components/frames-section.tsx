"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, TrendingUp, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataRow, PanelBar } from "@/components/data-row";
import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    title: "Define the mandate",
    text: "Set the criteria that matter — sector, size, geography, trajectory. They become a reusable screen rather than a one-off query.",
  },
  {
    title: "Work the results",
    text: "Review matches with full company detail beside them, scored on fit, and every figure labelled with its source as you go.",
  },
  {
    title: "Track what changes",
    text: "Save a list and let the watch inbox surface new filings and signals against it, so the shortlist stays live rather than going stale.",
  },
];

// PLACEHOLDER DATA — illustrative only.
const CRITERIA = [
  { label: "Sector: Industrials", on: true },
  { label: "Turnover £2m–£25m", on: true },
  { label: "EBITDA margin > 12%", on: false },
  { label: "Region: South East", on: true },
  { label: "Growth 3yr > 10%", on: false },
  { label: "Owner age 55+", on: false },
];

const METERS = [
  { label: "Overall fit", value: 82 },
  { label: "Size match", value: 91 },
  { label: "Margin profile", value: 74 },
];

const ALERTS = [
  { Icon: FileText, title: "Northfield Ltd filed accounts", meta: "Year end 31 Mar · 2 hours ago" },
  { Icon: UserRound, title: "Halden Group appointed a director", meta: "Register update · yesterday" },
  { Icon: TrendingUp, title: "Bramley & Co crossed your size threshold", meta: "Turnover £2.6m · 3 days ago" },
];

export function FramesSection() {
  const [activeFrame, setActiveFrame] = useState(0);
  const [stacked, setStacked] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      // Fall back to showing every frame stacked, so no content is unreachable.
      setStacked(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.frame);
          if (!Number.isNaN(index)) setActiveFrame(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const frames = [
    <div key="0" className="flex flex-wrap gap-2">
      {CRITERIA.map(({ label, on }) => (
        <span
          key={label}
          className={cn(
            "rounded-full border px-4 py-2 text-xs",
            on
              ? "border-gold-600 bg-gold-400/10 font-semibold text-gold-400"
              : "border-navy-700 bg-navy-950 text-slate-400",
          )}
        >
          {label}
        </span>
      ))}
    </div>,

    <div key="1">
      {METERS.map(({ label, value }) => (
        <div key={label} className="mb-5">
          <div className="flex justify-between text-xs text-slate-500">
            <span>{label}</span>
            <span className="font-semibold tabular-nums text-slate-200">{value}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy-800">
            <span
              className="block h-full rounded-full bg-gold-400 transition-[width] duration-[1200ms] ease-[var(--ease-brand)]"
              style={{ width: activeFrame === 1 || stacked ? `${value}%` : 0 }}
            />
          </div>
        </div>
      ))}
      <div className="border-t border-navy-800">
        <DataRow name="Turnover" value="£4.2m" variant="filed" className="px-0" />
        <DataRow name="EBITDA" value="£0.7m" variant="estimated" className="px-0" />
      </div>
    </div>,

    <div key="2">
      {ALERTS.map(({ Icon, title, meta }) => (
        <div key={title} className="flex gap-3 border-b border-navy-800 py-3 last:border-b-0">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold-400/8 text-gold-400">
            <Icon size={14} strokeWidth={1.75} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-slate-200">{title}</span>
            <span className="block text-xs text-slate-500">{meta}</span>
          </span>
        </div>
      ))}
    </div>,
  ];

  const titles = ["Mandate criteria", "Mandate fit", "Watch — trigger inbox"];
  const subtitles = [undefined, "Northfield Ltd", "3 new"];

  return (
    <section id="process" className="relative py-28 max-lg:py-20">
      <div className="mx-auto w-full max-w-[1120px] px-8 max-md:px-5">
        <Reveal className="mb-16 max-w-3xl">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.5rem)] tracking-tight">
            From register to shortlist
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-slate-400">
            Three steps, one continuous view. Scroll to move through them.
          </p>
        </Reveal>

        <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-8">
          {/* Steps — these scroll */}
          <div className="flex flex-col">
            {STEPS.map(({ title, text }, i) => (
              <div
                key={title}
                data-frame={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={cn(
                  "flex min-h-[62vh] flex-col justify-center py-8 transition-opacity duration-600 ease-[var(--ease-brand)] max-lg:min-h-0",
                  activeFrame === i || stacked ? "opacity-100" : "opacity-35",
                )}
              >
                <span
                  className={cn(
                    "mb-4 inline-flex size-8 items-center justify-center rounded-full border text-xs font-bold transition-colors duration-500",
                    activeFrame === i || stacked
                      ? "border-gold-500 bg-gold-500 text-white"
                      : "border-navy-700 text-slate-500",
                  )}
                >
                  {i + 1}
                </span>
                <h3 className="mb-3 text-xl tracking-tight">{title}</h3>
                <p className="max-w-[30rem] text-base leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>

          {/* Stage — this pins */}
          <div
            className={cn(
              "sticky top-27 h-[420px] max-lg:relative max-lg:top-0 max-md:h-[340px]",
              stacked && "h-auto space-y-4",
            )}
          >
            {frames.map((content, i) => (
              <div
                key={i}
                className={cn(
                  "surface-card flex flex-col overflow-hidden",
                  stacked
                    ? "relative"
                    : cn(
                        "absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-brand)]",
                        activeFrame === i
                          ? "opacity-100"
                          : "pointer-events-none translate-y-4 scale-[0.985] opacity-0",
                      ),
                )}
              >
                <PanelBar left={titles[i]} right={subtitles[i]} />
                <div className="flex-1 overflow-hidden p-5">{content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-wide uppercase text-slate-500">
      {children}
      <span className="h-px w-12 bg-gold-600" />
    </span>
  );
}
