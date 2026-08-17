import { cn } from "@/app/lib/cn";
import { Container } from "./container";

/** Surface options for the title band. `muted` is the site-wide default;
 *  `brand` opens a page on a full verdant band (used by /pricing, which
 *  alternates brand bands down the page); `dark` matches the deep-green
 *  masthead used on /about/studio, with white eyebrow/title/intro text. */
const tones = {
  muted: {
    band: "border-border bg-muted/40",
    eyebrow: "text-primary",
    intro: "text-muted-foreground",
  },
  brand: {
    band: "border-brand-300 bg-secondary text-secondary-foreground",
    eyebrow: "text-primary",
    intro: "text-muted-foreground",
  },
  dark: {
    band: "border-brand-800 bg-brand-800 text-white",
    eyebrow: "text-white/80",
    intro: "text-white/85",
  },
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
  const palette = tones[tone];

  return (
    <section className={cn("border-b", palette.band)}>
      <Container className={cn(compact ? "py-10 sm:py-12" : "py-16 sm:py-20")}>
        {eyebrow && (
          <p
            className={cn(
              "mb-3 text-sm font-semibold uppercase tracking-[0.18em]",
              palette.eyebrow,
            )}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-5xl font-semibold leading-tight sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-xl leading-relaxed",
              palette.intro,
            )}
          >
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
