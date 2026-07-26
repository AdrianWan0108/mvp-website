"use client";

import { cn } from "@/app/lib/cn";
import { optionLabel, type PricingOption } from "@/app/lib/pricing-data";
import { useRovingRadioGroup } from "./use-roving-radio-group";

/**
 * The class-pack scale: a rail with one stop per package.
 *
 * It reads like a slider so the jump from 1 to 40 feels like one continuous
 * decision, but it is a radiogroup underneath and every stop is a real button.
 * That matters because the studio sells five fixed packages — there is no such
 * thing as 17 classes, and a true <input type="range"> would both imply there
 * is and demand precise dragging on a phone.
 *
 * Stops are evenly spaced rather than positioned by class count: the packages
 * are what you choose between, and spacing them 1, 10, 20, 30, 40 to scale
 * would crowd the two cheapest options into the left edge.
 */
export function PackScale({
  label,
  labelId,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  labelId: string;
  options: PricingOption[];
  value: string;
  onChange: (next: string) => void;
  className?: string;
}) {
  const values = options.map((option) => option.key);
  const { setRef, onKeyDown, tabIndexFor } = useRovingRadioGroup(
    values,
    value,
    onChange,
  );

  const activeIndex = Math.max(0, values.indexOf(value));
  const lastIndex = options.length - 1;

  // Stops sit at the centre of equal columns, so the first and last are half a
  // column in from each edge. The rail spans between those two centres.
  const edge = 50 / options.length;
  const span = 100 - edge * 2;
  const filled = lastIndex > 0 ? (activeIndex / lastIndex) * span : 0;

  return (
    <div className={className}>
      <p
        id={labelId}
        className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label}
      </p>

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={onKeyDown}
        className="relative mt-4"
      >
        {/* Rail. Pinned to the vertical centre of the 44px dot targets below. */}
        <span
          aria-hidden
          className="absolute top-[22px] h-[3px] -translate-y-1/2 rounded-full bg-brand-200"
          style={{ left: `${edge}%`, width: `${span}%` }}
        />
        <span
          aria-hidden
          className="absolute top-[22px] h-[3px] -translate-y-1/2 rounded-full bg-primary motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out"
          style={{ left: `${edge}%`, width: `${filled}%` }}
        />

        <div
          className="relative grid"
          style={{
            gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
          }}
        >
          {options.map((option) => {
            const checked = option.key === value;
            return (
              <button
                key={option.key}
                ref={setRef(option.key)}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={tabIndexFor(option.key)}
                onClick={() => onChange(option.key)}
                // The visible label is just a number; spell it out for
                // screen readers so the stop announces what it buys.
                aria-label={`${optionLabel(option)}, ${option.name}`}
                className="flex flex-col items-center rounded-[2px] pb-1"
              >
                {/* 44px square: the touch target is the whole box, not the dot. */}
                <span className="flex h-11 w-11 items-center justify-center">
                  <span
                    aria-hidden
                    className={cn(
                      "rounded-full motion-safe:transition-all motion-safe:duration-200",
                      checked
                        ? "h-5 w-5 bg-primary ring-4 ring-brand-200"
                        : "h-3 w-3 bg-brand-300",
                    )}
                  />
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-1 text-base tabular-nums",
                    checked
                      ? "font-bold text-foreground underline decoration-2 underline-offset-4"
                      : "font-normal text-muted-foreground",
                  )}
                >
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
