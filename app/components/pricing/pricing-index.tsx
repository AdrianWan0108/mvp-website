"use client";

import {
  formatPriceRange,
  pricingSections,
  privateOptions,
  privateSection,
  sectionIndexEntry,
  type PricingScope,
} from "@/app/lib/pricing-data";
import { Meta } from "./pricing-ui";
import { sectionAnchorId } from "./section-anchors";
import { usePricingSelection } from "./pricing-selection-context";

type IndexRow = {
  scope: PricingScope;
  label: string;
  range: string;
};

/**
 * Jump links to the five categories.
 *
 * A quiet card each, showing the name and what that section spans — enough to
 * choose from without scrolling, and the range is derived, so hiding an option
 * or changing a figure updates this automatically. No icons: the category names
 * are doing the work, and a decorative glyph beside each would only add noise.
 *
 * Real anchors, so they work with JavaScript off. The click handler only
 * upgrades the jump to a reduced-motion aware scroll that also moves focus to
 * the destination heading.
 */
export function PricingIndex() {
  const { selectAndScroll } = usePricingSelection();

  const rows: IndexRow[] = [
    ...pricingSections.map((section) => ({
      scope: section.id as PricingScope,
      label: section.heading,
      range: sectionIndexEntry(section).range,
    })),
    {
      scope: privateSection.id,
      label: privateSection.heading,
      // Private rates are booked rather than bought, so the range reads from
      // the cheapest entry point up.
      range: `from ${formatPriceRange([
        Math.min(...privateOptions.map((option) => option.singlePrice)),
      ])}`,
    },
  ];

  return (
    <nav aria-label="Pricing sections">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {rows.map((row, index) => (
          <li key={row.scope}>
            <a
              href={`#${sectionAnchorId(row.scope)}`}
              onClick={(event) => {
                // Leave modified clicks (new tab, etc.) to the browser.
                if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                event.preventDefault();
                selectAndScroll(row.scope, null);
              }}
              className="flex h-full flex-col justify-between gap-6 rounded-lg border border-brand-200 bg-white p-4 transition-colors hover:border-brand-400 hover:bg-brand-50"
            >
              <Meta className="text-brand-700">
                <span className="tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Meta>
              <span>
                <span className="block font-serif text-xl leading-tight tracking-[0.03em] text-brand-900">
                  {row.label}
                </span>
                <span className="mt-1.5 block text-sm tabular-nums text-brand-800">
                  {row.range}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
