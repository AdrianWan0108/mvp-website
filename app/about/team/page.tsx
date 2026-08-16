import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "../../components/container";
import { photos } from "@/app/lib/images";
import { InstructorCards } from "./instructor-cards";
import { instructors } from "./instructors";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the Motion Vitality Pilates instructors in Markham and learn how MVP's client-centred teaching is shaped by the Polestar Pilates method.",
};

export default function TeamPage() {
  return (
    <>
      <section className="bg-brand-800 text-white">
        <Container className="py-12 text-center sm:py-14 lg:py-16">
          <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[1.05] sm:text-6xl">
            Meet the people moving with you
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">
            A close-knit team teaching with knowledge, patience, and genuine
            curiosity about how your body moves.
          </p>
        </Container>
      </section>

      <section className="border-b border-border bg-muted/45">
        <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="relative mx-5 mt-5 min-h-[28rem] sm:mx-8 sm:mt-8 sm:min-h-[36rem] lg:my-8 lg:ml-8 lg:mr-0 lg:min-h-[42rem]">
            <Image
              src={photos.teamPolestar.src}
              alt={photos.teamPolestar.alt}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover object-[center_38%]"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20 2xl:pr-[max(5rem,calc((100vw-110rem)/2+5rem))]">
            <Image
              src="/mvp-website/assets/photos/polestar-logo/POLESTAR_TM_-_Default_Logo.png"
              alt="Polestar Pilates"
              width={360}
              height={126}
              className="h-auto w-52 object-contain object-left sm:w-64"
            />
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              MVP × Polestar
            </p>
            <h2 className="mt-3 max-w-2xl text-balance text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl">
              The education behind our teaching
            </h2>
            <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Polestar is the educational framework and professional lineage
                behind MVP—not simply a class or a logo. Its approach connects
                the Pilates repertoire with movement science, rehabilitation,
                and critical thinking.
              </p>
              <p>
                Gary serves as a Polestar Educator and Mentor, and MVP hosts
                Polestar education in the Markham and Toronto area. That
                relationship shapes how our team observes, adapts, and teaches
                movement every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 text-center sm:py-24">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            What MVP means
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-balance text-5xl font-semibold leading-tight text-brand-800 sm:text-6xl">
            You are our Most Valuable Player.
          </h2>
          <div className="mx-auto mt-7 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Founded by Gary Fok in 2025, Motion Vitality Pilates brings
              Pilates and GYROTONIC® movement together with methods including
              TRX®, HIIT, Schroth, and functional movement. Every session is
              shaped around the client’s needs, goals, budget, and schedule.
            </p>
            <p>
              Just like our name, you are our MVP. We are here to make movement
              feel intelligent, personal, and joyful as we guide you toward your
              health and wellness goals.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/35 py-20 sm:py-24">
        <Container>
          <InstructorCards instructors={instructors} />
        </Container>
      </section>
    </>
  );
}
