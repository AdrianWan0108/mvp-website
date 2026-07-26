import Link from "next/link";
import { purchaseTerms } from "@/app/lib/pricing-data";

/**
 * The short version of the purchase terms, sitting under the buy buttons
 * rather than a click away. Server-rendered — nothing here is interactive.
 *
 * Deliberately a summary: the wording lives in pricing-data.ts and the full
 * documents are linked at the end.
 */
export function BeforeYouPurchase() {
  return (
    <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
      {purchaseTerms.map((term) => (
        <li
          key={term}
          className="flex gap-3 text-base leading-relaxed text-muted-foreground"
        >
          <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 bg-primary" />
          <span>{term}</span>
        </li>
      ))}
    </ul>
  );
}

export function PolicyLinks() {
  return (
    <p className="mt-8 text-base text-muted-foreground">
      Full details are in our{" "}
      <Link
        href="/terms"
        className="font-medium text-foreground underline underline-offset-4 hover:text-brand-700"
      >
        Terms &amp; Conditions
      </Link>{" "}
      and{" "}
      <Link
        href="/policies"
        className="font-medium text-foreground underline underline-offset-4 hover:text-brand-700"
      >
        Emergency &amp; Sickness Policies
      </Link>
      .
    </p>
  );
}
