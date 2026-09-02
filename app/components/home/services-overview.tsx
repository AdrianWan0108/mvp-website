import Image from "next/image";
import Link from "next/link";
import { Container } from "../container";
import { SectionHeading } from "../section-heading";
import { Card } from "../card";
import { photos, type Photo } from "@/app/lib/images";

type Service = { name: string; photo: Photo; description: string };

const services: Service[] = [
  {
    name: "Reformer Pilates",
    photo: photos.reformer,
    description:
      "Spring-resisted full-body training on the reformer — strength, control, and mobility in small groups or one-on-one.",
  },
  {
    name: "GYROTONIC®",
    photo: photos.gyrotonic,
    description:
      "Circular, flowing movement that decompresses the spine and builds length, coordination, and ease.",
  },
  {
    name: "Konnector® Method",
    photo: photos.konnector,
    description:
      "Connected, multi-directional resistance that challenges the whole body in a single integrated session.",
  },
  {
    name: "Studio Apparatus",
    photo: photos.wundaChair,
    description:
      "Chair, barrel, and tower work that refines stability, balance, and precise control.",
  },
  {
    name: "Rehab & Scoliosis",
    photo: photos.spineFigure,
    description:
      "Physio-informed, scoliosis-aware programming to move safely through injury, recovery, and beyond.",
  },
  {
    name: "Private & Semi-Private",
    photo: photos.privateSession,
    description:
      "Fully personalized coaching — ideal for beginners, pre/postnatal, athletes, and specific goals.",
  },
];

export function ServicesOverview() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we offer"
          title="Movement for every body"
          intro="From dynamic group classes to focused private sessions, every program is taught on professional equipment by a Polestar-certified team."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.name}
              href="/pricing"
              className="group rounded-2xl focus-visible:outline-none"
            >
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={service.photo.src}
                    alt={service.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-semibold">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-base font-medium text-primary">
                    Learn more
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
