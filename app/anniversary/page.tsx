import type { Metadata } from "next";
import Image from "next/image";
import { Gift, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "../components/container";
import { CtaButton } from "../components/cta-button";
import { anniversary, anniversaryIsActive } from "../lib/anniversary";
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

export default function AnniversaryPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#f7f6f0] text-brand-950">
        <div aria-hidden className="pointer-events-none absolute -left-80 -top-80 -z-10 size-[48rem] rounded-full border-[80px] border-brand-200/30" />
        <Container className="py-12 sm:py-20">
          {!anniversaryIsActive && (
            <div role="status" className="mb-10 border-l-4 border-brand-600 bg-brand-100 p-6">
              <h2 className="text-3xl">{anniversary.recap.title}</h2>
              <p className="mt-2 leading-relaxed">{anniversary.recap.description}</p>
            </div>
          )}
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold tracking-[0.14em] uppercase text-brand-700">{anniversaryIsActive ? "You’re part of the celebration" : "A week to remember"}</p>
              <p className="mt-7 inline-block border-y border-brand-300 py-3 text-lg font-medium">{anniversary.dates}</p>
              <h1 className="mt-6 text-6xl leading-[0.98] sm:text-7xl lg:text-[5.5rem]">{anniversary.name}</h1>
              <p className="mt-7 max-w-lg text-xl leading-relaxed">{anniversary.tagline}</p>
              <p className="mt-4 max-w-lg leading-relaxed text-brand-800">{description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <CtaButton href="#programme" square arrow size="lg">{anniversaryIsActive ? "Explore the programme" : "Look back at the programme"}</CtaButton>
                <a href="#offers" className="py-3 text-sm font-semibold underline decoration-brand-300 underline-offset-8 hover:decoration-brand-800">{anniversaryIsActive ? "See anniversary offers" : "View past offers"}</a>
              </div>
              {anniversaryIsActive && <p className="mt-6 text-sm text-brand-700">{anniversary.admission}</p>}
            </div>
            <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-t-[10rem] rounded-b-2xl">
              <Image src={anniversary.images.hero.src} alt={anniversary.images.hero.alt} fill preload sizes="(min-width: 1024px) 440px, (min-width: 640px) 448px, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section id="programme" aria-labelledby="programme-title" className="py-16 text-brand-950 sm:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-700">Five days of connection</p>
              <h2 id="programme-title" className="mt-3 text-5xl sm:text-6xl">{anniversaryIsActive ? "Your week at MVP" : "The week at MVP"}</h2>
            </div>
            <div className="max-w-md md:justify-self-end">
              <p className="text-lg leading-relaxed">{anniversary.movementNote}</p>
              <p className="mt-2 text-sm text-brand-700">All times are local to Markham (Eastern Time).</p>
            </div>
          </div>
          <ol className="mt-10 border-t border-brand-200">
            {anniversary.programme.map((day) => (
              <li key={day.date} className={`grid gap-5 border-b border-brand-200 py-7 sm:grid-cols-[6rem_1fr] sm:gap-x-7 lg:grid-cols-[6rem_1fr_12rem] ${day.kind === "open-house" ? "bg-brand-50 px-4 sm:px-6" : ""}`}>
                <time dateTime={day.date} className="flex items-baseline gap-2 sm:block">
                  <span className="block text-xs font-semibold tracking-wider uppercase text-brand-700">{day.day}</span>
                  <span className="font-serif text-5xl leading-tight">{day.number}</span>
                  <span className="text-xs tracking-wider uppercase sm:ml-2">Nov</span>
                </time>
                <div>
                  {day.kind === "open-house" && <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-brand-700">Celebrate together</p>}
                  <h3 className="text-3xl sm:text-4xl">{day.title}</h3>
                  {day.speaker && <p className="mt-1 text-sm font-medium text-brand-700">{day.speaker}</p>}
                  <p className="mt-3 max-w-xl leading-relaxed text-brand-800">{day.description}</p>
                </div>
                <div className="sm:col-start-2 lg:col-start-auto lg:text-right">
                  <p className="font-semibold">{day.kind === "talk" ? "Talk: " : ""}{day.time}</p>
                  {day.provisional && <p className="mt-2 text-xs text-brand-700">Time to be confirmed</p>}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="offers" aria-labelledby="offers-title" className="bg-brand-950 py-16 text-white sm:py-24">
        <Container>
          <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-200">{anniversaryIsActive ? "More reasons to move" : "From our 2026 celebration"}</p>
          <h2 id="offers-title" className="mt-3 text-5xl sm:text-6xl">{anniversaryIsActive ? "Anniversary offers" : "Past anniversary offers"}</h2>
          <p className="mt-4 text-brand-200">{anniversaryIsActive ? anniversary.offersNote : "These offers were part of Anniversary Rehab Week and are no longer advertised as current offers."}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {anniversary.offers.map((offer, index) => (
              <article key={offer.label} className="flex flex-col border border-white/20 bg-white/5 p-7 sm:p-8">
                <span className="text-xs tracking-widest text-brand-200">0{index + 1}</span>
                <h3 className="mt-5 text-2xl text-brand-200">{offer.label}</h3>
                <p className="mt-5 font-serif text-6xl sm:text-7xl">{offer.headline}</p>
                <p className="mt-3 text-xl">{offer.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="celebration-title" className="bg-brand-100 py-10 text-brand-950 sm:py-14">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="grid size-16 shrink-0 place-items-center rounded-full border border-brand-300"><Gift aria-hidden className="size-7 text-brand-700" /></div>
          <div>
            <h2 id="celebration-title" className="text-3xl sm:text-4xl">{anniversary.celebration.title}</h2>
            <p className="mt-2 leading-relaxed text-brand-800">{anniversaryIsActive ? anniversary.celebration.description : "The celebration included goodie bags and a raffle for attendees of the Open House and talks."}</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="visit-title" className="py-16 text-brand-950 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[3/2] overflow-hidden rounded-tr-[5rem] rounded-bl-[5rem]">
            <Image src={anniversary.images.studio.src} alt={anniversary.images.studio.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-700">Motion Vitality Pilates · Markham</p>
            <h2 id="visit-title" className="mt-3 text-5xl sm:text-6xl">{anniversaryIsActive ? "Come spend time with us" : "Keep moving with us"}</h2>
            {anniversaryIsActive && <p className="mt-4 text-lg">{anniversary.admission}</p>}
            <address className="mt-6 flex items-start gap-3 not-italic leading-relaxed text-brand-800">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0" />
              <span>{site.address.street}<br />{site.address.locality}, {site.address.region} {site.address.postalCode}</span>
            </address>
            <a href={directions} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 py-2 font-semibold underline decoration-brand-300 underline-offset-8 hover:decoration-brand-800">Get directions <ArrowUpRight aria-hidden className="size-4" /><span className="sr-only"> (opens in a new tab)</span></a>
            <div className="mt-6 flex flex-col gap-3 border-t border-brand-200 pt-6 text-sm">
              <a href={`tel:${site.phone}`} className="w-fit py-1 underline-offset-4 hover:underline">{site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`} className="w-fit break-all py-1 underline-offset-4 hover:underline">{site.email}</a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
