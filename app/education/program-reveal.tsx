"use client";

import { type ReactNode, useEffect, useRef } from "react";

type ProgramRevealProps = {
  children: ReactNode;
};

const revealEasing = "cubic-bezier(0.22, 1, 0.36, 1)";

export function ProgramReveal({ children }: ProgramRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const copy = root.querySelector<HTMLElement>("[data-program-copy]");
    const media = root.querySelector<HTMLElement>("[data-program-media]");
    const cta = root.querySelector<HTMLElement>("[data-program-cta]");
    const facts = root.querySelector<HTMLElement>("[data-program-facts]");
    if (!copy || !media || !cta || !facts) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (
      reducedMotion ||
      !("IntersectionObserver" in window) ||
      typeof copy.animate !== "function"
    ) {
      return;
    }

    const targets = [copy, media, cta, facts];
    targets.forEach((target) => {
      target.style.opacity = "0";
    });
    copy.style.transform = "translate3d(-48px, 0, 0)";
    media.style.transform = "translate3d(48px, 0, 0) scale(0.985)";
    cta.style.transform = "translate3d(0, 24px, 0)";
    facts.style.transform = "translate3d(0, 32px, 0) scale(0.97)";

    let animations: Animation[] = [];
    let isIntersecting = false;
    let hasScrolled = window.scrollY > 4;
    let hasRevealed = false;

    const reveal = () => {
      if (hasRevealed || !hasScrolled || !isIntersecting) return;
      hasRevealed = true;
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);

      animations = [
          copy.animate(
            [
              { opacity: 0, transform: "translate3d(-48px, 0, 0)" },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            { duration: 900, easing: revealEasing, fill: "forwards" },
          ),
          media.animate(
            [
              {
                opacity: 0,
                transform: "translate3d(48px, 0, 0) scale(0.985)",
              },
              { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
            ],
            { duration: 950, easing: revealEasing, fill: "forwards" },
          ),
          cta.animate(
            [
              { opacity: 0, transform: "translate3d(0, 24px, 0)" },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 650,
              delay: 560,
              easing: revealEasing,
              fill: "forwards",
            },
          ),
          facts.animate(
            [
              {
                opacity: 0,
                transform: "translate3d(0, 32px, 0) scale(0.97)",
              },
              { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
            ],
            {
              duration: 750,
              delay: 520,
              easing: revealEasing,
              fill: "forwards",
            },
          ),
      ];
    };

    function handleScroll() {
      hasScrolled = true;
      reveal();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        reveal();
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(root);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <div ref={rootRef} className="overflow-hidden">
      {children}
    </div>
  );
}
