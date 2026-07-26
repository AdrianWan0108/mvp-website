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
    <section className="bg-brand-300 text-brand-900">
      <Container className="py-14 sm:py-20">
        <Meta className="text-brand-800">Motion Vitality Pilates · Markham</Meta>

        <h1 className="mt-4 font-serif text-[3.75rem] leading-[0.9] tracking-[0.02em] sm:text-[5.5rem]">
          Pricing
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed sm:text-xl">
          Every class pack, membership, and private rate at the studio, with
          checkout through Mindbody.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Meta className="text-brand-800">Prices in CAD · HST extra</Meta>
          <Link
            href="/classes/schedule"
            className="text-base font-medium underline decoration-brand-600 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-900"
          >
            View class schedule
          </Link>
        </div>
      </Container>
    </section>
  );
}
