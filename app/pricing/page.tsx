import type { Metadata } from "next";
import { Container } from "../components/container";
import { BeforeYouPurchase } from "../components/pricing/before-you-purchase";
import { PricingIndex } from "../components/pricing/pricing-index";
import { PricingMasthead } from "../components/pricing/pricing-masthead";
import { PricingSelectionProvider } from "../components/pricing/pricing-selection-context";
import { SectionHeader } from "../components/pricing/pricing-ui";
import { SectionGroupPacks } from "../components/pricing/section-group-packs";
import { SectionMemberships } from "../components/pricing/section-memberships";
import { SectionNewHere } from "../components/pricing/section-new-here";
import { SectionPrivate } from "../components/pricing/section-private";
import { SectionSeniors } from "../components/pricing/section-seniors";
import {
  sectionAnchorId,
  sectionHeadingId,
} from "../components/pricing/section-anchors";
import { cn } from "@/app/lib/cn";
import {
  pricingSections,
  privateSection,
  type PricingScope,
} from "@/app/lib/pricing-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Class packs, memberships, senior sessions, and private training rates at Motion Vitality Pilates in Markham. Buy online through Mindbody.",
};

/**
 * Background per section.
 *
 * Kept to two tones so the page reads as one surface with the panels sitting on
 * it, rather than five differently coloured rooms. Group packs takes the tinted
 * band because it is the decision most visitors come for; the others sit on the
 * paper colour. The panels themselves are white, which is what separates
 * content from background — the background is not doing that job.
 */
const fields: Record<PricingScope, string> = {
  "new-here": "bg-brand-50",
  "group-packs": "bg-brand-100",
  memberships: "bg-brand-50",
  seniors: "bg-brand-50",
  private: "bg-brand-100",
};

export default function PricingPage() {
  return (
    <>
      <PricingMasthead />

      <PricingSelectionProvider>
        <section aria-labelledby="contents-heading" className="bg-brand-50 pt-12 sm:pt-16">
          <Container>
            <h2 id="contents-heading" className="sr-only">
              Pricing sections
            </h2>
            <PricingIndex />
          </Container>
        </section>

        {/* Every section shares this shell — header, selector, result panel —
            so the page has one rhythm. What varies is inside: group packs has
            its own numeric scale, memberships shows two panels instead of one. */}
        {pricingSections.map((section, index) => {
          const Body =
            section.id === "new-here"
              ? SectionNewHere
              : section.id === "group-packs"
                ? SectionGroupPacks
                : section.id === "memberships"
                  ? SectionMemberships
                  : SectionSeniors;

          return (
            <section
              key={section.id}
              id={sectionAnchorId(section.id)}
              aria-labelledby={sectionHeadingId(section.id)}
              className={cn("py-16 sm:py-24", fields[section.id])}
            >
              <Container>
                <SectionHeader
                  index={index + 1}
                  headingId={sectionHeadingId(section.id)}
                  heading={section.heading}
                  standfirst={section.description}
                />
                <Body section={section} />
              </Container>
            </section>
          );
        })}

        <section
          id={sectionAnchorId(privateSection.id)}
          aria-labelledby={sectionHeadingId(privateSection.id)}
          className={cn("py-16 sm:py-24", fields[privateSection.id])}
        >
          <Container>
            <SectionHeader
              index={pricingSections.length + 1}
              headingId={sectionHeadingId(privateSection.id)}
              heading={privateSection.heading}
              standfirst={privateSection.description}
            />
            <SectionPrivate />
          </Container>
        </section>
      </PricingSelectionProvider>

      <section
        aria-labelledby="before-you-purchase-heading"
        className="bg-brand-50 pb-20 pt-4 sm:pb-24"
      >
        <Container>
          <BeforeYouPurchase />
        </Container>
      </section>
    </>
  );
}
