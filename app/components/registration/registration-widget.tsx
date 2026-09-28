"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { loadHealcodeOnce } from "@/app/lib/mindbody-healcode";
import styles from "./registration-widget.module.css";

// Parse the complete trusted embed at once: Healcode's legacy custom element
// initialization needs all attributes present before its callback runs.
// Keep the prop object stable too: status updates must not replace the live
// third-party DOM, restart registration, or discard values the client typed.
const widgetHtml = {
  __html:
    '<healcode-widget data-type="registrations" data-widget-partner="object" data-widget-id="22179589f307" data-widget-version="0"></healcode-widget>',
};

type Status = "loading" | "slow" | "ready" | "failed";

export function RegistrationWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let active = true;
    const frames = new Set<HTMLIFrameElement>();
    const ready = () => {
      if (active) setStatus("ready");
    };
    const inspect = () => {
      // This legacy widget injects CSS into the host document. Contain its
      // saved settings so broad heading/link rules cannot restyle the site.
      container.querySelectorAll("style:not([data-registration-scoped])").forEach((style) => {
        style.setAttribute("data-registration-scoped", "");
        const css = (style.textContent ?? "")
          .replaceAll("&quot;", '"')
          .replaceAll("&#39;", "'")
          .replaceAll("&amp;", "&")
          // Reuse the same fonts already loaded by Next.js on the host page.
          .replaceAll('"DM Sans"', "var(--font-dm-sans)")
          .replaceAll('"Bebas Neue"', "var(--font-bebas)");
        style.textContent = `@scope ([data-mindbody-registration]) { ${css} }`;
      });
      if (container.querySelector("form")) ready();
      container.querySelectorAll("iframe").forEach((frame) => {
        if (frames.has(frame)) return;
        frames.add(frame);
        if (!frame.title) frame.title = "Mindbody registration form";
        frame.addEventListener("load", ready);
      });
    };
    const observer = new MutationObserver(inspect);
    observer.observe(container, { childList: true, subtree: true });
    inspect();

    // Match pricing's deferred mount so Strict Mode cancels its first pass.
    const start = window.setTimeout(() => {
      void loadHealcodeOnce().catch(() => {
        if (active) setStatus("failed");
      });
    }, 0);
    const timeout = window.setTimeout(() => {
      if (active) {
        setStatus((current) => (current === "loading" ? "slow" : current));
      }
    }, 15_000);

    return () => {
      active = false;
      window.clearTimeout(start);
      window.clearTimeout(timeout);
      observer.disconnect();
      frames.forEach((frame) => frame.removeEventListener("load", ready));
    };
  }, []);

  return (
    <>
      <div role="status" aria-live="polite">
        {status === "loading" && (
          <p className="mb-5 text-base text-muted-foreground">
            Loading the registration form…
          </p>
        )}
        {(status === "slow" || status === "failed") && (
          <div className="mb-6 rounded-lg border border-brand-200 bg-brand-50 p-5 text-brand-900">
            <p>
              {status === "failed"
                ? "The registration form could not load. Please refresh the page or contact us for help."
                : "The registration form is taking longer than usual to load. You can keep waiting, refresh the page, or contact us for help."}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="min-h-11 font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900"
              >
                Refresh page
              </button>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900"
              >
                Contact us
              </Link>
            </div>
          </div>
        )}
      </div>
      <div
        ref={containerRef}
        data-mindbody-registration
        className={`${styles.form} min-w-0 [&_iframe]:w-full [&_iframe]:max-w-full`}
        dangerouslySetInnerHTML={widgetHtml}
      />
      <noscript>
        Please enable JavaScript to use the registration form, or contact the
        studio for help.
      </noscript>
    </>
  );
}
