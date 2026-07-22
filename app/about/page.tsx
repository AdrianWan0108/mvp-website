import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "../components/container";
import { SectionHeading } from "../components/section-heading";
import { CtaButton } from "../components/cta-button";
import { TeamSection } from "./team-section";
import { photos } from "@/app/lib/images";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Motion Vitality Pilates — a welcoming Markham studio built around intelligent movement and personal attention. Our story, our instructors, and our space.",
};

/** Studio-environment shots (equipment in the room) for the overlapping hero row. */
const heroPhotos = [photos.reformer, photos.gyrotonic, photos.barrel];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero — solid verdant block with a large heading. */}
      <section className="bg-brand-800 text-white">
        <Container className="pt-20 pb-40 text-center sm:pb-56 lg:pb-64">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
            About
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-7xl">
            A fully equipped studio for every body
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Our Markham studio brings together a comprehensive range of Pilates
            and GYROTONIC® equipment — plus the accessories to tailor every
            session. We only offer what we&rsquo;ve truly mastered, and we keep
            growing.
          </p>
        </Container>
      </section>

      {/* Equipment row — pulled up so it straddles the green → white seam.
          The negative margin is smaller than each image's height at every
          breakpoint, so the row always crosses the seam (see plan). */}
      <Container className="-mt-16 sm:-mt-32 lg:-mt-48">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {heroPhotos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[3/4] overflow-hidden shadow-xl"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>

      {/* 2. MVP story — the story behind the studio. */}
      <section>
        <Container className="pt-16 pb-16 text-center sm:pt-20 sm:pb-20">
          <h2 className="font-serif text-4xl font-semibold leading-tight text-brand-700 sm:text-5xl">
            You are our Most Valuable Player
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Founded by Gary Fok in 2025, Motion Vitality Pilates offers a
              range of Pilates and GYROTONIC® sessions shaped around each
              client&rsquo;s needs, goals, budget, and schedule — woven together
              with methods like TRX®, HIIT, Schroth, and functional movement for
              a true mind-body workout.
            </p>
            <p>
              Just like our name, you are our MVP — our Most Valuable Player.
              We&rsquo;re here to make every session an experience filled with
              joy, guiding you toward your health and wellness goals through
              intelligent, mindful movement.
            </p>
          </div>
        </Container>
      </section>

      {/* 3. Meet the Team */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The people"
            title="Meet the Team"
            intro="A small team of instructors who teach with precision, patience, and a deep respect for how every body moves."
          />
          <TeamSection />
        </Container>
      </section>

      {/* 4. Visit MVP */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-3xl border border-border p-8 sm:p-12">
            <div aria-hidden className="absolute inset-0 -z-10">
              <Image
                src={photos.entranceWall.src}
                alt={photos.entranceWall.alt}
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15" />
            </div>
            <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
              Come experience the studio
            </h2>
            <p className="mt-3 text-lg text-white/85">
              {site.address.street}, {site.address.locality}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaButton href="/classes" size="lg">
                View Classes
              </CtaButton>
              <CtaButton href="/contact" variant="inverse" size="lg">
                Contact Us
              </CtaButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
