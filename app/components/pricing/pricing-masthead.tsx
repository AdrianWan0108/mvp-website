import Link from "next/link";
import { Container } from "../container";
import { Meta } from "./pricing-ui";

/**
 * Pricing intro.
 *
 * Compact and useful rather than a marketing hero: the title, one line of
 * explanation, and the two facts you need before reading any figure — the
 * currency, and where to go to book. No image, no decoration.
 *
 * brand-300 carries the field. brand-900 on it is 6.5:1, so the small print
 * here is readable; the stronger greens are saved for the controls further
 * down, where the type on them is display-sized.
 */
export function PricingMasthead() {
  return (
    <section className="pricing-hero relative isolate overflow-hidden bg-brand-900 text-white">
      <Container className="relative z-10 py-16 sm:py-24">
        <Meta className="text-brand-300">Motion Vitality Pilates · Markham</Meta>

        <h1 className="mt-4 max-w-3xl font-serif text-[4.5rem] leading-[0.86] tracking-[0.02em] sm:text-[7rem]">
          Find your way to move
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl">
          Start with one class, build a steady practice, or choose support
          shaped entirely around you. Every studio rate is here, clearly
          explained.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Meta className="rounded-full border border-brand-600 bg-brand-800 px-4 py-2 text-brand-100">
            Prices in CAD · HST extra
          </Meta>
          <Link
            href="/classes/schedule"
            className="text-base font-semibold text-white underline decoration-brand-500 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-300"
          >
            View class schedule →
          </Link>
        </div>
      </Container>
    </section>
  );
}
