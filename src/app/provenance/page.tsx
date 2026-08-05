import type { Metadata } from "next";
import { CtaSection, PageHeader } from "@/components/cta-section";
import { DataRow, PanelBar } from "@/components/data-row";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Provenance",
  description:
    "Every value carries a label naming where it came from. Modelled figures get both an amber tag and a dashed underline.",
};

const SOURCES = [
  { name: "Straight from the register", value: "£2.6m", variant: "register" },
  { name: "A filed, verifiable fact", value: "£4.2m", variant: "filed" },
  { name: "A model output", value: "£11.8m", variant: "estimated" },
  { name: "Lower-confidence source", value: "£1.4m", variant: "other" },
] as const;

export default function ProvenancePage() {
  return (
    <>
      <PageHeader
        label="Provenance"
        title="An estimate never looks like a fact"
        intro="Every value carries a label naming where it came from. Modelled figures get both an amber tag and a dashed underline — so you always know what you are relying on before you act on it."
      />

      <section className="pt-12 pb-28 max-lg:pb-20">
        <div className="container-page">
          <Reveal variant="scale" className="surface-card mx-auto max-w-[720px] overflow-hidden">
            <PanelBar left="Source labels" />
            {SOURCES.map((source, i) => (
              <Reveal key={source.name} variant="row" delay={i * 100}>
                <DataRow name={source.name} value={source.value} variant={source.variant} />
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaSection secondary={{ href: "/product", label: "See the product" }} />
    </>
  );
}
