import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { CtaSection } from "@/components/cta-section";
import { SectionLabel } from "@/components/frames-section";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";

// PLACEHOLDER FIGURES — replace with verified numbers.
const STATS = [
  { value: 5.4, decimals: 1, suffix: "m", label: "Companies covered" },
  { value: 4, decimals: 0, suffix: "", label: "Provenance tiers" },
  { text: "Daily", label: "Register refresh" },
  { value: 100, decimals: 0, suffix: "%", label: "Figures sourced" },
];

const PILLARS = [
  {
    href: "/product",
    label: "Product",
    title: "One system, not six tabs",
    text: "Screening, company detail, mandate fit, lists, map and a watch inbox — the working surfaces of a deal team, in one place.",
  },
  {
    href: "/how-it-works",
    label: "How it works",
    title: "From register to shortlist",
    text: "Define the mandate once, work the results with full detail beside them, then let the watch inbox keep the shortlist live.",
  },
  {
    href: "/about",
    label: "About us",
    title: "Built from inside the workflow",
    text: "We have worked in private equity and investment banking. The inefficiencies this removes are ones we sat through.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ===================== STATS ===================== */}
      <section className="py-16" aria-label="Key figures">
        <div className="container-page">
          <Reveal variant="scale" className="surface-card grid grid-cols-4 overflow-hidden max-lg:grid-cols-2 max-sm:grid-cols-1">
            {STATS.map((stat) => (
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

      {/* ===================== WHAT ARBITREX IS ===================== */}
      <section className="py-28 max-lg:py-20">
        <div className="container-page">
          <Reveal className="mb-16 max-w-3xl">
            <SectionLabel>What Arbitrex is</SectionLabel>
            <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.5rem)] tracking-tight">
              Vertical software for the deal process
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-slate-400">
              Generic databases hand you a spreadsheet and leave the process to you.
              Arbitrex is built for one industry, so the workflow — mandate, screen,
              diligence, monitoring — is the product rather than something you assemble
              around it.
            </p>
          </Reveal>

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {PILLARS.map(({ href, label, title, text }, i) => (
              <Reveal key={href} delay={(i % 3) * 80} className="h-full">
                <Link
                  href={href}
                  className="surface-card group flex h-full flex-col p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-navy-700 hover:shadow-elevated"
                >
                  <span className="mb-4 text-xs font-semibold tracking-wide uppercase text-slate-500">
                    {label}
                  </span>
                  <h3 className="mb-2 text-base font-semibold">{title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-400">{text}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400">
                    Read more
                    <ArrowRight
                      size={14}
                      strokeWidth={1.75}
                      className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection secondary={{ href: "/product", label: "See the product first" }} />
    </>
  );
}
