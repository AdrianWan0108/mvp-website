import Link from "next/link";
import Image from "next/image";
import { photos } from "@/app/lib/images";
import { Container } from "../container";
import { ScrollReveal } from "../scroll-reveal";

/**
 * Pricing intro grounded in a real group class. The directional Verdant
 * overlay keeps the short, left-aligned copy legible across responsive crops.
 */
export function PricingMasthead() {
  return (
    <section className="pricing-hero relative isolate overflow-hidden bg-brand-900 text-white">
      <Image
        src={photos.pricingHero.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[58%_52%] sm:object-[55%_52%]"
      />
      <div className="absolute inset-0 -z-10 bg-brand-900/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900/85 via-brand-900/55 to-brand-900/10" />

      <Container className="relative z-10 py-24 sm:py-32 lg:py-36">
        <ScrollReveal stagger={100}>
          <h1
            data-reveal
            className="max-w-3xl font-serif text-[3.5rem] leading-[0.9] tracking-[0.02em] sm:text-[5.25rem]"
          >
            Pricing
          </h1>

          <p
            data-reveal
            className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl"
          >
            Group classes, memberships, senior sessions, and private
            training — compare them all below to find your fit.
          </p>

          <div data-reveal className="mt-8">
            <Link
              href="/schedule"
              className="text-lg font-semibold text-white underline decoration-brand-500 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-300 sm:text-xl"
            >
              View class schedule →
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
