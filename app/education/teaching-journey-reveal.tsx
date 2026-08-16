"use client";

import { useEffect, useRef, type ReactNode } from "react";

const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

export function TeachingJourneyReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const instructor = root.querySelector<HTMLElement>(
      "[data-journey-instructor]",
    );
    const center = root.querySelector<HTMLElement>("[data-journey-center]");
    const educator = root.querySelector<HTMLElement>("[data-journey-educator]");
    if (!instructor || !center || !educator) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window) ||
      !("animate" in Element.prototype)
    ) {
      return;
    }

    const animations: Animation[] = [];
    const observers: IntersectionObserver[] = [];

    const remember = (animation: Animation, element: HTMLElement) => {
      animations.push(animation);
      animation.finished
        .then(() => {
          element.style.opacity = "1";
          element.style.transform = "none";
          element.style.willChange = "auto";
        })
        .catch(() => {
          // Animation promises reject when cancelled during unmount.
        });
    };

    if (window.matchMedia("(min-width: 1280px)").matches) {
      instructor.style.transform = "translate3d(-100vw, 0, 0)";
      instructor.style.willChange = "transform";
      educator.style.transform = "translate3d(100vw, 0, 0)";
      educator.style.willChange = "transform";
      center.style.opacity = "0";
      center.style.transform = "translate3d(0, 24px, 0) scale(0.92)";
      center.style.transformOrigin = "center";
      center.style.willChange = "opacity, transform";

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          remember(
            instructor.animate(
              [
                { transform: "translate3d(-100vw, 0, 0)" },
                { transform: "translate3d(0, 0, 0)" },
              ],
              { duration: 1100, easing, fill: "forwards" },
            ),
            instructor,
          );
          remember(
            educator.animate(
              [
                { transform: "translate3d(100vw, 0, 0)" },
                { transform: "translate3d(0, 0, 0)" },
              ],
              { duration: 1100, easing, fill: "forwards" },
            ),
            educator,
          );
          remember(
            center.animate(
              [
                {
                  opacity: 0,
                  transform: "translate3d(0, 24px, 0) scale(0.92)",
                },
                {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0) scale(1)",
                },
              ],
              {
                duration: 850,
                delay: 700,
                easing,
                fill: "forwards",
              },
            ),
            center,
          );
        },
        { threshold: 0.05, rootMargin: "0px 0px -25% 0px" },
      );

      observer.observe(root);
      observers.push(observer);
    } else {
      const stages = [instructor, center, educator];

      stages.forEach((stage) => {
        stage.style.opacity = "0";
        stage.style.transform = "translate3d(0, 48px, 0)";
        stage.style.willChange = "opacity, transform";
      });

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            const stage = entry.target as HTMLElement;
            observer.unobserve(stage);
            remember(
              stage.animate(
                [
                  { opacity: 0, transform: "translate3d(0, 48px, 0)" },
                  { opacity: 1, transform: "translate3d(0, 0, 0)" },
                ],
                { duration: 800, easing, fill: "forwards" },
              ),
              stage,
            );
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -15% 0px" },
      );

      stages.forEach((stage) => observer.observe(stage));
      observers.push(observer);
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <div ref={rootRef} className="grid xl:grid-cols-2">
      {children}
    </div>
  );
}
