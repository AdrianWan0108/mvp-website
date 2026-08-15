import type { Metadata } from "next";
import { Container } from "../components/container";
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
        className="relative z-20 bg-background pb-20 pt-10 text-foreground sm:pb-24 sm:pt-14"
      >
        <Container>
          <PricingTabs />

          <div
            className="mt-24 sm:mt-32"
            aria-labelledby="before-you-purchase-heading"
          >
            <BeforeYouPurchase />
          </div>
        </Container>
      </section>
    </>
  );
}
