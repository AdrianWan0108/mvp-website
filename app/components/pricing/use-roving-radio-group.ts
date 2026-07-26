"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";

/**
 * Keyboard behaviour shared by every pricing selector, following the ARIA
 * radiogroup pattern: one tab stop for the whole group (the checked option),
 * arrow keys move between options and select as they go, Home/End jump to the
 * ends. Both the segmented control and the 1→40 scale use this, so the two
 * feel identical to operate despite looking nothing alike.
 *
 * Arrows wrap, which suits a small closed set of packages — arrowing past 40
 * lands back on 1 rather than dead-ending.
 */
export function useRovingRadioGroup(
  values: readonly string[],
  value: string,
  onChange: (next: string) => void,
) {
  const refs = useRef(new Map<string, HTMLButtonElement>());

  const setRef = useCallback(
    (optionValue: string) => (element: HTMLButtonElement | null) => {
      if (element) refs.current.set(optionValue, element);
      else refs.current.delete(optionValue);
    },
    [],
  );

  const moveTo = useCallback(
    (index: number) => {
      const next = values[(index + values.length) % values.length];
      if (!next) return;
      onChange(next);
      // Focus follows selection so the next arrow press continues from here.
      refs.current.get(next)?.focus();
    },
    [values, onChange],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const current = values.indexOf(value);
      if (current === -1) return;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          moveTo(current + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          moveTo(current - 1);
          break;
        case "Home":
          event.preventDefault();
          moveTo(0);
          break;
        case "End":
          event.preventDefault();
          moveTo(values.length - 1);
          break;
        default:
          break;
      }
    },
    [values, value, moveTo],
  );

  /** Roving tab stop: only the checked option is reachable with Tab. */
  const tabIndexFor = useCallback(
    (optionValue: string) => (optionValue === value ? 0 : -1),
    [value],
  );

  return { setRef, onKeyDown, tabIndexFor };
}
