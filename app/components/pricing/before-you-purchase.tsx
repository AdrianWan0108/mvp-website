import Link from "next/link";
import { purchaseTerms } from "@/app/lib/pricing-data";
import { Meta } from "./pricing-ui";

/**
 * Purchase terms. Held in one quiet panel so eight short lines read as a single
 * block of small print rather than eight ruled-off statements — point form, two
 * columns, and no line between items.
 *
 * Server-rendered; nothing here is interactive.
 */
export function BeforeYouPurchase() {
  return (
    <div className="pricing-panel rounded-2xl border border-brand-300 bg-white p-6 sm:p-8 lg:p-10">
      <Meta className="text-brand-700">Before you purchase</Meta>

      <h2
        id="before-you-purchase-heading"
        className="mt-2 font-serif text-3xl leading-none tracking-[0.03em] text-brand-900"
      >
        Good to know
      </h2>

      <ul className="mt-6 grid gap-x-12 gap-y-2.5 sm:grid-cols-2">
        {purchaseTerms.map((term) => (
          <li
            key={term}
            className="flex gap-3 text-base leading-relaxed text-brand-800"
          >
            <span
              aria-hidden
              className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-brand-500"
            />
            <span>{term}</span>
          </li>
        ))}
      </ul>

      <p className="mt-7 text-base text-brand-800">
        Full details are in our{" "}
        <Link
          href="/terms"
          className="font-medium text-brand-900 underline decoration-brand-400 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-700"
        >
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="/policies"
          className="font-medium text-brand-900 underline decoration-brand-400 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-700"
        >
          Emergency &amp; Sickness Policies
        </Link>
        .
      </p>
    </div>
  );
}
