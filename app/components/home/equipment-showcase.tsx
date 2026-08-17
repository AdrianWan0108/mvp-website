"use client";

import { useEffect, useRef, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-equip-heading]");
    const panels = Array.from(
      section.querySelectorAll<HTMLElement>("[data-equip-panel]"),
    );

    if (!heading || panels.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window) ||
      typeof heading.animate !== "function"
    ) {
      return;
    }

    heading.style.opacity = "0";
    heading.style.transform = "translate3d(0, 28px, 0)";
    panels.forEach((panel) => {
      panel.style.opacity = "0";
      panel.style.transform = "translate3d(0, 36px, 0)";
    });

    let animations: Animation[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        animations = [
          heading.animate(
            [
              { opacity: 0, transform: "translate3d(0, 28px, 0)" },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 700,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          ),
          ...panels.map((panel, index) =>
            panel.animate(
              [
                { opacity: 0, transform: "translate3d(0, 36px, 0)" },
                { opacity: 1, transform: "translate3d(0, 0, 0)" },
              ],
              {
                duration: 700,
                delay: 220 + index * 90,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards",
              },
            ),
          ),
        ];
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-500 pt-20 text-white sm:pt-24"
    >
      <Container>
        <div data-equip-heading>
          <SectionHeading
            align="center"
            title="Our Equipment"
            intro="Reformer, Konnector®, Ladder Barrel, GYROTONIC®, and Trapeze Table — a full studio of professional apparatus for every body and goal."
            className="[&_p:first-of-type]:text-white"
          />
        </div>
      </Container>

      {/* Full-bleed panel strip. Flush with the section's bottom edge (no
          bottom padding on the section) so the brand background doesn't
          bleed past the images. */}
      <div className="relative mt-14 flex w-full flex-col bg-black lg:h-[52vh] lg:flex-row">
        {equipment.map((item, i) => {
          const isOpen = active === i;
          return (
            <div
              key={item.name}
              data-equip-panel
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
