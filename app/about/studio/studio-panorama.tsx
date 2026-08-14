"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { photos } from "@/app/lib/images";

/** A pronounced, reduced-motion-aware parallax view into the reformer room. */
export function StudioPanorama() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const movingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const moving = movingRef.current;
    if (!frame || !moving) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotion.matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (viewport - rect.top) / (viewport + rect.height)),
      );
      const offset = (progress - 0.5) * 260;
      moving.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative h-[46vh] min-h-[22rem] overflow-hidden bg-brand-900 sm:h-[56vh] lg:min-h-[32rem]"
    >
      <div
        ref={movingRef}
        className="absolute -inset-y-40 inset-x-0 will-change-transform motion-reduce:transform-none"
      >
        <Image
          src={photos.studioReformerFloor.src}
          alt={photos.studioReformerFloor.alt}
          fill
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-brand-900/10 via-transparent to-brand-900/25"
      />
    </div>
  );
}
