"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photos } from "@/app/lib/images";

const mentors = [
  {
    photo: photos.mentorTraceyMallett,
    name: "Tracey Mallett",
    title: "Fitness Expert & Creator of bodybarre",
  },
  {
    photo: photos.mentorBrentAnderson,
    name: "Dr. Brent Anderson",
    title: "Founder of Polestar Pilates",
  },
  {
    photo: photos.mentorDawnnaWayburne,
    name: "Dawnna Wayburne",
    title: "Head of Polestar Asia · Founder of Isofit HK",
  },
  {
    photo: photos.mentorShellyPower,
    name: "Shelly Power",
    title:
      "VP International Education, Polestar Pilates · Co-founder, Polestar Pilates Center Miami",
  },
  {
    photo: photos.mentorChristiIdavoy,
    name: "Christi Idavoy",
    title: "Senior Educator, Polestar Pilates",
  },
  {
    photo: photos.mentorNelsonCheak,
    name: "Master Nelson Cheak",
    title: "Founder of GCTF Taekwondo Federation",
  },
  {
    photo: photos.mentorYvonneHsi,
    name: "Yvonne Hsi",
    title: "Senior Polestar Educator in Asia · Founder of In-Motion HK",
  },
  {
    photo: photos.mentorSerafinaAmbrosio,
    name: "Serafina Ambrosio",
    title: "Master Educator, Polestar Italy",
  },
  {
    photo: photos.mentorHagitBerdishevsky,
    name: "Dr. Hagit Berdishevsky",
    title:
      "Co-Director, Conservative Care for Spinal Deformities at Columbia",
  },
  {
    photo: photos.mentorLisaStolze,
    name: "Lisa Stolze",
    title:
      "Advanced Scoliosis PT & Educator for SSQL-Schroth · Founder of Stolze Therapies",
  },
];

/** Vertical rise applied to a tile at the edge of the strip vs. dead center. */
const CURVE_AMPLITUDE = 34;

const COUNT = mentors.length;

/** Copy count either side of the middle one. Repeated clicking of an arrow
 *  before the strip ever settles can burn through several tiles' worth of
 *  slack before a recenter is due, so this stays generous. */
const SIDE_COPIES = 2;
const TOTAL_COPIES = SIDE_COPIES * 2 + 1;

/** Several back-to-back copies of the list so there's always a real tile to
 *  scroll to in either direction — the middle copy is what the visitor
 *  actually starts on and interacts with; the outer copies are the loop's
 *  slack, so repeated clicking never runs out of tiles to advance into. */
const loopedMentors = Array.from(
  { length: TOTAL_COPIES * COUNT },
  (_, i) => mentors[i % COUNT],
);

/** Opens on the middle mentor of the middle copy. */
const START_INDEX = SIDE_COPIES * COUNT + Math.floor((COUNT - 1) / 2);

/** Horizontal filmstrip of mentor photos that bows into a shallow curve as it
 *  scrolls — tiles nearest the track's center rise, tiles further out settle.
 *  Loops infinitely: the strip only ever recenters back toward the middle
 *  copy once scrolling has fully settled (native `scrollend`, or a debounce
 *  fallback) — never while a smooth scroll from the arrow buttons or a drag
 *  gesture is still in flight, which is what previously made repeated clicks
 *  "bounce" back to the start instead of continuing to advance.
 *  Only the centered tile's name/title are shown, below the strip. */
export function MentorCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(START_INDEX);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const startTile = itemRefs.current[START_INDEX];
    if (startTile) {
      track.scrollLeft =
        startTile.offsetLeft -
        (track.clientWidth - startTile.offsetWidth) / 2;
    }

    let raf = 0;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    function findClosestIndex() {
      const rect = track!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const halfWidth = rect.width / 2;

      let closestIndex = 0;
      let closestDiff = Infinity;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const itemRect = el.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const diff = Math.abs(itemCenter - centerX);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestIndex = i;
        }
        const distance = Math.min(1, diff / halfWidth);
        const eased = 1 - Math.cos(distance * (Math.PI / 2));
        const rise = eased * CURVE_AMPLITUDE;
        const scale = 1 - eased * 0.14;
        const opacity = 1 - eased * 0.6;
        el.style.transform = `translateY(${rise}px) scale(${scale})`;
        el.style.opacity = String(opacity);
      });

      return closestIndex;
    }

    // Only runs once scrolling has fully stopped — jumping mid-flight (while
    // a native smooth scroll or momentum is still animating scrollLeft)
    // fights that animation and can snap the strip back to the wrong spot.
    function settle() {
      const closestIndex = findClosestIndex();
      const middleCopyIndex = closestIndex % COUNT;
      const targetIndex = SIDE_COPIES * COUNT + middleCopyIndex;
      if (targetIndex === closestIndex) return;

      const fromTile = itemRefs.current[closestIndex];
      const toTile = itemRefs.current[targetIndex];
      if (!fromTile || !toTile) return;

      track!.scrollLeft += toTile.offsetLeft - fromTile.offsetLeft;
      setActiveIndex(targetIndex);
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const closestIndex = findClosestIndex();
        setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
      });

      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 140);
    }

    if ("onscrollend" in window) {
      track.addEventListener("scrollend", settle);
    }

    findClosestIndex();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", settle);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
    };
  }, []);

  function scrollByTile(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const tile = itemRefs.current[0];
    const step = tile ? tile.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  const active = mentors[activeIndex % COUNT];

  return (
    <div className="mx-auto mt-16 max-w-6xl">
      <div className="relative">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[calc(50%-7rem)] pb-2 pt-8 sm:gap-8 sm:px-[calc(50%-8rem)]"
        >
          {loopedMentors.map((mentor, i) => (
            <div
              key={`${mentor.name}-${Math.floor(i / COUNT)}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative h-72 w-56 shrink-0 snap-center overflow-hidden border border-white/15 bg-brand-800 transition duration-150 ease-out sm:h-80 sm:w-64"
            >
              <Image
                src={mentor.photo.src}
                alt={mentor.photo.alt}
                fill
                sizes="(min-width: 640px) 16rem, 14rem"
                className="object-cover"
                priority={i === START_INDEX}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByTile(-1)}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 size-11 place-items-center rounded-full border border-white/20 bg-brand-900/80 text-brand-50 backdrop-blur-sm transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-300 sm:grid"
        >
          <ChevronLeft aria-hidden size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollByTile(1)}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 size-11 place-items-center rounded-full border border-white/20 bg-brand-900/80 text-brand-50 backdrop-blur-sm transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-300 sm:grid"
        >
          <ChevronRight aria-hidden size={20} />
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="font-serif text-3xl font-semibold tracking-[0.06em] text-white sm:text-4xl">
          {active.name}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
          {active.title}
        </p>
      </div>
    </div>
  );
}
