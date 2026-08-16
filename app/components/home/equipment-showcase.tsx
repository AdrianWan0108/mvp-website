"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../container";
import { SectionHeading } from "../section-heading";
import { photos } from "@/app/lib/images";
import { cn } from "@/app/lib/cn";

/**
 * Full-bleed equipment/method showcase. Five panels sit edge-to-edge with
 * softly blurred seams between them; all are black & white by default and light
 * up in colour on hover, revealing the method's intro copy.
 */
const equipment = [
  {
    name: "Reformer",
    blurb: "Spring-resisted, full-body training — strength, control, and mobility.",
    photo: photos.reformer,
    href: "/about/studio#reformer",
  },
  {
    name: "Konnector®",
    blurb: "Connected, whole-body movement that links every limb as one unit.",
    photo: photos.konnector,
    href: "/about/studio#konnector",
  },
  {
    name: "Ladder Barrel",
    blurb: "Spinal extension, stretch, and strength for a mobile, resilient back.",
    photo: photos.barrel,
    href: "/about/studio#ladder-barrel",
  },
  {
    name: "GYROTONIC®",
    blurb: "Flowing, circular movement on the pulley tower — easy on the joints.",
    photo: photos.gyrotonic,
    href: "/about/studio#gyrotonic-pulley-tower",
  },
  {
    name: "Trapeze Table",
    blurb: "The classic Cadillac: supported, full-range work for every level.",
    photo: photos.trapezeTable,
    href: "/about/studio#trapeze-table",
  },
];

// Feather the blurred seam so its edges fade out instead of showing a line.
const seamFeather =
  "linear-gradient(to right, transparent, black 45%, black 55%, transparent)";

export function EquipmentShowcase() {
  // On touch devices there's no hover, so tapping a panel toggles its reveal.
  // `active` only drives the mobile/stacked layout; desktop still uses hover.
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-[color-mix(in_oklab,var(--brand-300),var(--brand-700)_25%)] py-20 sm:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Equipment & methods"
          title="Trained on the full studio"
          intro="From the reformer to the Cadillac — professional apparatus for every body and goal."
          className="[&_p:first-of-type]:text-brand-900"
        />
      </Container>

      {/* Full-bleed panel strip */}
      <div className="relative mt-14 flex w-full flex-col bg-black lg:h-[52vh] lg:flex-row">
        {equipment.map((item, i) => {
          const isOpen = active === i;
          return (
            <div
              key={item.name}
              onClick={() => setActive(isOpen ? null : i)}
              className="group relative h-56 cursor-pointer overflow-hidden lg:h-auto lg:flex-1 lg:cursor-default"
            >
              <Image
                src={item.photo.src}
                alt={item.photo.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 100vw"
                className={cn(
                  "object-cover grayscale brightness-90 transition-all duration-[1100ms] ease-out",
                  // Tap lifts the grayscale/dim...
                  isOpen && "grayscale-0 brightness-110",
                  // ...and so does hover.
                  "group-hover:grayscale-0 group-hover:brightness-110 motion-safe:group-hover:scale-105",
                )}
              />
              {/* Dark veil that lifts on tap or hover, so the machine 'glows out'. */}
              <div
                className={cn(
                  "absolute inset-0 bg-black/45 transition-colors duration-[1100ms] ease-out",
                  isOpen && "bg-black/15",
                  "group-hover:bg-black/15",
                )}
              />

              {/* Centered text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
                <h3
                  className={cn(
                    // Title is always visible; hover or tap replays its rise-in.
                    "font-serif text-2xl font-semibold text-white drop-shadow-lg sm:text-3xl",
                    isOpen &&
                      "motion-safe:animate-[equip-rise_0.6s_ease-out_0.05s_forwards]",
                    "motion-safe:group-hover:animate-[equip-rise_0.6s_ease-out_0.05s_forwards]",
                  )}
                >
                  {item.name}
                </h3>
                <p
                  className={cn(
                    // Detail is hidden until hover/tap, then rises in (staggered).
                    "mt-3 max-w-[17rem] text-base leading-relaxed text-white/90 drop-shadow motion-safe:opacity-0",
                    isOpen &&
                      "motion-safe:animate-[equip-rise_0.6s_ease-out_0.25s_forwards]",
                    "motion-safe:group-hover:animate-[equip-rise_0.6s_ease-out_0.25s_forwards]",
                  )}
                >
                  {item.blurb}
                </p>
                <Link
                  href={item.href}
                  onClick={(event) => event.stopPropagation()}
                  className={cn(
                    "mt-5 inline-flex translate-y-2 border-b border-white/70 pb-1 text-sm font-semibold uppercase tracking-[0.16em] text-white opacity-0 drop-shadow transition-all duration-500 hover:border-white focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                    isOpen && "translate-y-0 opacity-100",
                    "group-hover:translate-y-0 group-hover:opacity-100",
                  )}
                >
                  Learn more
                </Link>
              </div>
            </div>
          );
        })}

        {/* Softly blurred seams between panels (desktop row only) */}
        {[20, 40, 60, 80].map((left) => (
          <div
            key={left}
            aria-hidden
            style={{
              left: `${left}%`,
              WebkitMaskImage: seamFeather,
              maskImage: seamFeather,
            }}
            className="pointer-events-none absolute inset-y-0 hidden w-28 -translate-x-1/2 backdrop-blur-xl lg:block"
          />
        ))}
      </div>
    </section>
  );
}
