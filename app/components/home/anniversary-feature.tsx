import Image from "next/image";
import { anniversary, anniversaryIsActive } from "../../lib/anniversary";
import { Container } from "../container";
import { CtaButton } from "../cta-button";

export function AnniversaryFeature() {
  if (!anniversaryIsActive) return null;
  return (
    <section aria-labelledby="anniversary-feature-title" className="relative isolate overflow-hidden bg-[#f7f6f0] py-16 text-brand-950 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-64 -z-10 size-[40rem] rounded-full border-[70px] border-brand-200/40" />
      <Container size="extraWide">
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-700">{anniversary.dates}</p>
            <h2 id="anniversary-feature-title" className="mt-5 max-w-xl text-5xl leading-[1.03] sm:text-6xl lg:text-7xl">{anniversary.name}</h2>
            <p className="mt-6 max-w-xl text-xl leading-relaxed">{anniversary.tagline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-brand-800">{anniversary.homepageIntroduction}</p>
            <CtaButton href={anniversary.href} square arrow size="lg" className="mt-8">Explore the week</CtaButton>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-t-[5rem] rounded-br-[5rem] lg:order-1">
            <Image src={anniversary.images.homepage.src} alt={anniversary.images.homepage.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover object-[42%_center]" />
          </div>
        </div>
        <ul className="mt-12 grid divide-y divide-brand-200 border-y border-brand-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {anniversary.highlights.map((highlight, index) => (
            <li key={highlight} className="flex items-center justify-between gap-3 py-5 sm:px-5 sm:first:pl-0 sm:last:pr-0">
              <span className="flex items-center gap-3"><span className="text-xs text-brand-700">0{index + 1}</span><span className="text-sm font-semibold sm:text-base">{highlight}</span></span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
