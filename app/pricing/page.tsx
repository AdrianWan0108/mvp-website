import type { Metadata } from "next";
import { Container } from "../components/container";
import { PageHeader } from "../components/page-header";
import {
  BeforeYouPurchase,
  PolicyLinks,
} from "../components/pricing/before-you-purchase";
import { PlanFinder } from "../components/pricing/plan-finder";
import { PricingSectionBody } from "../components/pricing/pricing-section";
import { PrivateTrainingSectionBody } from "../components/pricing/private-training-section";
import { PricingSelectionProvider } from "../components/pricing/pricing-selection-context";
import {
  sectionAnchorId,
  sectionHeadingId,
} from "../components/pricing/section-anchors";
import { cn } from "@/app/lib/cn";
import { pricingSections, privateSection } from "@/app/lib/pricing-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Class packs, memberships, senior sessions, and private training rates at Motion Vitality Pilates in Markham. Find your best fit and buy online through Mindbody.",
};

/** Full-bleed bands alternate so verdant carries roughly half the page. The
 *  header band is brand, so the sections start light to avoid merging. */
const bands = [
  "bg-background",
  "bg-secondary text-secondary-foreground",
] as const;

function band(index: number) {
  return cn("py-14 sm:py-20", bands[index % bands.length]);
}

/**
 * Section heading. `headingId` doubles as the focus target the plan finder
 * moves to after scrolling, hence tabIndex={-1}.
 */
function SectionHeader({
  headingId,
  heading,
  description,
}: {
  headingId: string;
  heading: string;
  description: string;
}) {
  return (
    <>
      {/* The one place the hero verdant appears at full strength. */}
      <span aria-hidden className="block h-1 w-10 bg-primary" />
      {/* No outline-none here: browsers only apply :focus-visible to a
          programmatic focus when the last input was the keyboard, so someone
          who pressed Enter on "View this option" gets a "you are here" ring
          and someone who clicked does not. */}
      <h2
        id={headingId}
        tabIndex={-1}
        className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl"
      >
        {heading}
      </h2>
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
        {description}
      </p>
    </>
  );
}

/**
 * Pricing is a Server Component: only the selectors, the dynamic cards, and
 * the plan finder are client islands. PricingSelectionProvider is a client
 * boundary but takes the sections as `children`, so every heading and every
 * line of static copy below still renders on the server.
 */
export default function PricingPage() {
  return (
    <>
      <PageHeader
        compact
        tone="brand"
        title="Pricing"
        intro="Every class pack, membership, and private rate at the studio, with checkout through Mindbody."
      />

      <PricingSelectionProvider>
        <section
          id="pricing-finder"
          aria-labelledby="finder-heading"
          className={band(0)}
        >
          <Container>
            <span aria-hidden className="block h-1 w-10 bg-primary" />
            <h2
              id="finder-heading"
              className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl"
            >
              Find your best fit
            </h2>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
              Three questions at most, and we&rsquo;ll point you at the option
              that suits how you want to train.
            </p>
            <PlanFinder />
          </Container>
        </section>

        {pricingSections.map((section, index) => (
          <section
            key={section.id}
            id={sectionAnchorId(section.id)}
            aria-labelledby={sectionHeadingId(section.id)}
            // +1 because the finder occupies the first band.
            className={band(index + 1)}
          >
            <Container>
              <SectionHeader
                headingId={sectionHeadingId(section.id)}
                heading={section.heading}
                description={section.description}
              />
              <PricingSectionBody section={section} />
            </Container>
          </section>
        ))}

        <section
          id={sectionAnchorId(privateSection.id)}
          aria-labelledby={sectionHeadingId(privateSection.id)}
          className={band(pricingSections.length + 1)}
        >
          <Container>
            <SectionHeader
              headingId={sectionHeadingId(privateSection.id)}
              heading={privateSection.heading}
              description={privateSection.description}
            />
            <PrivateTrainingSectionBody />
          </Container>
        </section>
      </PricingSelectionProvider>

      <section
        aria-labelledby="before-you-purchase-heading"
        className={band(pricingSections.length + 2)}
      >
        <Container>
          <span aria-hidden className="block h-1 w-10 bg-primary" />
          <h2
            id="before-you-purchase-heading"
            className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl"
          >
            Before you purchase
          </h2>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            The short version of the terms that apply to every package and
            booking.
          </p>
          <BeforeYouPurchase />
          <PolicyLinks />
        </Container>
      </section>
    </>
  );
}
