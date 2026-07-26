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
import {
  FeatureList,
  Meta,
  Panel,
  Price,
  SpecList,
  focusRing,
} from "./pricing-ui";
import { usePricingSelection } from "./pricing-selection-context";

/** "from $100" where the single-session rate is a starting price, else "$130". */
function singleLabel(option: PrivateOption): string {
  const price = formatPrice(option.singlePrice);
  return option.singleQualifier ? `from ${price}` : price;
}

/**
 * 05 One-on-One Training — these rates are booked with an instructor rather
 * than purchased through the embedded checkout.
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
          <Panel className="overflow-hidden">
            <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="min-w-0 max-w-2xl">
                  <Meta className="text-brand-700">Personalized training</Meta>
                  <h3 className="mt-2 font-serif text-[2rem] uppercase leading-none tracking-[0.03em] text-brand-900 sm:text-[2.5rem]">
                    {option.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-800">
                    {option.blurb}
                  </p>
                </div>

                <div className="mt-7 border-t border-brand-200 pt-6">
                  <Meta className="text-brand-700">What to expect</Meta>
                  <FeatureList
                    className="mt-4 sm:grid-cols-2"
                    items={option.highlights}
                  />
                </div>
              </div>

              <aside className="flex flex-col justify-between border-t border-brand-300 bg-brand-800 p-6 text-white sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div>
                  <Meta className="text-brand-300">Ten-session package</Meta>
                  <div className="mt-4 [&_p]:!text-white [&_span]:!text-brand-100">
                    <Price amount={option.tenPrice} />
                  </div>
                  <p className="mt-1.5 text-base text-brand-200">
                    for 10 sessions
                  </p>
                </div>

                <SpecList
                  className="my-8 [&_dd]:!text-brand-50 [&_dt]:!text-brand-300"
                  items={[
                    { label: "Single session", value: singleLabel(option) },
                    ...(option.note
                      ? [{ label: "Note", value: option.note }]
                      : []),
                  ]}
                />

                <div>
                  <Link
                    href={privateSection.href}
                    className={cn(
                      "block rounded-lg bg-brand-500 px-5 py-3 text-center font-serif text-xl uppercase leading-none tracking-[0.08em] text-brand-900 transition-colors hover:bg-brand-400",
                      focusRing,
                    )}
                  >
                    {privateSection.cta}
                    <span className="sr-only"> — {option.name}</span>
                    <span aria-hidden> →</span>
                  </Link>
                  <p className="mt-4 text-sm leading-relaxed text-brand-200">
                    {privateSection.intro}
                  </p>
                </div>
              </aside>
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
