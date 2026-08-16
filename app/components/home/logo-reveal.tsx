"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../container";
import { photos, mvpLogoReveal } from "@/app/lib/images";
import { cn } from "@/app/lib/cn";

/** The approved primary lockup becomes a window into the Reformer studio. */
export function LogoReveal() {
  const [inView, setInView] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const { aspect, mask } = mvpLogoReveal;
  const revealed = inView || interacting;

  useEffect(() => {
    const element = logoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.55) setInView(true);
        if (entry.intersectionRatio < 0.15) setInView(false);
      },
      { threshold: [0, 0.15, 0.55, 1] },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const maskStyles = {
    WebkitMaskImage: `url(${mask})`,
    maskImage: `url(${mask})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };

  return (
    <section className="relative isolate overflow-hidden bg-background py-16 sm:py-24">
      <Container className="flex flex-col items-center gap-7 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Step inside
        </p>

        <div
          ref={logoRef}
          role="img"
          aria-label={mvpLogoReveal.alt}
          className="relative w-full max-w-4xl overflow-hidden"
          style={{ aspectRatio: String(aspect) }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-brand-400"
            style={maskStyles}
          />

          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 bg-cover bg-center transition-[clip-path,filter] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              revealed ? "brightness-100" : "brightness-90",
            )}
            style={{
              ...maskStyles,
              backgroundImage: `url(${photos.studioReformerFloor.src})`,
              clipPath: revealed
                ? "inset(0 0 0 0)"
                : "inset(0 100% 0 0)",
            }}
          />

          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-[3%] w-px bg-white/80 shadow-[0_0_18px_5px_rgba(255,255,255,0.35)] transition-[left,opacity] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:hidden",
              revealed ? "left-full opacity-0" : "left-0 opacity-0",
            )}
          />

          <button
            type="button"
            aria-label="Reveal the studio through the Motion Vitality Pilates logo"
            onMouseEnter={() => setInteracting(true)}
            onMouseLeave={() => setInteracting(false)}
            onFocus={() => setInteracting(true)}
            onBlur={() => setInteracting(false)}
            className="absolute inset-0 cursor-default rounded-sm focus-visible:outline-offset-4"
          />
        </div>

        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Hover the logo — the studio moves through every part of our identity.
        </p>
      </Container>
    </section>
  );
}
