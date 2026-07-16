import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "../components/container";
import { SectionHeading } from "../components/section-heading";
import { CtaButton } from "../components/cta-button";
import { Card } from "../components/card";
import { photos } from "@/app/lib/images";

export const metadata: Metadata = {
  title: "Become an Instructor",
  description:
    "Train to teach at Motion Vitality Pilates — the Markham/Toronto host site for Polestar Pilates education, including Canada's first Comprehensive Teacher Training.",
};

/**
 * PLACEHOLDER copy — drafted from the existing Polestar / teacher-training
 * content for the prototype. The client should review and refine the
 * education-direction messaging before launch.
 */
const pillars = [
  {
    title: "Learn on a working studio floor",
    body: "Training happens inside a fully equipped, operating studio — reformers, Trapeze Table, chairs, and barrels — not a classroom mock-up.",
  },
  {
    title: "Internationally recognized",
    body: "Programs hosted at MVP carry Polestar's globally respected certification, qualifying graduates to teach at studios worldwide.",
  },
  {
    title: "Mentored by faculty",
    body: "Founder Gary Fok serves on the faculty of Polestar Pilates U.S. as an Educator, Mentor, and Ambassador — mentorship is built into every program.",
  },
];

const programFacts = [
  { label: "Dates", value: "Sep 2026 – Jul 2027" },
  { label: "Training hours", value: "450 hours" },
  { label: "Format", value: "Mat + full apparatus" },
  { label: "Certification", value: "Polestar (international)" },
];

export default function EducationPage() {
  return (
    <>
      {/* Hero — ink surface with verdant accents */}
      <section className="relative isolate flex min-h-[32rem] items-center overflow-hidden md:min-h-[40rem]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={photos.polestarCohort.src}
            alt={photos.polestarCohort.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 polestar-scrim" />
        </div>
        <Container className="max-w-3xl py-24 sm:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Education at MVP
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-6xl">
            Become an Instructor
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90">
            MVP is more than a studio — it&rsquo;s a place to learn to teach.
            As the Markham / Toronto host site for Polestar Pilates programs,
            we bring internationally recognized movement education to our own
            studio floor.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton href="/education/polestar-comprehensive-training" size="lg">
              2026 Teacher Training
            </CtaButton>
            <CtaButton href="/contact" size="lg" variant="outline">
              Talk to Us
            </CtaButton>
          </div>
        </Container>
      </section>

      {/* Why train here — three pillars on the ink surface */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why train here"
            title="Education is our second direction"
            intro="Alongside our studio classes, MVP hosts teacher training and continuing education — taught within the Polestar method our whole studio is built on."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span
                  aria-hidden
                  className="mb-4 block h-1 w-10 rounded-full bg-primary"
                />
                <h3 className="font-serif text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured program — white breather section */}
      <section
        data-theme="education-light"
        className="bg-background py-20 text-foreground sm:py-24"
      >
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Now enrolling"
              title="Polestar Comprehensive Pilates Teacher Training"
              intro="Canada's first-ever Polestar Comprehensive program — a Polestar Pilates program hosted at MVP, running September 2026 through July 2027."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {programFacts.map((fact) => (
                <Card key={fact.label} className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {fact.label}
                  </p>
                  <p className="mt-1 font-serif text-lg">{fact.value}</p>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton
                href="/education/polestar-comprehensive-training"
                size="lg"
              >
                Explore the Program
              </CtaButton>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
            <Image
              src={photos.polestarFaculty.src}
              alt={photos.polestarFaculty.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Closing CTA — back on the ink surface */}
      <section className="py-20 sm:py-24">
        <Container className="flex flex-col items-center gap-5 text-center">
          <SectionHeading
            align="center"
            eyebrow="Questions?"
            title="Not sure where to start?"
            intro="Tell us about your background and goals — we'll help you figure out whether teacher training is the right next step."
            className="mx-auto"
          />
          <CtaButton href="/contact" size="lg">
            Get in Touch
          </CtaButton>
        </Container>
      </section>
    </>
  );
}
