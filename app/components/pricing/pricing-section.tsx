"use client";

import {
  formatPrice,
  publicOptionsForSection,
  type PricingSection as PricingSectionConfig,
} from "@/app/lib/pricing-data";
import { DynamicPricingCard, optionSummary } from "./dynamic-pricing-card";
import { PackScale } from "./pack-scale";
import { SegmentedControl } from "./segmented-control";
import { usePricingSelection } from "./pricing-selection-context";

/**
 * The interactive half of a pricing section: the selector and the one card it
 * drives. The heading and description stay server-rendered on the page, so
 * only this island ships as client JavaScript.
 */
export function PricingSectionBody({
  section,
}: {
  section: PricingSectionConfig;
}) {
  const { selectedKey, select, hasTouched } = usePricingSelection();
  const options = publicOptionsForSection(section.id);
  const activeKey = selectedKey(section.id);
  const active = options.find((option) => option.key === activeKey);

  const labelId = `${section.id}-selector-label`;
  const summary = active ? optionSummary(active, section) : "";

  // The live region stays empty until this section's selection has actually
  // been changed, so it does not read the default option out on page load.
  const announcement = hasTouched(section.id) ? summary : "";

  return (
    <div className="mt-8">
      {section.selector === "scale" ? (
        <PackScale
          label={section.selectorLabel}
          labelId={labelId}
          options={options}
          value={activeKey}
          onChange={(next) => select(section.id, next)}
        />
      ) : (
        <SegmentedControl
          label={section.selectorLabel}
          labelId={labelId}
          options={options.map((option) => ({
            value: option.key,
            label: option.selectorLabel ?? option.name,
            hint:
              option.interval === "month"
                ? `${formatPrice(option.price)} / month`
                : formatPrice(option.price),
          }))}
          value={activeKey}
          onChange={(next) => select(section.id, next)}
        />
      )}

      <DynamicPricingCard
        section={section}
        options={options}
        activeKey={activeKey}
        className="mt-6"
      />

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
