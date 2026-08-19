import type { Metadata } from "next";
import { Bell, Boxes, LayoutList, MapPin, Search, Table2 } from "lucide-react";
import { CtaSection, PageHeader } from "@/components/cta-section";
import { DataRow, PanelBar } from "@/components/data-row";
import { FramesSection, SectionLabel } from "@/components/frames-section";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Private Equity Origination Engine",
  description:
    "One of the tools we have built: a screening and monitoring engine that works the companies register against a private equity mandate.",
};

const FEATURES = [
  {
    Icon: Search,
    title: "Screening",
    text: "Filter the register on the criteria that actually define your mandate, then work the results without leaving the page.",
  },
  {
    Icon: Table2,
    title: "Company detail",
    text: "Filed accounts, officers and history in a single drawer, opened beside your results rather than replacing them.",
  },
  {
    Icon: Boxes,
    title: "Mandate fit",
    text: "A single score that says how closely a company matches your criteria, with the inputs behind it always visible.",
  },
  {
    Icon: LayoutList,
    title: "Lists",
    text: "Build and share working lists of companies, kept current as new filings arrive rather than frozen at export.",
  },
  {
    Icon: MapPin,
    title: "Map",
    text: "See geographic concentration across a portfolio or pipeline at a glance, filtered by the same criteria as your screen.",
  },
  {
    Icon: Bell,
    title: "Watch",
    text: "A trigger inbox that tells you when something you're tracking changes: new filing, new officer, new signal.",
  },
];

const SOURCES = [
  { name: "Straight from the register", value: "£2.6m", variant: "register" },
  { name: "A filed, verifiable fact", value: "£4.2m", variant: "filed" },
  { name: "A model output", value: "£11.8m", variant: "estimated" },
  { name: "Lower-confidence source", value: "£1.4m", variant: "other" },
] as const;

export default function OriginationEnginePage() {
  return (
    <>
      <PageHeader
        label="Origination Engine"
        title="Private Equity Origination Engine"
        intro="One of the tools we have built. It answers a single question for an origination team: which companies fit our mandate, and what moved this week. It does that by working the companies register directly rather than handing back another export."
      />

      {/* ===================== FEATURES ===================== */}
      <section className="pt-16 pb-24 max-lg:pb-20">
        <div className="container-page">
          <Reveal className="mb-12 max-w-3xl">
            <SectionLabel>What it does</SectionLabel>
            <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.25rem)] tracking-tight">
              Dense data, calmly presented
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-slate-400">
              Financial data is unavoidably dense. The interface should not be. Information
              density stays low and the signal high: generous whitespace, soft elevation,
              and one accent colour reserved for what genuinely matters.
            </p>
          </Reveal>

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {FEATURES.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 3) * 80} className="h-full">
                <div className="surface-card group h-full p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-navy-700 hover:shadow-elevated">
                  <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400 transition-[background,transform] duration-400 ease-[var(--ease-brand)] group-hover:scale-105 group-hover:bg-gold-400/14">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="mb-2 text-base font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <FramesSection />

      {/* ===================== PROVENANCE ===================== */}
      <section className="py-24 max-lg:py-20">
        <div className="container-page">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <SectionLabel>Provenance</SectionLabel>
            <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.25rem)] tracking-tight">
              An estimate never looks like a fact
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400">
              Every value carries a label naming where it came from. Modelled figures get
              both an amber tag and a dashed underline, so you always know what you are
              relying on before you act on it. The same principle governs everything we
              build for clients.
            </p>
          </Reveal>

          <Reveal variant="scale" className="surface-card mx-auto max-w-[720px] overflow-hidden">
            <PanelBar left="Source labels" />
            {SOURCES.map((source, i) => (
              <Reveal key={source.name} variant="row" delay={i * 100}>
                <DataRow name={source.name} value={source.value} variant={source.variant} />
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaSection secondary={{ href: "/strategic-fit-engine", label: "See the Strategic Fit Engine" }} />
    </>
  );
}
