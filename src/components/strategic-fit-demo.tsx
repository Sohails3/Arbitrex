"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { PanelBar } from "@/components/data-row";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/frames-section";
import { RUNS } from "@/lib/strategic-fit-demo";
import { cn } from "@/lib/utils";

/**
 * The worked-example demo. One toggle swaps the entire example between a
 * buy-side and a sell-side run, which is the point being made — it is the same
 * engine pointed in the opposite direction, not two products.
 */
export function StrategicFitDemo() {
  const [mode, setMode] = useState(0);
  const run = RUNS[mode];

  return (
    <section className="py-24 max-lg:py-20">
      <div className="container-page">
        <Reveal className="mb-10 max-w-3xl">
          <SectionLabel>A worked example</SectionLabel>
          <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.25rem)] tracking-tight">
            The same engine, pointed either way
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-slate-400">
            Two real runs. Switch between them to see how the rubric, the universe and the
            output all change while the method stays identical.
          </p>
        </Reveal>

        {/* Mode toggle */}
        <Reveal className="mb-8">
          <div
            role="tablist"
            aria-label="Engine mode"
            className="inline-flex gap-1 rounded-xl border border-navy-800 bg-navy-900 p-1"
          >
            {RUNS.map((r, i) => (
              <button
                key={r.mode}
                type="button"
                role="tab"
                aria-selected={mode === i}
                onClick={() => setMode(i)}
                className={cn(
                  "rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200",
                  mode === i
                    ? "bg-gold-500 text-white"
                    : "text-slate-500 hover:bg-navy-850 hover:text-slate-200",
                )}
              >
                {r.tab}
              </button>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">{run.premise}</p>
        </Reveal>

        {/* Mandate strip */}
        <Reveal variant="scale" className="surface-card mb-6 overflow-hidden">
          <PanelBar left="Mandate" right={`${run.ranked.length} ${run.universeLabel} scored`} />
          <dl className="grid grid-cols-3 gap-px bg-navy-800 max-md:grid-cols-1">
            {[
              { term: run.counterpartyRole, value: run.counterparty },
              { term: "Sector", value: run.sector },
              { term: "Geography", value: run.geography },
            ].map(({ term, value }) => (
              <div key={term} className="bg-navy-900 px-5 py-4">
                <dt className="mb-1 text-xs font-semibold tracking-wide uppercase text-slate-500">
                  {term}
                </dt>
                <dd className="text-sm font-medium text-slate-200">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid grid-cols-[1fr_1fr] gap-6 max-lg:grid-cols-1">
          {/* ---------- Step 1 + 2: DNA and derived rubric ---------- */}
          <div className="flex flex-col gap-6">
            <Reveal variant="left" className="surface-card overflow-hidden">
              <PanelBar left={`Step 1 — ${run.counterpartyRole.toLowerCase()} DNA`} />
              <div className="p-5">
                <p className="mb-5 text-sm leading-relaxed text-slate-300">{run.dnaHeadline}</p>
                <dl className="flex flex-col gap-3">
                  {run.dnaPoints.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-4 border-b border-navy-800 pb-3 last:border-b-0 last:pb-0 max-sm:flex-col max-sm:gap-1"
                    >
                      <dt className="shrink-0 text-xs font-semibold tracking-wide uppercase text-slate-500">
                        {label}
                      </dt>
                      <dd className="text-right text-sm text-slate-300 max-sm:text-left">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal variant="left" delay={80} className="surface-card overflow-hidden">
              <PanelBar left="Step 2 — derived rubric" right="C1–C4" />
              <div className="flex flex-col">
                {run.criteria.map(({ id, name, why }) => (
                  <div key={id} className="border-b border-navy-800 px-5 py-4 last:border-b-0">
                    <div className="mb-1.5 flex items-baseline gap-3">
                      <span className="shrink-0 rounded-md bg-gold-400/10 px-1.5 py-0.5 text-[10px] font-bold text-gold-400">
                        {id}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-200">{name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-500">{why}</p>
                  </div>
                ))}
                <p className="border-t border-navy-800 bg-navy-850 px-5 py-3 text-xs leading-relaxed text-slate-500">
                  C5–C8 are fixed — technology and IP, market position, team, and legal and
                  regulatory risk. Only C1–C4 change with the counterparty.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---------- Step 3: the ranked universe ---------- */}
          <Reveal variant="right" delay={80} className="surface-card overflow-hidden">
            <PanelBar
              left={`Step 3 — ranked ${run.universeLabel}`}
              right="out of 40"
            />
            <div className="flex flex-col">
              {run.ranked.map(({ rank, name, meta, score }) => {
                const tier = score >= 30 ? "primary" : score >= 22 ? "monitor" : "lower";
                return (
                  <div
                    key={name}
                    className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-navy-800 px-5 py-3 transition-colors duration-150 last:border-b-0 hover:bg-navy-850"
                  >
                    <span className="text-xs font-semibold tabular-nums text-slate-500">{rank}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-200">
                        {name}
                      </span>
                      <span className="block truncate text-xs text-slate-500">{meta}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="h-1.5 w-20 overflow-hidden rounded-full bg-navy-800 max-sm:hidden">
                        <span
                          className={cn(
                            "block h-full rounded-full transition-[width] duration-[900ms] ease-[var(--ease-brand)]",
                            tier === "primary"
                              ? "bg-gold-400"
                              : tier === "monitor"
                                ? "bg-navy-600"
                                : "bg-navy-700",
                          )}
                          style={{ width: `${(score / 40) * 100}%` }}
                        />
                      </span>
                      <span className="w-9 text-right text-sm font-semibold tabular-nums text-slate-100">
                        {score}
                      </span>
                    </span>
                  </div>
                );
              })}
              <p className="border-t border-navy-800 bg-navy-850 px-5 py-3 text-xs leading-relaxed text-slate-500">
                30–40 primary · 22–29 monitor · below 22 deprioritise. Totals are recalculated
                in code, never taken from the model.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---------- Step 4: the argument for the top name ---------- */}
        <Reveal variant="scale" delay={80} className="surface-card mt-6 overflow-hidden">
          <PanelBar left="Step 4 — full breakdown" right={`#1 · ${run.top.total}/40`} />
          <div className="grid grid-cols-[1fr_1fr] gap-10 p-6 max-lg:grid-cols-1 max-lg:gap-8">
            <div>
              <h3 className="mb-1 text-lg tracking-tight">{run.top.name}</h3>
              <p className="mb-5 text-xs text-slate-500">{run.top.meta}</p>
              <p className="mb-5 text-sm leading-relaxed text-slate-400">{run.top.summary}</p>
              <div className="flex gap-3 rounded-xl border border-navy-800 bg-navy-950 p-4">
                <AlertTriangle
                  size={16}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-[#b45309]"
                />
                <span>
                  <span className="mb-1 block text-xs font-semibold tracking-wide uppercase text-slate-500">
                    Deal-breaker risk
                  </span>
                  <span className="block text-sm leading-relaxed text-slate-400">
                    {run.top.risk}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {run.top.scores.map(({ id, label, score }) => (
                <div key={id} className="flex items-center gap-3">
                  <span className="w-6 shrink-0 text-[10px] font-bold text-slate-500">{id}</span>
                  <span className="min-w-0 flex-1 truncate text-sm text-slate-300">{label}</span>
                  <span className="flex shrink-0 gap-1" aria-label={`${score} out of 5`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={cn(
                          "h-1.5 w-4 rounded-full",
                          n <= score ? "bg-gold-400" : "bg-navy-800",
                        )}
                      />
                    ))}
                  </span>
                  <span className="w-3 shrink-0 text-right text-sm font-semibold tabular-nums text-slate-100">
                    {score}
                  </span>
                </div>
              ))}
              <p className="mt-2 border-t border-navy-800 pt-3 text-xs leading-relaxed text-slate-500">
                Every score carries a sentence of reasoning in the full output. Figures not
                publicly available are marked as such rather than estimated.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
