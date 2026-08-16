"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function TimelineReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rail = root.querySelector<HTMLElement>("[data-timeline-rail]");
    const events = Array.from(
      root.querySelectorAll<HTMLElement>("[data-timeline-event]"),
    );
    if (!rail || events.length === 0) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window) ||
      !("animate" in Element.prototype)
    ) {
      return;
    }

    const travel = window.matchMedia("(min-width: 640px)").matches ? 48 : 24;
    const animations: Animation[] = [];

    rail.style.opacity = "0";
    rail.style.transform = "scaleY(0)";
    rail.style.transformOrigin = "top";

    for (const event of events) {
      const media = event.querySelector<HTMLElement>("[data-timeline-media]");
      const copy = event.querySelector<HTMLElement>("[data-timeline-copy]");
      const dots = event.querySelectorAll<HTMLElement>("[data-timeline-dot]");

      if (media) {
        media.style.opacity = "0";
        media.style.transform = `translate3d(-${travel}px, 0, 0)`;
      }
      if (copy) {
        copy.style.opacity = "0";
        copy.style.transform = `translate3d(${travel}px, 0, 0)`;
      }
      dots.forEach((dot) => {
        dot.style.opacity = "0";
        dot.style.transform = "scale(0.6)";
      });
    }

    const railObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        railObserver.disconnect();

        const animation = rail.animate(
          [
            { opacity: 0, transform: "scaleY(0)" },
            { opacity: 1, transform: "scaleY(1)" },
          ],
          {
            duration: 1400,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          },
        );
        animations.push(animation);
        animation.finished
          .then(() => {
            rail.style.opacity = "1";
            rail.style.transform = "none";
          })
          .catch(() => {
            // Animation promises reject when cancelled during unmount.
          });
      },
      { threshold: 0.08, rootMargin: "0px 0px -22% 0px" },
    );

    const eventObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const event = entry.target as HTMLElement;
          eventObserver.unobserve(event);
          const media = event.querySelector<HTMLElement>(
            "[data-timeline-media]",
          );
          const copy = event.querySelector<HTMLElement>(
            "[data-timeline-copy]",
          );
          const dots = event.querySelectorAll<HTMLElement>(
            "[data-timeline-dot]",
          );

          if (media) {
            const animation = media.animate(
              [
                {
                  opacity: 0,
                  transform: `translate3d(-${travel}px, 0, 0)`,
                },
                { opacity: 1, transform: "translate3d(0, 0, 0)" },
              ],
              {
                duration: 850,
                delay: 260,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards",
              },
            );
            animations.push(animation);
            animation.finished
              .then(() => {
                media.style.opacity = "1";
                media.style.transform = "none";
              })
              .catch(() => {});
          }

          if (copy) {
            const animation = copy.animate(
              [
                {
                  opacity: 0,
                  transform: `translate3d(${travel}px, 0, 0)`,
                },
                { opacity: 1, transform: "translate3d(0, 0, 0)" },
              ],
              {
                duration: 850,
                delay: 380,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards",
              },
            );
            animations.push(animation);
            animation.finished
              .then(() => {
                copy.style.opacity = "1";
                copy.style.transform = "none";
              })
              .catch(() => {});
          }

          dots.forEach((dot) => {
            const animation = dot.animate(
              [
                { opacity: 0, transform: "scale(0.6)" },
                { opacity: 1, transform: "scale(1)" },
              ],
              {
                duration: 450,
                delay: 300,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards",
              },
            );
            animations.push(animation);
            animation.finished
              .then(() => {
                dot.style.opacity = "1";
                dot.style.transform = "none";
              })
              .catch(() => {});
          });
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" },
    );

    railObserver.observe(root);
    events.forEach((event) => eventObserver.observe(event));

    return () => {
      railObserver.disconnect();
      eventObserver.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <div ref={rootRef} className="relative mt-10 overflow-x-clip sm:mt-14">
      {children}
    </div>
  );
}
