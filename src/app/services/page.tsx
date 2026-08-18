import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CtaSection, PageHeader } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bespoke software builds, workflow automation, and AI implementation for investment banks and private equity firms.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Three ways we take work off the desk"
        intro="Most engagements start with the same question — which part of the week is spent on assembly rather than judgement. The answer decides which of these is the right place to begin."
      />

      <section className="pt-16 pb-8">
        <div className="container-page">
          <div className="flex flex-col gap-6">
            {SERVICES.map(({ slug, Icon, title, body, examples, engagement }, i) => (
              <Reveal key={slug} variant={i % 2 === 0 ? "left" : "right"}>
                <article
                  id={slug}
                  className="surface-card grid scroll-mt-28 grid-cols-[1fr_1fr] gap-12 p-10 max-lg:grid-cols-1 max-lg:gap-8 max-md:p-6"
                >
                  <div>
                    <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h2 className="mb-3 text-xl tracking-tight">{title}</h2>
                    <p className="mb-5 text-base leading-relaxed text-slate-400">{body}</p>
                    <p className="border-l-2 border-navy-700 pl-4 text-sm leading-relaxed text-slate-500">
                      {engagement}
                    </p>
                  </div>

                  <div className="border-l border-navy-800 pl-12 max-lg:border-l-0 max-lg:border-t max-lg:pt-8 max-lg:pl-0">
                    <h3 className="mb-4 text-xs font-semibold tracking-wide uppercase text-slate-500">
                      What that looks like
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {examples.map((example) => (
                        <li key={example} className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-400/8 text-gold-400">
                            <Check size={12} strokeWidth={2.5} />
                          </span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Not sure which one you need?"
        body="That is a normal place to start. Tell us what your week looks like and we will say which of the three would move the needle — or if none of them would."
        secondary={{ href: "/strategic-fit-engine", label: "See a tool we built" }}
      />
    </>
  );
}
