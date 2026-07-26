"use client";

import type { ReactNode } from "react";

/**
 * Renders every option's card face into the SAME grid cell and shows only the
 * selected one. Two problems fall out of this one mechanism:
 *
 * 1. Mindbody. healcode.js scans the document for <healcode-widget> elements
 *    when it executes and never again (see buy-now-widget.tsx); its reload is
 *    refcounted at module scope and only fires when the count goes 0 -> 1. On
 *    a page with four sections mounted that count never reaches zero, so the
 *    obvious approach — one card whose serviceId changes with the selection —
 *    would render an empty box instead of a buy button on every switch.
 *    Mounting every face up front means the single scan finds every widget.
 *
 * 2. Layout shift. The cell is as tall as the tallest face, so switching
 *    options cannot move the page — no min-height guesswork, and it stays
 *    true when someone rewrites a blurb into two lines.
 *
 * `visibility: hidden` rather than `display: none` because the inactive faces
 * still need to occupy layout for (2). It also takes them out of the tab order
 * and the accessibility tree; `inert` and `aria-hidden` make that explicit.
 */
export function OptionStack<T extends { key: string }>({
  items,
  activeKey,
  render,
  className,
}: {
  items: T[];
  activeKey: string;
  render: (item: T) => ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <div
            key={item.key}
            // Every face occupies row 1 / column 1 of the same grid.
            className="col-start-1 row-start-1"
            style={{ visibility: active ? "visible" : "hidden" }}
            aria-hidden={!active}
            inert={!active}
          >
            {render(item)}
          </div>
        );
      })}
    </div>
  );
}
