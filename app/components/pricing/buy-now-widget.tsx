"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/app/lib/cn";

/** Mindbody's widget loader. Constant across every pricing option. */
const HEALCODE_SRC =
  "https://widgets.mindbodyonline.com/javascripts/healcode.js";

/** Studio identifiers — constant; only data-service-id varies per option. */
const SITE_ID = "126134";
const MB_SITE_ID = "5744643";

/**
 * healcode.js scans the document for <healcode-widget> elements once, when it
 * executes, and never again. On a client-side navigation into this page the
 * script is already on the document, so nothing re-scans and every buy button
 * renders empty. Re-appending a fresh <script> forces another scan.
 *
 * That scan must happen exactly once no matter how many options the page
 * shows, so the (re)load is refcounted at module scope: the first widget to
 * mount loads the script — React has committed the whole tree by the time any
 * effect runs, so its siblings are already in the DOM to be scanned — and the
 * last to unmount removes it, leaving the next visit to load it fresh.
 */
let mountedWidgets = 0;

function removeHealcodeScripts() {
  document
    .querySelectorAll(`script[src="${HEALCODE_SRC}"]`)
    .forEach((script) => script.remove());
}

function loadHealcode() {
  // Drop any stale copy first so the browser re-executes rather than
  // treating this as an already-loaded script.
  removeHealcodeScripts();
  const script = document.createElement("script");
  script.src = HEALCODE_SRC;
  script.type = "text/javascript";
  script.async = true;
  document.body.appendChild(script);
}

type BuyNowWidgetProps = {
  serviceId: string;
  /** Used for the GA4 begin_checkout payload, not for display. */
  serviceName: string;
  priceNumber: number;
  /**
   * `quiet` outlines instead of filling. Used in the memberships comparison,
   * where both plans stay purchasable but only the selected one takes the
   * solid fill.
   */
  emphasis?: "solid" | "quiet";
};

/**
 * Renders the Mindbody buy link for one pricing option, styled as the
 * section's primary action. The section owns the surrounding spacing.
 */
export function BuyNowWidget({
  serviceId,
  serviceName,
  priceNumber,
  emphasis = "solid",
}: BuyNowWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedWidgets += 1;
    if (mountedWidgets === 1) loadHealcode();

    return () => {
      mountedWidgets -= 1;
      if (mountedWidgets === 0) removeHealcodeScripts();
    };
  }, []);

  // The anchor is injected by healcode.js and swapped out on re-scan, so the
  // listener sits on the wrapper we own and catches the click as it bubbles.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleClick() {
      window.gtag?.("event", "begin_checkout", {
        item_name: serviceName,
        value: priceNumber,
        currency: "CAD",
      });
    }

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [serviceName, priceNumber]);

  return (
    <div
      ref={containerRef}
      // The <a> is injected by healcode.js, so it can only be styled from here
      // as a descendant — hence the arbitrary [&_a] variants rather than
      // classes on the element itself. The trailing arrow is a pseudo-element
      // for the same reason: there is no way to put a span inside the anchor.
      className={cn(
        // Square, flat, and set in the condensed display face at 20px so it
        // matches the package names rather than looking like a UI-kit button.
        // At that size brand-900 on brand-500 counts as large text, which is
        // what lets the identity green carry the primary action at all.
        "[&_a]:block [&_a]:rounded-lg [&_a]:px-5 [&_a]:py-3 [&_a]:text-center [&_a]:font-serif [&_a]:text-xl [&_a]:uppercase [&_a]:leading-none [&_a]:tracking-[0.08em] [&_a]:no-underline [&_a]:transition-colors",
        "[&_a]:after:ml-2 [&_a]:after:content-['→']",
        emphasis === "solid" &&
          "[&_a:hover]:bg-brand-600 [&_a]:bg-brand-500 [&_a]:text-brand-900",
        emphasis === "quiet" &&
          "[&_a:hover]:bg-brand-200 [&_a]:border [&_a]:border-brand-900 [&_a]:bg-transparent [&_a]:text-brand-900",
      )}
    >
      <healcode-widget
        data-version="0.2"
        data-link-class="healcode-pricing-option-text-link"
        data-site-id={SITE_ID}
        data-mb-site-id={MB_SITE_ID}
        data-service-id={serviceId}
        data-bw-identity-site="true"
        data-type="pricing-link"
        data-inner-html="Buy now"
      />
    </div>
  );
}
