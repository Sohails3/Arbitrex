import type { Metadata } from "next";
import { Bell, Boxes, LayoutList, MapPin, Search, Table2 } from "lucide-react";
import { CtaSection, PageHeader } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { BorderBeamPanel } from "@/components/ui/border-beam-panel";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Screening, company detail, mandate fit, lists, map and a watch inbox — the working surfaces of a deal team, in one system.",
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
    text: "Filed accounts, officers and history in a single drawer — opened beside your results rather than replacing them.",
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
    text: "A trigger inbox that tells you when something you're tracking changes — new filing, new officer, new signal.",
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHeader
        label="The product"
        title="Dense data, calmly presented"
        intro="Financial data is unavoidably dense. The interface should not be. Arbitrex keeps information density low and the signal high — generous whitespace, soft elevation, and one accent colour reserved for what genuinely matters."
      />

      <section className="pt-12 pb-28 max-lg:pb-20">
        <div className="container-page">
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {FEATURES.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 3) * 80} className="h-full">
                {/* BorderBeamPanel supplies the border, surface and radius that
                    .surface-card used to; only the shadow and lift remain here.
                    `seed` staggers each card's comet so the six don't orbit in
                    lockstep. */}
                <BorderBeamPanel
                  seed={i + 1}
                  radius={16}
                  thickness={2}
                  className="group h-full p-6 shadow-card transition-[transform,box-shadow] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:shadow-elevated"
                >
                  <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400 transition-[background,transform] duration-400 ease-[var(--ease-brand)] group-hover:scale-105 group-hover:bg-gold-400/14">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="mb-2 text-base font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{text}</p>
                </BorderBeamPanel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection secondary={{ href: "/how-it-works", label: "See how it works" }} />
    </>
  );
}
