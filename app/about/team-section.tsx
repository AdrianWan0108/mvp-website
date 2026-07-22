"use client";

import Image from "next/image";
import { useState } from "react";
import { photos, type Photo } from "@/app/lib/images";

/**
 * Team copy. Gary & Dorothy are adapted from the client's supplied bios
 * (2026-07). Florence's bio is a PLACEHOLDER pending client copy — she is
 * wanted on the new site even though she isn't on the current one.
 */
type Member = {
  name: string;
  role: string;
  photo: Photo;
  /** Bio shown in the reveal. */
  detail: string;
};

const team: Member[] = [
  {
    name: "Gary Fok",
    role: "Founder & Director",
    photo: photos.garyHeadshot,
    detail:
      "A Pilates and GYROTONIC® practitioner with over 25 years in fitness and wellness — and a 4th-degree Taekwondo black belt. After recovering from multiple injuries, Gary found in Pilates a path to both rehabilitation and performance. Now a Polestar Pilates Educator and Mentor, he specialises in mindful movement for every body, with a focus on older adults and rehabilitation for conditions like scoliosis, arthritis, and osteoporosis.",
  },
  {
    name: "Dorothy Leung",
    role: "Pilates Instructor",
    photo: photos.dorothyHeadshot,
    detail:
      "Dorothy brings a lifetime of movement, discipline, and design to her teaching — from Chinese dance in childhood to performing with Disney Cruise Line and a 25-year design career. Reconnecting with movement through Pilates in midlife reshaped her purpose, leading her to a comprehensive Polestar Pilates certification and a focus on intelligent, functional movement that builds strength, mobility, and lasting resilience.",
  },
  {
    // PLACEHOLDER bio — replace with Florence's real copy when the client supplies it.
    name: "Florence",
    role: "Pilates Instructor",
    photo: photos.florenceHeadshot,
    detail:
      "Florence focuses on graceful, controlled movement that builds confidence and lasting mobility. Her classes balance genuine challenge with real care for how every body feels, session to session.",
  },
];

/**
 * Team grid of pure-image cards.
 *
 * Default: the photo with the instructor's name + role pinned at the bottom.
 * On reveal (hover / keyboard focus on pointer devices, tap-toggle on touch):
 *   - a translucent verdant overlay climbs up over the photo, and
 *   - the bio unfolds *below* the name + role; because the text block is
 *     bottom-anchored, that push lifts the name + role upward, so they rise
 *     with the overlay and the bio lands right after them.
 *
 * Animation note: a site-wide unlayered rule in globals.css
 * (`body * { transition: background-color, border-color, color }`) overrides
 * Tailwind's layered `transition-*` utilities and strips `transform` /
 * `grid-template-rows` from the transition. Inline `transition` styles beat that
 * unlayered rule, so the two motions below are declared inline. Client component
 * because the tap toggle needs state.
 */
export function TeamSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member, i) => {
        const open = openIndex === i;
        return (
          <button
            key={member.name}
            type="button"
            onClick={() => setOpenIndex(open ? null : i)}
            aria-expanded={open}
            aria-label={member.name}
            className="group relative aspect-[4/5] w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Image
              src={member.photo.src}
              alt={member.photo.alt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />

            {/* Translucent verdant overlay — climbs up over the photo on reveal. */}
            <div
              aria-hidden
              style={{
                transition: "transform 300ms ease-out",
                transform: open ? "translateY(0)" : undefined,
              }}
              className="absolute inset-0 bg-brand-700/70 backdrop-blur-sm [transform:translateY(100%)] group-hover:[transform:translateY(0)] group-focus-visible:[transform:translateY(0)]"
            />

            {/* Name + role always visible; the bio unfolds below them and lifts
                them upward as it opens. */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-serif text-xl font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                {member.name}
              </h3>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                {member.role}
              </p>
              <div
                style={{
                  transition: "grid-template-rows 300ms ease-out",
                  gridTemplateRows: open ? "1fr" : undefined,
                }}
                className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]"
              >
                <div className="overflow-hidden">
                  <p className="pt-2 text-sm leading-relaxed text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    {member.detail}
                  </p>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
