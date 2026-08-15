"use client";

import { useEffect, useState } from "react";

const APPOINTMENTS_SCRIPT =
  "https://brandedweb.mindbodyonline.com/embed/widget.js";
const APPOINTMENTS_WIDGET_ID = "2265667f307";

function removeAppointmentsScripts() {
  document
    .querySelectorAll(`script[src="${APPOINTMENTS_SCRIPT}"]`)
    .forEach((script) => script.remove());
}

export function AppointmentsWidget({
  selectionName,
}: {
  selectionName: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    removeAppointmentsScripts();

    const script = document.createElement("script");
    script.src = APPOINTMENTS_SCRIPT;
    script.async = true;
    script.addEventListener("error", () => setFailed(true));
    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <section
      aria-labelledby="private-appointments-heading"
      className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="mb-6">
        <h3
          id="private-appointments-heading"
          className="font-serif text-3xl uppercase leading-none text-foreground sm:text-4xl"
        >
          Book {selectionName}
        </h3>
        <p className="mt-3 font-sans text-base text-muted-foreground">
          Choose an instructor and available appointment time below.
        </p>
      </div>

      {failed ? (
        <p role="alert" className="font-sans text-base text-muted-foreground">
          The booking calendar could not load. Please refresh the page or try
          again shortly.
        </p>
      ) : (
        <div
          className="mindbody-widget"
          data-widget-type="Appointments"
          data-widget-id={APPOINTMENTS_WIDGET_ID}
        />
      )}
    </section>
  );
}
