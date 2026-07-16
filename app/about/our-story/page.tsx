import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "../../components/page-header";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { CtaButton } from "../../components/cta-button";
import { CtaBand } from "../../components/home/cta-band";
import { photos } from "@/app/lib/images";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Motion Vitality Pilates is a Polestar-certified Pilates and GYROTONIC® studio in Markham, Ontario, founded by Gary Fok.",
};

const studioTour = [
  photos.studioReformerFloor,
  photos.entranceWall,
  photos.heritageWall,
  photos.spineFigure,
];

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="About Motion Vitality Pilates"
        intro="A studio in Markham built on science-led movement and a genuine care for how every body feels."
      />

      {/* Our story — studio narrative + team photo */}
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2">
        <div className="space-y-4 text-base leading-relaxed text-foreground/90">
          <p>
            Motion Vitality Pilates (MVP) brings together a wide range of
            state-of-the-art Pilates and GYROTONIC® equipment with a team that
            tailors every group class and private session to its clients —
            whether you&rsquo;re moving for the first time or training like an
            athlete.
          </p>
          <p>
            Founded by Gary Fok, MVP is a Polestar-certified studio where
            classical Pilates meets modern movement science. From first-timers
            to pre- and post-natal clients to scoliosis-aware training, our
            instructors build each session around the body in front of them.
          </p>
          <p>
            Our instructors — Gary, Dorothy, and Florence — share one belief: a
            strong mind starts with a fit body. That conviction shapes how we
            teach, the space we&rsquo;ve built, and the community we&rsquo;re
            growing here in Markham.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
          <Image
            src={photos.team.src}
            alt={photos.team.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>

      {/* Studio tour */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The space"
            title="Inside the studio"
            intro="A bright, fully equipped space in Markham — reformers, GYROTONIC®, chairs, and barrels under one roof, with room to move and recover."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studioTour.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How we teach — private vs. group */}
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
            <Image
              src={photos.privateSession.src}
              alt={photos.privateSession.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl border border-border">
            <Image
              src={photos.groupClass.src}
              alt={photos.groupClass.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="How we teach"
            title="Private attention, in every setting"
            intro="Whether you&rsquo;re one-on-one or in a small group, you get hands-on cues and programming built around your body — not a fixed routine."
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
            <p>
              <span className="font-semibold">Private sessions</span> give you
              the studio&rsquo;s full focus: detailed, hands-on coaching to
              progress safely and work around injuries or specific goals.
            </p>
            <p>
              <span className="font-semibold">Group classes</span> keep
              numbers small so the same quality of attention carries through —
              with the energy and accountability of moving alongside others.
            </p>
          </div>
        </div>
      </Container>

      {/* Polestar callout — brief, links out to the relationship page */}
      <Container className="pb-16">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-card p-8 text-center text-card-foreground sm:p-12">
          <p className="max-w-2xl text-lg leading-relaxed">
            MVP is a Polestar-certified studio — every instructor teaches within
            Polestar&rsquo;s globally recognised, rehabilitation-informed method.
          </p>
          <CtaButton href="/about/polestar" size="lg">
            Learn about MVP × Polestar
          </CtaButton>
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
