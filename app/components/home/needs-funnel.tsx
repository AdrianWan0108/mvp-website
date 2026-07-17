"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity, Heart, Dumbbell, Spline } from "lucide-react";
import { Container } from "../container";
import { cn } from "@/app/lib/cn";
import { photos } from "@/app/lib/images";

/**
 * "What brings you here?" funnel as a 4×2 grid. Each card sits beside its round
 * CTA; hovering a card makes the CTA dissolve in *behind* the card and slide
 * out horizontally into the neighbouring cell.
 *
 * Wired via named Tailwind peers — `peer/x` / `peer-hover/x:` are written
 * literally so the scanner generates them. `enter` is the hidden offset that
 * tucks the CTA behind the card; `reveal` resets it.
 */
const needs = [
  {
    icon: Activity,
    title: "Rehab & recovery",
    body: "Rebuild strength and move freely after injury or pain.",
    href: "/classes?need=rehab",
    photo: photos.dorothyPose,
    peer: "peer/rehab",
    enter: "-translate-x-full", // CTA sits to the right of the card → emerge rightward
    arrow: "→",
    reveal:
      "peer-hover/rehab:translate-x-0 peer-hover/rehab:scale-100 peer-hover/rehab:opacity-100",
  },
  {
    icon: Heart,
    title: "Pre & postnatal",
    body: "Supportive sessions for every stage of pregnancy and recovery.",
    href: "/classes?need=prenatal",
    photo: photos.privateSession,
    peer: "peer/prenatal",
    enter: "translate-x-full", // CTA sits to the left of the card → emerge leftward
    arrow: "←",
    reveal:
      "peer-hover/prenatal:translate-x-0 peer-hover/prenatal:scale-100 peer-hover/prenatal:opacity-100",
  },
  {
    icon: Dumbbell,
    title: "Strength & conditioning",
    body: "Low-impact reformer training that builds full-body strength.",
    href: "/classes?need=strength",
    photo: photos.reformer,
    peer: "peer/strength",
    enter: "-translate-x-full",
    arrow: "→",
    reveal:
      "peer-hover/strength:translate-x-0 peer-hover/strength:scale-100 peer-hover/strength:opacity-100",
  },
  {
    icon: Spline,
    title: "Posture & alignment",
    body: "Mindful movement for mobility, balance, and alignment.",
    href: "/classes?need=alignment",
    photo: photos.spineFigure,
    peer: "peer/alignment",
    enter: "translate-x-full",
    arrow: "←",
    reveal:
      "peer-hover/alignment:translate-x-0 peer-hover/alignment:scale-100 peer-hover/alignment:opacity-100",
  },
];

// Fade in first (behind the card), then slide out from behind it. Tailwind v4
// uses the native translate/scale properties, so they must be listed too.
const ctaTransition = [
  "opacity 300ms ease",
  "transform 650ms cubic-bezier(0.22,1,0.36,1) 220ms",
  "translate 650ms cubic-bezier(0.22,1,0.36,1) 220ms",
  "scale 650ms cubic-bezier(0.22,1,0.36,1) 220ms",
].join(", ");

function NeedCard({
  need,
  className,
}: {
  need: (typeof needs)[number];
  className?: string;
}) {
  const Icon = need.icon;
  return (
    <Link
      href={need.href}
      className={cn(
        "group relative z-10 block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        need.peer,
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
        <Image
          src={need.photo.src}
          alt={need.photo.alt}
          fill
          sizes="(min-width: 1024px) 22vw, 45vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-center gap-2 text-primary">
        <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
        <h3 className="font-serif text-xl font-bold uppercase tracking-[0.06em] text-foreground sm:text-2xl">
          {need.title}
        </h3>
      </div>
      <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
        {need.body}
      </p>
    </Link>
  );
}

/**
 * Round CTA. Hidden + tucked behind the card by default; the matching card's
 * peer-hover (or hovering/focusing the CTA itself) reveals + slides it out.
 * Desktop only.
 */
function NeedCta({
  need,
  active,
  className,
}: {
  need: (typeof needs)[number];
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      style={{ transition: ctaTransition }}
      className={cn(
        "relative z-0 hidden scale-90 items-center justify-center opacity-0 lg:flex lg:aspect-[4/3]",
        need.enter,
        need.reveal,
        "hover:translate-x-0 hover:scale-100 hover:opacity-100 focus-within:translate-x-0 focus-within:scale-100 focus-within:opacity-100",
        // Idle auto-loop: reveal this CTA without a hover (desktop only).
        active && "lg:translate-x-0 lg:scale-100 lg:opacity-100",
        className,
      )}
    >
      <Link
        href={need.href}
        className="grid h-32 w-32 place-items-center rounded-full bg-primary text-center text-base font-semibold leading-tight text-primary-foreground outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:h-40 lg:w-40"
      >
        Explore
        <br />
        {need.arrow}
      </Link>
    </div>
  );
}

// Visual left-to-right order for the idle loop, as indices into `needs`:
// Rehab → Strength → Posture → Pre & postnatal, then repeat.
const loopOrder = [0, 2, 3, 1];
const loopInterval = 1200; // ms each CTA stays revealed before the next takes over

export function NeedsFunnel() {
  // Index into `needs` of the CTA currently auto-revealed (null = none).
  const [activeNeed, setActiveNeed] = useState<number | null>(null);
  // Pauses the loop while the cursor is anywhere over the grid.
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      setActiveNeed(null);
      return;
    }
    // Respect reduced-motion: leave the CTAs to hover-only behaviour.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let step = 0;
    const advance = () => {
      setActiveNeed(loopOrder[step % loopOrder.length]);
      step += 1;
    };
    advance();
    const id = window.setInterval(advance, loopInterval);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="pt-10 pb-20 sm:pt-12 sm:pb-24">
      <Container size="wider">
        {/* Enlarged, section-specific heading (bigger than the shared
            SectionHeading) so this near-full-bleed section carries weight. */}
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Start with your goal
          </p>
          <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            What brings you to the studio?
          </h2>
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            Whatever your body needs, we’ll match you with the right classes and
            sessions.
          </p>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-12 grid grid-cols-2 items-start gap-6 sm:gap-8 lg:grid-cols-4"
        >
          {/* Each card is immediately followed in the DOM by its CTA so the
              named peer-hover reaches it. Grid placement sets the visual order. */}
          <NeedCard need={needs[0]} className="lg:col-start-1 lg:row-start-1" />
          <NeedCta
            need={needs[0]}
            active={activeNeed === 0}
            className="lg:col-start-2 lg:row-start-1"
          />

          <NeedCard need={needs[1]} className="lg:col-start-2 lg:row-start-2" />
          <NeedCta
            need={needs[1]}
            active={activeNeed === 1}
            className="lg:col-start-1 lg:row-start-2"
          />

          <NeedCard need={needs[2]} className="lg:col-start-3 lg:row-start-1" />
          <NeedCta
            need={needs[2]}
            active={activeNeed === 2}
            className="lg:col-start-4 lg:row-start-1"
          />

          <NeedCard need={needs[3]} className="lg:col-start-4 lg:row-start-2" />
          <NeedCta
            need={needs[3]}
            active={activeNeed === 3}
            className="lg:col-start-3 lg:row-start-2"
          />
        </div>
      </Container>
    </section>
  );
}
