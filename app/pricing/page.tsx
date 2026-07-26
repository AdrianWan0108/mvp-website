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
const fields: Record<
  PricingScope,
  { className: string; inverse?: boolean }
> = {
  "new-here": { className: "bg-brand-100" },
  "group-packs": { className: "bg-brand-200" },
  memberships: { className: "bg-brand-800", inverse: true },
  seniors: { className: "bg-brand-100" },
  private: { className: "bg-brand-200" },
};

export default function PricingPage() {
  return (
    <>
      <PricingMasthead />

      <PricingSelectionProvider>
        <section
          aria-labelledby="contents-heading"
          className="relative z-20 bg-brand-100 pb-14 sm:pb-20"
        >
          <Container className="-mt-7 sm:-mt-10">
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
                : SectionSeniors;
          const field = fields[section.id];

          return (
            <section
              key={section.id}
              id={sectionAnchorId(section.id)}
              aria-labelledby={sectionHeadingId(section.id)}
              className={cn(
                "pricing-section relative isolate overflow-hidden py-16 sm:py-24",
                field.className,
              )}
            >
              <Container>
                <SectionHeader
                  index={index + 1}
                  headingId={sectionHeadingId(section.id)}
                  heading={section.heading}
                  standfirst={section.description}
                  inverse={field.inverse}
                />
                {section.id === "memberships" ? (
                  <SectionMemberships section={section} inverse />
                ) : (
                  <Body section={section} />
                )}
              </Container>
            </section>
          );
        })}

        <section
          id={sectionAnchorId(privateSection.id)}
          aria-labelledby={sectionHeadingId(privateSection.id)}
          className={cn(
            "pricing-section relative isolate overflow-hidden py-16 sm:py-24",
            fields[privateSection.id].className,
          )}
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
        className="pricing-endcap bg-brand-900 pb-20 pt-16 sm:pb-24 sm:pt-20"
      >
        <Container>
          <BeforeYouPurchase />
        </Container>
      </section>
    </>
  );
}
