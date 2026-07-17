"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "../container";
import { photos } from "@/app/lib/images";
import { cn } from "@/app/lib/cn";

const values = [
  {
    title: "Collaboration",
    body: "Open, clear communication that builds trust, empathy, and a real community spirit.",
    photo: photos.team_2,
    // This tall image needs a lower focal point than the rest.
    objectPosition: "center 45%",
  },
  {
    title: "Humility",
    body: "A culture of learning, adaptability, and growth — valuing feedback as a chance to get better.",
    photo: photos.privateSession,
  },
  {
    title: "Accountability",
    body: "Ownership and responsibility in delivering every session and addressing issues proactively.",
    photo: photos.dorothyPose,
  },
  {
    title: "Innovation",
    body: "Resourcefulness, creativity, and a forward-thinking mindset to keep moving you forward.",
    photo: photos.gyrotonic,
  },
];

const last = values.length - 1;

export function CoreValues() {
  // Desktop reveals on hover (starts blank); mobile has no hover, so it taps to
  // reveal and defaults to the first value ("Collaboration") selected.
  const [active, setActive] = useState<number | null>(null);
  const [mobileActive, setMobileActive] = useState<number | null>(0);

  return (
    <section className="relative isolate overflow-hidden bg-[color-mix(in_oklab,var(--brand-300),var(--brand-700)_25%)]">
      {/* Per-value background photos — dissolve in (inline timing so it never
          hard-cuts). Split per breakpoint so mobile/desktop track their own
          selection state. */}
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        {values.map((value, i) => (
          <Image
            key={value.title}
            src={value.photo.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: value.objectPosition ?? "center 30%",
              opacity: active === i ? 1 : 0,
              transition: "opacity 500ms ease-in-out",
            }}
          />
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 lg:hidden">
        {values.map((value, i) => (
          <Image
            key={value.title}
            src={value.photo.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: value.objectPosition ?? "center 30%",
              opacity: mobileActive === i ? 1 : 0,
              transition: "opacity 500ms ease-in-out",
            }}
          />
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 bg-[color-mix(in_oklab,transparent,color-mix(in_oklab,var(--brand-300),var(--brand-700)_25%)_75%)]" />

      <Container className="relative pt-20 sm:pt-24">
        <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          What we stand for
        </p>
        <h2 className="text-center font-serif text-4xl font-semibold sm:text-5xl">
          Our core values
        </h2>
      </Container>

      {/* Mobile: stacked, tap to reveal (no hover on touch). Each title sits on
          its own row so they never crowd, and tapping expands its summary and
          dissolves in the matching background photo. */}
      <div className="relative mt-12 flex flex-col divide-y divide-brand-900/15 px-6 pb-16 lg:hidden">
        {values.map((value, i) => {
          const isOn = mobileActive === i;
          return (
            <button
              key={value.title}
              type="button"
              onClick={() => setMobileActive(isOn ? null : i)}
              aria-expanded={isOn}
              className="flex w-full flex-col items-center py-5 text-center"
            >
              <span
                className={cn(
                  "font-serif text-3xl font-semibold transition-colors duration-300 sm:text-4xl",
                  isOn ? "text-brand-700" : "text-foreground",
                )}
              >
                {value.title}
              </span>
              {/* 0fr → 1fr gives a smooth height transition without measuring. */}
              <div
                className="grid w-full transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOn ? "1fr" : "0fr" }}
              >
                <p className="overflow-hidden font-serif text-base leading-relaxed text-muted-foreground">
                  <span className="block pt-3">{value.body}</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Desktop: interactive row — full-bleed so the words use the whole width */}
      <div className="relative mt-16 hidden h-[clamp(34rem,40vw,48rem)] w-full lg:block">
        {/* Full-height hover columns: hovering anywhere above or below a word
            (its whole column) triggers that value's effect, not just the word. */}
        <div className="absolute inset-0 flex px-4 sm:px-8">
          {values.map((value, i) => (
            <div
              key={value.title}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="flex-1"
            />
          ))}
        </div>

        {/* Summaries — all centered in the same spot, mid-section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[14rem] flex justify-center px-6">
          <div className="relative h-36 w-full max-w-2xl">
            {values.map((value, i) => (
              <p
                key={value.title}
                className="absolute inset-0 flex items-center justify-center text-center font-serif text-xl leading-relaxed text-foreground sm:text-2xl"
                style={{
                  opacity: active === i ? 1 : 0,
                  transition: "opacity 300ms ease",
                }}
              >
                {value.body}
              </p>
            ))}
          </div>
        </div>

        {/* Words — non-interactive; the full-height columns above handle hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[7.5rem] flex px-4 sm:px-8">
          {values.map((value, i) => (
            <div key={value.title} className="flex-1 text-center">
              <span
                className={cn(
                  "cursor-default font-serif text-3xl font-semibold transition-colors duration-300 sm:text-4xl lg:text-5xl",
                  active !== null && active !== i
                    ? "text-foreground/40"
                    : "text-foreground",
                )}
              >
                {value.title}
              </span>
            </div>
          ))}
        </div>

        {/* Dots + extending lines, aligned to each word's center */}
        <div className="pointer-events-none absolute inset-x-0 bottom-24 h-3 px-4 sm:px-8">
          <div className="relative h-full w-full">
            {values.map((value, i) => {
              const center = (i + 0.5) * 25; // % across the row
              const isOn = active === i;
              const rightWidth = i === last ? 0 : 100 - center;
              const leftWidth = i === 0 ? 0 : center;
              // The line starts right after the dot has dissolved in, then
              // accelerates out (slow → fast) to the edge over ~2.8s. Retracts
              // quickly on leave.
              const lineTransition = isOn
                ? "width 1000ms cubic-bezier(0.7,0,0.84,0) 0ms"
                : "width 250ms ease-out 0ms";
              return (
                <div key={value.title}>
                  {/* line growing right from the dot */}
                  <span
                    className="absolute top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-brand-200"
                    style={{
                      left: `${center}%`,
                      width: isOn ? `${rightWidth}%` : "0%",
                      transition: lineTransition,
                      boxShadow: "0 0 8px rgba(209,235,221,0.75)",
                    }}
                  />
                  {/* line growing left from the dot */}
                  <span
                    className="absolute top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-brand-200"
                    style={{
                      right: `${100 - center}%`,
                      width: isOn ? `${leftWidth}%` : "0%",
                      transition: lineTransition,
                      boxShadow: "0 0 8px rgba(209,235,221,0.75)",
                    }}
                  />
                  {/* dot under the word — dissolves in first */}
                  <span
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200 shadow-[0_0_12px_4px_rgba(209,235,221,0.75)]"
                    style={{
                      left: `${center}%`,
                      opacity: isOn ? 1 : 0,
                      transition: "opacity 300ms ease-in-out 0ms",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
