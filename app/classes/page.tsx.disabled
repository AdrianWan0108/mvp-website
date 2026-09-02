import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "../components/page-header";
import { Container } from "../components/container";
import { CtaButton } from "../components/cta-button";
import { links } from "@/app/lib/links";
import { ClassPackages } from "./class-packages";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Class packages and private session pricing at Motion Vitality Pilates in Markham. Book and register through Mindbody.",
};

export default function ClassesPage() {
  return (
    <>
      <PageHeader
        compact
        eyebrow="Classes & pricing"
        title="Classes"
        intro="Pick the package that fits your goals, then book on professional equipment with a Polestar-certified team. Registration and the live schedule run through Mindbody."
      />

      <section className="bg-secondary py-20 text-secondary-foreground sm:py-24">
        <Container>
          <Suspense fallback={<div className="mt-12 h-96" />}>
            <ClassPackages />
          </Suspense>

          <p className="mt-6 text-sm text-muted-foreground">
            Prices reflect the current studio listing and are to be confirmed.
            Drop-ins available on request.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <CtaButton href={links.register} size="lg">
              New Registration
            </CtaButton>
            <CtaButton href="/schedule" size="lg" variant="outline">
              View Class Schedule
            </CtaButton>
          </div>
        </Container>
      </section>
    </>
  );
}
