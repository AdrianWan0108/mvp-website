import Image from "next/image";
import { anniversary, anniversaryIsActive } from "../../lib/anniversary";
import { Container } from "../container";
import { CtaButton } from "../cta-button";

export function AnniversaryFeature() {
  if (!anniversaryIsActive) return null;
  return (
    <section aria-labelledby="anniversary-feature-title" className="bg-[#f7f6f0] py-16 text-brand-950 sm:py-24">
      <Container size="extraWide">
        <div className="grid items-center gap-9 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="lg:order-2">
            <p className="text-lg font-semibold tracking-[0.15em] uppercase text-brand-700 sm:text-xl">{anniversary.dates}</p>
            <h2 id="anniversary-feature-title" className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{anniversary.name}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brand-800">{anniversary.homepageIntroduction}</p>
            <CtaButton href={anniversary.href} square arrow size="lg" className="mt-8">See the schedule</CtaButton>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden lg:order-1 lg:aspect-square">
            <Image src={anniversary.images.homepage.src} alt={anniversary.images.homepage.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[42%_center]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
