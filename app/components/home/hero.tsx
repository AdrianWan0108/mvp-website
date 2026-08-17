import Image from "next/image";
import { CtaButton } from "../cta-button";
import { photos } from "@/app/lib/images";

/**
 * Glowing light-green accent point with a label, anchored over the hero image.
 *
 * `flip` puts the label on the left of the dot — pair it with a `right-[…]`
 * offset (not `left-[…]`) so the offset still lands on the dot, which sits at
 * the container's right edge once the row is reversed. Used for points near the
 * right edge so the label doesn't run off the image.
 */
function GlowPoint({
  label,
  className,
  flip = false,
}: {
  label: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`hero-point-enter absolute flex items-center gap-2.5 ${
        flip ? "flex-row-reverse" : ""
      } ${className ?? ""}`}
    >
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-hero-ping rounded-full bg-brand-300 opacity-80" />
        <span className="absolute inline-flex h-full w-full animate-hero-ping rounded-full bg-brand-300 opacity-60 [animation-delay:0.9s]" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-300 shadow-[0_0_16px_6px_rgba(145,208,175,0.95)]" />
      </span>
      <span className="whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-md sm:text-sm">
        {label}
      </span>
    </div>
  );
}

/** Shared headline + CTA copy, used by both layouts. */
function HeroCopy() {
  return (
    <div className="max-w-xl">
      <h1 className="hero-enter font-serif text-5xl font-semibold leading-[1.05] [animation-delay:80ms] sm:text-6xl lg:text-7xl">
        Smart movement for a stronger, healthier you
      </h1>
      {/* The Markham · Ontario locality moved here from the eyebrow — same
          keyword for local SEO, read as a sentence instead of a label. */}
      <p className="hero-enter mt-6 max-w-xl text-xl leading-relaxed text-white/80 [animation-delay:240ms]">
        State-of-the-art Pilates &amp; GYROTONIC&reg; in Markham, Ontario,
        taught by a Polestar-certified team. Group classes, private sessions,
        and rehab-informed movement for every body.
      </p>

      {/* Primary CTAs — the two decisions a first-time visitor makes:
          when to come in, and what it costs. */}
      <div className="hero-enter mt-9 flex flex-col gap-3 [animation-delay:380ms] sm:flex-row sm:items-center">
        <CtaButton href="/schedule" size="lg" square className="shrink-0">
          View Schedule
        </CtaButton>
        <CtaButton
          href="/pricing"
          size="lg"
          variant="inverse"
          square
          className="shrink-0"
        >
          View Pricing
        </CtaButton>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    // The negative margin pulls the section up under the transparent site
    // header so the background image runs behind it. It has to match the
    // header's un-scrolled height exactly (h-20 / lg:h-24) — pulling up any
    // less leaves a strip of page background showing above the hero.
    <section className="relative isolate -mt-20 overflow-hidden bg-brand-900 text-white lg:-mt-24">
      {/* ---- Desktop (lg+): original full-bleed image with copy overlaid ---- */}
      <div className="relative hidden min-h-screen items-center lg:flex">
        {/* Full-bleed hero image. The retouched shot is framed 16:9 with the
            whole figure in frame, so it's centred rather than pulled upward
            the way the original crop needed. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={photos.heroBg.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-image-enter object-cover object-center"
          />
          {/* Left-weighted scrim for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/55 to-brand-900/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/45 via-transparent to-transparent" />
        </div>

        {/* Glowing points on the instructor (hips · feet · head). Percentages
            are tuned against the centred crop of the 1672×941 shot on a
            widescreen viewport, so keep them in sync if that crop changes.
            They light up in sequence, after the copy has landed. */}
        <GlowPoint
          label="Control"
          className="left-[77.5%] top-[44.5%] [animation-delay:700ms]"
        />
        <GlowPoint
          label="Mobility"
          className="left-[64.5%] top-[61%] [animation-delay:850ms]"
        />
        <GlowPoint
          label="Balance"
          flip
          className="right-[17%] top-[82%] [animation-delay:1000ms]"
        />

        {/* Copy sits hard against the left edge so it clears the instructor. */}
        <div className="relative mx-auto w-full max-w-[110rem] px-5 pt-24 pb-16 sm:px-8">
          <HeroCopy />
        </div>
      </div>

      {/* ---- Mobile (below lg): full-bleed image, Gary centered, no dots ---- */}
      <div className="relative flex min-h-[680px] items-center lg:hidden">
        {/* Full-bleed background. object-[78%_center] shifts the wide image's
            crop so the instructor sits centered on a narrow screen. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={photos.heroBg.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-image-enter object-cover object-[78%_center]"
          />
          {/* Overlay for text legibility over the photo. */}
          <div className="absolute inset-0 bg-brand-900/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/35 to-brand-900/45" />
        </div>

        <div className="relative mx-auto w-full max-w-[110rem] px-5 pt-24 pb-16 sm:px-8">
          <HeroCopy />
        </div>
      </div>
    </section>
  );
}
