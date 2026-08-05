import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Arbitrex is onboarding a small number of partner firms. Get in touch if it fits how your team works.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Request access"
        intro="Arbitrex is currently onboarding a small number of partner firms. If it fits how your team works, we would be glad to talk."
      />

      <section className="pt-12 pb-28 max-lg:pb-20">
        <div className="container-page">
          <div className="grid max-w-3xl grid-cols-2 gap-6 max-sm:grid-cols-1">
            {/* PLACEHOLDER contact details */}
            <Reveal variant="scale" className="surface-card p-6">
              <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400">
                <Mail size={20} strokeWidth={1.75} />
              </span>
              <h2 className="mb-2 text-base font-semibold">Email</h2>
              <a
                href="mailto:hello@arbitrex.co.uk"
                className="text-sm font-semibold text-gold-400 transition-colors duration-150 hover:text-gold-600"
              >
                hello@arbitrex.co.uk
              </a>
            </Reveal>

            <Reveal variant="scale" delay={80} className="surface-card p-6">
              <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400">
                <MapPin size={20} strokeWidth={1.75} />
              </span>
              <h2 className="mb-2 text-base font-semibold">Where we are</h2>
              <p className="text-sm leading-relaxed text-slate-400">London, United Kingdom</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
