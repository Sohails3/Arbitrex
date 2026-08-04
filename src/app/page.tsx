import {
  Bell,
  Boxes,
  LayoutList,
  MapPin,
  Search,
  Table2,
} from "lucide-react";
import { CountUp } from "@/components/count-up";
import { DataRow, PanelBar } from "@/components/data-row";
import { FramesSection, SectionLabel } from "@/components/frames-section";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SiteNav } from "@/components/site-nav";

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

// PLACEHOLDER FIGURES — replace with verified numbers.
const STATS = [
  { value: 5.4, decimals: 1, suffix: "m", label: "Companies covered" },
  { value: 4, decimals: 0, suffix: "", label: "Provenance tiers" },
  { text: "Daily", label: "Register refresh" },
  { value: 100, decimals: 0, suffix: "%", label: "Figures sourced" },
];

const SOURCES = [
  { name: "Straight from the register", value: "£2.6m", variant: "register" },
  { name: "A filed, verifiable fact", value: "£4.2m", variant: "filed" },
  { name: "A model output", value: "£11.8m", variant: "estimated" },
  { name: "Lower-confidence source", value: "£1.4m", variant: "other" },
] as const;

export default function Home() {
  return (
    <>
      <SiteNav />

      <main>
        <Hero />

        {/* ===================== STATS ===================== */}
        <section className="py-16" aria-label="Key figures">
          <div className="mx-auto w-full max-w-[1120px] px-8 max-md:px-5">
            <Reveal variant="scale" className="surface-card grid grid-cols-4 overflow-hidden max-lg:grid-cols-2 max-sm:grid-cols-1">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="border-navy-800 px-5 py-8 not-last:border-r max-lg:nth-2:border-r-0 max-lg:nth-[-n+2]:border-b max-sm:border-r-0 max-sm:not-last:border-b"
                >
                  <p className="mb-2 text-[2.5rem] leading-[1.1] font-bold tracking-tight text-gold-400 tabular-nums">
                    {"text" in stat ? (
                      stat.text
                    ) : (
                      <CountUp value={stat.value!} decimals={stat.decimals} suffix={stat.suffix} />
                    )}
                  </p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ===================== PRODUCT ===================== */}
        <section id="product" className="py-28 max-lg:py-20">
          <div className="mx-auto w-full max-w-[1120px] px-8 max-md:px-5">
            <Reveal className="mb-16 max-w-3xl">
              <SectionLabel>The product</SectionLabel>
              <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.5rem)] tracking-tight">
                Dense data, calmly presented
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-slate-400">
                Financial data is unavoidably dense. The interface should not be. Arbitrex
                keeps information density low and the signal high — generous whitespace,
                soft elevation, and one accent colour reserved for what genuinely matters.
              </p>
            </Reveal>

            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
              {FEATURES.map(({ Icon, title, text }, i) => (
                <Reveal
                  key={title}
                  delay={(i % 3) * 80}
                  className="surface-card group p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-navy-700 hover:shadow-elevated"
                >
                  <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400 transition-[background,transform] duration-400 ease-[var(--ease-brand)] group-hover:scale-105 group-hover:bg-gold-400/14">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="mb-2 text-base font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FramesSection />

        {/* ===================== PROVENANCE ===================== */}
        <section id="provenance" className="py-28 max-lg:py-20">
          <div className="mx-auto w-full max-w-[1120px] px-8 max-md:px-5">
            <Reveal className="mx-auto mb-16 max-w-3xl text-center">
              <SectionLabel>Provenance</SectionLabel>
              <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.5rem)] tracking-tight">
                An estimate never looks like a fact
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400">
                Every value carries a label naming where it came from. Modelled figures get
                both an amber tag and a dashed underline — so you always know what you are
                relying on before you act on it.
              </p>
            </Reveal>

            <Reveal variant="scale" className="surface-card mx-auto max-w-[640px] overflow-hidden">
              <PanelBar left="Source labels" />
              {SOURCES.map((source, i) => (
                <Reveal key={source.name} variant="row" delay={i * 100}>
                  <DataRow name={source.name} value={source.value} variant={source.variant} />
                </Reveal>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ===================== CTA ===================== */}
        <section id="contact" className="py-28 max-lg:py-20">
          <div className="mx-auto w-full max-w-[1120px] px-8 max-md:px-5">
            <Reveal variant="scale" className="surface-card relative overflow-hidden px-8 py-20 text-center max-md:px-5 max-md:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -bottom-3/5 h-[120%]"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 50% at 50% 100%, rgb(122 30 50 / 0.07), transparent 70%)",
                }}
              />
              <div className="relative">
                <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+1.6vw,2rem)] tracking-tight">
                  Request access
                </h2>
                <p className="mx-auto mb-6 max-w-[34rem] text-base leading-relaxed text-slate-400">
                  Arbitrex is currently onboarding a small number of partner firms.
                  If it fits how your team works, we would be glad to talk.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {/* PLACEHOLDER — replace with a real address */}
                  <a
                    href="mailto:hello@arbitrex.co.uk"
                    className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-gold-400"
                  >
                    hello@arbitrex.co.uk
                  </a>
                  <a
                    href="#product"
                    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-navy-700 bg-navy-900 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors duration-150 hover:border-gold-600 hover:text-gold-400"
                  >
                    See the product first
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-navy-800 bg-navy-900 pt-16 pb-8">
      <div className="mx-auto w-full max-w-[1120px] px-8 max-md:px-5">
        <div className="mb-12 grid grid-cols-[1.6fr_1fr_1fr] gap-12 max-md:grid-cols-1 max-md:gap-8">
          <div>
            <span className="inline-flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo-256.png" alt="" width={40} height={40} className="size-10 rounded-xl" />
              <span className="text-base font-bold tracking-wide text-slate-100">Arbitrex</span>
            </span>
            <p className="mt-4 max-w-[22rem] text-sm leading-relaxed text-slate-400">
              Company intelligence with the source shown beside every number.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide uppercase text-slate-500">Product</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#product" className="text-slate-400 transition-colors duration-150 hover:text-gold-400">Overview</a></li>
              <li><a href="#provenance" className="text-slate-400 transition-colors duration-150 hover:text-gold-400">Provenance</a></li>
              <li><a href="#process" className="text-slate-400 transition-colors duration-150 hover:text-gold-400">How it works</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide uppercase text-slate-500">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {/* PLACEHOLDER contact details */}
              <li><a href="mailto:hello@arbitrex.co.uk" className="text-slate-400 transition-colors duration-150 hover:text-gold-400">hello@arbitrex.co.uk</a></li>
              <li className="text-slate-400">London, United Kingdom</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-navy-800 pt-6 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Arbitrex. All rights reserved.</p>
          <p>www.arbitrex.co.uk</p>
        </div>

        {/*
          PLACEHOLDER LEGAL TEXT — replace with compliance-approved wording,
          plus your real entity name, company number and regulatory status.
        */}
        <p className="mt-5 max-w-[68ch] text-xs leading-relaxed text-slate-500">
          Information on this website is provided for general information only and does not
          constitute investment, financial or legal advice. Estimated figures are model
          outputs, are identified as such throughout the product, and should not be relied
          upon as statements of fact.
        </p>
      </div>
    </footer>
  );
}
