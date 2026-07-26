"use client";

import {
  dropInPrice,
  formatPerUnit,
  formatPrice,
  optionLabel,
  savingsVsDropIn,
  type PricingOption,
  type PricingSection,
} from "@/app/lib/pricing-data";
import { BuyNowWidget } from "./buy-now-widget";
import { OptionStack } from "./option-stack";
import { Panel, Price, SpecList } from "./pricing-ui";

/**
 * The result panel: whichever option a section currently has selected.
 *
 * Name and price share the top line, because those are the two things anyone
 * scanning a rate sheet reads first and they belong together. Everything else —
 * what you get, how long it lasts, what it saves — sits below one hairline,
 * aligned on a shared label column.
 *
 * New Here, Group Class Packs and Seniors all use this. Their selectors and
 * framing differ; the result reads the same way in each, which is what stops
 * the page feeling like five separate pages.
 */
function ResultFace({
  option,
  section,
}: {
  option: PricingOption;
  section: PricingSection;
}) {
  const saving = section.showSavings ? savingsVsDropIn(option) : null;
  // optionLabel() falls back to a generic "Membership", so it is only used
  // where it genuinely counts something.
  const subtitle = option.count && option.unit ? optionLabel(option) : null;

  const specs: { label: string; value: string; emphasis?: boolean }[] = [];
  if (option.validity) {
    specs.push({ label: "Valid", value: `${option.validity} from purchase` });
  }
  if (saving && option.count) {
    specs.push({
      label: "You save",
      value: `${formatPrice(saving)} against ${option.count} drop-ins at ${formatPrice(dropInPrice)}`,
      emphasis: true,
    });
  }
  if (option.eligibility) {
    specs.push({ label: "Eligibility", value: option.eligibility });
  }

  return (
    <Panel>
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
          <div className="min-w-0 max-w-lg">
            <h3 className="font-serif text-[2rem] uppercase leading-none tracking-[0.03em] text-brand-900 sm:text-[2.5rem]">
              {option.name}
            </h3>
            {subtitle && (
              <p className="mt-2 text-base text-brand-800">{subtitle}</p>
            )}
            <p className="mt-3 text-base leading-relaxed text-brand-800">
              {option.blurb}
            </p>
          </div>

          <div className="shrink-0 sm:text-right">
            <Price
              amount={option.price}
              interval={option.interval}
              perUnit={
                option.count && option.count > 1 ? formatPerUnit(option) : null
              }
            />
          </div>
        </div>

        {specs.length > 0 && (
          <hr className="my-7 border-0 border-t border-brand-200" />
        )}

        <div className="grid gap-x-10 gap-y-7 md:grid-cols-[minmax(0,1fr)_13rem] md:items-end">
          {specs.length > 0 ? <SpecList items={specs} /> : <div />}
          <BuyNowWidget
            serviceId={option.serviceId}
            serviceName={option.name}
            priceNumber={option.price}
          />
        </div>
      </div>
    </Panel>
  );
}

/**
 * Every option's panel is rendered and all but the selected one hidden. That
 * is not laziness — see OptionStack: healcode.js scans for its widgets exactly
 * once, so a panel whose serviceId changed would render an empty buy button.
 * It also fixes the panel's height, so switching options cannot shift the page.
 */
export function PricingResult({
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
  return (
    <OptionStack
      items={options}
      activeKey={activeKey}
      className={className ? `${className} grid` : "grid"}
      render={(option) => <ResultFace option={option} section={section} />}
    />
  );
}
