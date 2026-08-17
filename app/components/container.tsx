import { cn } from "@/app/lib/cn";

/** Max content width per size. `default`/`wide`/`wider` currently share one
 *  width; kept as separate keys in case sections need to diverge again later.
 *  `extraWide` matches the site's established "wide" convention used by a
 *  handful of showcase sections (home's pricing gateway/core values, the
 *  about-studio page). `full` drops the cap entirely — same edge-to-edge
 *  extent as the education page's Program/Move-Up-the-Ladder sections. */
const sizes = {
  default: "max-w-7xl",
  wide: "max-w-7xl",
  wider: "max-w-7xl",
  extraWide: "max-w-[110rem]",
  full: "",
};

/** Centered max-width content wrapper with responsive horizontal padding. */
export function Container({
  className,
  size = "default",
  children,
}: {
  className?: string;
  size?: keyof typeof sizes;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)}>
      {children}
    </div>
  );
}
