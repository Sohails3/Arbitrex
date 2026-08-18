import type { Metadata } from "next";
import { CtaSection, PageHeader } from "@/components/cta-section";
import { SectionLabel } from "@/components/frames-section";
import { Reveal } from "@/components/reveal";
import { StrategicFitDemo } from "@/components/strategic-fit-demo";
import { BorderBeamPanel } from "@/components/ui/border-beam-panel";
import { STEPS } from "@/lib/strategic-fit-demo";

export const metadata: Metadata = {
  title: "Strategic Fit Engine",
  description:
    "One of the tools we have built: an engine that derives a counterparty's acquisition logic from its own deal history, then scores the universe against it — buy-side or sell-side.",
};

/** What the engine does and does not replace. Stated plainly, on purpose. */
const HONESTY = [
  {
    claim: "Mandate definition and longlist",
    manual: "Two to four weeks, then two to three days building the list",
    engine: "Minutes, with the rubric traceable to the buyer's own deals",
    covered: true,
  },
  {
    claim: "Shortlisting logic",
    manual: "Senior judgement, held in one person's head",
    engine: "An eight-criterion frame that can be argued with line by line",
    covered: true,
  },
  {
    claim: "Live financial screening",
    manual: "PitchBook or CapIQ, licensed and current",
    engine: "Model-derived unless verified — flagged as such in every output",
    covered: false,
  },
  {
    claim: "Off-market companies",
    manual: "The real advantage, and it comes from the network",
    engine: "Not covered — the engine only sees a public footprint",
    covered: false,
  },
];

export default function StrategicFitEnginePage() {
  return (
    <>
      <PageHeader
        label="Strategic Fit Engine"
        title="Strategic Fit Engine"
        intro="One of the tools we have built. It answers a question that usually costs a deal team weeks — who should buy this company, or what should this buyer acquire — by deriving the answer from the counterparty's own behaviour rather than from a generic screen."
      />

      {/* ===================== THE PREMISE ===================== */}
      <section className="pt-16 pb-8">
        <div className="container-page">
          <div className="grid grid-cols-[1fr_1fr] gap-16 max-lg:grid-cols-1 max-lg:gap-10">
            <Reveal variant="left">
              <SectionLabel>Why it works this way</SectionLabel>
              <h2 className="mb-4 text-[clamp(1.4rem,1.3rem+1.6vw,2rem)] tracking-tight">
                Most target lists are built backwards
              </h2>
              <p className="mb-5 text-base leading-relaxed text-slate-400">
                The usual approach starts with the universe — everything in the sector, in the
                geography, in the size band — and narrows it with judgement applied at the end.
                The criteria that actually decide the outcome never get written down, so the list
                cannot be argued with and cannot be rerun.
              </p>
              <p className="text-base leading-relaxed text-slate-400">
                This engine inverts that. It spends its first pass entirely on the counterparty:
                what they have bought, at what size, to fill which gap, and what their competitors
                just took off the board. The scoring rubric falls out of that reading — so every
                rank has a stated reason behind it, and changing the counterparty changes the
                criteria rather than just reshuffling the same list.
              </p>
            </Reveal>

            <Reveal variant="right" className="flex flex-col gap-4">
              {STEPS.map(({ title, text }, i) => (
                <BorderBeamPanel
                  key={title}
                  seed={i + 1}
                  radius={16}
                  thickness={2}
                  className="flex gap-4 p-5 shadow-card"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold-500 bg-gold-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="mb-1.5 block text-base font-semibold">{title}</span>
                    <span className="block text-sm leading-relaxed text-slate-400">{text}</span>
                  </span>
                </BorderBeamPanel>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== THE WORKED EXAMPLE ===================== */}
      <StrategicFitDemo />

      {/* ===================== WHAT IT DOES NOT DO ===================== */}
      <section className="pb-24 max-lg:pb-20">
        <div className="container-page">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <SectionLabel>Where the line is</SectionLabel>
            <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.25rem)] tracking-tight">
              It augments the banker, it does not replace one
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400">
              The same principle that governs everything we build applies here: an output is only
              useful if you know what it is worth. So the engine is explicit about the two things
              it genuinely compresses, and the two it does not touch.
            </p>
          </Reveal>

          <Reveal variant="scale" className="surface-card mx-auto max-w-[900px] overflow-hidden">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-px bg-navy-800 max-md:hidden">
              {["", "Manual process", "This engine"].map((head, i) => (
                <div
                  key={i}
                  className="bg-navy-850 px-5 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500"
                >
                  {head}
                </div>
              ))}
            </div>

            {HONESTY.map(({ claim, manual, engine, covered }) => (
              <div
                key={claim}
                className="grid grid-cols-[1.1fr_1fr_1fr] items-start gap-px border-t border-navy-800 bg-navy-800 max-md:grid-cols-1"
              >
                <div className="bg-navy-900 px-5 py-4">
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <span
                      aria-hidden
                      className={`size-1.5 shrink-0 rounded-full ${covered ? "bg-emerald-400" : "bg-[#b45309]"}`}
                    />
                    {claim}
                  </span>
                </div>
                <div className="bg-navy-900 px-5 py-4 text-sm leading-relaxed text-slate-500">
                  <span className="mb-1 hidden text-xs font-semibold tracking-wide uppercase max-md:block">
                    Manual process
                  </span>
                  {manual}
                </div>
                <div className="bg-navy-900 px-5 py-4 text-sm leading-relaxed text-slate-300">
                  <span className="mb-1 hidden text-xs font-semibold tracking-wide uppercase text-slate-500 max-md:block">
                    This engine
                  </span>
                  {engine}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="mx-auto mt-6 max-w-[900px]">
            <p className="text-xs leading-relaxed text-slate-500">
              Figures shown in the example above are drawn from real runs and are illustrative of
              the output format. Company data in any run is model-derived unless individually
              verified, and is labelled accordingly in the delivered report.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection
        heading="Want this pointed at your mandate?"
        body="The engine takes a counterparty, a sector and a geography. If you tell us yours, we can show you what comes back before you commit to anything."
        secondary={{ href: "/origination-engine", label: "See the Origination Engine" }}
      />
    </>
  );
}
