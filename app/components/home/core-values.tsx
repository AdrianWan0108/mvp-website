"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { brandLogos } from "@/app/lib/images";
import { Container } from "../container";

const values = [
  {
    title: "Collaboration",
    position: "left-[5%] top-0 sm:left-[8%] lg:left-[2%]",
  },
  {
    title: "Humility",
    position: "right-[9%] top-[24%] sm:right-[13%] lg:right-[7%] lg:top-[20%]",
  },
  {
    title: "Accountability",
    position: "left-0 top-[53%] sm:left-[2%] lg:left-[14%] lg:top-[55%]",
  },
  {
    title: "Innovation",
    position: "bottom-0 right-[4%] sm:right-[7%] lg:right-0",
  },
];

export function CoreValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mark = section.querySelector<HTMLElement>("[data-values-mark]");
    const heading = section.querySelector<HTMLElement>("[data-values-heading]");
    const valueItems = Array.from(
      section.querySelectorAll<HTMLElement>("[data-values-item]"),
    );

    if (!mark || !heading || valueItems.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window) ||
      typeof mark.animate !== "function"
    ) {
      return;
    }

    mark.style.opacity = "0";
    mark.style.transform = "translate3d(-72px, 72px, 0) scale(0.94)";
    heading.style.opacity = "0";
    heading.style.transform = "translate3d(0, 34px, 0)";
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
                opacity: 0.16,
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
        className="pointer-events-none absolute -bottom-[3%] -left-[43%] z-0 w-[128%] opacity-[0.16] sm:-bottom-[8%] sm:-left-[25%] sm:w-[100%] lg:-bottom-[12%] lg:-left-[14%] lg:w-[74%]"
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

      <Container className="relative z-10 flex min-h-[34rem] items-start sm:min-h-[40rem] lg:min-h-[42rem] lg:items-center">
        <div className="mx-auto w-full max-w-2xl lg:ml-auto lg:mr-[3vw] lg:max-w-[44rem]">
          <h2
            data-values-heading
            className="ml-[3%] text-balance font-serif text-5xl font-semibold leading-[1.05] text-brand-900 sm:ml-[10%] sm:text-6xl lg:ml-[6%] lg:text-7xl"
          >
            Our core values
          </h2>

          <ul className="relative mt-12 h-[19rem] sm:mt-14 sm:h-[22rem] lg:mt-16">
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
      </Container>
    </section>
  );
}
