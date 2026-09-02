import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { CtaButton } from "../../components/cta-button";
import { Card } from "../../components/card";
import { photos } from "@/app/lib/images";
import { links } from "@/app/lib/links";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Polestar Comprehensive Teacher Training 2026",
  description:
    "Canada's first-ever Polestar Comprehensive Pilates Teacher Training, hosted at Motion Vitality Pilates in Markham/Toronto, September 2026 – July 2027. 450 hours across the full Pilates apparatus. Registration open now.",
};

const facts = [
  { label: "Dates", value: "Sep 2026 – Jul 2027" },
  { label: "Training hours", value: "450 hours" },
  { label: "Exercises", value: "130+" },
  { label: "Format", value: "Mat + full apparatus" },
  { label: "Framework", value: "5 Principles" },
];

const audience = [
  {
    title: "Future instructors",
    body: "Begin a new career with a comprehensive teaching foundation.",
  },
  {
    title: "Movement professionals",
    body: "Expand your scope with Pilates assessment and programming skills.",
  },
  {
    title: "Physio + rehab practitioners",
    body: "Bring adaptable Pilates principles into movement-based care.",
  },
  {
    title: "Dedicated practitioners",
    body: "Deepen your practice and learn to teach what you love.",
  },
];

const curriculum = [
  {
    title: "Movement foundations",
    body: "Five Principles of Movement, anatomy, and biomechanics.",
  },
  {
    title: "Mat + full apparatus",
    body: "Mat, Reformer, Trapeze Table, barrels, Chair, and Spine Corrector.",
  },
  {
    title: "Assessment + programming",
    body: "Assessment, exercise selection, progressions, and adaptations.",
  },
  {
    title: "Teaching practice",
    body: "Cueing, sequencing, supervised practice, and mentorship.",
  },
];

const learningFormats = [
  {
    number: "01",
    title: "In-person labs",
    body: "Hands-on practice with faculty.",
  },
  {
    number: "02",
    title: "Live virtual sessions",
    body: "Live support between modules.",
  },
  {
    number: "03",
    title: "Case studies + workshops",
    body: "Apply concepts to real-world scenarios.",
  },
  {
    number: "04",
    title: "Guided independent study",
    body: "Homework and Virtual Pilates Studio access.",
  },
];

const educators = [
  {
    name: "Gary Fok",
    role: "Program educator · Founder of Motion Vitality Pilates",
    bio: "A Polestar Educator, Mentor, and Ambassador who brings a collaborative, movement-first approach to the cohort.",
    image: "/assets/education/gary-lead-educator.webp",
  },
  {
    name: "Maureen Shea, NCPT",
    role: "Program educator · Nationally Certified Pilates Teacher",
    bio: "Maureen joins Gary in guiding students through the comprehensive program's movement and teaching curriculum.",
    image: "/assets/education/maureen-headshot.webp",
  },
];

const scheduleInPerson = [
  { module: "Principles of Movement", date: "Sep 19 – 20, 2026" },
  { module: "Module 1", date: "Oct 17 – 18, 2026" },
  { module: "Module 2", date: "Nov 14 – 15, 2026" },
  { module: "Module 3", date: "Jan 9 – 10, 2027" },
  { module: "Module 4 (Midterm)", date: "Feb 13 – 14, 2027" },
  { module: "Module 5", date: "Mar 20 – 21, 2027" },
  { module: "Module 6", date: "Apr 24 – 25, 2027" },
  { module: "Module 7", date: "Jun 5 – 6, 2027" },
  { module: "Final Written Exam", date: "Jul 10 – 12, 2027" },
  { module: "Final In-Person Exam", date: "Jul 17, 2027" },
];

const scheduleOnline = [
  { when: "Every 1st Saturday", what: "Case Study" },
  { when: "Every 2nd Saturday", what: "Movement Workshop" },
  { when: "Every 3rd Sunday", what: "Case Study" },
  { when: "Every 4th Sunday", what: "Movement Workshop" },
];

const requirements = [
  { label: "Pre-Curriculum", value: "25 hours" },
  { label: "Observation", value: "40 hours" },
  { label: "Practice Exercise / Self-Mastery", value: "100 hours" },
  { label: "Practice Teaching", value: "100 hours" },
];

type PricingOption = {
  name: string;
  headline: string;
  detail: string;
  note?: string;
};

const pricingOptions: PricingOption[] = [
  {
    name: "Option 1 — Full Payment",
    headline: "$6,913.00 USD",
    detail: "Paid in full at registration.",
  },
  {
    name: "Option 2 — 6-Month Plan",
    headline: "$7,262.73 total",
    detail: "$1,866.51 down, followed by $899.42 for six months.",
    note: "Includes a $350 processing fee.",
  },
  {
    name: "Option 3 — 2-Payment Plan",
    headline: "$7,263.00 total",
    detail: "$800.00 down, followed by $3,231.50 for two payments.",
    note: "Includes a $350 processing fee.",
  },
];

// Course structured data for SEO rich results.
const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Polestar Comprehensive Pilates Teacher Training",
  description:
    "Canada's first-ever Polestar Comprehensive Pilates Teacher Training, hosted at Motion Vitality Pilates in Markham/Toronto. 450 hours across mat and the full Pilates apparatus.",
  provider: {
    "@type": "Organization",
    name: "Polestar Pilates",
    sameAs: "https://polestarpilates.com",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    startDate: "2026-09-19",
    endDate: "2027-07-17",
    location: {
      "@type": "Place",
      name: site.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
    },
  },
  offers: {
    "@type": "Offer",
    url: links.polestarRegister,
    price: "6913",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
  },
};

export default function TeacherTrainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* Hero — polestar-frontdoor.jpg full overlay. Bottom padding gives the
         scrim's near-solid zone (percentage-based, so it grows with the
         section) just enough dark footer for the fact cards to sit in,
         without ballooning the hero's overall height. */}
      <section className="relative isolate overflow-hidden pb-16 sm:pb-20">
        <div className="absolute inset-0 -z-10">
          <Image
            src={photos.polestarFrontDoor.src}
            alt={photos.polestarFrontDoor.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-neutral-900/25" />
          <div className="absolute inset-0 polestar-scrim" />
          <div aria-hidden className="polestar-aurora absolute inset-0" />
        </div>
        <Container className="max-w-3xl pt-36 sm:pt-44 pb-0">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            New for September 2026
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-tight sm:text-6xl">
            Become a certified Polestar Pilates teacher
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-foreground/90">
            Canada&rsquo;s first-ever Polestar Comprehensive Pilates Teacher Training —
            hosted at Motion Vitality Pilates in Markham / Toronto, September 2026
            through July 2027. Master the full method and earn an internationally
            recognized certification.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton href={links.polestarRegister} size="lg">
              Register Now
            </CtaButton>
            <CtaButton href="/contact" size="lg" variant="outline">
              Request Information
            </CtaButton>
          </div>
        </Container>

        {/* Five concise facts, resting in the hero's blackened footer — same
           light, airy card style, with a per-card theme override so they stay
           legible against the dark backdrop. A pale mint tint (rather than
           plain white) keeps them reading as verdant, not neutral grey. */}
        <Container size="wide" className="relative z-10 mt-10 sm:mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {facts.map((fact) => (
              <div
                key={fact.label}
                data-theme="education-light"
                className="rounded-2xl border border-brand-200 bg-brand-100 p-5 text-foreground shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {fact.label}
                </p>
                <p className="mt-2 font-serif text-2xl leading-snug sm:text-3xl lg:text-2xl xl:text-3xl">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Program introduction — educators and Gary's personal message. */}
      <section
        data-theme="education-light"
        className="relative bg-gradient-to-b from-brand-300 via-brand-100 to-white text-foreground"
      >
        {/* Educators + Gary's note continue on the section's verdant-to-white
           gradient — no background of their own, so there's no white seam. */}
        <div className="py-16 sm:py-20">
          <Container size="wide">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.6fr] lg:items-center lg:gap-16">
              <SectionHeading
                eyebrow="Your teaching team"
                title="Meet your educators"
                intro="Learn in person with educators who pair Polestar's international method with close, local mentorship."
              />

              <div className="flex flex-col divide-y divide-border">
                {educators.map((educator) => (
                  <article
                    key={educator.name}
                    className="flex flex-col items-center gap-6 py-8 text-center first:pt-0 sm:flex-row sm:items-center sm:text-left"
                  >
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-background sm:h-32 sm:w-32">
                      <Image
                        src={educator.image}
                        alt={`${educator.name}, Polestar teacher-training educator`}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
                        {educator.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                        {educator.role}
                      </p>
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {educator.bio}
                      </p>
                    </div>
                  </article>
                ))}
                </div>
              </div>
            <div className="relative mt-12 overflow-hidden py-8 sm:mt-14 sm:py-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src="/assets/brand/polestar-logo.png"
                  alt=""
                  width={720}
                  height={720}
                  className="w-full max-w-xl opacity-[0.055] sm:max-w-2xl"
                />
              </div>

              <div className="relative z-10 mx-auto max-w-4xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  A note from Gary
                </p>
                <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                  Enter your Pilates era
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/90">
                  <p>
                    Choosing a Pilates teacher-training program can feel overwhelming.
                    The right path should align with how you want to move, teach, and
                    grow.
                  </p>
                  <p>
                    What makes Polestar meaningful to me is its strong community and
                    mentorship — a global network built on collaboration, apprenticeship,
                    and lifelong learning. Whether you are deepening your practice,
                    changing careers, or expanding your movement education, we would be
                    honoured to support your journey here at Motion Vitality Pilates.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src="/assets/education/gary-lead-educator.webp"
                      alt="Gary Fok"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <p className="font-semibold text-foreground">
                    Gary Fok
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">
                      Founder of Motion Vitality Pilates
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Audience — a full-bleed editorial split with a simple checklist. */}
      <section className="grid lg:grid-cols-[2fr_1fr]">
          <div className="relative aspect-[2048/1154] lg:aspect-auto">
            <Image
              src="/assets/education/students-attending.webp"
              alt="Gary Fok with a Polestar teacher-training cohort"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-5 py-10 sm:px-8 sm:py-14 lg:px-10 xl:px-14">
            <div className="w-full max-w-xl">
              <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                Who it&rsquo;s for
              </h2>
              <ul className="mt-6 divide-y divide-border border-y border-border">
              {audience.map((item) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[2rem_1fr] items-start gap-4 py-4"
                >
                  <span
                    aria-hidden
                    className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary"
                  >
                    &#10003;
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold sm:text-3xl">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
              </ul>
            </div>
          </div>
      </section>

      {/* Curriculum and delivery format — the "dark verdant" section. Deep
         brand-900 green instead of neutral ink, so the two most
         program-detail-heavy sections read as the page's brand-green core,
         bracketed by ink/white elsewhere. */}
      <section
        data-theme="education"
        className="bg-brand-900 text-brand-50 py-10 sm:py-12"
      >
        <Container size="wide">
          <SectionHeading
            eyebrow="Your training experience"
            title="What you'll learn — and how"
          />

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <h3 className="font-serif text-3xl font-semibold">Curriculum</h3>
              <ul className="mt-3 divide-y divide-brand-50/15 border-y border-brand-50/15">
                {curriculum.map((item) => (
                  <li
                    key={item.title}
                    className="grid grid-cols-[2rem_1fr] items-start gap-4 py-3"
                  >
                    <span
                      aria-hidden
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                    >
                      &bull;
                    </span>
                    <div>
                      <h4 className="font-serif text-xl font-semibold">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-3xl font-semibold">
                How you&rsquo;ll learn
              </h3>
              <ol className="mt-3 divide-y divide-brand-50/15 border-y border-brand-50/15">
                {learningFormats.map((item) => (
                  <li key={item.number} className="grid grid-cols-[2.5rem_1fr] items-start gap-4 py-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary font-serif text-sm text-primary-foreground">
                      {item.number}
                    </span>
                    <div>
                      <h4 className="font-serif text-xl font-semibold">{item.title}</h4>
                      <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Schedule — a paper-white breather within the Education system. */}
      <section
        data-theme="education-light"
        className="bg-background text-foreground py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            eyebrow="Important dates"
            title="Course schedule 2026 – 2027"
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            {/* In-person */}
            <div>
              <h3 className="font-serif text-2xl font-semibold">
                In-person sessions
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                Saturdays 9:00 AM – 4:30 PM · Sundays 9:00 AM – 1:30 PM
              </p>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {scheduleInPerson.map((row) => (
                  <li
                    key={row.module}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-base font-medium text-foreground/90">
                      {row.module}
                    </span>
                    <span className="text-right text-base text-muted-foreground">
                      {row.date}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CtaButton href={links.polestarRegister} size="lg">
                  Register Now
                </CtaButton>
              </div>
            </div>
            {/* Online + Program requirements stacked in the right column */}
            <div className="space-y-12">
              <div>
                <h3 className="font-serif text-2xl font-semibold">
                  Live online sessions
                </h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Rolling sessions · 12:00 – 1:00 PM CST
                </p>
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {scheduleOnline.map((row) => (
                    <li
                      key={row.when}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-base font-medium text-foreground/90">
                        {row.when}
                      </span>
                      <span className="text-right text-base text-muted-foreground">
                        {row.what}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Students must attend a minimum of 6 Case Study sessions and 6
                  Movement Workshops over the entirety of the course.
                </p>
              </div>

              {/* Program requirements — 2×2 grid */}
              <div>
                <h3 className="font-serif text-2xl font-semibold">
                  Program requirements
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {requirements.map((req) => (
                    <div
                      key={req.label}
                      className="rounded-2xl border border-brand-200 bg-brand-100 p-5 shadow-sm"
                    >
                      <p className="font-serif text-4xl font-semibold text-brand-900 sm:text-5xl">
                        {req.value}
                      </p>
                      <p className="mt-2 text-sm text-brand-700">
                        {req.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tuition — includes the CTA block moved up from the bottom */}
      <section
        data-theme="education-light"
        className="bg-background text-foreground py-20 sm:py-24"
      >
        <Container>
          <SectionHeading eyebrow="Tuition" title="Pricing & payment options" />
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            Three ways to enroll. Installment plans make the program accessible
            across the year.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pricingOptions.map((opt) => (
              <div
                key={opt.name}
                className="flex flex-col rounded-2xl border border-brand-200 bg-brand-100 p-6 shadow-sm"
              >
                <h3 className="font-serif text-2xl font-semibold">{opt.name}</h3>
                <p className="mt-2 text-xl font-semibold text-primary">
                  {opt.headline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                  {opt.detail}
                </p>
                {opt.note && (
                  <p className="mt-3 text-sm text-muted-foreground">{opt.note}</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-base text-muted-foreground">
            Pricing is shown in USD and set by Polestar. Confirm current figures on
            the official registration page.
          </p>

          {/* Ready to begin — moved up from the bottom section. Ink surface so
             it stands out as the closing call-to-action on the white section. */}
          <div
            data-theme="education"
            className="mt-10 rounded-2xl border border-border bg-background p-8 text-foreground shadow-xl sm:p-12"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="font-serif text-4xl font-semibold sm:text-5xl">
                  Ready to begin your Polestar journey?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Spaces in the inaugural Canadian cohort are limited. Register
                  through Polestar, or reach out and we&rsquo;ll walk you through
                  everything.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <CtaButton href={links.polestarRegister} size="lg">
                  Register Now
                </CtaButton>
                <CtaButton href="/contact" size="lg" variant="secondary">
                  Ask a Question
                </CtaButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Certification — the program outcome, closing the page after the CTA
         so it reads as a coda rather than competing for attention. */}
      <section data-theme="education-light" className="bg-background py-12 text-foreground sm:py-16">
        <Container className="grid items-center gap-8 lg:grid-cols-[0.4fr_1fr]">
          <div className="mx-auto w-full max-w-[16rem] sm:max-w-[19rem] lg:mx-0">
            <Image
              src="/assets/education/diploma-sample.webp"
              alt="Sample Polestar Pilates education diploma"
              width={783}
              height={598}
              sizes="304px"
              className="h-auto w-full rounded-lg shadow-lg ring-1 ring-primary/25"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="The outcome"
              title="Polestar certification"
            />
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">
              Complete the program requirements to earn a Polestar Pilates diploma
              and join its global education community.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Credential recognition and teaching requirements vary by jurisdiction;
              confirm current details with Polestar.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
