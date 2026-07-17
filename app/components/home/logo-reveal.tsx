"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../container";
import { photos, mvpLogoReveal } from "@/app/lib/images";

/**
 * MVP logo as a window into the studio. The logo sits as a flat tone by
 * default; hovering one of its shapes turns *that shape* into a window onto the
 * reformer studio photo — the photo is revealed through the shape via a CSS
 * mask. Each shape is its own registered mask (see scripts/gen-logo-shapes.mjs),
 * so the reveals are per-shape, and the photo reads as one continuous image
 * sitting behind the whole logo.
 */
export function LogoReveal() {
  const [active, setActive] = useState<number | null>(null);
  // Shapes revealed by the scroll-triggered sweep (independent of hover).
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const logoRef = useRef<HTMLDivElement | null>(null);
  const photoSrc = photos.studioReformerFloor.src;
  const { aspect, fullMask, shapes } = mvpLogoReveal;

  // When the logo scrolls fully into view, sweep a photo "wave" across its
  // shapes left→right, then reset to the flat logo. Replays each re-entry.
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let sweeping = false;
    const timers: number[] = [];

    const runSweep = () => {
      if (sweeping) return;
      sweeping = true;
      const step = 140; // ms between each shape lighting up
      shapes.forEach((_, i) => {
        timers.push(
          window.setTimeout(() => {
            setRevealed((prev) => new Set(prev).add(i));
          }, i * step),
        );
      });
      // After the last shape, hold briefly, then return to the flat logo.
      timers.push(
        window.setTimeout(
          () => {
            setRevealed(new Set());
            sweeping = false;
          },
          shapes.length * step + 400,
        ),
      );
    };

    // threshold:1 is unreliable (subpixel rounding rarely hits exactly 1.0),
    // so fire once the logo is almost fully in view. Crossing back below the
    // ratio and in again re-arms the sweep, so it replays on each re-entry.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.9) runSweep();
      },
      { threshold: [0, 0.9, 1] },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [shapes]);

  return (
    <section className="relative isolate overflow-hidden bg-background py-14 sm:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Step inside
        </p>

        {/* The logo, sized to its own aspect ratio so every mask registers. */}
        <div
          ref={logoRef}
          role="img"
          aria-label={mvpLogoReveal.alt}
          className="relative w-full max-w-4xl"
          style={{ aspectRatio: String(aspect) }}
        >
          {/* Base: the logo as a flat, on-brand tone (default state). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundColor: "var(--brand-300)",
              WebkitMaskImage: `url(${fullMask})`,
              maskImage: `url(${fullMask})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />

          {/* Per-shape photo windows — one continuous photo, masked per shape,
              each fading in only while its column is hovered. */}
          {shapes.map((shape, i) => (
            <div
              key={shape.mask}
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${photoSrc})`,
                WebkitMaskImage: `url(${shape.mask})`,
                maskImage: `url(${shape.mask})`,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                opacity: active === i || revealed.has(i) ? 1 : 0,
                transition: "opacity 450ms ease",
              }}
            />
          ))}

          {/* Hover columns — one per shape, centred on it; hovering anywhere in
              a shape's column reveals that shape (same idea as core-values). */}
          <div className="absolute inset-0">
            {shapes.map((shape, i) => (
              <button
                key={shape.mask}
                type="button"
                aria-label={`Reveal logo shape ${i + 1}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="absolute top-0 bottom-0 cursor-default"
                style={{ left: `${shape.left}%`, width: `${shape.width}%` }}
              />
            ))}
          </div>
        </div>

        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Hover the logo — each shape opens a window into our reformer studio.
        </p>
      </Container>
    </section>
  );
}
