import type { CSSProperties } from "react";
import Image from "next/image";
import { Container } from "../container";
import { CtaButton } from "../cta-button";
import { ScrollReveal } from "../scroll-reveal";
import { brandLogos, collagePhotos } from "@/app/lib/images";
import { sectionAnchorId } from "../pricing/section-anchors";
import styles from "./gallery-wall.module.css";

const maskStyles: CSSProperties = {
  WebkitMaskImage: `url(${brandLogos.monogram.verdant})`,
  maskImage: `url(${brandLogos.monogram.verdant})`,
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
};

/**
 * Membership invitation and studio gallery combined into one brand moment.
 * The approved MVP monogram masks a gently moving mosaic of community,
 * teaching, studio, and equipment photography.
 */
export function GalleryWall() {
  return (
    <section
      id="be-our-mvp"
      className="relative isolate overflow-hidden bg-muted/40 py-20 text-foreground sm:py-28"
    >
      <div
        aria-hidden
        className="absolute -left-24 top-12 size-72 rounded-full bg-brand-200/35 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-24 bottom-4 size-80 rounded-full bg-brand-300/20 blur-3xl"
      />

      <Container className="relative">
        <ScrollReveal className="flex flex-col items-center text-center">
          <h2
            data-reveal
            className="font-serif text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl"
          >
            Be our MVP
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Join the MVP community and make movement a habit. Members enjoy
            priority booking, member pricing, and a plan built around their
            goals — with a Polestar-certified team in your corner every step of
            the way.
          </p>

          <div
            data-reveal
            role="img"
            aria-label="The MVP logo filled with a collage of instructors, clients, and the Motion Vitality Pilates studio."
            className={`${styles.logoMask} mt-12 w-full sm:mt-16`}
            style={maskStyles}
          >
            <div className={styles.collage}>
              {collagePhotos.map((src, index) => (
                <div className={styles.tile} key={src}>
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 10rem, 13vw"
                    className={styles.photo}
                    aria-hidden
                  />
                  <span aria-hidden className={styles.tint} />
                  {index === 0 ? (
                    <span aria-hidden className={styles.sheen} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <p
            data-reveal
            className="mt-8 max-w-lg text-base font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:mt-10 sm:text-lg"
          >
            Movement. Vitality. People.
          </p>
          <div data-reveal className="mt-7">
            <CtaButton
              href={`/pricing#${sectionAnchorId("memberships")}`}
              size="lg"
              square
              className="px-8 py-4 text-lg"
            >
              See membership options
            </CtaButton>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
