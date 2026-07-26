"use client";

import { Check } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { useRovingRadioGroup } from "./use-roving-radio-group";

export type SegmentedOption = {
  value: string;
  label: string;
  /** Optional second line, e.g. a price or a commitment length. */
  hint?: string;
};

/**
 * A row of large, always-visible choices — the pricing page's default
 * selector. Deliberately not a dropdown: the whole point of the restructure
 * is that you can see what the alternatives are without opening anything.
 *
 * Selection is signalled three ways (fill, weight, and a check icon) so it
 * never depends on colour alone. Buttons stretch to fill the row and carry a
 * generous min-height, which keeps them comfortable on a phone.
 */
export function SegmentedControl({
  label,
  labelId,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  labelId: string;
  options: SegmentedOption[];
  value: string;
  onChange: (next: string) => void;
  className?: string;
}) {
  const values = options.map((option) => option.value);
  const { setRef, onKeyDown, tabIndexFor } = useRovingRadioGroup(
    values,
    value,
    onChange,
  );

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
        className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
      >
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <button
              key={option.value}
              ref={setRef(option.value)}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={tabIndexFor(option.value)}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex min-h-[3.25rem] flex-1 items-center justify-between gap-3 rounded-[2px] border px-4 py-3 text-left transition-colors sm:min-w-[10rem]",
                checked
                  ? "border-primary bg-primary font-semibold text-primary-foreground"
                  : "border-brand-300 bg-card font-normal text-card-foreground hover:border-brand-500 hover:bg-brand-50",
              )}
            >
              <span className="min-w-0">
                <span className="block text-base leading-snug">
                  {option.label}
                </span>
                {option.hint && (
                  <span
                    className={cn(
                      "mt-0.5 block text-sm leading-snug",
                      checked ? "text-primary-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    {option.hint}
                  </span>
                )}
              </span>
              {/* Reserves its own width whether or not it is showing, so
                  checking an option cannot nudge the label. */}
              <Check
                aria-hidden
                strokeWidth={2.5}
                className={cn("h-5 w-5 shrink-0", !checked && "invisible")}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
