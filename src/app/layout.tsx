import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arbitrex.co.uk"),
  title: {
    default: "Arbitrex — Software for investment banks and private equity",
    template: "%s — Arbitrex",
  },
  description:
    "Arbitrex builds software for investment banks and private equity firms: bespoke systems, workflow automation and AI implementation — plus our own tools, including an origination engine and a strategic fit engine.",
  openGraph: {
    type: "website",
    url: "https://www.arbitrex.co.uk",
    title: "Arbitrex — Software for investment banks and private equity",
    description:
      "Bespoke builds, workflow automation and AI implementation, by people who have worked in private equity and investment banking.",
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
