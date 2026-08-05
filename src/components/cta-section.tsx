import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function CtaSection({
  heading = "Request access",
  body = "Arbitrex is currently onboarding a small number of partner firms. If it fits how your team works, we would be glad to talk.",
  secondary,
}: {
  heading?: string;
  body?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="py-28 max-lg:py-20">
      <div className="container-page">
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
              {heading}
            </h2>
            <p className="mx-auto mb-6 max-w-[38rem] text-base leading-relaxed text-slate-400">
              {body}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {/* PLACEHOLDER — replace with a real address */}
              <a
                href="mailto:hello@arbitrex.co.uk"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-gold-400"
              >
                hello@arbitrex.co.uk
              </a>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-navy-700 bg-navy-900 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors duration-150 hover:border-gold-600 hover:text-gold-400"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Masthead for the interior pages. Deliberately a distinct band — tinted
 * surface, hairline rule and breadcrumb — so arriving on a page looks
 * different from scrolling to a section, which is what the anchors used to do.
 */
export function PageHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-navy-800 bg-navy-850 pt-[calc(4.75rem+4.5rem)] pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[40%] -right-[5%] size-[45vw] max-h-[620px] max-w-[620px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(122 30 50 / 0.07), transparent 65%)",
        }}
      />
      <div className="container-page relative">
        <Reveal className="max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-slate-500">
              <li>
                <Link href="/" className="transition-colors duration-150 hover:text-gold-400">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-navy-600">
                /
              </li>
              <li className="font-semibold text-slate-300" aria-current="page">
                {label}
              </li>
            </ol>
          </nav>

          <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-wide uppercase text-gold-400">
            {label}
            <span className="h-px w-12 bg-gold-600" />
          </span>
          <h1 className="mb-5 text-[clamp(2.2rem,1.5rem+2.8vw,3.25rem)] leading-[1.12] tracking-[-0.025em]">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}
