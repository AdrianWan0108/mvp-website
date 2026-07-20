import { cn } from "@/app/lib/cn";

/** Max content width per size. All sizes currently share one width;
 *  kept as separate keys in case sections need to diverge again later. */
const sizes = {
  default: "max-w-7xl",
  wide: "max-w-7xl",
  wider: "max-w-7xl",
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
