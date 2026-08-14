"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/app/lib/cn";

export function RoomReveal({
  collage,
  explanation,
  mediaRight = false,
}: {
  collage: ReactNode;
  explanation: ReactNode;
  mediaRight?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const collageRef = useRef<HTMLDivElement | null>(null);
  const explanationRef = useRef<HTMLDivElement | null>(null);

  const collageStart = mediaRight
    ? "translate3d(110vw, 0, 0)"
    : "translate3d(-110vw, 0, 0)";
  const explanationStart = mediaRight
    ? "translate3d(-110vw, 0, 0)"
    : "translate3d(110vw, 0, 0)";

  useEffect(() => {
    const root = rootRef.current;
    const collageElement = collageRef.current;
    const explanationElement = explanationRef.current;
    if (!root || !collageElement || !explanationElement) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      collageElement.style.transform = "none";
      explanationElement.style.transform = "none";
      return;
    }

    let animations: Animation[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        animations = [
          collageElement.animate(
            [
              { transform: collageStart },
              { transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 1400,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          ),
          explanationElement.animate(
            [
              { transform: explanationStart },
              { transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 1400,
              delay: 120,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          ),
        ];

        Promise.all(animations.map((animation) => animation.finished))
          .then(() => {
            collageElement.style.transform = "none";
            explanationElement.style.transform = "none";
            collageElement.style.willChange = "auto";
            explanationElement.style.willChange = "auto";
          })
          .catch(() => {
            // An animation rejects when it is cancelled during unmount.
          });
      },
      { threshold: 0.01, rootMargin: "0px 0px 22% 0px" },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [collageStart, explanationStart]);

  return (
    <div
      ref={rootRef}
      className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(25rem,0.82fr)] lg:gap-16"
    >
      <div
        ref={collageRef}
        style={{ transform: collageStart, willChange: "transform" }}
        className={cn(
          "motion-reduce:transform-none",
          mediaRight && "lg:order-2",
        )}
      >
        {collage}
      </div>
      <div
        ref={explanationRef}
        style={{ transform: explanationStart, willChange: "transform" }}
        className={cn(
          "motion-reduce:transform-none",
          mediaRight && "lg:order-1",
        )}
      >
        {explanation}
      </div>
    </div>
  );
}
