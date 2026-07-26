"use client";

import {
  formatPrice,
  optionLabel,
  publicOptionsForSection,
  type PricingSection,
} from "@/app/lib/pricing-data";
import { OptionSelector } from "./option-selector";
import { PricingResult } from "./pricing-result";
import { usePricingSelection } from "./pricing-selection-context";

/** 01 New Here — two intro offers, chosen by how many classes you want. */
export function SectionNewHere({ section }: { section: PricingSection }) {
  const { selectedKey, select, hasTouched } = usePricingSelection();
  const options = publicOptionsForSection(section.id);
  const activeKey = selectedKey(section.id);
  const active = options.find((option) => option.key === activeKey);

  return (
    <>
      <OptionSelector
        className="mt-8 max-w-xl"
        label={section.selectorLabel}
        labelId="new-here-selector-label"
        options={options.map((option) => ({
          value: option.key,
          label: optionLabel(option),
          hint: formatPrice(option.price),
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
