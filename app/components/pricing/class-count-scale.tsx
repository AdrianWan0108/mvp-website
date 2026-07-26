"use client";

import { cn } from "@/app/lib/cn";
import { optionLabel, type PricingOption } from "@/app/lib/pricing-data";
import { Meta, focusRing } from "./pricing-ui";
import { useRovingRadioGroup } from "./use-roving-radio-group";

/**
 * The class-count scale: a measuring rule, not a slider.
 *
 * Each pack is a numeral standing on a tick, and the ticks stand on a ruled
 * line. There is no track and no draggable handle, because the studio sells
 * five fixed packs — a slider would imply 17 classes is purchasable. Reading
 * it as a ruler also says the right thing about Pilates: counted, spaced,
 * repeatable.
 *
 * Stops are evenly spaced rather than scaled to their class count. The packs
 * are what you choose between, and true spacing would crowd 1 and 10 into the
 * left tenth of the rule.
 *
 * Underneath it is a radiogroup with the page's shared keyboard model, so the
 * numerals are directly clickable and arrow keys step between packs.
 */
export function ClassCountScale({
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

  // Stops sit at the centre of equal columns, so the rule runs from the first
  // centre to the last: 10% to 90% at five stops.
  const edge = 50 / options.length;
  const span = 100 - edge * 2;
  const filled = lastIndex > 0 ? (activeIndex / lastIndex) * span : 0;

  return (
    <div className={className}>
      <Meta id={labelId} className="block text-brand-800">
        {label}
      </Meta>

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={onKeyDown}
        className="relative mt-4"
      >
        <div className="grid grid-cols-5">
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
                // The visible label is a bare numeral; spell out what the stop
                // actually buys for anyone not reading the layout.
                aria-label={`${optionLabel(option)}, ${option.name}`}
                className={cn(
                  "group flex flex-col items-center gap-3 pb-2 pt-1",
                  focusRing,
                )}
              >
                {/* Size and weight carry the selected state alongside colour,
                    so the scale still reads in monochrome. */}
                <span
                  aria-hidden
                  className={cn(
                    "font-serif tabular-nums leading-none transition-[font-size,color] motion-reduce:transition-none",
                    checked
                      ? "text-4xl font-bold text-brand-900 sm:text-5xl"
                      : "text-2xl font-normal text-brand-800 group-hover:text-brand-900 sm:text-3xl",
                  )}
                >
                  {option.count}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "transition-all motion-reduce:transition-none",
                    checked
                      ? "h-5 w-[3px] bg-brand-700"
                      : "h-2.5 w-px bg-brand-400 group-hover:h-4 group-hover:bg-brand-600",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* The rule the ticks stand on, and the length of it you have bought.
            Both pale: this is the one line the section needs, and a dark one
            would compete with the numerals it is supporting. */}
        <span
          aria-hidden
          className="absolute bottom-2 h-px bg-brand-300"
          style={{ left: `${edge}%`, width: `${span}%` }}
        />
        <span
          aria-hidden
          className="absolute bottom-[7px] h-[3px] bg-brand-500 motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out"
          style={{ left: `${edge}%`, width: `${filled}%` }}
        />
      </div>
    </div>
  );
}
