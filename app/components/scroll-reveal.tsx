"use client";

import { type ReactNode, useEffect, useRef } from "react";

const revealEasing = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Fades + rises children marked with `data-reveal` into place as the
 * wrapper scrolls into view. Mirrors the reveal pattern used elsewhere on
 * the site (e.g. `StoriesReveal`, `EquipmentShowcase`), generalised so any
 * section can opt individual elements in via the `data-reveal` attribute.
 */
export function ScrollReveal({
  children,
  stagger = 120,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (targets.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (
      reducedMotion ||
      !("IntersectionObserver" in window) ||
      typeof targets[0].animate !== "function"
    ) {
      return;
    }

    targets.forEach((target) => {
      target.style.opacity = "0";
      target.style.transform = "translate3d(0, 36px, 0)";
    });

    let animations: Animation[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        animations = targets.map((target, index) =>
          target.animate(
            [
              { opacity: 0, transform: "translate3d(0, 36px, 0)" },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 700,
              delay: index * stagger,
              easing: revealEasing,
              fill: "forwards",
            },
          ),
        );
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [stagger]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
