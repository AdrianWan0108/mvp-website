import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  /** Heading level for correct document outline. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Reusable eyebrow + title + intro block with a consistent type scale. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      )}
      <Tag className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
        {title}
      </Tag>
      {intro && (
        <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </div>
  );
}
