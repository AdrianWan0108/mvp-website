"use client";

import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";
import { formatPrice } from "@/app/lib/pricing-data";

/**
 * Shared pieces for the pricing page.
 *
 * Two rules govern everything here, both learned the hard way:
 *
 * 1. Group with a panel, separate with space — not with lines. An earlier pass
 *    ruled off every single row, and the page turned into a thicket of
 *    hairlines with nothing actually held together. Labels and values align on
 *    a shared grid instead, so the columns read without needing a border to
 *    prove it. At most one hairline per panel.
 *
 * 2. Where a rule is genuinely needed it is brand-200, not brand-900. Dark
 *    rules shout as loudly as the type; pale ones sit behind it.
 *
 * On colour: the palette's mid greens are weaker than they look — brand-500 is
 * 4.4:1 against brand-900 and brand-600 only 3.3:1 — so they carry identity as
 * FILLS (buttons, selected states, the scale) where the type on them is
 * display-sized. Small text is always brand-800 or brand-900.
 */

/** Focus ring stated explicitly: the global one is brand-500, which vanishes
 *  against a selected control's own brand-500 fill. */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900";

export const metaClass =
  "text-[0.7rem] font-semibold uppercase tracking-[0.18em]";

/** Small uppercase label. */
export function Meta({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <span id={id} className={cn(metaClass, className)}>
      {children}
    </span>
  );
}

/**
 * The panel that holds a section's result. Modest radius and a pale border:
 * enough to group the contents, not enough to float above the page. No shadow —
 * containment comes from the edge, not from a drop.
 */
export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-brand-200 bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Label/value pairs on a shared two-column grid. No rules between rows — the
 * alignment does that work, and eight hairlines in a row is what made the
 * previous version unreadable.
 */
export function SpecList({
  items,
  className,
}: {
  items: { label: string; value: ReactNode; emphasis?: boolean }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-x-6 gap-y-3 sm:grid-cols-[8rem_minmax(0,1fr)]",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-x-6 sm:col-span-2 sm:grid-cols-subgrid"
        >
          <dt className={cn(metaClass, "pt-1 text-brand-800")}>
            {item.label}
          </dt>
          <dd
            className={cn(
              "text-base leading-relaxed",
              item.emphasis
                ? "font-semibold text-brand-700"
                : "text-brand-900",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A price, set as display type. Tabular figures so the digits hold their
 * column as the selection changes.
 */
export function Price({
  amount,
  interval,
  perUnit,
  size = "lg",
}: {
  amount: number;
  interval?: "once" | "month";
  perUnit?: string | null;
  size?: "lg" | "xl";
}) {
  return (
    <p className="text-brand-900">
      <span
        className={cn(
          "font-serif tabular-nums leading-[0.85]",
          size === "xl"
            ? "text-[3.75rem] sm:text-[5rem]"
            : "text-[3rem] sm:text-[3.75rem]",
        )}
      >
        {formatPrice(amount)}
      </span>
      {interval === "month" && (
        <span className="ml-2 text-base font-normal text-brand-800">
          / month
        </span>
      )}
      {perUnit && (
        <span className="mt-1.5 block text-base tabular-nums text-brand-800">
          {perUnit}
        </span>
      )}
    </p>
  );
}

/**
 * Section heading. The number continues the contents list, so the index and
 * the sections refer to each other — it is a wayfinding device, not an
 * ornament.
 *
 * `headingId` doubles as the focus target the index moves to after scrolling,
 * hence tabIndex={-1}. No outline-none: browsers only apply :focus-visible to
 * a programmatic focus when the last input was the keyboard, so someone who
 * pressed Enter in the index gets a "you are here" ring and a mouse user does
 * not.
 */
export function SectionHeader({
  index,
  headingId,
  heading,
  standfirst,
}: {
  index: number;
  headingId: string;
  heading: string;
  standfirst: string;
}) {
  return (
    <header className="max-w-2xl">
      <Meta className="text-brand-700">
        <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
      </Meta>
      <h2
        id={headingId}
        tabIndex={-1}
        className="mt-2 font-serif text-[2.5rem] leading-[0.95] tracking-[0.02em] text-brand-900 sm:text-5xl"
      >
        {heading}
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-brand-800">
        {standfirst}
      </p>
    </header>
  );
}
