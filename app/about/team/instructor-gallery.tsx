"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/app/lib/cn";
import type { InstructorGalleryImage } from "./instructors";

export function InstructorGallery({
  instructorName,
  images,
}: {
  instructorName: string;
  images: InstructorGalleryImage[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex];

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-100">
        <Image
          key={selected.photo.src}
          src={selected.photo.src}
          alt={selected.photo.alt}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className={cn(
            selected.fit === "contain" ? "object-contain" : "object-cover",
            selected.position,
          )}
        />
      </div>

      <div className="mt-4 flex gap-3" aria-label={`${instructorName} photos`}>
        {images.map((image, index) => {
          const selectedImage = selectedIndex === index;
          return (
            <button
              key={image.photo.src}
              type="button"
              aria-label={`Show ${image.label.toLowerCase()} of ${instructorName}`}
              aria-pressed={selectedImage}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative aspect-[3/4] w-20 overflow-hidden border-2 bg-brand-100 transition-opacity hover:opacity-85 sm:w-24",
                selectedImage
                  ? "border-brand-700"
                  : "border-transparent opacity-65",
              )}
            >
              <Image
                src={image.photo.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover object-top"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
