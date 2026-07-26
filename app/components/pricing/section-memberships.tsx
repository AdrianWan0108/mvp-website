"use client";

import { Check } from "lucide-react";
import { cn } from "@/app/lib/cn";
import {
  formatPrice,
  publicOptionsForSection,
  type PricingSection,
} from "@/app/lib/pricing-data";
import { BuyNowWidget } from "./buy-now-widget";
import { Meta, Price, SpecList, focusRing } from "./pricing-ui";
import { useRovingRadioGroup } from "./use-roving-radio-group";
import { usePricingSelection } from "./pricing-selection-context";

/**
 * 03 Memberships — the one section that shows both options at once.
 *
 * Everywhere else you are choosing a size, so one result panel is right. Here
 * the two plans are identical except for the term, and you cannot judge whether
 * a year is worth $50 a month without both figures in front of you. So this is
 * two panels side by side rather than a selector plus a result.
 *
 * Commitment is set at display size in both panels because it is the only real
 * difference between them. Both plans stay purchasable; the selection decides
 * which panel is emphasised and which CTA takes the solid fill.
 */
export function SectionMemberships({ section }: { section: PricingSection }) {
  const { selectedKey, select, hasTouched } = usePricingSelection();
  const options = publicOptionsForSection(section.id);
  const activeKey = selectedKey(section.id);
  const active = options.find((option) => option.key === activeKey);

  const values = options.map((option) => option.key);
  const { setRef, onKeyDown, tabIndexFor } = useRovingRadioGroup(
    values,
    activeKey,
    (next) => select(section.id, next),
  );

  const labelId = "memberships-selector-label";

  return (
    <>
      <Meta id={labelId} className="mt-8 block text-brand-800">
        {section.selectorLabel}
      </Meta>

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={onKeyDown}
        className="mt-3 grid gap-4 md:grid-cols-2"
      >
        {options.map((option) => {
          const checked = option.key === activeKey;
          return (
            <div
              key={option.key}
              className={cn(
                "flex flex-col rounded-lg border transition-colors",
                checked
                  ? "border-brand-500 bg-white"
                  : "border-brand-200 bg-white",
              )}
            >
              {/* The header is the control. The figures below sit outside it so
                  the Buy Now link is never nested inside a button. */}
              <button
                ref={setRef(option.key)}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={tabIndexFor(option.key)}
                onClick={() => select(section.id, option.key)}
                className={cn(
                  "flex items-start gap-3 rounded-t-lg px-6 pb-5 pt-6 text-left transition-colors",
                  // brand-400 matches the shared selector's selected fill —
                  // see the note there on why it is not brand-500.
                  checked ? "bg-brand-400" : "hover:bg-brand-50",
                  focusRing,
                )}
              >
                <Check
                  aria-hidden
                  strokeWidth={3}
                  className={cn(
                    "mt-1.5 h-4 w-4 shrink-0 text-brand-900",
                    !checked && "invisible",
                  )}
                />
                <span
                  className={cn(
                    "font-serif text-2xl uppercase leading-tight tracking-[0.03em] text-brand-900",
                    checked ? "font-bold" : "font-normal",
                  )}
                >
                  {option.name}
                </span>
              </button>

              <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
                <Price amount={option.price} interval="month" />

                <p className="mt-5 text-base leading-relaxed text-brand-800">
                  {option.blurb}
                </p>

                <SpecList
                  className="mt-6"
                  items={[
                    { label: "Commitment", value: option.commitment ?? "" },
                    { label: "Billing", value: "Billed monthly" },
                    { label: "Access", value: "Unlimited group classes" },
                  ]}
                />

                <div className="mt-7 pt-1">
                  <BuyNowWidget
                    serviceId={option.serviceId}
                    serviceName={option.name}
                    priceNumber={option.price}
                    emphasis={checked ? "solid" : "quiet"}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {hasTouched(section.id) && active
          ? `${active.name}, ${formatPrice(active.price)} per month, ${active.commitment}`
          : ""}
      </p>
    </>
  );
}
