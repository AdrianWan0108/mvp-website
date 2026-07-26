"use client";

import {
  formatPrice,
  publicOptionsForSection,
  type PricingSection,
} from "@/app/lib/pricing-data";
import { OptionSelector } from "./option-selector";
import { PricingResult } from "./pricing-result";
import { usePricingSelection } from "./pricing-selection-context";

/**
 * 04 Seniors — two ten-session programmes at the reduced rate.
 *
 * Senior Fitness has no confirmed validity period, so its panel simply omits
 * that row rather than filling it with an assumption.
 */
export function SectionSeniors({ section }: { section: PricingSection }) {
  const { selectedKey, select, hasTouched } = usePricingSelection();
  const options = publicOptionsForSection(section.id);
  const activeKey = selectedKey(section.id);
  const active = options.find((option) => option.key === activeKey);

  return (
    <>
      <OptionSelector
        className="mt-8 max-w-xl"
        label={section.selectorLabel}
        labelId="seniors-selector-label"
        options={options.map((option) => ({
          value: option.key,
          label: option.name,
          hint: `${formatPrice(option.price)} · 10 sessions`,
        }))}
        value={activeKey}
        onChange={(next) => select(section.id, next)}
      />

      <PricingResult
        className="mt-6"
        section={section}
        options={options}
        activeKey={activeKey}
      />

      <p aria-live="polite" className="sr-only">
        {hasTouched(section.id) && active
          ? `${active.name}, ${formatPrice(active.price)}`
          : ""}
      </p>
    </>
  );
}
