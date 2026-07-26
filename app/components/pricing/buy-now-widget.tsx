"use client";

import { useEffect, useRef } from "react";

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
};

/**
 * Renders the Mindbody buy link for one pricing option, styled as the card's
 * primary action. The card owns the surrounding spacing.
 */
export function BuyNowWidget({
  serviceId,
  serviceName,
  priceNumber,
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
      // The <a> is injected by healcode.js, so it can only be styled from
      // here as a descendant. Flat verdant fill, square corners, no shadow.
      className="[&_a:hover]:bg-brand-600 [&_a]:block [&_a]:rounded-[2px] [&_a]:bg-primary [&_a]:px-5 [&_a]:py-3 [&_a]:text-center [&_a]:text-base [&_a]:font-medium [&_a]:text-primary-foreground [&_a]:no-underline [&_a]:transition-colors"
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
