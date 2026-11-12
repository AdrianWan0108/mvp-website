"use client";

import type { ReactNode } from "react";

/** Fired by an RSVP link beside a talk; the form listens and ticks that talk. */
export const RSVP_SELECT_EVENT = "mvp-rsvp-select";
export const RSVP_SECTION_ID = "rsvp";

/**
 * Link to the RSVP form. With `talk` set it also asks the form to tick that
 * talk. It stays a plain in-page anchor, so without JavaScript it still
 * scrolls to the form — the visitor just ticks the talk themselves.
 */
export function RsvpLink({
  talk,
  className,
  children,
}: {
  /** The talk's date (its id in the form), e.g. "2026-11-23". */
  talk?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${RSVP_SECTION_ID}`}
      className={className}
      onClick={() => {
        if (talk) {
          window.dispatchEvent(new CustomEvent<string>(RSVP_SELECT_EVENT, { detail: talk }));
        }
      }}
    >
      {children}
    </a>
  );
}
