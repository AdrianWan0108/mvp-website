import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "../components/container";
import { CtaButton } from "../components/cta-button";
import { photos } from "@/app/lib/images";
import { site } from "@/app/lib/site";
import { links } from "@/app/lib/links";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Motion Vitality Pilates in Markham, Ontario — phone, email, hours, and booking.",
};

const mapQuery = encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.locality}, Ontario ${site.address.postalCode}`,
);

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* entrance-wall photo as the full-section background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={photos.spineFigure_2.src}
          alt={photos.spineFigure_2.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <Container className="py-16 text-background sm:py-20">
        {/* Get in touch header */}
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Get in touch
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-tight sm:text-6xl">
            Contact MVP
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-background/80">
            Questions about classes, packages, or the Polestar teacher training?
            We&apos;d love to hear from you.
          </p>
        </div>

        {/* Email · Phone / Studio · Hours — 2×2 */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-background/15 bg-background/10 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-primary">
              Email
            </h2>
            <p className="mt-2 break-words text-background/90">
              <a className="hover:text-background text-lg" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>
          <div className="rounded-2xl border border-background/15 bg-background/10 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-primary">
              Phone
            </h2>
            <p className="mt-2 text-background/90">
              <a className="hover:text-background text-lg" href={`tel:${site.phone}`}>
                {site.phoneDisplay}
              </a>
            </p>
          </div>
          <div className="rounded-2xl border border-background/15 bg-background/10 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-primary">
              Studio
            </h2>
            <address className="mt-2 text-lg not-italic leading-relaxed text-background/90">
              {site.address.street}
              <br />
              {site.address.locality}, Ontario, Canada
              <br />
              {site.address.postalCode}
            </address>
          </div>
          <div className="rounded-2xl border border-background/15 bg-background/10 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-primary">
              Hours
            </h2>
            <ul className="mt-2 space-y-1 text-background/90 text-lg">
              {site.hours.map((h) => (
                <li key={h.days}>
                  <span className="text-background/60">{h.days}:</span> {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Map under the row */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-background/15 shadow-lg">
          <iframe
            title={`Map to ${site.name}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full sm:h-96"
          />
        </div>

        <div className="mt-10">
          <CtaButton href={links.book} size="lg">
            Book a Class
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
