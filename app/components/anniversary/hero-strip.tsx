import Image from "next/image";
import type { Photo } from "@/app/lib/images";
import styles from "./hero-strip.module.css";

/**
 * Where each frame's subject sits, so `object-cover` keeps faces in view as
 * the slice changes shape between phone and desktop. Indexed like
 * `anniversary.images.hero`; a missing entry falls back to centre.
 */
const focus = ["50% 52%", "50% 42%", "50% 48%", "50% 32%", "42% 40%"];

/** The first three slices show at every width; the rest appear from tablet up
 *  (see hero-strip.module.css). */
const ALWAYS_VISIBLE = 3;

export function HeroStrip({ photos }: { photos: Photo[] }) {
  return (
    <div className={styles.strip}>
      {photos.map((photo, index) => (
        <div key={photo.src} className={styles.slice}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 26vw, (min-width: 640px) 32vw, 42vw"
            // Slices hidden on narrow screens stay lazy, so a phone never
            // downloads them. `preload` is avoided on purpose: with several
            // candidate hero images the Next docs recommend eager loading.
            loading={index < ALWAYS_VISIBLE ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : undefined}
            className="object-cover"
            style={{ objectPosition: focus[index] ?? "50% 50%" }}
          />
        </div>
      ))}
    </div>
  );
}
