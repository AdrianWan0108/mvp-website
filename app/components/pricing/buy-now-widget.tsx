"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/app/lib/cn";

/** Mindbody's widget loader. Constant across every pricing option. */
const HEALCODE_SRC =
  "https://widgets.mindbodyonline.com/javascripts/healcode.js";
const HEALCODE_SCRIPT_ID = "mindbody-healcode-loader";

/** Studio identifiers — constant; only data-service-id varies per option. */
const SITE_ID = "126134";
const MB_SITE_ID = "5744643";

function loadHealcodeOnce() {
  // Mindbody installs global helpers and injects a dependency chain. Reloading
  // healcode.js during a later client navigation initializes those globals a
  // second time and can crash the React tree. Keep the first loader for the
  // lifetime of the document; its element observer handles widgets inserted
  // by later visits to this route.
  if (
    document.getElementById(HEALCODE_SCRIPT_ID) ||
    document.querySelector(`script[src="${HEALCODE_SRC}"]`) ||
    "HealcodeWidget" in window
  ) {
    return;
  }

  const script = document.createElement("script");
  script.id = HEALCODE_SCRIPT_ID;
  script.src = HEALCODE_SRC;
  script.type = "text/javascript";
  script.async = true;
  document.body.appendChild(script);
}

/**
 * Loads Mindbody once, after the complete pricing tree has committed.
 *
 * Loading from every card made the external DOM scan race React's development
 * remount cycle during client-side navigation. A deferred page-level loader
 * avoids overlapping scans, and the loader persists between route visits so
 * Mindbody's global dependencies are never initialized twice.
 */
export function MindbodyPricingLoader() {
  useEffect(() => {
    // Deferring to the next task lets React finish the route transition and
    // lets Strict Mode cancel its first development-only effect pass.
    const timer = window.setTimeout(loadHealcodeOnce, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return null;
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
  // Mindbody uses the deprecated Custom Elements v0 lifecycle. Once its
  // loader is active, creating <healcode-widget> through JSX invokes
  // createdCallback before React assigns data-type, which crashes on a return
  // client navigation. Parsing trusted, internal markup applies the complete
  // attribute set before that callback runs.
  const widgetMarkup = `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="${SITE_ID}" data-mb-site-id="${MB_SITE_ID}" data-service-id="${serviceId}" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy now"></healcode-widget>`;

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
          "[&_a:hover]:bg-brand-200 [&_a]:border [&_a]:border-brand-800 [&_a]:bg-transparent [&_a]:text-brand-900",
      )}
      dangerouslySetInnerHTML={{ __html: widgetMarkup }}
    />
  );
}
