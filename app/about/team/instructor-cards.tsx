"use client";

import { useState, type KeyboardEvent, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Instructor } from "./instructors";

type CardInstructor = Pick<
  Instructor,
  "slug" | "name" | "quote" | "gallery"
>;

export function InstructorCards({
  instructors,
}: {
  instructors: CardInstructor[];
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  function toggleOnTouch(slug: string, event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a")) return;
    if (window.matchMedia("(hover: none)").matches) {
      setOpenSlug((current) => (current === slug ? null : slug));
    }
  }

  function toggleWithKeyboard(
    slug: string,
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setOpenSlug((current) => (current === slug ? null : slug));
  }

  return (
    <div className="grid gap-7 md:grid-cols-3 lg:gap-10">
      {instructors.map((instructor) => {
        const open = openSlug === instructor.slug;
        const headshot = instructor.gallery[0];

        return (
          <article key={instructor.slug}>
            <div
              tabIndex={0}
              aria-expanded={open}
              onClick={(event) => toggleOnTouch(instructor.slug, event)}
              onKeyDown={(event) =>
                toggleWithKeyboard(instructor.slug, event)
              }
              className="group relative aspect-[2/3] overflow-hidden bg-brand-200/70 text-white outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <div
                style={{
                  transition:
                    "inset 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
                  inset: open ? "0.75rem" : undefined,
                }}
                className="instructor-card-frame absolute inset-0 overflow-hidden group-hover:inset-3 group-focus-within:inset-3"
              >
                <Image
                  src={headshot.photo.src}
                  alt={headshot.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 768px) 31vw, 100vw"
                  style={{
                    transition:
                      "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: open ? "scale(1.07)" : undefined,
                  }}
                  className="instructor-card-image object-cover object-top group-hover:scale-[1.07] group-focus-within:scale-[1.07] motion-reduce:transform-none"
                />

                <div
                  aria-hidden
                  style={{
                    transition:
                      "opacity 950ms cubic-bezier(0.16, 1, 0.3, 1)",
                    opacity: open ? 1 : undefined,
                  }}
                  className="instructor-card-overlay absolute inset-0 bg-brand-900/42 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"
                />

                <div className="absolute inset-x-6 bottom-6 z-10 sm:inset-x-7 sm:bottom-7">
                  <h3 className="text-3xl font-semibold [text-shadow:0_1px_5px_rgba(0,0,0,0.55)] sm:text-4xl">
                    {instructor.name}
                  </h3>
                  <div
                    style={{
                      transition:
                        "grid-template-rows 1050ms cubic-bezier(0.16, 1, 0.3, 1)",
                      gridTemplateRows: open ? "1fr" : undefined,
                    }}
                    className="instructor-card-reveal grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"
                  >
                    <div className="overflow-hidden">
                      <div
                        style={{
                          transition:
                            "opacity 900ms ease, transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
                          opacity: open ? 1 : undefined,
                          transform: open ? "translateY(0)" : undefined,
                        }}
                        className="instructor-card-reveal-content translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                      >
                        <blockquote className="pt-4 text-balance text-base font-medium leading-relaxed [text-shadow:0_1px_4px_rgba(0,0,0,0.35)] sm:text-lg">
                          “{instructor.quote}”
                        </blockquote>
                        <Link
                          href={`/about/team/${instructor.slug}`}
                          onClick={(event) => event.stopPropagation()}
                          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 transition-transform hover:-translate-y-0.5 focus-visible:outline-none motion-reduce:transform-none"
                        >
                          Learn More
                          <ArrowRight aria-hidden className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
