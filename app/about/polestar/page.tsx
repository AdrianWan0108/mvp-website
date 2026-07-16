import Image from "next/image";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { CtaButton } from "../../components/cta-button";
import { photos, learnToMovePoses } from "@/app/lib/images";
import { links } from "@/app/lib/links";

const differences = [
  {
    title: "Science-led",
    body: "A holistic approach integrating orthopedics, sports medicine, and movement science — not just exercises, but principles.",
  },
  {
    title: "Rehab-informed",
    body: "Programming that understands injury and recovery, so movement meets your body exactly where it is today.",
  },
  {
    title: "A mentored lineage",
    body: "Our team learned directly within Polestar's global community of educators and mentors.",
  },
];

export default function PolestarPage() {
  return (
    <>
      {/* Hero — the MVP × Polestar relationship */}
      <section className="relative isolate flex min-h-[34rem] items-center overflow-hidden md:min-h-[42rem] lg:min-h-[46rem]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={photos.polestarOnWall.src}
            alt={photos.polestarOnWall.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 polestar-scrim" />
          <div aria-hidden className="polestar-aurora absolute inset-0" />
        </div>
        <Container className="max-w-3xl py-24 sm:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            MVP is a Polestar studio
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-6xl">
            Motion Vitality, powered by Polestar
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90">
            Polestar isn&rsquo;t a class we offer — it&rsquo;s the method our whole
            studio is built on. Every instructor at MVP teaches within Polestar&rsquo;s
            globally recognized framework, which unites the classical Pilates
            repertoire with modern rehabilitation science.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton href="/education/polestar-comprehensive-training" size="lg">
              Teacher Training 2026
            </CtaButton>
            <CtaButton href={links.polestarInfo} size="lg" variant="outline">
              About Polestar
            </CtaButton>
          </div>
        </Container>
      </section>

      {/* Why our instructors are different — because of Polestar */}
      <section className="bg-background py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Why our team is different"
              title="Instructors shaped by Polestar"
              intro="Choosing a Polestar studio means choosing movement that is as safe as it is effective — taught by instructors trained inside the method, not just certified in it."
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
              <p>
                Our instructors learned within Polestar&rsquo;s worldwide community of
                educators and mentors. Founder Gary Fok serves as an Educator, Mentor,
                and Ambassador on the faculty of Polestar Pilates U.S., and MVP is the
                first host site in the Markham / Toronto area for Polestar&rsquo;s
                programs.
              </p>
              <p>
                In 2025 we hosted Canada&rsquo;s first-ever Polestar Transition
                (Bridging) Program with Master Educator Shelly Power — bringing
                advanced, internationally recognized training to our own studio floor.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
            <Image
              src={photos.teamPolestar.src}
              alt={photos.teamPolestar.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
        <Container className="mt-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {differences.map((item) => (
              <div
                key={item.title}
                data-theme="polestar-brand-light"
                className="rounded-2xl border border-border bg-secondary p-6 text-foreground shadow-sm"
              >
                <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Learn to Move + Polestar community — overlapped by a bridging block */}
      <div className="relative isolate">
        {/* Learn to Move — 2×2 pose collage with overlay */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-20 grid grid-cols-2 grid-rows-2"
          >
            {learnToMovePoses.map((pose) => (
              <div key={pose.src} className="relative">
                <Image
                  src={pose.src}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-background/80" />
          <div aria-hidden className="polestar-aurora absolute inset-0 -z-10" />
          <Container className="relative flex min-h-[36rem] items-center justify-center py-32 text-center sm:min-h-[46rem]">
            <SectionHeading
              align="center"
              eyebrow="A tribute to all my teachers"
              title="Learn to Move, Move to Learn"
              className="mx-auto [&_h2]:text-5xl sm:[&_h2]:text-6xl"
            />
          </Container>
        </section>

        {/* Bridging block — straddles the collage and the community section */}
        <Container className="relative z-20 -my-16 sm:-my-20">
          <div
            data-theme="polestar-brand-light"
            className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 text-foreground shadow-2xl sm:p-8"
          >
            <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
              <p>
                Founder Gary Fok came to Pilates after three decades in fitness and
                taekwondo — and through Polestar training, found a path to heal
                long-standing injuries and move with renewed freedom.
              </p>
              <p>
                That journey is why MVP is a Polestar studio: a place built on
                gratitude to the mentors who shaped it, and a commitment to passing
                that knowledge on.
              </p>
            </div>
          </div>
        </Container>

        {/* Part of a global Polestar community */}
        <section className="relative isolate overflow-hidden bg-card pb-20 pt-32 sm:pb-24 sm:pt-36">
          <div aria-hidden className="polestar-aurora absolute inset-0 -z-10" />
          <Container>
            <SectionHeading
              eyebrow="A global community"
              title="Part of a worldwide Polestar community"
              intro="Polestar spans faculty, educators, and graduates across many countries. As part of that network, MVP brings a worldwide standard of movement education home to Markham."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border">
                  <Image
                    src={photos.polestarFaculty.src}
                    alt={photos.polestarFaculty.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  Polestar faculty and trainees at a training retreat.
                </figcaption>
              </figure>
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border">
                  <Image
                    src={photos.polestarCohort.src}
                    alt={photos.polestarCohort.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  A Polestar teacher-training cohort together in our studio.
                </figcaption>
              </figure>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaButton href="/education/polestar-comprehensive-training" size="lg">
                Explore Teacher Training
              </CtaButton>
              <CtaButton href={links.polestarLocations} variant="outline">
                Worldwide Locations
              </CtaButton>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
