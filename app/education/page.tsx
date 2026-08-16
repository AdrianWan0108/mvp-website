import type { Metadata } from "next";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { Container } from "../components/container";
import { CtaButton } from "../components/cta-button";
import { photos } from "@/app/lib/images";
import { ProgramReveal } from "./program-reveal";
import { StoriesReveal } from "./stories-reveal";
import { TeachingJourneyReveal } from "./teaching-journey-reveal";
import { TimelineReveal } from "./timeline-reveal";

export const metadata: Metadata = {
  title: "Pilates Teacher Training in Markham",
  description:
    "Train to teach at Motion Vitality Pilates, the Markham/Toronto host site for Polestar Pilates education and the 2026 Comprehensive Teacher Training.",
};

const programFacts = [
  { label: "Dates", value: "Sep 2026 – Jul 2027" },
  { label: "Training hours", value: "450 hours" },
  { label: "Format", value: "Mat + full apparatus" },
  { label: "Certification", value: "Polestar (international)" },
];

/**
 * Temporary stand-ins for Gary-with-mentor photographs. Keeping these in one
 * list means the final images, alt text, and captions can be replaced without
 * changing the editorial layout.
 */
const mentorImages = [
  {
    photo: photos.polestarFaculty,
    caption: "Polestar faculty and trainees gathered at a training retreat.",
  },
  {
    photo: photos.team,
    caption: "The MVP team together beneath the Polestar sign.",
  },
  {
    photo: photos.teamPolestar,
    caption: "Gary and fellow Polestar-trained members of the MVP team.",
  },
];

const movementMethods = [
  {
    name: "Polestar Pilates",
    photo: photos.polestarLogo,
    imageClassName: "h-16 w-40 sm:h-20 sm:w-48",
  },
  {
    name: "GYROTONIC®",
    photo: photos.gyrotonicOfficialLogo,
    imageClassName: "h-20 w-32 sm:h-24 sm:w-36",
  },
];

/**
 * These short profiles are adapted from the studio's published team
 * biographies, rather than presented as direct quotations. They can be
 * replaced with first-person trainee testimonials as the cohort grows.
 */
const instructorStories = [
  {
    name: "Gary Fok",
    role: "Polestar Educator",
    status: "Currently teaching at MVP",
    photo: photos.garyTeamAction,
    quote: "My life changed after learning Pilates through Polestar.",
    story:
      "After years of fitness, martial arts, and accumulated injuries, Gary found a way to understand his own rehabilitation. Teaching lets him pass that understanding forward.",
  },
  {
    name: "Dorothy Leung",
    role: "Pilates Instructor",
    status: "Currently teaching at MVP",
    photo: photos.dorothyTeamAction,
    quote:
      "Reconnecting with movement through Pilates in midlife transformed not only her physical well-being but her purpose.",
    story:
      "Dorothy reinvested in herself through comprehensive training and now helps others build the strength, mobility, and resilience to stay active for decades to come.",
  },
];

export default function EducationPage() {
  return (
    <>
      {/* Hero — current studio-floor image over a flat Verdant veil. */}
      <section className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-brand-900 text-white md:min-h-[42rem]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={photos.groupClass.src}
            alt={photos.groupClass.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div aria-hidden className="absolute inset-0 bg-brand-900/78" />
        </div>
        <Container className="max-w-3xl py-24 sm:py-28">
          <h1 className="font-serif text-5xl font-semibold leading-tight sm:text-7xl">
            Teacher Training at MVP
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-white/90">
            MVP is a working studio and a home for movement education. Train in
            Markham through Polestar&rsquo;s comprehensive approach, with
            internationally connected faculty and local support.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton
              href="/education/polestar-comprehensive-training"
              size="lg"
            >
              Explore the 2026 Program
            </CtaButton>
            <CtaButton href="/contact" size="lg" variant="outline">
              Talk to Gary
            </CtaButton>
          </div>
        </Container>
      </section>

      {/* Current Polestar program, using the reference's editorial split. */}
      <section
        data-theme="education-light"
        className="bg-background text-foreground"
      >
        <ProgramReveal>
          <div className="grid overflow-hidden lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
            <div className="flex items-center bg-background px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-14 xl:px-20">
              <div className="max-w-2xl">
                <div data-program-copy>
                  <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl xl:text-6xl">
                    Polestar Comprehensive Pilates Teacher Training
                  </h2>
                  <p className="mt-7 text-lg leading-relaxed text-brand-900/80 sm:text-xl">
                    Polestar&rsquo;s comprehensive pathway brings movement
                    principles, assessment, teaching practice, and the full
                    Pilates apparatus together in one 450-hour program, hosted
                    at MVP from September 2026 through July 2027.
                  </p>
                </div>
                <div data-program-cta className="mt-9 flex flex-wrap gap-4">
                  <CtaButton
                    href="/education/polestar-comprehensive-training"
                    size="lg"
                  >
                    Explore the Program
                  </CtaButton>
                </div>
              </div>
            </div>

            <div
              data-program-media
              className="relative isolate mx-5 mb-5 flex min-h-[30rem] items-center overflow-hidden px-5 py-10 sm:mx-8 sm:mb-8 sm:min-h-[32rem] sm:px-8 sm:py-12 lg:my-6 lg:ml-0 lg:mr-8 lg:min-h-[30rem] lg:px-8"
            >
              <Image
                src={photos.reformer2.src}
                alt={photos.reformer2.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="-z-20 object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-brand-900/12"
              />
              <dl
                data-program-facts
                className="mx-auto grid w-full max-w-3xl grid-cols-1 border-l border-t border-brand-200 bg-white/95 shadow-[0_24px_70px_rgba(18,43,35,0.18)] backdrop-blur-[2px] sm:grid-cols-2"
              >
                {programFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex min-h-28 flex-col items-center justify-center border-b border-r border-brand-200 px-5 py-6 text-center transition-colors duration-500 ease-out hover:bg-brand-200 sm:min-h-32 sm:px-6 motion-reduce:transition-none"
                  >
                    <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-800">
                      {fact.label}
                    </dt>
                    <dd className="mt-3 font-serif text-2xl font-semibold leading-tight text-brand-900 sm:text-3xl">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </ProgramReveal>
      </section>

      {/* A full-bleed progression from instructor to educator. */}
      <section
        data-theme="education-light"
        className="relative isolate overflow-hidden text-brand-900"
      >
        <TeachingJourneyReveal>
          <div
            data-journey-instructor
            className="relative overflow-hidden bg-brand-200 px-5 py-16 sm:px-8 sm:py-20 xl:min-h-[64rem] xl:px-0 xl:py-24"
          >
            <p
              aria-hidden
              className="pointer-events-none absolute left-4 top-[42%] -translate-y-1/2 font-serif text-6xl font-black uppercase leading-[1.08] tracking-[-0.015em] text-brand-900/[0.08] sm:left-8 sm:text-8xl xl:left-[6%] xl:max-w-[38rem] xl:text-[7.5rem]"
            >
              Learn
              <span className="block">to Move</span>
            </p>

            <div className="relative z-10 mx-auto max-w-xl xl:ml-20 xl:mr-[22rem] xl:flex xl:min-h-[52rem] xl:max-w-sm xl:flex-col">
              <header>
                <h2 className="font-serif text-5xl font-semibold leading-none text-brand-900 sm:text-6xl">
                  Move Up the Ladder
                </h2>
              </header>

              <article className="mt-20 sm:mt-28 xl:mt-28">
                <h3 className="font-serif text-4xl font-semibold text-brand-900 sm:text-5xl">
                  Become an Instructor
                </h3>
                <p className="mt-5 text-base leading-relaxed text-brand-900/80 sm:text-lg">
                  You do not need to stop being a student before you begin to
                  teach. Instructor training turns curiosity about your own
                  movement into practical skills for guiding someone else:
                  observation, assessment, clear cueing, and thoughtful
                  adaptation.
                </p>
                <p className="mt-5 text-base font-semibold leading-relaxed text-brand-900">
                  Start by understanding movement in your own body. Then learn
                  how to make that understanding useful to others.
                </p>
              </article>

              <div className="mt-14 xl:mt-auto xl:pt-12">
                <p className="text-base font-semibold text-brand-900">
                  Movement methods
                </p>
                <div className="mt-3 flex items-center gap-6 sm:gap-8">
                  {movementMethods.map((method) => (
                    <div
                      key={method.name}
                      className={`relative shrink-0 ${method.imageClassName}`}
                    >
                      <Image
                        src={method.photo.src}
                        alt={method.photo.alt}
                        fill
                        sizes="(min-width: 640px) 12rem, 10rem"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* On mobile, the central figure becomes its own split-color stage. */}
          <div className="relative h-[36rem] overflow-hidden bg-brand-200 xl:absolute xl:inset-y-0 xl:left-1/2 xl:z-20 xl:h-auto xl:w-[42rem] xl:-translate-x-1/2 xl:overflow-visible xl:bg-transparent">
            <div data-journey-center className="relative h-full w-full">
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 w-1/2 bg-brand-900 xl:hidden"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200 sm:size-[30rem] xl:size-[42rem]"
              >
                <div className="absolute left-1/2 top-1/2 size-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-900 sm:size-[22rem] xl:size-[31rem]" />
              </div>
              <figure className="absolute bottom-0 left-1/2 h-[38rem] w-[26rem] -translate-x-1/2 sm:h-[43rem] sm:w-[30rem] xl:h-[62rem] xl:w-[44rem]">
                <Image
                  src={photos.garyMoveUpLadderCutout.src}
                  alt={photos.garyMoveUpLadderCutout.alt}
                  fill
                  sizes="(min-width: 1280px) 44rem, 30rem"
                  className="object-contain object-bottom"
                />
              </figure>
            </div>
          </div>

          <div
            data-journey-educator
            className="relative overflow-hidden bg-brand-900 px-5 py-16 text-white sm:px-8 sm:py-20 xl:min-h-[64rem] xl:px-0 xl:py-24"
          >
            <p
              aria-hidden
              className="pointer-events-none absolute right-4 top-[42%] -translate-y-1/2 text-right font-serif text-6xl font-black uppercase leading-[1.08] tracking-[-0.015em] text-brand-100/[0.09] sm:right-8 sm:text-8xl xl:right-[6%] xl:max-w-[38rem] xl:text-[7.5rem]"
            >
              Move
              <span className="block">to Learn</span>
            </p>

            <article className="relative z-10 mx-auto max-w-xl xl:ml-[22rem] xl:mr-20 xl:mt-52 xl:max-w-sm">
              <h3 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
                Grow into an Educator
              </h3>
              <p className="mt-5 text-base leading-relaxed text-brand-100 sm:text-lg">
                Teaching can become an ongoing professional path. With
                experience, mentorship, and continued study, an instructor can
                grow into an educator who supports colleagues and helps shape
                the next generation of movement teachers.
              </p>
              <p className="mt-5 text-base font-semibold leading-relaxed text-white">
                Gary&rsquo;s journey shows what that progression can look like:
                not a finish line, but a commitment to keep learning and to pass
                that learning forward.
              </p>
            </article>
          </div>
        </TeachingJourneyReveal>
      </section>

      {/* Compact instructor stories — each portrait crossfades into its story. */}
      <section
        data-theme="education-light"
        className="bg-secondary py-14 text-foreground sm:py-16 lg:py-20"
      >
        <Container>
          <StoriesReveal>
            <div
              data-stories-heading
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="font-serif text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl">
                They choose to teach because...
              </h2>
            </div>

            <div className="mx-auto mt-9 grid max-w-[42rem] gap-9 sm:mt-10 md:grid-cols-2 md:gap-12">
              {instructorStories.map((instructor) => (
                <div
                  key={instructor.name}
                  data-story-entry
                  className="mx-auto w-full max-w-[19rem]"
                >
                  <article
                    tabIndex={0}
                    aria-label={`Read why ${instructor.name} chose to teach`}
                    className="instructor-story-card relative aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl bg-transparent outline-none focus-visible:ring-4 focus-visible:ring-brand-500/45"
                  >
                    <Image
                      src={instructor.photo.src}
                      alt={instructor.photo.alt}
                      fill
                      sizes="19rem"
                      className="instructor-story-image object-cover"
                    />

                    <div
                      aria-hidden
                      className="instructor-story-overlay absolute inset-0 bg-brand-900/86"
                    />

                    <div className="absolute inset-0 flex items-center justify-center px-6 py-7 text-center text-white">
                      <div>
                        <span
                          aria-hidden
                          className="instructor-story-mark block h-9 font-serif text-6xl leading-none text-brand-200"
                        >
                          &ldquo;
                        </span>
                        <blockquote className="instructor-story-quote mt-2">
                          <p className="font-sans text-lg font-semibold leading-[1.4] tracking-normal text-white sm:text-xl">
                            {instructor.quote}
                          </p>
                        </blockquote>
                        <p className="instructor-story-description mx-auto mt-4 text-[0.9375rem] leading-[1.6] text-white/90">
                          {instructor.story}
                        </p>
                      </div>
                    </div>
                  </article>

                  <div className="mt-4 text-center">
                    <h3 className="font-serif text-3xl font-semibold leading-none text-brand-900">
                      {instructor.name}
                    </h3>
                    <p className="mt-3 text-lg font-semibold text-brand-900">
                      {instructor.role}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-brand-800">
                      {instructor.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </StoriesReveal>
        </Container>
      </section>

      {/* Past education rendered as a true, newest-to-oldest timeline. */}
      <section
        data-theme="education-light"
        className="bg-[#f7f9f7] py-16 text-foreground sm:py-20 lg:py-24"
      >
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-balance font-serif text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl">
              A place for learning and connection
            </h2>
            <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
              MVP has already welcomed educators and movement professionals for
              intensive training, shared practice, and connection.
            </p>
          </div>

          <TimelineReveal>
            <div
              aria-hidden
              className="absolute bottom-10 left-[0.6875rem] top-10 w-px lg:left-1/2 lg:-translate-x-1/2"
            >
              <div data-timeline-rail className="h-full w-full bg-brand-300" />
            </div>

            <article
              data-timeline-event
              className="relative grid gap-8 py-10 pl-10 lg:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] lg:items-center lg:gap-6 lg:pl-0"
            >
              <span
                aria-hidden
                data-timeline-dot
                className="absolute left-0 top-14 size-6 rounded-full border-[6px] border-[#f7f9f7] bg-brand-700 ring-1 ring-brand-400 lg:hidden"
              />
              <div
                data-timeline-copy
                className="lg:col-start-3 lg:row-start-1 lg:pl-6"
              >
                <h3 className="font-serif text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl">
                  <span className="text-[#2b4458]">Pole</span>
                  <span className="text-[#feb75a]">star</span> Transition
                  <span className="block">(Bridging) Program</span>
                </h3>
                <p className="mt-6 flex items-start gap-3 font-serif text-2xl font-semibold leading-tight text-brand-900 sm:text-3xl">
                  <UserRound
                    aria-hidden
                    className="mt-0.5 size-7 shrink-0 text-brand-700"
                  />
                  <span>
                    Polestar Vice President &amp; Senior Faculty
                    <strong className="block text-brand-700">Shelly Power</strong>
                  </span>
                </p>
                <p className="mt-5 text-base font-semibold text-brand-800">2025</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  Canada&rsquo;s first-ever Polestar Transition program, hosted
                  on our own studio floor. Certified teachers from across the
                  country bridged into Polestar&rsquo;s internationally recognized
                  framework over two intensive weekends.
                </p>
              </div>
              <div className="hidden h-full items-center justify-center lg:col-start-2 lg:row-start-1 lg:flex">
                <span
                  aria-hidden
                  data-timeline-dot
                  className="z-10 size-7 rounded-full border-[7px] border-[#f7f9f7] bg-brand-700 ring-1 ring-brand-400"
                />
              </div>
              <figure
                data-timeline-media
                className="lg:col-start-1 lg:row-start-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-white">
                  <Image
                    src={photos.polestarCohort.src}
                    alt={photos.polestarCohort.alt}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            </article>

            <article
              data-timeline-event
              className="relative grid gap-8 py-10 pl-10 lg:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] lg:items-center lg:gap-6 lg:pl-0"
            >
              <span
                aria-hidden
                data-timeline-dot
                className="absolute left-0 top-14 size-6 rounded-full border-[6px] border-[#f7f9f7] bg-brand-700 ring-1 ring-brand-400 lg:hidden"
              />
              <div
                data-timeline-copy
                className="lg:col-start-3 lg:row-start-1 lg:pl-6"
              >
                <h3 className="font-serif text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl">
                  GYROKINESIS&reg; Level 1
                  <span className="block">Pre-Training &amp; Foundation</span>
                </h3>
                <p className="mt-6 flex items-start gap-3 font-serif text-2xl font-semibold leading-tight text-brand-900 sm:text-3xl">
                  <UserRound
                    aria-hidden
                    className="mt-0.5 size-7 shrink-0 text-brand-700"
                  />
                  <span>
                    Invited GYROKINESIS&reg; Specialized Master Trainer
                    <strong className="block text-brand-700">Jane Gotch</strong>
                  </span>
                </p>
                <p className="mt-5 text-base font-semibold text-brand-800">2025</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  MVP welcomed international educator Jane Gotch to lead a full
                  GYROKINESIS&reg; teacher-training cohort at the studio. The
                  courses brought the flowing, spiraling method to a new
                  generation of movement teachers in Markham.
                </p>
              </div>
              <div className="hidden h-full items-center justify-center lg:col-start-2 lg:row-start-1 lg:flex">
                <span
                  aria-hidden
                  data-timeline-dot
                  className="z-10 size-7 rounded-full border-[7px] border-[#f7f9f7] bg-brand-700 ring-1 ring-brand-400"
                />
              </div>
              <figure
                data-timeline-media
                className="relative max-w-md lg:col-start-1 lg:row-start-1 lg:w-full lg:max-w-none"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-white">
                  <Image
                    src={photos.gyrokinesisCohort.src}
                    alt={photos.gyrokinesisCohort.alt}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-3 left-3 w-[22%] overflow-hidden rounded-xl border border-white bg-white shadow-xl sm:bottom-4 sm:left-4">
                  <div className="relative aspect-square">
                    <Image
                      src={photos.janeGotch.src}
                      alt={photos.janeGotch.alt}
                      fill
                      loading="eager"
                      sizes="(min-width: 1024px) 10vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="absolute inset-x-0 bottom-0 bg-black/65 px-2 py-1 text-center text-xs font-semibold text-white">
                    Jane Gotch
                  </p>
                </div>
              </figure>
            </article>
          </TimelineReveal>
        </Container>
      </section>

      {/* Mentor close — a dark Verdant bookend with replaceable image slots. */}
      <section className="bg-brand-900 py-20 text-brand-50 sm:py-24">
        <Container
          size="wide"
          className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16"
        >
          <div>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">
              A Journey Shaped by Teachers
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-brand-100">
              <p>
                Across three decades of teaching and learning, Gary credits the
                educators and mentors who shared their knowledge, inspiration,
                and guidance with him.
              </p>
              <p>
                Their influence connects MVP to a wider movement community built
                on collaboration, apprenticeship, humility, and continued
                professional growth.
              </p>
            </div>
            <p className="mt-10 max-w-xl font-serif text-4xl font-semibold leading-tight text-brand-300 sm:text-5xl">
              Learn to Move. Move to Learn.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaButton
                href="/education/polestar-comprehensive-training"
                size="lg"
              >
                Explore the 2026 Program
              </CtaButton>
              <CtaButton href="/contact" size="lg" variant="outline">
                Talk to Gary
              </CtaButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mentorImages.map((item, index) => (
              <figure
                key={item.photo.src}
                className={index === 0 ? "col-span-2" : "col-span-1"}
              >
                <div
                  className={
                    index === 0
                      ? "relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/15 bg-brand-800"
                      : "relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/15 bg-brand-800"
                  }
                >
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(min-width: 1024px) 52vw, 100vw"
                        : "(min-width: 1024px) 25vw, 50vw"
                    }
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm leading-relaxed text-brand-200">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
