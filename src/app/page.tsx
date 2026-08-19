import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { SectionLabel } from "@/components/frames-section";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SERVICES } from "@/lib/services";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <>
      <Hero />

      {/* ===================== SERVICES ===================== */}
      <section className="py-28 max-lg:py-20">
        <div className="container-page">
          <Reveal className="mb-14 max-w-3xl">
            <SectionLabel>What we do</SectionLabel>
            <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.5rem)] tracking-tight">
              Software for the work around the deal
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-slate-400">
              Deal teams are not short of data. They are short of process: the connective
              work between having information and being able to act on it. That is the
              part we build for.
            </p>
          </Reveal>

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
            {SERVICES.map(({ slug, Icon, title, summary }, i) => (
              <Reveal key={slug} delay={i * 80} className="h-full">
                <Link
                  href={`/services#${slug}`}
                  className="surface-card group flex h-full flex-col p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-navy-700 hover:shadow-elevated"
                >
                  <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400 transition-[background,transform] duration-400 ease-[var(--ease-brand)] group-hover:scale-105 group-hover:bg-gold-400/14">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className="mb-2 text-base font-semibold">{title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-400">{summary}</p>
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

      {/* ===================== TOOLS — two worked examples ===================== */}
      <section className="py-28 max-lg:py-20">
        <div className="container-page">
          <Reveal className="mb-14 max-w-3xl">
            <SectionLabel>Tools we have built</SectionLabel>
            <h2 className="mb-4 text-[clamp(1.5rem,1.4rem+2vw,2.5rem)] tracking-tight">
              Two worked examples, not one product
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-slate-400">
              Alongside client work we build our own tools, each aimed at a specific
              question a deal team actually asks. They are the clearest answer to what we
              mean by software built around the process rather than around the data,
              and they are examples of the approach, not the whole of what we do.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
            {TOOLS.map(({ slug, href, Icon, name, audience, summary, question, input, output }, i) => (
              <Reveal key={slug} variant={i === 0 ? "left" : "right"} className="h-full">
                <Link
                  href={href}
                  className="surface-card group flex h-full flex-col p-8 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-navy-700 hover:shadow-elevated max-md:p-6"
                >
                  <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400 transition-[background,transform] duration-400 ease-[var(--ease-brand)] group-hover:scale-105 group-hover:bg-gold-400/14">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="mb-2 block text-xs font-semibold tracking-wide uppercase text-slate-500">
                    {audience}
                  </span>
                  <h3 className="mb-3 text-xl tracking-tight">{name}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">{summary}</p>

                  <p className="mb-6 border-l-2 border-navy-700 pl-4 text-sm leading-relaxed text-slate-300 italic">
                    “{question}”
                  </p>

                  <dl className="mb-7 grid grid-cols-2 gap-4 border-t border-navy-800 pt-5 text-sm max-sm:grid-cols-1">
                    <div>
                      <dt className="mb-1 text-xs font-semibold tracking-wide uppercase text-slate-500">
                        Works from
                      </dt>
                      <dd className="leading-relaxed text-slate-400">{input}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs font-semibold tracking-wide uppercase text-slate-500">
                        Gives you
                      </dt>
                      <dd className="leading-relaxed text-slate-400">{output}</dd>
                    </div>
                  </dl>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400">
                    See the demo
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

      {/* ===================== ABOUT TEASER ===================== */}
      <section className="pb-28 max-lg:pb-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionLabel>Who we are</SectionLabel>
            <h2 className="mb-4 text-[clamp(1.4rem,1.3rem+1.6vw,2rem)] tracking-tight">
              We have sat on both sides of the process
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-slate-400">
              We have worked in private equity and investment banking. The inefficiencies
              we build against are ones we sat through, which is why we start by asking
              where your week actually goes.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400"
            >
              More about us
              <ArrowRight
                size={14}
                strokeWidth={1.75}
                className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection secondary={{ href: "/services", label: "See what we do" }} />
    </>
  );
}
