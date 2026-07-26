/**
 * Ambient types for the third-party globals the pricing page depends on.
 *
 * `<healcode-widget>` is Mindbody's custom element — healcode.js finds it in
 * the DOM and replaces it with a checkout link. React 19 passes unknown
 * elements and their dash-cased attributes straight through to the DOM, so it
 * only needs a JSX declaration to type-check.
 *
 * NOTE: React 19 removed the global `JSX` namespace — it now lives at
 * `React.JSX`, so intrinsic elements must be declared by augmenting the
 * "react" module. A bare `declare namespace JSX` at global scope compiles but
 * is silently ignored.
 */

import type { HTMLAttributes } from "react";

type HealcodeWidgetAttributes = HTMLAttributes<HTMLElement> & {
  "data-version": string;
  "data-link-class": string;
  "data-site-id": string;
  "data-mb-site-id": string;
  "data-service-id": string;
  "data-bw-identity-site": string;
  "data-type": string;
  "data-inner-html": string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "healcode-widget": HealcodeWidgetAttributes;
    }
  }
}

declare global {
  interface Window {
    /** Present only once GA4 has loaded; every call site must guard. */
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}
