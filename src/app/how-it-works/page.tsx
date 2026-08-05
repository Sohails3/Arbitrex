import type { Metadata } from "next";
import { CtaSection, PageHeader } from "@/components/cta-section";
import { FramesSection } from "@/components/frames-section";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Define the mandate, work the results with full company detail beside them, then track what changes. Three steps, one continuous view.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        label="How it works"
        title="From register to shortlist"
        intro="Three steps, one continuous view: define the mandate, work the results with full company detail beside them, then track what changes. Scroll to move through them."
      />
      <FramesSection showHeader={false} />
      <CtaSection secondary={{ href: "/provenance", label: "How we label sources" }} />
    </>
  );
}
