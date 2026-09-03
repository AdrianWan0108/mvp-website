"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photos } from "@/app/lib/images";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "./mentor-carousel.css";

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

/** Horizontal filmstrip of mentor photos on a 3D coverflow arc, looping
 *  infinitely in both directions. Swiper owns the scroll physics, looping,
 *  and coverflow transforms — see swiperjs.com/swiper-api#coverflow-effect
 *  for the rotate/depth/stretch/scale knobs below.
 *  Only the centered slide's name/title are shown, below the strip. */
export function MentorCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleSlideChange(swiper: SwiperType) {
    setActiveIndex(swiper.realIndex);
  }

  const active = mentors[activeIndex];

  return (
    <div className="mx-auto mt-16 max-w-4xl">
      <div className="relative">
        <Swiper
          modules={[EffectCoverflow, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          speed={800}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 45,
            stretch: 0,
            depth: 180,
            scale: 0.88,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            prevEl: ".mentor-carousel-prev",
            nextEl: ".mentor-carousel-next",
          }}
          onSlideChange={handleSlideChange}
          className="mentor-carousel !py-8"
        >
          {mentors.map((mentor) => (
            <SwiperSlide key={mentor.name} className="!h-80 sm:!h-96">
              <div className="relative h-full w-full overflow-hidden border border-white/15 bg-brand-800">
                {/* Preserve the complete photo on mobile without leaving flat
                    green gutters: a soft full-bleed copy fills the frame while
                    the sharp foreground remains uncropped. Desktop keeps its
                    original edge-to-edge crop. */}
                <Image
                  src={mentor.photo.src}
                  alt=""
                  fill
                  aria-hidden
                  sizes="90vw"
                  className="scale-110 object-cover opacity-55 blur-lg sm:hidden"
                />
                <Image
                  src={mentor.photo.src}
                  alt={mentor.photo.alt}
                  fill
                  sizes="(min-width: 640px) 22rem, 60vw"
                  className="z-10 object-contain sm:object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous mentor"
          className="mentor-carousel-prev absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 size-11 place-items-center rounded-full border border-white/20 bg-brand-900/80 text-brand-50 backdrop-blur-sm transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-300 sm:grid"
        >
          <ChevronLeft aria-hidden size={20} />
        </button>
        <button
          type="button"
          aria-label="Next mentor"
          className="mentor-carousel-next absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 size-11 place-items-center rounded-full border border-white/20 bg-brand-900/80 text-brand-50 backdrop-blur-sm transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-300 sm:grid"
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
