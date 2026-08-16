import type { CSSProperties } from "react";
import Image from "next/image";
import { Container } from "../container";
import { CtaButton } from "../cta-button";
import { brandLogos, photos } from "@/app/lib/images";
import { links } from "@/app/lib/links";
import styles from "./gallery-wall.module.css";

const gallery = [
  photos.garyPose,
  photos.team,
  photos.dorothyPose,
  photos.privateSession,
  photos.florencePose,
  photos.studioReformerFloor,
  photos.reformer,
  photos.gyrotonic,
  photos.konnector,
  photos.barrel,
];

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

      <Container className="relative flex flex-col items-center text-center">
        <h2 className="font-serif text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
          Be our <span className="sr-only">MVP</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Join the MVP community and make movement a habit. Members enjoy
          priority booking, member pricing, and a plan built around their goals
          — with a Polestar-certified team in your corner every step of the way.
        </p>

        <div
          role="img"
          aria-label="The MVP logo filled with a collage of instructors, clients, and the Motion Vitality Pilates studio."
          className={`${styles.logoMask} mt-12 w-full sm:mt-16`}
          style={maskStyles}
        >
          <div className={styles.collage}>
            {gallery.map((photo, index) => (
              <div className={styles.tile} key={photo.src}>
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 16rem, (min-width: 640px) 20vw, 24vw"
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

        <p className="mt-8 max-w-lg text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:mt-10">
          Movement. Vitality. People.
        </p>
        <div className="mt-7">
          <CtaButton href={links.register} size="lg">
            Join membership
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
