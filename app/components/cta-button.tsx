import Link from "next/link";
import { cn } from "@/app/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,opacity] hover:-translate-y-0.5 active:translate-y-0";

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-brand-300",
  outline: "border border-border text-foreground hover:bg-muted",
  // Solid white pill for use on a coloured/dark bar (e.g. the brand-colour navbar).
  inverse: "bg-white text-[#111412] hover:bg-white/90",
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
}: CtaButtonProps) {
  const classes = cn(
    base,
    square ? "rounded-none" : "rounded-full",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
