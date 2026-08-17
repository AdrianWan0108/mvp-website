import type { Metadata } from "next";
import { Container } from "../components/container";
import { ScrollReveal } from "../components/scroll-reveal";
import { BeforeYouPurchase } from "../components/pricing/before-you-purchase";
import { PricingMasthead } from "../components/pricing/pricing-masthead";
import { PricingTabs } from "../components/pricing/pricing-tabs";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Class packs, memberships, senior sessions, and private training rates at Motion Vitality Pilates in Markham. Buy online through Mindbody.",
};

export default function PricingPage() {
  return (
    <>
      <PricingMasthead />

      <section
        aria-label="Pricing options"
        className="relative isolate z-20 overflow-hidden bg-brand-50 pb-20 pt-10 text-foreground sm:pb-24 sm:pt-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 -z-10 size-96 rounded-full bg-brand-300/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-80 rounded-full bg-brand-400/20 blur-3xl"
        />

        <Container>
          <ScrollReveal>
            <div data-reveal>
              <PricingTabs />
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-24 sm:mt-32">
            <div data-reveal aria-labelledby="before-you-purchase-heading">
              <BeforeYouPurchase />
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
