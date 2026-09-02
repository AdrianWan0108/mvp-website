"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { photos, type Photo } from "@/app/lib/images";
import {
  formatPrice,
  privateOptions,
  pricingSections,
  privateSection,
  publicOptionsForSection,
  type PricingScope,
} from "@/app/lib/pricing-data";
import styles from "./pricing-gateway.module.css";

type PricingPathway = {
  id: PricingScope;
  name: string;
  description: string;
  photo: Photo;
  startingPrice: number;
  imagePosition?: string;
};

const categoryPhotos: Record<
  PricingScope,
  Pick<PricingPathway, "photo" | "imagePosition">
> = {
  "new-here": { photo: photos.entranceWall },
  "group-packs": {
    photo: photos.groupClass,
    imagePosition: "object-[42%_center]",
  },
  memberships: { photo: photos.studioReformerFloor },
  seniors: { photo: photos.spineAndBalls },
  private: {
    photo: photos.privateSession,
    imagePosition: "object-[58%_center]",
  },
};

const pricingPathways: PricingPathway[] = [
  ...pricingSections.map((section) => ({
    id: section.id,
    name: section.heading,
    description: section.description,
    startingPrice: Math.min(
      ...publicOptionsForSection(section.id).map((option) => option.price),
    ),
    ...categoryPhotos[section.id],
  })),
  {
    id: privateSection.id,
    name: privateSection.heading,
    description: privateSection.description,
    startingPrice: Math.min(
      ...privateOptions.flatMap((option) =>
        option.packages.flatMap((pkg) =>
          pkg.variants.map((variant) => variant.price),
        ),
      ),
    ),
    ...categoryPhotos.private,
  },
];

/** Five direct routes into the matching tab on the pricing page. */
export function PricingGateway() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>(
      "[data-pricing-heading]",
    );
    const intro = section.querySelector<HTMLElement>("[data-pricing-intro]");
    const cards = Array.from(
      section.querySelectorAll<HTMLElement>("[data-pricing-card]"),
    );

    if (!heading || !intro || cards.length === 0) return;

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

    heading.style.opacity = "0";
    heading.style.transform = "translate3d(0, 28px, 0)";
    intro.style.opacity = "0";
    intro.style.transform = "translate3d(0, 24px, 0)";
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translate3d(0, 32px, 0)";
    });

    let animations: Animation[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        animations = [
          heading.animate(
            [
              { opacity: 0, transform: "translate3d(0, 28px, 0)" },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 700,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          ),
          intro.animate(
            [
              { opacity: 0, transform: "translate3d(0, 24px, 0)" },
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
            ],
            {
              duration: 700,
              delay: 120,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          ),
          ...cards.map((card, index) =>
            card.animate(
              [
                { opacity: 0, transform: "translate3d(0, 32px, 0)" },
                { opacity: 1, transform: "translate3d(0, 0, 0)" },
              ],
              {
                duration: 620,
                delay: 260 + index * 90,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards",
              },
            ),
          ),
        ];
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <section
      id="pricing-options"
      ref={sectionRef}
      className="scroll-mt-20 bg-brand-500 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
        <div className="max-w-5xl">
          <h2
            data-pricing-heading
            className="text-balance font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl"
          >
            Explore our pricing options
          </h2>
          <p
            data-pricing-intro
            className="mt-4 max-w-4xl text-lg leading-relaxed text-white sm:text-xl"
          >
            Compare introductory offers, group class packs, memberships, senior
            rates, and one-on-one training before viewing full prices.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-[110rem] grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:mt-12 lg:grid-cols-5 lg:gap-3 xl:gap-4">
        {pricingPathways.map((pathway) => (
          <article
            key={pathway.id}
            data-pricing-card
            className={`${styles.card} group relative aspect-square overflow-hidden bg-brand-900 text-white`}
          >
            <Image
              src={pathway.photo.src}
              alt={pathway.photo.alt}
              fill
              sizes="(min-width: 1760px) 336px, (min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
              className={`${styles.image} object-cover ${pathway.imagePosition ?? "object-center"}`}
            />

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/30 to-brand-950/20"
            />
            <div
              aria-hidden
              className={`${styles.overlay} absolute inset-0 bg-brand-950/55 opacity-0`}
            />

            <div className="absolute inset-0 z-10 flex flex-col p-5 sm:p-6 lg:p-4 xl:p-5">
              <h3 className="max-w-[12rem] text-balance font-serif text-3xl font-semibold leading-none [text-shadow:0_1px_5px_rgba(0,0,0,0.55)] lg:text-[1.7rem] xl:text-3xl">
                {pathway.name}
              </h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
                Start from {formatPrice(pathway.startingPrice)}
              </p>

              <div className="mt-auto">
                <p
                  className={`${styles.description} text-sm font-medium leading-snug text-white/90 lg:text-[0.8rem] xl:text-sm`}
                >
                  {pathway.description}
                </p>
                <Link
                  href={`/pricing#pricing-${pathway.id}`}
                  className="mt-4 inline-flex min-h-10 items-center gap-2 border border-white bg-white px-4 py-2 text-sm font-semibold text-brand-950 transition-[color,background-color,transform] duration-300 hover:bg-transparent hover:text-white group-hover:[&_svg]:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white [&_svg]:transition-transform [&_svg]:duration-300"
                >
                  See prices
                  <ArrowRight
                    aria-hidden
                    className={`${styles.arrow} size-4`}
                  />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-10 w-full max-w-[110rem] px-5 sm:px-8 lg:mt-12">
        <Link
          href="/schedule"
          className="text-base font-semibold text-white underline decoration-2 underline-offset-8 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-lg"
        >
          Not sure which one? See the class schedule
        </Link>
      </div>
    </section>
  );
}
