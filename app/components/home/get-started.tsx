import Image from "next/image";
import { Container } from "../container";
import { SectionHeading } from "../section-heading";
import { CtaButton } from "../cta-button";
import { ScrollReveal } from "../scroll-reveal";
import { photos } from "@/app/lib/images";
import { links } from "@/app/lib/links";

const steps = [
  {
    title: "Get the Mindbody app",
    body: "Download Mindbody (free) or open our online booking page in your browser.",
  },
  {
    title: "Find Motion Vitality Pilates",
    body: "Search “Motion Vitality Pilates” in Markham and tap to follow the studio.",
  },
  {
    title: "Create your account",
    body: "Set up your profile and choose a First-Timer pack built for new clients.",
  },
  {
    title: "Book your first session",
    body: "Pick a group class or private session, reserve your spot, and you’re in.",
  },
];

/** Floating circular photo accents that ring the phone mockup — one per
    instructor, using the newer optimized team headshots. */
const orbits = [
  {
    photo: photos.garyTeamHeadshot,
    className: "-left-6 top-4 h-20 w-20 sm:h-24 sm:w-24",
  },
  {
    photo: photos.dorothyTeamHeadshot,
    className: "-right-4 top-1/3 h-16 w-16 sm:h-20 sm:w-20",
  },
  {
    photo: photos.florenceTeamHeadshot,
    className: "-left-2 bottom-10 h-16 w-16 sm:h-20 sm:w-20",
  },
];

export function GetStarted() {
  return (
    <section className="bg-muted/40 py-20 sm:py-24">
      <ScrollReveal stagger={100}>
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          {/* Phone mockup (the PNG already includes the device frame) with
            floating photo orbits */}
          <div data-reveal className="relative mx-auto w-full max-w-sm">
            <div className="relative mx-auto aspect-[1122/1402] w-72 sm:w-80">
              <Image
                src={photos.mindbodyApp.src}
                alt={photos.mindbodyApp.alt}
                fill
                sizes="(min-width: 640px) 20rem, 18rem"
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {orbits.map((orbit) => (
              <span
                key={orbit.photo.src}
                className={`absolute overflow-hidden rounded-full border-4 border-background shadow-xl ${orbit.className}`}
              >
                <Image
                  src={orbit.photo.src}
                  alt={orbit.photo.alt}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </span>
            ))}
          </div>

          {/* Steps */}
          <div>
            {/* `[&>p]:font-medium` weights the intro without changing the shared
              SectionHeading defaults used by every other section. */}
            <div data-reveal>
              <SectionHeading
                className="[&>p]:font-medium"
                title="Book Your First Session"
                intro="New to MVP? You can book everything through Mindbody in a few minutes."
              />
            </div>
            <ol className="mt-8 space-y-6">
              {steps.map((step, i) => (
                <li key={step.title} data-reveal className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-serif text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold sm:text-[1.75rem]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-base font-medium leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div data-reveal className="mt-9 flex flex-wrap gap-4">
              <CtaButton href={links.book} size="lg" square>
                Book on Mindbody
              </CtaButton>
              <CtaButton
                href={links.firstTimer}
                size="lg"
                variant="outline"
                square
              >
                First-Timer Pack
              </CtaButton>
            </div>
          </div>
        </Container>
      </ScrollReveal>
    </section>
  );
}
