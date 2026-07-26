"use client";

import Link from "next/link";
import { cn } from "@/app/lib/cn";
import {
  formatPrice,
  privateOptions,
  privateSection,
  type PrivateOption,
} from "@/app/lib/pricing-data";
import { OptionSelector } from "./option-selector";
import { OptionStack } from "./option-stack";
import { Panel, Price, SpecList, focusRing } from "./pricing-ui";
import { usePricingSelection } from "./pricing-selection-context";

/** "from $100" where the single-session rate is a starting price, else "$130". */
function singleLabel(option: PrivateOption): string {
  const price = formatPrice(option.singlePrice);
  return option.singleQualifier ? `from ${price}` : price;
}

/**
 * 05 One-on-One Training — the same shape as the other sections, but these are
 * the only rates you cannot buy here. The panel ends in a booking route rather
 * than a checkout, and the ten-session package is the headline figure because
 * the single-session rate is a starting point rather than a fixed amount.
 */
export function SectionPrivate() {
  const { selectedKey, select, hasTouched } = usePricingSelection();
  const activeKey = selectedKey(privateSection.id);
  const active = privateOptions.find((option) => option.key === activeKey);

  return (
    <>
      <OptionSelector
        className="mt-8"
        label={privateSection.selectorLabel}
        labelId="private-selector-label"
        options={privateOptions.map((option) => ({
          value: option.key,
          label: option.name,
          hint: `${singleLabel(option)} per session`,
        }))}
        value={activeKey}
        onChange={(next) => select(privateSection.id, next)}
      />

      <OptionStack
        items={privateOptions}
        activeKey={activeKey}
        className="mt-6 grid"
        render={(option) => (
          <Panel>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
                <div className="min-w-0 max-w-lg">
                  <h3 className="font-serif text-[2rem] uppercase leading-none tracking-[0.03em] text-brand-900 sm:text-[2.5rem]">
                    {option.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-brand-800">
                    {option.blurb}
                  </p>
                </div>

                <div className="shrink-0 sm:text-right">
                  <Price amount={option.tenPrice} />
                  <p className="mt-1.5 text-base text-brand-800">
                    for 10 sessions
                  </p>
                </div>
              </div>

              <hr className="my-7 border-0 border-t border-brand-200" />

              <div className="grid gap-x-10 gap-y-7 md:grid-cols-[minmax(0,1fr)_13rem] md:items-end">
                <SpecList
                  items={[
                    { label: "Single session", value: singleLabel(option) },
                    { label: "Booking", value: privateSection.intro },
                    ...(option.note
                      ? [{ label: "Note", value: option.note }]
                      : []),
                  ]}
                />

                <Link
                  href={privateSection.href}
                  className={cn(
                    "block rounded-lg bg-brand-500 px-5 py-3 text-center font-serif text-xl uppercase leading-none tracking-[0.08em] text-brand-900 transition-colors hover:bg-brand-600",
                    focusRing,
                  )}
                >
                  {privateSection.cta}
                  <span className="sr-only"> — {option.name}</span>
                  <span aria-hidden> →</span>
                </Link>
              </div>
            </div>
          </Panel>
        )}
      />

      <p aria-live="polite" className="sr-only">
        {hasTouched(privateSection.id) && active
          ? `${active.name}, ${formatPrice(active.tenPrice)} for 10 sessions`
          : ""}
      </p>
    </>
  );
}
