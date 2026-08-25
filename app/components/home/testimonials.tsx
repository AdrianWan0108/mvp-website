"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "../container";
import { GoogleIcon } from "../google-icon";
import { ScrollReveal } from "../scroll-reveal";
import { cn } from "@/app/lib/cn";
import { links } from "@/app/lib/links";

/** Reviews shown on mobile before the reader taps to expand. */
const MOBILE_VISIBLE = 3;

/**
 * Real Google reviews for MVP. Each quote is VERBATIM — sentences are dropped
 * (marked with an ellipsis) to fit the card, but no wording is changed, so the
 * "in their own words" claim in the intro holds. Names are the reviewers'
 * public Google display names, shortened to first name + last initial.
 *
 * The six were picked for coverage: Gary / Dorothy / Florence, privates and
 * group, rehab and seniors and Gyrotonic — not just the most flattering.
 * Reviews naming instructors who have left the studio are not used here.
 */
const testimonials = [
  {
    quote:
      "I took private sessions with her and she showed me how to utilize other Pilates equipment to gain alignment and tension release. She helped correct my form from a fall a year ago and my leg is now straight! Also, learning about spinal articulation was amazing and to be able to do it was incredible!",
    name: "Elsa K.",
    detail: "Private sessions with Dorothy",
  },
  {
    quote:
      "Gary is very knowledgeable and experienced in his field. He is very passionate with his teaching and is a patient and understanding instructor. … Gary has also done an outstanding job in helping my husband’s rehabilitation in his mobility.",
    name: "Vivienne W.",
    detail: "Private lessons & group classes",
  },
  {
    quote:
      "All of the instructors are incredibly knowledgeable and each brings their own unique style to class. I can truly feel how passionate they are about what they do — their understanding of body anatomy is impressive, and they always offer helpful tips and suggestions tailored to what works best for me.",
    name: "Joe C.",
    detail: "Group classes",
  },
  {
    quote:
      "I've tried many different studios, but after just a few classes, I knew this was the one. The class size is just right, not overcrowded. Gary pays attention to every detail and explains the reasons behind each movement, helping me understand and execute them properly.",
    name: "Iris C.",
    detail: "Group classes",
  },
  {
    quote:
      "I had a very positive experience with the seniors Pilates class. I look forward to going every week and Gary is always very patient, supportive, and encouraging. The classes are gentle but effective and have really helped me stay active and improve my flexibility. I would highly recommend these classes to other seniors.",
    name: "Doris C.",
    detail: "Seniors Pilates class",
  },
  {
    quote:
      "Florence is a great Gyrotonic instructor. She is very patient and passionate with Gyrotonic. She demonstrates every exercise and takes great care of correcting my movements and posture.",
    name: "Wendy M.",
    detail: "Gyrotonic sessions",
  },
];

function Stars({
  size = 18,
  className = "text-primary",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div aria-label="5 out of 5 stars" className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2l2.9 6.26L21.6 9.3l-4.8 4.68 1.13 6.62L12 17.77 6.07 20.6 7.2 13.98 2.4 9.3l6.7-1.04L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-primary py-20 text-primary-foreground sm:py-24">
      <Container>
        {/* Heading is written inline rather than via SectionHeading so the
            intro can run wider than the shared max-w-2xl and stay on one line. */}
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <h2
            data-reveal
            className="text-balance text-4xl font-semibold leading-tight sm:text-5xl"
          >
            Nobody Leaves the Same Way They Walked In
          </h2>
          <p
            data-reveal
            className="mt-4 text-2xl font-medium leading-relaxed text-primary-foreground/90"
          >
            Straight from our Google reviews — in their own words, not ours.
          </p>

          {/* Rating badge. The G mark must sit on white per Google's brand
              guidelines, so it gets its own white chip inside the pill — which
              doubles as the "leave us a review" link. */}
          <div
            data-reveal
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/12 py-2 pl-2 pr-5 ring-1 ring-white/25"
          >
            <a
              href={links.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              title="Leave MVP a review on Google"
              className="grid h-9 w-9 place-items-center rounded-full bg-white outline-offset-2 transition hover:scale-105 hover:shadow-md focus-visible:outline-2 focus-visible:outline-white"
            >
              <GoogleIcon size={20} />
              <span className="sr-only">Leave MVP a review on Google</span>
            </a>
            <Stars size={20} className="text-primary-foreground" />
            <span className="font-serif text-xl font-semibold leading-none">
              5.0
            </span>
            <span className="text-base font-semibold text-primary-foreground/90">
              rating on Google
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal
          stagger={90}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              /* Mobile shows the first MOBILE_VISIBLE only until expanded;
                 from sm up the whole set is always visible. */
              data-reveal
              className={cn(
                "flex-col rounded-2xl bg-brand-100 p-8 text-foreground shadow-sm sm:flex",
                i < MOBILE_VISIBLE || expanded ? "flex" : "hidden",
              )}
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-lg font-medium leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6">
                {/* Bebas is uppercase-only and packs tightly, and the global
                    tracking rule only covers h1–h4 — so a name set at small
                    sizes needs its own size bump and letter-spacing. */}
                <p className="font-serif text-xl font-semibold tracking-[0.08em]">
                  {t.name}
                </p>
                <p className="mt-1 text-base text-foreground/70">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>

        {!expanded && (
          <div className="mt-8 text-center sm:hidden">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-expanded={false}
              className="inline-flex items-center gap-2 rounded-full bg-white/12 px-6 py-3 text-base font-semibold ring-1 ring-white/25 transition hover:bg-white/20"
            >
              Read {testimonials.length - MOBILE_VISIBLE} more reviews
              <ChevronDown size={18} aria-hidden />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
