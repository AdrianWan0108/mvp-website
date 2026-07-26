import type { Metadata } from "next";
import { Container } from "../components/container";
import { PageHeader } from "../components/page-header";
import { PricingCard } from "../components/pricing/pricing-card";
import { PrivatePriceCard } from "../components/pricing/private-price-card";
import { cn } from "@/app/lib/cn";
import {
  optionsForSection,
  pricingSections,
  privateOptions,
  privateSection,
} from "@/app/lib/pricing-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Class packs, memberships, senior sessions, and private training rates at Motion Vitality Pilates in Markham. Buy online through Mindbody.",
};

/**
 * A dense, print-sheet grid: every option is the same width, so packs read as
 * a rate card rather than a set of tiers. auto-fit collapses to one column on
 * narrow screens without a breakpoint. Cards re-flow their own contents at
 * width — see PricingCard.
 */
const grid =
  "mt-8 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]";

/** Full-bleed bands alternate so verdant carries roughly half the page. The
 *  header band is brand, so the sections start light to avoid merging. */
const bands = [
  "bg-background",
  "bg-secondary text-secondary-foreground",
] as const;

function band(index: number) {
  return cn("py-14 sm:py-20", bands[index % bands.length]);
}

function SectionHeader({
  id,
  heading,
  description,
}: {
  id: string;
  heading: string;
  description: string;
}) {
  return (
    <>
      {/* The one place the hero verdant appears at full strength. */}
      <span aria-hidden className="block h-1 w-10 bg-primary" />
      <h2
        id={id}
        className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl"
      >
        {heading}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground">{description}</p>
    </>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHeader
        compact
        tone="brand"
        title="Pricing"
        intro="Every class pack, membership, and private rate at the studio, with checkout through Mindbody."
      />

      {pricingSections.map((section, index) => (
        <section
          key={section.id}
          aria-labelledby={`${section.id}-heading`}
          className={band(index)}
        >
          <Container>
            <SectionHeader
              id={`${section.id}-heading`}
              heading={section.heading}
              description={section.description}
            />

            <div className={grid}>
              {optionsForSection(section.id).map((option) => (
                <PricingCard key={option.key} option={option} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section
        aria-labelledby="private-heading"
        className={band(pricingSections.length)}
      >
        <Container>
          <SectionHeader
            id="private-heading"
            heading={privateSection.heading}
            description={privateSection.description}
          />

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {privateSection.intro}
          </p>

          <div className={grid}>
            {privateOptions.map((option) => (
              <PrivatePriceCard key={option.key} option={option} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
