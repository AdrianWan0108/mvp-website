"use client";

import Link from "next/link";
import {
  formatPrice,
  privateOptions,
  privateSection,
  type PrivateOption,
} from "@/app/lib/pricing-data";
import { OptionStack } from "./option-stack";
import { SegmentedControl } from "./segmented-control";
import { usePricingSelection } from "./pricing-selection-context";

/** "from $100" where the single-session rate is a starting price, else "$130". */
function singleLabel(option: PrivateOption): string {
  const price = formatPrice(option.singlePrice);
  return option.singleQualifier ? `from ${price}` : price;
}

function PrivateFace({ option }: { option: PrivateOption }) {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <span className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
        {privateSection.heading}
      </span>

      <div className="mt-3 grid flex-1 gap-x-10 gap-y-6 md:grid-cols-[1fr_minmax(14rem,auto)]">
        <div className="md:col-start-1 md:row-start-1">
          <h3 className="font-sans text-2xl font-medium leading-snug sm:text-3xl">
            {option.name}
          </h3>
          <p className="mt-2 max-w-prose text-base leading-relaxed text-muted-foreground">
            {option.blurb}
          </p>

          {/* The ten-session price is the headline figure on the right, so it
              is not repeated here — only the per-session rate and any note. */}
          <dl className="mt-5 text-base">
            <div className="flex items-baseline justify-between gap-6 border-b border-brand-200 py-2 last:border-b-0">
              <dt className="shrink-0 text-sm uppercase tracking-[0.1em] text-muted-foreground">
                Single session
              </dt>
              <dd className="text-right font-medium">{singleLabel(option)}</dd>
            </div>
            {option.note && (
              <div className="flex items-baseline justify-between gap-6 py-2">
                <dt className="shrink-0 text-sm uppercase tracking-[0.1em] text-muted-foreground">
                  Note
                </dt>
                <dd className="text-right font-medium">{option.note}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="flex flex-col gap-6 md:col-start-2 md:row-start-1 md:items-end md:text-right">
          <p className="font-serif text-5xl leading-none text-brand-800 sm:text-6xl">
            {formatPrice(option.tenPrice)}
            <span className="mt-2 block font-sans text-base font-normal text-muted-foreground">
              for 10 sessions
            </span>
          </p>

          <div className="w-full md:mt-auto md:w-56">
            <Link
              href={privateSection.href}
              className="block rounded-[2px] bg-primary px-5 py-3 text-center text-base font-medium text-primary-foreground transition-colors hover:bg-brand-600"
            >
              {privateSection.cta}
              <span className="sr-only"> — {option.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One-on-one training. Same selector-plus-one-card shape as the other
 * sections, but these are booked with an instructor rather than checked out
 * online, so the action is a link to the schedule and there is no Mindbody
 * widget to keep alive.
 */
export function PrivateTrainingSectionBody() {
  const { selectedKey, select, hasTouched } = usePricingSelection();
  const activeKey = selectedKey(privateSection.id);
  const active = privateOptions.find((option) => option.key === activeKey);

  const labelId = "private-selector-label";
  const summary = active
    ? `${active.name}, ${singleLabel(active)} per session, ${formatPrice(active.tenPrice)} for 10 sessions`
    : "";

  // Silent until the visitor changes the selection — see PricingSectionBody.
  const announcement = hasTouched(privateSection.id) ? summary : "";

  return (
    <div className="mt-8">
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {privateSection.intro}
      </p>

      <SegmentedControl
        className="mt-8"
        label={privateSection.selectorLabel}
        labelId={labelId}
        options={privateOptions.map((option) => ({
          value: option.key,
          label: option.name,
          hint: `${singleLabel(option)} per session`,
        }))}
        value={activeKey}
        onChange={(next) => select(privateSection.id, next)}
      />

      <article className="mt-6 rounded-[2px] border border-brand-300 bg-card text-card-foreground">
        <OptionStack
          items={privateOptions}
          activeKey={activeKey}
          render={(option) => <PrivateFace option={option} />}
          className="grid"
        />
      </article>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
