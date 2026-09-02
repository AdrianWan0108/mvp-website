import Image from "next/image";
import { Container } from "../container";
import { SectionHeading } from "../section-heading";
import { CtaButton } from "../cta-button";
import { photos } from "@/app/lib/images";

/**
 * The two-directions split — the structural heart of the homepage. MVP runs
 * two parallel businesses: the Studio (classes and sessions) and Teacher
 * Training. Each panel carries its section's color treatment: the Studio
 * panel stays in the site's Verdant palette, the training panel
 * previews the neutral-ink education theme via data-theme.
 */
const directions = [
  {
    title: "The Studio",
    body: "Group classes, private sessions, and rehab-informed movement on the full Pilates and GYROTONIC® apparatus — for every body, at every level.",
    cta: "Explore Classes & Pricing",
    href: "/pricing",
    photo: photos.studioReformerFloor,
    theme: undefined,
  },
  {
    title: "Teacher Training",
    body: "Become a Pilates instructor. MVP is the Markham / Toronto host site for Polestar Pilates programs, including the 2026 Comprehensive Teacher Training.",
    cta: "Explore Teacher Training",
    href: "/education",
    photo: photos.polestarCohort,
    theme: "education",
  },
];

export function TwoDirections() {
  return (
    <section className="py-16 sm:py-20">
      <Container size="wide">
        <SectionHeading
          align="center"
          eyebrow="Two directions"
          title="One studio, two ways in"
          intro="Move with us on the studio floor — or train with us to teach. MVP is both a Pilates studio and a home for movement education."
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {directions.map((dir) => (
            <div
              key={dir.title}
              data-theme={dir.theme}
              className="relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-3xl border border-border bg-background p-8 text-foreground sm:p-10"
            >
              <div aria-hidden className="absolute inset-0 -z-10">
                <Image
                  src={dir.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                {/* Legibility scrim — dark enough for white copy on both panels. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              </div>
              <h3 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
                {dir.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-white/85">
                {dir.body}
              </p>
              <div className="mt-6">
                <CtaButton href={dir.href}>{dir.cta}</CtaButton>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
