"use client";

import { useEffect, useState } from "react";

const SCHEDULE_SCRIPT = "https://brandedweb.mindbodyonline.com/embed/widget.js";
const SCHEDULE_WIDGET_ID = "2257513f307";

function removeScheduleScripts() {
  document
    .querySelectorAll(`script[src="${SCHEDULE_SCRIPT}"]`)
    .forEach((script) => script.remove());
}

/**
 * `next/script` dedupes by `src` for the document's lifetime, so returning to
 * this route via client-side navigation skips re-injecting the loader and the
 * freshly mounted `.mindbody-widget` div never gets scanned. Removing and
 * re-appending the script on every mount forces a fresh scan each visit.
 */
export function ScheduleWidget() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    removeScheduleScripts();

    const script = document.createElement("script");
    script.src = SCHEDULE_SCRIPT;
    script.async = true;
    script.addEventListener("error", () => setFailed(true));
    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  if (failed) {
    return (
      <p role="alert" className="font-sans text-base text-muted-foreground">
        The schedule could not load. Please refresh the page or try again
        shortly.
      </p>
    );
  }

  return (
    <div
      className="mindbody-widget"
      data-widget-type="Schedules"
      data-widget-id={SCHEDULE_WIDGET_ID}
    />
  );
}
