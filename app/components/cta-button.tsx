import Link from "next/link";
import { cn } from "@/app/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "inverse";
type Size = "md" | "lg";

/**
 * Shared motion contract for every variant.
 *
 * `box-shadow` and `color` are in the transition list so variants can animate
 * in those channels without snapping; the old list omitted both. The lift is
 * paired with a shadow that grows underneath it, so the button reads as
 * rising rather than twitching, and the press collapses both together.
 */
const base = [
  "group/cta relative inline-flex items-center justify-center gap-2 font-medium",
  "transition-[transform,background-color,border-color,box-shadow,color]",
  // Asymmetric: the longer duration sits on the base rule so it governs the
  // *release*, while :hover overrides it with the shorter one for the
  // arrival. A single duration made hover-in sluggish and hover-out abrupt.
  "duration-[var(--cta-duration-out)] ease-[var(--cta-ease)]",
  "hover:duration-[var(--cta-duration-in)]",
  "hover:-translate-y-0.5 active:translate-y-0",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "motion-reduce:transition-none motion-reduce:transform-none",
].join(" ");

/**
 * Hover darkens or shifts the fill rather than fading it. The previous
 * `hover:opacity-90` on primary/inverse washed the button toward its
 * background, which read as the control going *disabled* on hover and dragged
 * the label's contrast down with it. `color-mix` keeps each variant anchored
 * to its own token, so the education and verdant themes both stay correct.
 */
const variantClasses: Record<Variant, string> = {
  primary: cn(
    "bg-primary text-primary-foreground",
    "shadow-[0_8px_20px_-14px_var(--cta-primary-shadow)]",
    // The label brightens with the fill so the two move together — `color`
    // was already in the transition list but no variant was using it, which
    // left the text sitting static while the background shifted under it.
    "hover:bg-[var(--cta-primary-hover)] hover:text-[var(--cta-primary-fg-hover)]",
    "hover:shadow-[0_14px_28px_-16px_var(--cta-primary-shadow)]",
    "active:shadow-[0_5px_14px_-12px_var(--cta-primary-shadow)]",
  ),
  secondary: cn(
    "bg-secondary text-secondary-foreground",
    "shadow-[0_8px_20px_-16px_rgba(21,36,31,0.55)]",
    "hover:bg-[var(--cta-secondary-hover)]",
    "hover:shadow-[0_14px_28px_-18px_rgba(21,36,31,0.6)]",
    "active:shadow-[0_5px_14px_-14px_rgba(21,36,31,0.5)]",
  ),
  outline: cn(
    "border border-border text-foreground",
    "hover:border-[var(--cta-outline-hover-border)] hover:bg-muted",
    "hover:shadow-[0_12px_26px_-20px_rgba(21,36,31,0.5)]",
  ),
  // Solid white on a coloured/dark bar (e.g. the transparent-hero navbar).
  // The hover tint carries a little brand green rather than being neutral
  // grey, and goes further than the old #f2f4f1 — that was a ~12-point
  // brightness step, close to imperceptible next to the other variants.
  inverse: cn(
    "bg-white text-[#111412]",
    "shadow-[0_8px_20px_-14px_rgba(0,0,0,0.6)]",
    "hover:bg-[var(--cta-inverse-hover)]",
    "hover:shadow-[0_14px_28px_-16px_rgba(0,0,0,0.65)]",
    "active:shadow-[0_5px_14px_-12px_rgba(0,0,0,0.55)]",
  ),
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Force external behavior; otherwise inferred from an http(s) href. */
  external?: boolean;
  /** Squared corners instead of the default pill shape. */
  square?: boolean;
  /** Trailing arrow that slides on hover. Replaces the hand-rolled
   *  `group/book` + span pattern the navbar used to repeat. */
  arrow?: boolean;
};

/**
 * Link-styled button. Renders next/link for internal routes and a safe
 * external anchor for absolute URLs (e.g. Mindbody, Polestar).
 */
export function CtaButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  square = false,
  arrow = false,
}: CtaButtonProps) {
  const classes = cn(
    base,
    square ? "rounded-none" : "rounded-full",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
  const isExternal = external ?? /^https?:\/\//.test(href);

  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover/cta:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none"
        >
          →
        </span>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
