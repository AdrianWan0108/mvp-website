import type { Metadata } from "next";
import Image from "next/image";
import { HeroStrip } from "../components/anniversary/hero-strip";
import { RsvpForm, type RsvpTalk } from "../components/anniversary/rsvp-form";
import { RsvpLink, RSVP_SECTION_ID } from "../components/anniversary/rsvp-link";
import { RsvpStickyBar } from "../components/anniversary/rsvp-sticky-bar";
import { Container } from "../components/container";
import { CtaButton } from "../components/cta-button";
import { anniversary, anniversaryIsActive, clinics } from "../lib/anniversary";
import { cn } from "../lib/cn";
import { photos, type Photo } from "../lib/images";
import { site } from "../lib/site";

const description = anniversaryIsActive ? anniversary.introduction : anniversary.recap.description;
export const metadata: Metadata = {
  title: `${anniversary.name} · ${anniversary.dates}`,
  description,
  alternates: { canonical: anniversary.href },
  openGraph: {
    type: "website", locale: "en_CA", siteName: site.name,
    url: anniversary.href, title: anniversary.name, description,
    images: [{ url: anniversary.images.social.src, alt: anniversary.images.social.alt }],
  },
  twitter: {
    card: "summary_large_image", title: anniversary.name, description,
    images: [anniversary.images.social.src],
  },
};

const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`)}`;

// The whole page shares these: one heading size per level, one body style.
const sectionTitle = "text-4xl sm:text-5xl";
const itemTitle = "text-2xl sm:text-[1.75rem]";
const eyebrow = "text-sm font-semibold text-brand-700";
const body = "max-w-3xl leading-relaxed text-brand-900";
const link = "font-medium text-brand-950 underline decoration-brand-400 underline-offset-4 hover:decoration-brand-700";
const section = "py-14 sm:py-20";

/** A day with a speaker is a talk; talks are what people RSVP for. */
const talks: RsvpTalk[] = anniversary.programme
  .flatMap((week) => week.days)
  .flatMap((day) =>
    day.speaker
      ? [{ id: day.date, date: `${day.day}, ${day.month} ${day.number}`, topic: day.title, time: day.time, host: day.speaker.name }]
      : [],
  );

/** Round headshot. The tinted ground and hairline keep portraits shot on white
 *  from dissolving into the page. */
function Avatar({ photo, className }: { photo: Photo; className?: string }) {
  return (
    <span className={cn("relative block size-16 shrink-0 overflow-hidden rounded-full bg-brand-50 ring-1 ring-brand-200", className)}>
      <Image src={photo.src} alt={photo.alt} fill sizes="64px" className="object-cover" />
    </span>
  );
}

type Clinic = (typeof clinics)[keyof typeof clinics];

/** The logo alone. `className` caps its box; the logo keeps its own proportions inside it. */
function LogoImage({ clinic, className }: { clinic: Clinic; className: string }) {
  return (
    <Image
      src={clinic.logo.src}
      alt={clinic.logo.alt}
      width={clinic.logo.width}
      height={clinic.logo.height}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}

/** Clinic logo linking to the clinic's home page. */
function ClinicLogo({ clinic, className }: { clinic: Clinic; className: string }) {
  return (
    <a href={clinic.url} target="_blank" rel="noopener noreferrer" className="inline-block transition-opacity hover:opacity-75">
      <LogoImage clinic={clinic} className={className} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function AnniversaryPage() {
  return (
    <div className="text-brand-950">
      <HeroStrip photos={anniversary.images.hero} />

      <Container className="pt-10 sm:pt-14">
        <header className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <h1 className="text-5xl leading-none sm:text-6xl lg:text-7xl">Anniversary <span className="inline-block">Rehab Week</span></h1>
            <p className="mt-3 font-serif text-2xl tracking-[0.04em] text-brand-600 sm:text-3xl">{anniversary.dates}</p>
          </div>
          <div>
            <p className={body}>{description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              {anniversaryIsActive && (
                <span data-rsvp-anchor>
                  <CtaButton href={`#${RSVP_SECTION_ID}`} square size="lg">RSVP for a talk</CtaButton>
                </span>
              )}
              <a href="#schedule" className={cn(link, "inline-flex min-h-11 items-center")}>See the schedule</a>
            </div>
          </div>
        </header>

        <div className="mt-12 flex flex-col items-center gap-x-12 gap-y-6 border-y border-brand-200 py-7 sm:mt-14 lg:flex-row">
          <p className="shrink-0 text-sm font-semibold tracking-[0.15em] uppercase text-brand-700">With guest speakers from</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:flex-1 lg:justify-between">
            {Object.values(clinics).map((clinic) => (
              <li key={clinic.name} className="flex">
                <ClinicLogo clinic={clinic} className="max-h-12 max-w-[9.5rem] sm:max-w-[11rem]" />
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <section id="schedule" aria-labelledby="schedule-title" className={section}>
        <Container>
          <h2 id="schedule-title" className={sectionTitle}>The schedule, day by day</h2>
          <div className="mt-5 flex items-center gap-4">
            <Avatar photo={photos.anniversaryCoachGary} className="size-14" />
            <p className={body}>{anniversary.movementNote}</p>
          </div>

          <div className="mt-10 space-y-12">
            {anniversary.programme.map((week) => (
              <div key={week.label}>
                <h3 className="border-b border-brand-200 pb-3 text-xl tracking-[0.12em] text-brand-700">
                  {week.label} · {week.dates}
                </h3>
                <ol className="divide-y divide-brand-200">
                  {week.days.map((day) => (
                    <li key={day.date} className="grid gap-x-8 gap-y-5 py-8 sm:grid-cols-[7.5rem_minmax(0,1fr)] lg:grid-cols-[7.5rem_minmax(0,1fr)_17rem] lg:gap-x-12">
                      <time dateTime={day.date} className="flex items-baseline gap-3 sm:block">
                        <span className="block font-serif text-4xl leading-none tracking-[0.04em] whitespace-nowrap uppercase sm:text-5xl">
                          {day.month} {day.number}
                        </span>
                        <span className="block text-sm font-semibold tracking-[0.12em] uppercase text-brand-700 sm:mt-1.5">
                          {day.day.slice(0, 3)}
                        </span>
                      </time>

                      <div>
                        <h4 className={itemTitle}>{day.title}</h4>
                        <p className={`mt-1 ${eyebrow}`}>
                          {day.time && <>{day.time} · </>}
                          {day.summary}
                        </p>
                        <p className={`mt-3 ${body}`}>{day.description}</p>
                        {day.speaker && <p className={`mt-3 ${body}`}>{day.speaker.bio}</p>}
                        {!day.speaker && anniversaryIsActive && (
                          <p className="mt-3 font-medium">Drop in, no RSVP needed.</p>
                        )}
                      </div>

                      {day.speaker && (
                        <div className="sm:col-start-2 lg:col-start-3">
                          <a
                            href={day.speaker.bioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 transition-opacity hover:opacity-75"
                          >
                            <Avatar photo={day.speaker.photo} />
                            <span className="block">
                              <span className="block font-semibold">{day.speaker.name}</span>
                              <span className="mt-2 flex">
                                <LogoImage clinic={clinics[day.speaker.clinic]} className="max-h-9 max-w-[9.5rem]" />
                              </span>
                            </span>
                            <span className="sr-only">, profile on {clinics[day.speaker.clinic].name} site (opens in a new tab)</span>
                          </a>
                          {anniversaryIsActive && (
                            <RsvpLink talk={day.date} className={cn(link, "mt-1 inline-block py-2.5")}>
                              Reserve a FREE spot <span aria-hidden>→</span>
                            </RsvpLink>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {anniversaryIsActive && (
        <section id={RSVP_SECTION_ID} data-rsvp-anchor aria-labelledby="rsvp-title" className={cn(section, "bg-brand-50")}>
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
              <div>
                <h2 id="rsvp-title" className={sectionTitle}>RSVP for a talk</h2>
                <p className={`mt-4 ${body}`}>
                  {anniversary.admission} Choose the talks you’d like to attend and how many people are coming.
                </p>
                <p className={`mt-4 ${body}`}>
                  We’re at {site.address.street}, {site.address.locality}.{" "}
                  <a href={directions} target="_blank" rel="noopener noreferrer" className={link}>
                    Get directions<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
                <p className={`mt-4 ${body}`}>
                  You can also RSVP by calling{" "}
                  <a href={`tel:${site.phone}`} className={link}>{site.phoneDisplay}</a> or emailing{" "}
                  <a href={`mailto:${site.email}`} className={`${link} break-words`}>{site.email}</a>.
                </p>
              </div>
              <div className="rounded-lg border border-brand-200 bg-white p-5 sm:p-8">
                <RsvpForm talks={talks} maxPerTalk={anniversary.rsvp.maxPerTalk} thanks={anniversary.celebration} />
              </div>
            </div>
          </Container>
        </section>
      )}

      <section id="offers" aria-labelledby="offers-title" className={section}>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[3/2]">
              <Image
                src={anniversary.images.offers.src}
                alt={anniversary.images.offers.alt}
                fill
                sizes="(min-width: 1280px) 38rem, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 id="offers-title" className={sectionTitle}>
                {anniversaryIsActive ? "Anniversary offers" : "Past anniversary offers"}
              </h2>
              <ul className="mt-8 space-y-8">
                {anniversary.offers.map((offer) => (
                  <li key={offer.title}>
                    <h3 className={itemTitle}>{offer.title}</h3>
                    <p className={`mt-2 ${body}`}>{offer.description}</p>
                  </li>
                ))}
              </ul>
              <p className={`mt-8 ${body}`}>
                {anniversaryIsActive ? anniversary.offersNote : "These offers were part of Anniversary Rehab Week and are no longer available."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {!anniversaryIsActive && (
        <section aria-labelledby="recap-title" className={cn(section, "border-t border-brand-200")}>
          <Container>
            <h2 id="recap-title" className={sectionTitle}>{anniversary.recap.title}</h2>
          </Container>
        </section>
      )}

      {anniversaryIsActive && <RsvpStickyBar label={`Free talks · ${anniversary.shortDates}`} />}
    </div>
  );
}
