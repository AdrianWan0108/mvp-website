"use client";

import { cn } from "@/app/lib/cn";
import {
  formatPerUnit,
  formatPrice,
  optionLabel,
  savingsVsDropIn,
  type PricingOption,
  type PricingSection,
} from "@/app/lib/pricing-data";
import { BuyNowWidget } from "./buy-now-widget";
import { OptionStack } from "./option-stack";

type DetailRow = { term: string; value: string };

/**
 * The spec-sheet rows under the name. Order follows the card's information
 * priority: what you get, how long you have, what you save, who may buy it.
 */
function detailRows(
  option: PricingOption,
  section: PricingSection,
): DetailRow[] {
  const rows: DetailRow[] = [];

  if (option.interval === "month") {
    if (option.commitment) {
      rows.push({ term: "Commitment", value: option.commitment });
    }
    rows.push({ term: "Billing", value: "Billed monthly" });
  } else {
    const includes = optionLabel(option);
    if (includes) rows.push({ term: "Includes", value: includes });
    if (option.validity) {
      rows.push({ term: "Valid for", value: option.validity });
    }
  }

  if (section.showSavings) {
    const saving = savingsVsDropIn(option);
    if (saving) {
      rows.push({
        term: "You save",
        value: `${formatPrice(saving)} vs ${option.count} drop-ins`,
      });
    }
  }

  if (option.eligibility) {
    rows.push({ term: "Eligibility", value: option.eligibility });
  }

  return rows;
}

/** Plain-text summary of a selection, for the section's live region. */
export function optionSummary(
  option: PricingOption,
  section: PricingSection,
): string {
  const parts = [option.name, formatPrice(option.price)];
  if (option.interval === "month") parts.push("per month");
  const rate = formatPerUnit(option);
  if (rate && option.count && option.count > 1) parts.push(rate);
  const saving = section.showSavings ? savingsVsDropIn(option) : null;
  if (saving) parts.push(`saving ${formatPrice(saving)}`);
  return parts.join(", ");
}

/** One option's face. Every option in the section renders one; one is visible. */
function OptionFace({
  option,
  section,
}: {
  option: PricingOption;
  section: PricingSection;
}) {
  const rows = detailRows(option, section);
  const rate = formatPerUnit(option);

  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-3">
        <span className="min-w-0 truncate text-sm uppercase tracking-[0.14em] text-muted-foreground">
          {section.heading}
        </span>
        {option.badge && (
          <span className="shrink-0 whitespace-nowrap rounded-[2px] bg-primary px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground">
            {option.badge}
          </span>
        )}
      </div>

      {/* Wide: name/blurb/details on the left, price and action on the right.
          Narrow: everything stacks in DOM order, which is also the order the
          information matters in. */}
      <div className="mt-3 grid flex-1 gap-x-10 gap-y-6 md:grid-cols-[1fr_minmax(14rem,auto)]">
        <div className="md:col-start-1 md:row-start-1">
          <h3 className="font-sans text-2xl font-medium leading-snug sm:text-3xl">
            {option.name}
          </h3>
          {option.blurb && (
            <p className="mt-2 max-w-prose text-base leading-relaxed text-muted-foreground">
              {option.blurb}
            </p>
          )}

          <dl className="mt-5 text-base">
            {rows.map((row) => (
              <div
                key={row.term}
                className="flex items-baseline justify-between gap-6 border-b border-brand-200 py-2 last:border-b-0"
              >
                <dt className="shrink-0 text-sm uppercase tracking-[0.1em] text-muted-foreground">
                  {row.term}
                </dt>
                <dd className="text-right font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Price and action share the right column, price pinned to the top
            and the button to the bottom however tall the details get. */}
        <div className="flex flex-col gap-6 md:col-start-2 md:row-start-1 md:items-end md:text-right">
          <p className="font-serif text-5xl leading-none text-brand-800 sm:text-6xl">
            {formatPrice(option.price)}
            {option.interval === "month" && (
              <span className="ml-1.5 font-sans text-base font-normal text-muted-foreground">
                / month
              </span>
            )}
            {rate && option.count && option.count > 1 && (
              <span className="mt-2 block font-sans text-base font-normal text-muted-foreground">
                {rate}
              </span>
            )}
          </p>

          <div className="w-full md:mt-auto md:w-56">
            <BuyNowWidget
              serviceId={option.serviceId}
              serviceName={option.name}
              priceNumber={option.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The single pricing card for one section. Which option it shows is driven by
 * the section's selector; see OptionStack for why every option is rendered.
 */
export function DynamicPricingCard({
  section,
  options,
  activeKey,
  className,
}: {
  section: PricingSection;
  options: PricingOption[];
  activeKey: string;
  className?: string;
}) {
  const active = options.find((option) => option.key === activeKey);

  return (
    <article
      className={cn(
        // The top border is always 2px and only its colour changes with the
        // badge. Switching the width instead would move the card by a pixel
        // every time you selected in or out of the badged option.
        "rounded-[2px] border border-t-2 border-brand-300 bg-card text-card-foreground",
        active?.badge && "border-t-primary",
        className,
      )}
    >
      <OptionStack
        items={options}
        activeKey={activeKey}
        render={(option) => <OptionFace option={option} section={section} />}
        className="grid"
      />
    </article>
  );
}
