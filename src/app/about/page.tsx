import type { Metadata } from "next";
import { Clock, GitPullRequestArrow, Layers, Users } from "lucide-react";
import { CtaSection, PageHeader } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/frames-section";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Arbitrex is built by people who have worked in private equity and investment banking, on the process problems they sat through themselves.",
};

const INEFFICIENCIES = [
  {
    Icon: Clock,
    title: "Sourcing done by hand",
    text: "Longlists rebuilt from scratch each mandate, in a spreadsheet that is stale the week after it is circulated.",
  },
  {
    Icon: Layers,
    title: "Data spread across tools",
    text: "A screen in one system, filings in another, notes in a third — and no single view that holds them together.",
  },
  {
    Icon: GitPullRequestArrow,
    title: "Process rebuilt every time",
    text: "The same diligence steps repeated per deal, with the structure living in someone's head rather than the tooling.",
  },
  {
    Icon: Users,
    title: "Junior time spent on assembly",
    text: "Analyst hours going into collecting and formatting rather than the judgement the work is actually paid for.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About us"
        title="Built from inside the workflow"
        intro="We have worked in private equity and investment banking. Arbitrex exists because we spent that time doing the process work by hand, and knew what could be taken off the desk."
      />

      <section className="pt-12 pb-8">
        <div className="container-page">
          <div className="grid grid-cols-[1fr_1fr] gap-16 max-lg:grid-cols-1 max-lg:gap-10">
            <Reveal variant="left">
              <p className="mb-5 text-base leading-relaxed text-slate-400">
                Deal teams are not short of data. They are short of process — the
                connective work between having information and being able to act on it.
                That work is where the week goes, and it is almost never the part that
                creates the value.
              </p>
              <p className="mb-5 text-base leading-relaxed text-slate-400">
                Because we have sat on both sides — the bank running the process and the
                fund on the other end of it — we know where the friction actually is. It
                is rarely the analysis. It is the assembly around it: rebuilding the same
                longlist, reconciling the same figures, chasing the same filings.
              </p>
              <p className="text-base leading-relaxed text-slate-400">
                So we build the systems we wanted then — for other firms as bespoke
                software, automation and AI implementation, and for ourselves as the tools
                you can see on this site. Each one is aimed at a specific question rather
                than at a category. Opinionated about the workflow, and honest about where
                every number came from.
              </p>
            </Reveal>

            <Reveal variant="right">
              <SectionLabel>Where the time goes</SectionLabel>
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                {INEFFICIENCIES.map(({ Icon, title, text }) => (
                  <div key={title} className="surface-card p-5">
                    <span className="mb-3 inline-flex size-9 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <h3 className="mb-1.5 text-sm font-semibold">{title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Tell us where your process hurts"
        body="If any of the above sounds like your week, we would be glad to hear which part costs you most. That is how the product gets built."
        secondary={{ href: "/services", label: "See what we do" }}
      />
    </>
  );
}
