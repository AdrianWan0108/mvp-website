import Link from "next/link";
import { privateSection, type PrivateOption } from "@/app/lib/pricing-data";

/**
 * One-on-one option. Mirrors PricingCard's container-query layout so the two
 * card types share a rhythm, but the action books time with an instructor
 * rather than opening a Mindbody checkout — private pricing depends on the
 * package chosen at booking.
 */
export function PrivatePriceCard({ option }: { option: PrivateOption }) {
  return (
    <article className="@container rounded-[2px] border border-brand-300 bg-card text-card-foreground">
      <div className="flex h-full flex-col p-6 @xs:p-8">
        <h3 className="font-sans text-xl font-medium leading-snug @xs:text-2xl">
          {option.name}
        </h3>

        <div className="mt-4 grid flex-1 gap-x-8 @xs:grid-cols-[1fr_minmax(11rem,auto)] @xs:grid-rows-[auto_1fr]">
          <div className="space-y-1 text-base leading-relaxed text-muted-foreground @xs:col-start-1 @xs:row-start-1 @xs:row-span-2">
            <p>{option.priceLabel}</p>
            {option.note && <p>{option.note}</p>}
          </div>

          <div className="mt-auto pt-6 @xs:col-start-2 @xs:row-start-2 @xs:mt-0 @xs:self-end">
            <Link
              href={privateSection.href}
              className="block rounded-[2px] bg-primary px-5 py-3 text-center text-base font-medium text-primary-foreground transition-colors hover:bg-brand-600"
            >
              {privateSection.cta}
              <span className="sr-only"> — {option.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
