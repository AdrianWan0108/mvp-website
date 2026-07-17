import Image from "next/image";
import { Container } from "../container";
import { CtaButton } from "../cta-button";
import { photos } from "@/app/lib/images";
import { links } from "@/app/lib/links";

/**
 * Membership band. Two columns (entrance wall photo + "Be our MVP" copy), with
 * a looping photo strip near the bottom of the section. The track renders the
 * set twice so the -50% translate loops seamlessly (.gallery-marquee-track in
 * globals.css).
 */
const gallery = [
  photos.garyPose,
  photos.dorothyPose,
  photos.florencePose,
  photos.privateSession,
  photos.team,
  photos.reformer,
  photos.gyrotonic,
  photos.konnector,
  photos.barrel,
  photos.studioReformerFloor,
];

export function GalleryWall() {
  return (
    <section className="overflow-hidden bg-muted/40 pb-10 pt-20 text-foreground sm:pt-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: entrance wall photo */}
          <div className="relative h-72 overflow-hidden rounded-2xl border border-border sm:h-96 lg:h-[28rem]">
            <Image
              src={photos.entranceWall.src}
              alt={photos.entranceWall.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Right: membership copy */}
          <div>
            <h2 className="font-serif text-5xl font-semibold leading-tight sm:text-6xl">
              Be our MVP
            </h2>
            <p className="mt-5 max-w-lg text-xl leading-relaxed text-muted-foreground">
              Join the MVP community and make movement a habit. Members enjoy
              priority booking, member pricing, and a plan built around their
              goals — with a Polestar-certified team in your corner every step
              of the way.
            </p>
            <div className="mt-8">
              <CtaButton href={links.register} size="lg">
                Join membership
              </CtaButton>
            </div>
          </div>
        </div>
      </Container>

      {/* Looping photo strip near the bottom (right -> left) */}
      <div className="mt-16 w-full overflow-hidden sm:mt-20">
        <ul className="gallery-marquee-track flex w-max shrink-0 gap-4 px-4">
          {[...gallery, ...gallery].map((photo, i) => (
            <li
              key={`${photo.src}-${i}`}
              className="relative h-32 w-44 shrink-0 overflow-hidden rounded-xl border border-border bg-card shadow-lg sm:h-40 sm:w-56"
            >
              <Image
                src={photo.src}
                alt={i < gallery.length ? photo.alt : ""}
                aria-hidden={i >= gallery.length}
                fill
                sizes="14rem"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
