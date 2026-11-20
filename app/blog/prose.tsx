import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/app/lib/cn";
import type { BlogPhoto } from "./posts/types";

/**
 * Building blocks for post bodies. Posts compose these instead of styling
 * their own markup, so every article shares one type scale and rhythm.
 *
 * Text and standard figures share a 52rem column. Wide figures use the
 * full parent Container, aligning with the navbar's content edges.
 */

const column = "mx-auto w-full max-w-[52rem]";

/** Inline link inside body copy. External links open in a new tab. */
export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-medium text-brand-800 underline decoration-brand-400 underline-offset-4 hover:decoration-brand-700"
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function P({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return (
    <p
      className={cn(
        column,
        "mt-6 leading-relaxed text-brand-950",
        lead ? "text-xl sm:text-[1.375rem] sm:leading-relaxed" : "text-lg",
      )}
    >
      {children}
    </p>
  );
}

/** A titled section. The id doubles as an anchor (#starting-with-the-spine). */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-14 sm:mt-20">
      <h2
        id={id}
        className={cn(column, "scroll-mt-28 text-4xl leading-none text-brand-950 sm:text-5xl")}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/** One photo. `wide` breaks out of the text column on large screens. */
export function Figure({
  photo,
  caption,
  wide = false,
}: {
  photo: BlogPhoto;
  caption?: ReactNode;
  wide?: boolean;
}) {
  return (
    <figure className={cn("mx-auto mt-8 w-full sm:mt-10", !wide && "max-w-[52rem]")}>
      <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={wide
            ? "(min-width: 1280px) 76rem, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
            : "(min-width: 896px) 52rem, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"}
          className="h-auto w-full"
      />
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** Keep supporting photos together, with a shared height and no cropping. */
export function FigurePair({
  photos,
  caption,
}: {
  photos: [BlogPhoto, BlogPhoto];
  caption?: ReactNode;
}) {
  return (
    <figure className={cn(column, "my-10 sm:my-14")}>
      <div className="grid items-start gap-2 sm:gap-3" style={{
        gridTemplateColumns: photos.map((photo) => `minmax(0, ${photo.width / photo.height}fr)`).join(" "),
      }}>
        {photos.map((photo) => (
            <Image key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 896px) 34rem, 66vw"
              className="h-auto w-full"
            />
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className={cn(column, "mt-3 text-sm leading-relaxed text-muted-foreground")}>
      {children}
    </figcaption>
  );
}

/** Related photos stay grouped without recropping; four squares form two mobile rows. */
export function FigureCollage({
  photos,
  caption,
  layout = "flow",
}: {
  photos: [BlogPhoto, BlogPhoto, BlogPhoto, ...BlogPhoto[]];
  caption: ReactNode;
  layout?: "flow" | "grid";
}) {
  return (
    <figure className="mx-auto my-10 w-full sm:my-14">
      <div
        className={cn(
          "grid grid-cols-2 items-start gap-2 sm:gap-3",
          layout === "grid"
            ? photos.length === 4 ? "lg:grid-cols-4" : "md:grid-cols-3"
            : "md:grid-cols-[var(--photo-columns)]",
        )}
        style={layout === "grid" ? undefined : {
          "--photo-columns": photos.map((photo) => `minmax(0, ${photo.width / photo.height}fr)`).join(" "),
        } as CSSProperties}
      >
        {photos.map((photo, index) => (
            <Image key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={layout === "grid" ? photos.length === 4
                ? "(min-width: 1280px) 19rem, (min-width: 1024px) 25vw, 50vw"
                : "(min-width: 1280px) 25rem, (min-width: 768px) 33vw, 50vw" : index === 0
                ? "(min-width: 1280px) 36rem, (min-width: 768px) 48vw, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                : "(min-width: 1280px) 25rem, (min-width: 768px) 33vw, 50vw"}
              className={cn("h-auto w-full", layout === "flow" && index === 0 && "col-span-2 md:col-span-1")}
            />
        ))}
      </div>
      <Caption>{caption}</Caption>
    </figure>
  );
}

/** A pulled-out line in someone's own words. */
export function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className={cn(column, "mt-10 border-l-4 border-brand-500 pl-6 sm:pl-8")}>
      <blockquote className="font-serif text-3xl leading-tight tracking-[0.03em] text-brand-800 sm:text-4xl">
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-700">
          {cite}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Instagram post/reel embed. Instagram serves a plain iframe at
 * <post url>/embed, so no third-party script is loaded. The frame is portrait
 * and capped in width so it never dominates the column.
 */
export function InstagramEmbed({ url, title }: { url: string; title: string }) {
  const src = `${url.replace(/\/?(\?.*)?$/, "")}/embed/`;
  return (
    <div className={cn(column, "mt-10 flex justify-center")}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        className="h-[min(44rem,85vh)] w-full max-w-[26rem] border border-border bg-white"
      />
    </div>
  );
}
