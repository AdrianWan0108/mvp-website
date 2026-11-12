"use client";

import { useEffect, useState } from "react";
import { cn } from "@/app/lib/cn";
import { RSVP_SECTION_ID } from "./rsvp-link";

/**
 * Phone-only bar pinned to the bottom of the screen with an RSVP button.
 *
 * It steps aside whenever something that already does its job is on screen:
 * any element marked `data-rsvp-anchor` (the hero's RSVP button and the form
 * section), and the site footer, which it would otherwise sit on top of.
 */
export function RsvpStickyBar({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-rsvp-anchor], footer");
    if (targets.length === 0 || !("IntersectionObserver" in window)) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-brand-200 bg-white/95 backdrop-blur-sm transition-transform duration-300 ease-out motion-reduce:transition-none sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-between gap-4 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p className="text-sm leading-snug font-medium text-brand-950">{label}</p>
        <a
          href={`#${RSVP_SECTION_ID}`}
          className="inline-flex min-h-11 shrink-0 items-center bg-primary px-5 text-sm font-medium text-primary-foreground"
        >
          RSVP
        </a>
      </div>
    </div>
  );
}
