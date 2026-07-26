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
import { cn } from "@/app/lib/cn";

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
              className={cn(
                "pricing-index-card flex h-full min-h-40 flex-col justify-between gap-6 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1",
                index === 0 &&
                  "border-brand-600 bg-brand-500 text-brand-900",
                index === 1 &&
                  "border-brand-900 bg-brand-800 text-white",
                index > 1 &&
                  "border-brand-300 bg-white text-brand-900 hover:border-brand-600",
              )}
            >
              <Meta
                className={
                  index === 1
                    ? "text-brand-300"
                    : index === 0
                      ? "text-brand-900"
                      : "text-brand-700"
                }
              >
                <span className="tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Meta>
              <span>
                <span
                  className={cn(
                    "block font-serif text-2xl leading-tight tracking-[0.03em]",
                    index === 1 ? "text-white" : "text-brand-900",
                  )}
                >
                  {row.label}
                </span>
                <span
                  className={cn(
                    "mt-1.5 block text-sm tabular-nums",
                    index === 1
                      ? "text-brand-200"
                      : index === 0
                        ? "text-brand-900"
                        : "text-brand-800",
                  )}
                >
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
