import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "../components/container";
import { ScrollReveal } from "../components/scroll-reveal";
import { photos } from "@/app/lib/images";
import { site } from "@/app/lib/site";

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
        <ScrollReveal stagger={100}>
          {/* Get in touch header */}
          <div data-reveal className="max-w-2xl">
            <h1 className="font-serif text-5xl font-semibold leading-tight text-brand-300 sm:text-6xl">
              Contact MVP
            </h1>
            <p className="mt-4 text-xl leading-relaxed text-background/80">
              Questions about classes, packages, or the Polestar teacher training?
              We&apos;d love to hear from you.
            </p>
          </div>

          {/* Email · Phone / Studio · Hours — 2×2 */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div
              data-reveal
              className="rounded-2xl border border-background/15 bg-background/10 p-6 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-semibold uppercase tracking-wide text-brand-300">
                Email
              </h2>
              <p className="mt-2 break-words text-background/90">
                <a className="hover:text-background text-lg" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            </div>
            <div
              data-reveal
              className="rounded-2xl border border-background/15 bg-background/10 p-6 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-semibold uppercase tracking-wide text-brand-300">
                Phone
              </h2>
              <p className="mt-2 text-background/90">
                <a className="hover:text-background text-lg" href={`tel:${site.phone}`}>
                  {site.phoneDisplay}
                </a>
              </p>
            </div>
            <div
              data-reveal
              className="rounded-2xl border border-background/15 bg-background/10 p-6 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-semibold uppercase tracking-wide text-brand-300">
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
            <div
              data-reveal
              className="rounded-2xl border border-background/15 bg-background/10 p-6 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-semibold uppercase tracking-wide text-brand-300">
                Hours
              </h2>
              <ul className="mt-2 space-y-1 text-background/90 text-lg">
                {site.hours.map((h) => (
                  <li key={h.days}>
                    <span className="block text-background/60 sm:hidden">
                      {h.days.replaceAll("–", "-")}:
                    </span>
                    <span className="hidden text-background/60 sm:inline">
                      {h.days}:
                    </span>{" "}
                    <span className="block sm:inline">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map under the row */}
          <div
            data-reveal
            className="mt-6 overflow-hidden rounded-3xl border border-background/15 shadow-lg"
          >
            <iframe
              title={`Map to ${site.name}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[28rem] w-full sm:h-[34rem]"
            />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
