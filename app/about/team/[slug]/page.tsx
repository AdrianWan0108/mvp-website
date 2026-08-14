import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "../../../components/container";
import { CtaButton } from "../../../components/cta-button";
import { InstructorGallery } from "../instructor-gallery";
import { getInstructor, instructors } from "../instructors";

export const dynamicParams = false;

export function generateStaticParams() {
  return instructors.map((instructor) => ({ slug: instructor.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const instructor = getInstructor(slug);

  if (!instructor) return { title: "Instructor" };

  return {
    title: instructor.name,
    description: `Meet ${instructor.name}, ${instructor.role} at Motion Vitality Pilates in Markham.`,
  };
}

export default async function InstructorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const instructor = getInstructor(slug);
  if (!instructor) notFound();

  return (
    <>
      <section className="bg-brand-800 text-white">
        <Container className="py-12 sm:py-14 lg:py-16">
          <h1 className="text-balance text-5xl font-semibold leading-[1.05] sm:text-6xl">
            {instructor.name}
          </h1>
        </Container>
      </section>

      <div className="border-b border-brand-200 bg-brand-100/70">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex min-h-20 flex-wrap items-stretch text-sm">
              <li className="flex items-center border-r border-brand-300 pr-5 sm:pr-8">
                <Link
                  href="/about/team"
                  className="group inline-flex items-center gap-3 font-semibold uppercase tracking-[0.14em] text-brand-900 hover:text-brand-700"
                >
                  <span className="grid size-10 place-items-center bg-brand-800 text-white">
                    <ArrowLeft
                      aria-hidden
                      style={{ transition: "transform 300ms ease" }}
                      className="size-4 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </span>
                  <span>All instructors</span>
                </Link>
              </li>
              <li
                aria-current="page"
                className="flex flex-col justify-center py-4 pl-5 sm:pl-8"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Instructor profile
                </span>
                <span className="mt-1 text-base font-medium text-brand-900">
                  {instructor.name}
                </span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      <section className="py-14 sm:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.72fr)] lg:gap-20 xl:gap-24">
          <div className="mx-auto w-full max-w-[29rem] lg:order-2">
            <InstructorGallery
              instructorName={instructor.name}
              images={instructor.gallery}
            />
          </div>

          <div className="lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {instructor.role}
            </p>
            <h2 className="mt-3 text-balance text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl">
              About {instructor.name}
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {instructor.biography.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {instructor.qualifications.length > 0 && (
              <div className="mt-10 border-y border-border py-7">
                <h3 className="text-2xl font-semibold text-brand-900">
                  Qualifications
                </h3>
                <ul className="mt-4 space-y-2 text-base leading-relaxed text-muted-foreground">
                  {instructor.qualifications.map((qualification) => (
                    <li key={qualification} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{qualification}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <CtaButton href={instructor.scheduleHref} size="lg">
                View Schedule
              </CtaButton>
              {instructor.educationHref && (
                <CtaButton
                  href={instructor.educationHref}
                  variant="outline"
                  size="lg"
                >
                  Become an Instructor
                </CtaButton>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
