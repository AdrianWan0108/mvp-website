import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";
import type { Photo } from "@/app/lib/images";

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
        "mt-6 leading-relaxed text-brand-950/85",
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
  ratio = "aspect-[3/2]",
  position,
  caption,
  wide = false,
}: {
  photo: Photo;
  /** Tailwind aspect class. The box crops the photo with object-cover. */
  ratio?: string;
  position?: string;
  caption?: ReactNode;
  wide?: boolean;
}) {
  return (
    <figure className={cn("mx-auto mt-8 w-full sm:mt-10", !wide && "max-w-[52rem]")}>
      <div className={cn("relative overflow-hidden bg-brand-50", ratio)}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={wide
            ? "(min-width: 1280px) 76rem, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
            : "(min-width: 896px) 52rem, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"}
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** Two photos side by side; stacks on phones. */
export function FigurePair({
  photos,
  ratio = "aspect-square",
  caption,
}: {
  photos: [Photo & { position?: string }, Photo & { position?: string }];
  ratio?: string;
  caption?: ReactNode;
}) {
  return (
    <figure className="mx-auto mt-8 w-full sm:mt-10">
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {photos.map((photo) => (
          <div key={photo.src} className={cn("relative overflow-hidden bg-brand-50", ratio)}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1280px) 37.5rem, (min-width: 640px) calc((100vw - 5rem) / 2), calc(100vw - 2.5rem)"
              className="object-cover"
              style={photo.position ? { objectPosition: photo.position } : undefined}
            />
          </div>
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
