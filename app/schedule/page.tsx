import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Container } from "../components/container";
import { ScrollReveal } from "../components/scroll-reveal";
import { photos } from "@/app/lib/images";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "View the live class schedule for Motion Vitality Pilates in Markham and book directly through Mindbody.",
};

export default function SchedulePage() {
  return (
    <>
      {/* Match the Pricing masthead's dimensions; use an art-directed focus
          point so the gallery stays composed within the shared hero crop. */}
      <section className="relative isolate overflow-hidden bg-brand-900 text-white">
        <Image
          src={photos.heritageWall.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-[58%_46%] sm:object-[55%_38%] lg:object-[50%_30%]"
        />
        <div className="absolute inset-0 -z-10 bg-brand-900/15" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900/85 via-brand-900/55 to-brand-900/10" />

        <Container className="relative z-10 py-24 sm:py-32 lg:py-36">
          <ScrollReveal stagger={100}>
            <h1
              data-reveal
              className="max-w-3xl font-serif text-[3.5rem] leading-[0.9] tracking-[0.02em] sm:text-[5.25rem]"
            >
              Schedule
            </h1>
            <p
              data-reveal
              className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl"
            >
              Browse the full week of upcoming classes, find the time that
              works for you, and reserve your spot in just a few taps.
            </p>
            <div data-reveal className="mt-8">
              <Link
                href="/pricing"
                className="text-lg font-semibold text-white underline decoration-brand-500 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-300 sm:text-xl"
              >
                View pricing & memberships →
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section id="private" className="bg-brand-50 pb-16 pt-6 sm:pb-20 sm:pt-8">
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
