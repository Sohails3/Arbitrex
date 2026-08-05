import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-navy-800 bg-navy-900 pt-16 pb-8">
      <div className="container-page">
        <div className="mb-12 grid grid-cols-[1.6fr_1fr_1fr] gap-12 max-md:grid-cols-1 max-md:gap-8">
          <div>
            <span className="inline-flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo-256.png" alt="" width={40} height={40} className="size-10 rounded-xl" />
              <span className="text-base font-bold tracking-wide text-slate-100">Arbitrex</span>
            </span>
            <p className="mt-4 max-w-[22rem] text-sm leading-relaxed text-slate-400">
              Vertical software for investment banks and private equity firms.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide uppercase text-slate-500">Product</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/product" className="text-slate-400 transition-colors duration-150 hover:text-gold-400">Overview</Link></li>
              <li><Link href="/how-it-works" className="text-slate-400 transition-colors duration-150 hover:text-gold-400">How it works</Link></li>
              <li><Link href="/provenance" className="text-slate-400 transition-colors duration-150 hover:text-gold-400">Provenance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wide uppercase text-slate-500">Company</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/about" className="text-slate-400 transition-colors duration-150 hover:text-gold-400">About us</Link></li>
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
