import type { Metadata } from "next";
import Script from "next/script";
import { Container } from "../../components/container";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "View the live class schedule for Motion Vitality Pilates in Markham and book directly through Mindbody.",
};

export default function SchedulePage() {
  return (
    <>
      {/* Compact, centered hero — smaller than the shared PageHeader so the
          schedule sits higher on the page. Mirrors PageHeader's design tokens. */}
      <section className="border-b border-border bg-muted/40 text-center">
        <Container className="py-8 sm:py-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Studio
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Schedule
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Browse upcoming classes and reserve your spot.
          </p>
        </Container>
      </section>

      {/* id="private": the pricing page's "Book a private" CTA links to
          /classes/schedule#private, so private bookings land on the widget
          rather than at the top of the page. */}
      <section id="private" className="pt-6 pb-16 sm:pt-8 sm:pb-20">
        <Container>
          {/* Mindbody Schedules widget (widget-id 2257513f307). The loader
              script scans the DOM for .mindbody-widget and hydrates this div. */}
          <div
            className="mindbody-widget"
            data-widget-type="Schedules"
            data-widget-id="2257513f307"
          />
          <Script
            src="https://brandedweb.mindbodyonline.com/embed/widget.js"
            strategy="afterInteractive"
          />
        </Container>
      </section>
    </>
  );
}
