import { cn } from "@/app/lib/cn";
import { Container } from "./container";

/** Surface options for the title band. `muted` is the site-wide default;
 *  `brand` opens a page on a full verdant band (used by /pricing, which
 *  alternates brand bands down the page). */
const tones = {
  muted: "border-border bg-muted/40",
  brand: "border-brand-300 bg-secondary text-secondary-foreground",
};

/** Consistent page title band used by interior pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  compact = false,
  tone = "muted",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Tighter vertical padding for pages where the band should sit lower. */
  compact?: boolean;
  tone?: keyof typeof tones;
}) {
  return (
    <section className={cn("border-b", tones[tone])}>
      <Container className={cn(compact ? "py-10 sm:py-12" : "py-16 sm:py-20")}>
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-5xl font-semibold leading-tight sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}

/** Small "this page is in progress" note for prototype stubs. */
export function ComingSoon({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-16">
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-card-foreground">
        {children}
      </div>
    </Container>
  );
}
