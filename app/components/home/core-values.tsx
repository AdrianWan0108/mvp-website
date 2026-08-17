"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { brandLogos } from "@/app/lib/images";
import { CoreValuesVideo } from "./core-values-video";

/**
 * Scattered across the script mark rather than listed. Positions are authored
 * by hand — literal randomness would shift on every load and desync between
 * server and client render. At lg the whole heading+values block overlays the
 * mark directly, so these spread across its full width/height rather than
 * being confined to a column beside it.
 */
const values = [
  {
    title: "Collaboration",
    position: "left-[5%] top-0 sm:left-[8%] lg:left-0 lg:top-[6%]",
  },
  {
    title: "Humility",
    position:
      "right-[9%] top-[24%] sm:right-[13%] lg:right-[20%] lg:top-[26%]",
  },
  {
    title: "Accountability",
    position: "left-0 top-[53%] sm:left-[2%] lg:left-[6%] lg:top-[58%]",
  },
  {
    title: "Innovation",
    position:
      "bottom-0 right-[4%] sm:right-[7%] lg:right-[22%] lg:bottom-0",
  },
];

export function CoreValues() {
  const sectionRef = useRef<HTMLElement>(null);
  /** Gates the video's muted preview until the entry animation has landed. */
  const [revealDone, setRevealDone] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mark = section.querySelector<HTMLElement>("[data-values-mark]");
    const heading = section.querySelector<HTMLElement>("[data-values-heading]");
    const video = section.querySelector<HTMLElement>("[data-values-video]");
    const valueItems = Array.from(
      section.querySelectorAll<HTMLElement>("[data-values-item]"),
    );

    if (!mark || !heading || !video || valueItems.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window) ||
      typeof mark.animate !== "function"
    ) {
      // No reveal to wait on — let the video decide for itself whether to play.
      setRevealDone(true);
      return;
    }

    mark.style.opacity = "0";
    mark.style.transform = "translate3d(-72px, 72px, 0) scale(0.94)";
    heading.style.opacity = "0";
    heading.style.transform = "translate3d(0, 34px, 0)";
    video.style.opacity = "0";
    video.style.transform = "translate3d(48px, 0, 0) scale(0.985)";
    valueItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translate3d(0, 28px, 0)";
    });

    let animations: Animation[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        animations = [
          mark.animate(
            [
              {
                opacity: 0,
                transform: "translate3d(-72px, 72px, 0) scale(0.94)",
              },
              {
                opacity: 1,
                transform: "translate3d(0, 0, 0) scale(1)",
              },
            ],
            {
              duration: 1100,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          ),
          heading.animate(
            [
              { opacity: 0, transform: "translate3d(0, 34px, 0)" },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 700,
              delay: 160,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          ),
          video.animate(
            [
              {
                opacity: 0,
                transform: "translate3d(48px, 0, 0) scale(0.985)",
              },
              { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
            ],
            {
              duration: 900,
              delay: 240,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          ),
          ...valueItems.map((item, index) =>
            item.animate(
              [
                { opacity: 0, transform: "translate3d(0, 28px, 0)" },
                { opacity: 1, transform: "translate3d(0, 0, 0)" },
              ],
              {
                duration: 620,
                delay: 320 + index * 105,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards",
              },
            ),
          ),
        ];

        void Promise.all(animations.map((a) => a.finished)).then(
          () => setRevealDone(true),
          () => setRevealDone(true),
        );
      },
      { threshold: 0.22, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <section
      id="core-values"
      ref={sectionRef}
      className="relative isolate min-h-[44rem] overflow-hidden bg-brand-50 py-20 sm:min-h-[50rem] sm:py-24 lg:min-h-[54rem] lg:py-28"
    >
      <div
        data-values-mark
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[3%] -left-[43%] z-0 w-[128%] sm:-bottom-[8%] sm:-left-[25%] sm:w-[100%] lg:-bottom-[10%] lg:-left-[16%] lg:w-[74%]"
      >
        <Image
          src={brandLogos.scriptMark.verdant}
          alt=""
          width={1200}
          height={1200}
          sizes="(min-width: 1024px) 74vw, (min-width: 640px) 100vw, 128vw"
          className="h-auto w-full"
        />
      </div>

      {/*
        Wider than the site's usual max-w-7xl Container (matches the
        breakout wrapper pricing-gateway.tsx uses) — on large monitors the
        centered 7xl left huge unused side margins, which is exactly the
        room the heading/values needed to shift into. Holds only the text;
        the video is a separate section-level sibling below so its own
        right-0 anchor reaches the true viewport edge instead of stopping at
        this wrapper's padding.
      */}
      <div className="relative z-10 mx-auto w-full max-w-[110rem] px-5 sm:px-8">
        {/*
          At lg the heading+values sit directly on top of the script mark
          (absolute, no grid track) so the video isn't sharing horizontal
          space with them and can run wider.
        */}
        <div className="mx-auto w-full max-w-2xl lg:absolute lg:left-8 lg:top-0 lg:mx-0 lg:w-[34rem] xl:w-[44rem] 2xl:w-[50rem]">
          <h2
            data-values-heading
            className="ml-[3%] text-balance font-serif text-5xl font-semibold leading-[1.05] text-brand-900 sm:ml-[10%] sm:text-6xl lg:ml-0 lg:text-7xl"
          >
            Our core values
          </h2>

          <ul className="relative mt-12 h-[19rem] sm:mt-14 sm:h-[22rem] lg:mt-16 lg:h-[26rem]">
            {values.map((value) => (
              <li
                key={value.title}
                data-values-item
                className={`absolute font-serif text-3xl font-normal uppercase tracking-[0.08em] text-brand-800 sm:text-4xl ${value.position}`}
              >
                {value.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*
        Positioned relative to <section> itself, not the max-w-[110rem]
        wrapper above — so right-0 reaches the true viewport edge and the
        panel keeps growing with vw on very wide monitors instead of
        stopping at a container cap.
      */}
      <div
        data-values-video
        className="relative z-10 mx-auto mt-12 w-full max-w-2xl px-5 sm:px-8 lg:absolute lg:right-0 lg:top-1/2 lg:mx-0 lg:mt-0 lg:w-[42vw] lg:max-w-[56rem] lg:-translate-y-1/2 lg:px-0"
      >
        <CoreValuesVideo startTeaser={revealDone} />
      </div>
    </section>
  );
}
