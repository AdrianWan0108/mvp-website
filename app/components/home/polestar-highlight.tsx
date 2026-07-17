import Image from "next/image";
import { Container } from "../container";
import { SectionHeading } from "../section-heading";
import { CtaButton } from "../cta-button";
import { photos } from "@/app/lib/images";

const points = [
  "A holistic method grounded in orthopedics, sports medicine, and movement science.",
  "Instructors certified through Polestar's globally recognized program.",
  "Rehab-informed teaching that meets you wherever your body is today.",
];

/**
 * Home credibility band for the MVP × Polestar relationship. Uses
 * data-theme="polestar-brand" (Polestar's official slate + amber colors) so
 * the band renders in Polestar's identity — a taste of the relationship page.
 */
export function PolestarHighlight() {
  return (
    <section
      data-theme="polestar-brand"
      className="relative isolate overflow-hidden bg-background text-foreground"
    >
      <div aria-hidden className="polestar-aurora absolute inset-0 -z-10" />
      <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="What makes MVP different"
            title="Polestar Pilates — movement, backed by science"
            intro="Polestar is at the heart of how we teach. It blends the classical Pilates repertoire with modern rehabilitation science, so every session is as safe as it is effective."
          />
          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-base leading-relaxed">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                <span className="text-foreground/90">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-4">
            <CtaButton href="/about/polestar" size="lg">
              MVP × Polestar
            </CtaButton>
            <CtaButton
              href="/education/polestar-comprehensive-training"
              size="lg"
              variant="outline"
            >
              Teacher Training 2026
            </CtaButton>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border lg:aspect-[5/6]">
          <Image
            src={photos.garyPose.src}
            alt={photos.garyPose.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
