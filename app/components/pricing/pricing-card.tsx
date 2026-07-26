import { cn } from "@/app/lib/cn";
import {
  formatPrice,
  optionLabel,
  optionTerm,
  type PricingOption,
} from "@/app/lib/pricing-data";
import { BuyNowWidget } from "./buy-now-widget";

/**
 * One purchasable option. Server-rendered; only the Mindbody buy link inside
 * BuyNowWidget is client-side.
 *
 * The page grid is auto-fit, so a card's width depends on how many options its
 * section has (~235px at 5 per row, ~400px at 3, ~600px at 2) rather than on
 * the viewport. The card is therefore a container-query context and re-flows
 * against its OWN width: narrow cards stack, wide cards split into a details
 * column and a price/action column so the extra width carries content instead
 * of sitting empty.
 *
 * The @container element is deliberately unpadded — padding lives on the inner
 * wrapper. If the padded element were the container, a padding change at the
 * @xs threshold would shrink the content box back below the threshold and the
 * query could oscillate.
 */
export function PricingCard({ option }: { option: PricingOption }) {
  const label = optionLabel(option);
  const term = optionTerm(option);

  return (
    <article
      className={cn(
        "@container rounded-[2px] border border-brand-300 bg-card text-card-foreground",
        option.badge && "border-t-2 border-t-primary",
      )}
    >
      <div className="flex h-full flex-col p-6 @xs:p-8">
        {(label || option.badge) && (
          // Single line, always: the label truncates and the badge never wraps,
          // so a badged card's header stays the same height as its neighbours'
          // and the row keeps its baseline.
          <div className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-sm uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </span>
            {option.badge && (
              <span className="shrink-0 whitespace-nowrap rounded-[2px] bg-primary px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground">
                {option.badge}
              </span>
            )}
          </div>
        )}

        <h3 className="mt-2 font-sans text-xl font-medium leading-snug @xs:text-2xl">
          {option.name}
        </h3>

        {/* Narrow: price, details, action stack in DOM order. Wide: details
            take the left column, price and action stack down the right. */}
        <div className="mt-4 grid flex-1 gap-x-8 @xs:grid-cols-[1fr_minmax(11rem,auto)] @xs:grid-rows-[auto_1fr]">
          <p className="font-serif text-5xl leading-none text-brand-800 @xs:col-start-2 @xs:row-start-1 @xs:text-right">
            {formatPrice(option.price)}
            {option.interval === "month" && (
              <span className="ml-1.5 font-sans text-base font-normal text-muted-foreground">
                / month
              </span>
            )}
          </p>

          <dl className="mt-4 space-y-1 text-base text-muted-foreground @xs:col-start-1 @xs:row-start-1 @xs:row-span-2 @xs:mt-0">
            {term && (
              <div>
                <dt className="sr-only">Term</dt>
                <dd>{term}</dd>
              </div>
            )}
            {option.perUnit && (
              <div>
                <dt className="sr-only">Rate</dt>
                <dd>{option.perUnit}</dd>
              </div>
            )}
            {option.note && (
              <div>
                <dt className="sr-only">Note</dt>
                <dd>{option.note}</dd>
              </div>
            )}
          </dl>

          {/* mt-auto bottom-aligns the action across a stacked row; in the wide
              layout self-end does the same job inside the right column. */}
          <div className="mt-auto pt-6 @xs:col-start-2 @xs:row-start-2 @xs:mt-0 @xs:self-end">
            <BuyNowWidget
              serviceId={option.serviceId}
              serviceName={option.name}
              priceNumber={option.price}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
