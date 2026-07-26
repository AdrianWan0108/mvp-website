"use client";

import { Check } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { Meta, focusRing } from "./pricing-ui";
import { useRovingRadioGroup } from "./use-roving-radio-group";

export type SelectorOption = {
  value: string;
  label: string;
  /** Second line — usually the price, so the choice can be made here. */
  hint?: string;
};

/**
 * The page's one selector control, used by New Here, Seniors and One-on-One.
 *
 * Deliberately shared. An earlier pass gave every section its own bespoke
 * control — a split bar, a row of ruled buttons, a tab strip — and the result
 * read as five unrelated widgets rather than one page. Sections still differ in
 * what they show and how their results are laid out; they no longer differ in
 * how you operate them.
 *
 * Only Group Class Packs keeps a control of its own, because choosing between
 * five sizes on a numeric scale is a genuinely different action from picking
 * between two or three named things.
 *
 * Selection is carried by fill, weight and a tick, so it never rests on colour
 * alone.
 */
export function OptionSelector({
  label,
  labelId,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  labelId: string;
  options: SelectorOption[];
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
      <Meta id={labelId} className="block text-brand-800">
        {label}
      </Meta>

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={onKeyDown}
        className={cn(
          "mt-3 grid gap-3",
          options.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
        )}
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
                "flex items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left transition-all",
                checked
                  // brand-400, not brand-500: this button carries a 14px price
                  // as well as its label, and brand-900 only reaches 4.4:1 on
                  // brand-500 — fine for display type, short of AA for small.
                  // brand-500 is reserved for the CTAs, whose type is 20px.
                  ? "border-brand-900 bg-brand-800 text-white shadow-lg shadow-brand-900/15"
                  : "border-brand-300 bg-white text-brand-900 shadow-sm hover:-translate-y-0.5 hover:border-brand-600 hover:bg-brand-50 hover:shadow-md",
                focusRing,
              )}
            >
              <span className="min-w-0">
                {/* 20px display type, which is also what lets brand-900 on
                    brand-500 pass as large text on the selected fill. */}
                <span
                  className={cn(
                    "block font-serif text-xl uppercase leading-none tracking-[0.04em]",
                    checked ? "font-bold" : "font-normal",
                  )}
                >
                  {option.label}
                </span>
                {option.hint && (
                  <span
                    className={cn(
                      "mt-1.5 block text-sm tabular-nums",
                      checked ? "text-brand-100" : "text-brand-800",
                    )}
                  >
                    {option.hint}
                  </span>
                )}
              </span>
              {/* Holds its width either way, so checking cannot nudge the label. */}
              <Check
                aria-hidden
                strokeWidth={3}
                className={cn("h-4 w-4 shrink-0", !checked && "invisible")}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
