import type { Metadata } from "next";
import Image from "next/image";
import {
  CalendarDays,
  Dumbbell,
  Globe,
  GraduationCap,
  UserRound,
} from "lucide-react";
import { Container } from "../components/container";
import { SectionHeading } from "../components/section-heading";
import { CtaButton } from "../components/cta-button";
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
    icon: Dumbbell,
    title: "Learn on a working studio floor",
    body: "Train on real reformers, chairs, and barrels — not classroom mock-ups.",
  },
  {
    icon: Globe,
    title: "Internationally recognized",
    body: "Polestar certification respected by studios worldwide.",
  },
  {
    icon: GraduationCap,
    title: "Mentored by faculty",
    body: "Direct mentorship from Polestar U.S. faculty.",
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
            src={photos.groupClass.src}
            alt={photos.groupClass.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-neutral-900/25" />
          <div className="absolute inset-0 polestar-scrim" />
        </div>
        <Container className="max-w-3xl py-24 sm:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Education at MVP
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-tight sm:text-7xl">
            Become an Instructor
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-foreground/90">
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

      {/* Three pillars, right beneath the hero — no heading here since the
         hero already carries this message. */}
      <section className="pb-14 pt-10 sm:pb-16 sm:pt-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <item.icon
                  aria-hidden
                  className="mx-auto h-12 w-12 text-primary"
                />
                <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Past training & events — two mirrored entries on a verdant wash */}
      <section
        data-theme="education-light"
        className="education-wash py-14 text-foreground sm:py-16"
      >
        <Container>
          <SectionHeading
            eyebrow="Our track record"
            title="Past Training & Events"
          />
          <div aria-hidden className="mt-8 h-px w-full bg-border" />
        </Container>

        {/* Entry A — Polestar Transition with Shelly Power */}
        <Container className="mt-10 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h3 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              <span className="text-[#2b4458]">Pole</span>
              <span className="text-[#feb75a]">star</span> Transition
              <br />
              (Bridging) Program
            </h3>
            <div className="mt-5 space-y-2.5">
              <p className="flex items-center gap-3 text-xl font-semibold">
                <UserRound aria-hidden className="h-6 w-6 shrink-0 text-primary" />
                Master Educator Shelly Power
              </p>
              <p className="flex items-center gap-3 text-xl font-semibold">
                <CalendarDays aria-hidden className="h-6 w-6 shrink-0 text-primary" />
                Oct 17&ndash;19 &amp; 24&ndash;26, 2025
              </p>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Canada&rsquo;s first-ever Polestar Transition program, hosted on our
              own studio floor. Certified teachers from across the country bridged
              into Polestar&rsquo;s internationally recognized framework over two
              intensive weekends.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border">
            <Image
              src={photos.polestarCohort.src}
              alt={photos.polestarCohort.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>

        {/* Entry B — GYROKINESIS with Jane Gotch (photo mirrored to the left) */}
        <Container className="mt-14 border-t border-border pt-14 sm:mt-16 sm:pt-16">
          <div className="grid items-center gap-8 lg:grid-cols-[0.65fr_1fr]">
            <div className="relative mb-5 ml-5 max-w-md lg:order-1 lg:mx-0">
              {/* 3/4 box matches the group photo's native ratio — raised arms
                 and faces stay in frame. */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border">
                <Image
                  src={photos.gyrokinesisCohort.src}
                  alt={photos.gyrokinesisCohort.alt}
                  fill
                  sizes="(min-width: 1024px) 448px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 w-[28%] overflow-hidden rounded-2xl border border-border shadow-xl">
                <div className="relative aspect-square">
                  <Image
                    src={photos.janeGotch.src}
                    alt={photos.janeGotch.alt}
                    fill
                    sizes="(min-width: 1024px) 10vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <p className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1 text-center text-xs font-semibold text-white backdrop-blur-sm">
                  Jane Gotch
                </p>
              </div>
            </div>
            <div className="lg:order-2">
              <h3 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                GYROKINESIS&reg; Level 1
                <br />
                Pre-Training &amp; Foundation
              </h3>
              <div className="mt-5 space-y-2.5">
                <p className="flex items-center gap-3 text-xl font-semibold">
                  <UserRound aria-hidden className="h-6 w-6 shrink-0 text-primary" />
                  Jane Gotch
                </p>
                <p className="flex items-center gap-3 text-xl font-semibold">
                  <CalendarDays aria-hidden className="h-6 w-6 shrink-0 text-primary" />
                  September &amp; October 2025
                </p>
              </div>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                MVP welcomed international educator Jane Gotch to lead a full
                GYROKINESIS&reg; teacher-training cohort at the studio. The courses
                brought the flowing, spiraling GYROKINESIS&reg; method to a new
                generation of movement teachers in Markham.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured program — closing section, back on the ink surface;
         facts stand in for a photo */}
      <section className="relative isolate overflow-hidden py-20 sm:py-24">
        <div aria-hidden className="education-aurora-strong absolute inset-0 -z-10" />
        <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Now enrolling"
              title={
                <>
                  Pole<span className="text-[#feb75a]">star</span> Comprehensive
                  Pilates Teacher Training
                </>
              }
              intro="Canada's first-ever Polestar Comprehensive program — a Polestar Pilates program hosted at MVP, running September 2026 through July 2027."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton
                href="/education/polestar-comprehensive-training"
                size="lg"
              >
                Explore the Program
              </CtaButton>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {programFacts.map((fact) => (
              <div key={fact.label} className="relative">
                {/* Stacked backdrop layers peeking out behind the card for
                   added depth. */}
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-primary/25"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-primary/10"
                />
                <div
                  data-theme="education-light"
                  className="relative rounded-2xl border border-border border-t-2 border-t-primary bg-card p-7 text-card-foreground shadow-2xl ring-1 ring-black/10"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    {fact.label}
                  </p>
                  <p className="mt-3 font-serif text-2xl leading-snug sm:text-3xl">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
