import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arbitrex.co.uk"),
  title: {
    default: "Arbitrex — Vertical software for investment banks and private equity",
    template: "%s — Arbitrex",
  },
  description:
    "Arbitrex is a vertical software system that streamlines process for investment banks and private equity firms — sourcing, screening, diligence and monitoring in one place.",
  openGraph: {
    type: "website",
    url: "https://www.arbitrex.co.uk",
    title: "Arbitrex — Vertical software for investment banks and private equity",
    description:
      "Built by people who have worked in private equity and investment banking, around the workflow they know is slow.",
    images: ["/assets/logo-256.png"],
  },
  twitter: { card: "summary" },
  icons: {
    icon: "/assets/favicon-64.png",
    apple: "/assets/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#faf8f7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        {/* Page-level aurora. Fixed to the viewport rather than sized to the
            document, so it stays one screen tall however long the page is and
            the content scrolls over it. -z-10 keeps it above the body colour
            but below every surface. */}
        <AuroraBackground
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 h-screen bg-transparent"
        />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
