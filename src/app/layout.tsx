import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arbitrex.co.uk"),
  title: "Arbitrex — Company intelligence, sourced and provable",
  description:
    "Arbitrex surfaces company intelligence with the source shown next to every number, so filed fact and model estimate are never mistaken for one another.",
  openGraph: {
    type: "website",
    url: "https://www.arbitrex.co.uk",
    title: "Arbitrex — Company intelligence, sourced and provable",
    description:
      "Every data point shows where it came from. Filed fact, register record and model estimate are always visually distinct.",
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
      <body>{children}</body>
    </html>
  );
}
