"use client";

import {
  formatPerUnit,
  formatPrice,
  publicOptionsForSection,
  type PricingSection,
} from "@/app/lib/pricing-data";
import { ClassCountScale } from "./class-count-scale";
import { PricingResult } from "./pricing-result";
import { usePricingSelection } from "./pricing-selection-context";

/**
 * 02 Group Class Packs — the decision most visitors are actually here to make.
 *
 * This is the one section that keeps a control of its own: choosing among five
 * sizes on a numeric scale is a different action from picking between two or
 * three named things, and the falling price-per-class is the whole argument for
 * buying a bigger pack. Everything else on the page uses the shared selector.
 */
export function SectionGroupPacks({ section }: { section: PricingSection }) {
  const { selectedKey, select, hasTouched } = usePricingSelection();
  const options = publicOptionsForSection(section.id);
  const activeKey = selectedKey(section.id);
  const active = options.find((option) => option.key === activeKey);

  return (
    <>
      <ClassCountScale
        className="mt-8 max-w-2xl"
        label={section.selectorLabel}
        labelId="group-packs-selector-label"
        options={options}
        value={activeKey}
        onChange={(next) => select(section.id, next)}
      />

      <PricingResult
        className="mt-8"
        section={section}
        options={options}
        activeKey={activeKey}
      />

      <p aria-live="polite" className="sr-only">
        {hasTouched(section.id) && active
          ? `${active.name}, ${formatPrice(active.price)}, ${formatPerUnit(active)}`
          : ""}
      </p>
    </>
  );
}
