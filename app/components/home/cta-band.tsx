import { Container } from "../container";
import { CtaButton } from "../cta-button";
import { links } from "@/app/lib/links";

export function CtaBand() {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <Container className="flex flex-col items-center gap-6 py-20 text-center">
        <h2 className="max-w-2xl text-balance font-serif text-4xl font-semibold sm:text-5xl">
          Become our MVP
        </h2>
        <p className="max-w-xl text-lg text-secondary-foreground/80">
          New to the studio? Start with our First-Timer pack and let our team
          build a plan around your body and your goals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <CtaButton href={links.firstTimer} size="lg">
            Start with a First-Timer Pack
          </CtaButton>
          <CtaButton href="/contact" size="lg" variant="outline">
            Get in Touch
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
