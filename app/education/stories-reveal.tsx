"use client";

import { type ReactNode, useEffect, useRef } from "react";

type StoriesRevealProps = {
  children: ReactNode;
};

const revealEasing = "cubic-bezier(0.22, 1, 0.36, 1)";

export function StoriesReveal({ children }: StoriesRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const heading = root.querySelector<HTMLElement>("[data-stories-heading]");
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-story-entry]"),
    );
    if (!heading || cards.length === 0) return;

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

    const targets = [heading, ...cards];
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
              delay: index === 0 ? 0 : 160 + (index - 1) * 120,
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
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
