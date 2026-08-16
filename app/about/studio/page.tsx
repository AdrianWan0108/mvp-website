import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "../../components/container";
import { CtaButton } from "../../components/cta-button";
import { photos, type Photo } from "@/app/lib/images";
import { site } from "@/app/lib/site";
import { cn } from "@/app/lib/cn";
import { RoomReveal } from "./room-reveal";
import { StudioPanorama } from "./studio-panorama";

export const metadata: Metadata = {
  title: "Our Studio",
  description:
    "Tour Motion Vitality Pilates in Markham: three connected rooms for Reformer Pilates, Konnector, Chair, Barrel, GYROTONIC® movement, and Trapeze Table sessions.",
};

type CollageImage = {
  photo: Photo;
  position: string;
  sizes: string;
  imageClassName?: string;
  zIndex?: number;
};

type EquipmentDetail = {
  id?: string;
  name: string;
  description: string;
};

type Room = {
  title: string;
  equipment: EquipmentDetail[];
  images: CollageImage[];
  mediaRight?: boolean;
};

const rooms: Room[] = [
  {
    title: "The Reformer Room",
    equipment: [
      {
        id: "reformer",
        name: "Reformer",
        description:
          "Spring resistance, a moving carriage, and an adjustable footbar make the Reformer remarkably versatile. It can build strength and control, restore mobility, or give the body support while learning a new movement pattern.",
      },
      {
        name: "Yoga Blocks",
        description:
          "Blocks bring the floor closer, change a joint angle, or create a clear point of contact. We use them to make positions more accessible and cues more precise.",
      },
      {
        name: "Pilates Balls",
        description:
          "Small Pilates balls provide gentle feedback, support, and instability. They can help a client find alignment, connect to deeper muscles, or explore balance without adding heavy load.",
      },
      {
        name: "TRX® Suspension Trainer",
        description:
          "Suspension straps use body weight and gravity to train strength, balance, and integrated control. They also give the hands a reliable point of support while clients explore standing movement beside the Reformers.",
      },
      {
        name: "Jump Board",
        description:
          "Attached to the end of the Reformer, the Jump Board creates a stable surface for horizontal jumping. It brings rhythm, coordination, and cardiovascular challenge into a low-impact spring environment.",
      },
    ],
    images: [
      {
        photo: photos.reformer4,
        position:
          "left-[1%] top-[3%] h-[34%] w-[64%] -rotate-[0.8deg] sm:left-[2%] sm:top-[4%] sm:h-[38%] sm:w-[62%]",
        sizes: "(min-width: 1024px) 30vw, 62vw",
      },
      {
        photo: photos.reformer5,
        position:
          "right-[2%] top-0 h-[52%] w-[32%] rotate-[1.2deg] sm:right-[3%] sm:h-[55%] sm:w-[31%]",
        sizes: "(min-width: 1024px) 15vw, 32vw",
      },
      {
        photo: photos.spineAndBalls,
        position:
          "bottom-[1%] left-[7%] h-[55%] w-[39%] rotate-[0.6deg] sm:left-[9%] sm:h-[53%] sm:w-[36%]",
        sizes: "(min-width: 1024px) 18vw, 39vw",
      },
      {
        photo: photos.yogaBlocks,
        position:
          "right-[7%] bottom-[4%] h-[40%] w-[47%] -rotate-[1deg] sm:right-[9%] sm:h-[42%] sm:w-[44%]",
        sizes: "(min-width: 1024px) 22vw, 47vw",
      },
    ],
  },
  {
    title: "The Apparatus Room",
    equipment: [
      {
        id: "konnector",
        name: "Konnector®",
        description:
          "Four independent ropes connect the hands and feet, allowing every limb to participate in one coordinated movement. The system reveals imbalances and encourages the whole body to organize as a connected unit.",
      },
      {
        id: "ladder-barrel",
        name: "Ladder Barrel",
        description:
          "The curved barrel supports the spine through flexion, extension, and side bending, while the ladder gives the hands and feet secure leverage. It creates space for mobility work that is both supported and active.",
      },
      {
        name: "Wunda Chair",
        description:
          "Compact but demanding, the Chair uses a spring-loaded pedal to develop strength, balance, and control. Its small base makes it especially useful for upright work and precise weight transfer.",
      },
    ],
    mediaRight: true,
    images: [
      {
        photo: photos.konnector2,
        position:
          "left-0 top-[10%] h-[37%] w-[62%] -rotate-[0.8deg] sm:left-[1%] sm:top-[9%] sm:h-[39%] sm:w-[61%]",
        sizes: "(min-width: 1024px) 34vw, 62vw",
        imageClassName: "object-[center_60%]",
      },
      {
        photo: photos.barrel,
        position:
          "right-[2%] top-[6%] h-[55%] w-[36%] rotate-[0.6deg] sm:right-[3%] sm:top-[5%] sm:h-[57%] sm:w-[35%]",
        sizes: "(min-width: 1024px) 20vw, 36vw",
        imageClassName: "object-contain bg-[#efe4d4] p-[2%]",
        zIndex: 12,
      },
      {
        photo: photos.wundaChair,
        position:
          "bottom-0 left-0 h-[40%] w-[35%] rotate-[0.8deg] sm:left-[1%] sm:h-[42%] sm:w-[34%]",
        sizes: "(min-width: 1024px) 19vw, 35vw",
      },
      {
        photo: photos.wundaChair2,
        position:
          "bottom-[1%] left-[32%] h-[38%] w-[31%] -rotate-[1.1deg] sm:left-[33%] sm:h-[40%] sm:w-[30%]",
        sizes: "(min-width: 1024px) 17vw, 31vw",
      },
      {
        photo: photos.wundaChair4,
        position:
          "right-0 bottom-0 h-[39%] w-[40%] rotate-[0.6deg] sm:right-[1%] sm:h-[41%] sm:w-[39%]",
        sizes: "(min-width: 1024px) 22vw, 40vw",
      },
    ],
  },
  {
    title: "The Specialized Studio",
    equipment: [
      {
        id: "gyrotonic-pulley-tower",
        name: "GYROTONIC® Pulley Tower",
        description:
          "Weighted pulleys and rotating handles support continuous, circular movement through three dimensions. The resistance stays smooth as the body spirals, reaches, and changes direction, encouraging mobility without losing strength or control.",
      },
      {
        id: "trapeze-table",
        name: "Trapeze Table",
        description:
          "Also known as the Cadillac, the table combines a stable platform with bars, springs, and hanging supports. It can assist movement, add resistance, or safely explore ranges that are difficult to access on the floor.",
      },
      {
        name: "GYROKINESIS® Stool",
        description:
          "The stool supports seated sequences that mobilize the spine through arching, curling, spiralling, and side bending. Without a machine guiding the pathway, breath and internal rhythm become central to the practice.",
      },
    ],
    images: [
      {
        photo: photos.gyrotonicLogo6,
        position:
          "left-[1%] top-[4%] h-[35%] w-[65%] -rotate-[0.7deg] sm:left-[2%] sm:h-[38%] sm:w-[63%]",
        sizes: "(min-width: 1024px) 31vw, 65vw",
        imageClassName: "object-[center_52%]",
      },
      {
        photo: photos.gyrotonic4,
        position:
          "right-[3%] top-0 h-[53%] w-[31%] rotate-[1deg] sm:right-[4%] sm:w-[30%]",
        sizes: "(min-width: 1024px) 15vw, 31vw",
      },
      {
        photo: photos.gyrotonicBrandDetail,
        position:
          "bottom-[3%] left-[4%] h-[47%] w-[27%] rotate-[0.8deg] sm:left-[6%] sm:w-[26%]",
        sizes: "(min-width: 1024px) 13vw, 27vw",
      },
      {
        photo: photos.trapezeTable,
        position:
          "bottom-0 left-[31%] h-[55%] w-[36%] -rotate-[0.8deg] sm:left-[33%] sm:h-[53%] sm:w-[34%]",
        sizes: "(min-width: 1024px) 17vw, 36vw",
      },
      {
        photo: photos.gyrokinesisStool,
        position:
          "right-[2%] bottom-[4%] h-[40%] w-[31%] rotate-[0.7deg] sm:right-[4%] sm:h-[42%] sm:w-[30%]",
        sizes: "(min-width: 1024px) 15vw, 31vw",
      },
    ],
  },
];

function RoomCollage({ room }: { room: Room }) {
  return (
    <figure
      aria-label={`${room.title} equipment collage`}
      className={cn(
        "relative h-[34rem] sm:h-[42rem] lg:h-[43rem] xl:h-[46rem]",
        room.mediaRight && "lg:order-2",
      )}
    >
      {room.images.map(
        ({ photo, position, sizes, imageClassName, zIndex }, index) => (
        <div
          key={photo.src}
          style={{ zIndex: zIndex ?? (index > 0 ? 10 : 0) }}
          className={cn(
            "group absolute overflow-hidden bg-muted shadow-[0_18px_45px_-28px_rgba(31,65,48,0.5)]",
            position,
          )}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            className={cn(
              "object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none",
              imageClassName,
            )}
          />
        </div>
        ),
      )}
    </figure>
  );
}

function RoomSection({ room }: { room: Room }) {
  const collage = <RoomCollage room={room} />;
  const explanation = (
    <div className="relative isolate px-1 py-8 sm:px-4 sm:py-10 lg:px-8 lg:py-12 xl:px-10">
      <div
        aria-hidden
        className={cn(
          "absolute -inset-x-5 inset-y-0 z-0 bg-muted sm:-inset-x-8 lg:inset-x-auto lg:w-screen",
          room.mediaRight ? "lg:right-0" : "lg:left-0",
        )}
      />
      <h2 className="relative z-10 text-balance text-4xl font-semibold leading-tight text-brand-900 sm:text-5xl lg:text-6xl">
        {room.title}
      </h2>
      <div className="relative z-10 mt-9 space-y-8 sm:mt-10 sm:space-y-10">
        {room.equipment.map((item) => (
          <section
            key={item.name}
            id={item.id}
            className="scroll-mt-28"
          >
            <h3 className="text-2xl font-semibold text-brand-800 sm:text-3xl">
              {item.name}
            </h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {item.description}
            </p>
          </section>
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden py-14 sm:py-20 lg:py-24">
      <Container className="relative z-10 max-w-[110rem] px-5 sm:px-8 xl:px-10 2xl:px-12">
        <RoomReveal
          collage={collage}
          explanation={explanation}
          mediaRight={room.mediaRight}
        />
      </Container>
    </section>
  );
}

export default function StudioPage() {
  return (
    <>
      <section className="bg-brand-800 text-white">
        <Container className="max-w-[110rem] px-5 py-14 text-center sm:px-8 sm:py-16 lg:px-10 lg:py-20 2xl:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
            About · Studio
          </p>
          <h1 className="mx-auto mt-3 max-w-6xl text-balance text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            Three rooms. One thoughtful movement experience.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Step inside our Markham studio and discover spaces designed for
            focused teaching, purposeful equipment, and movement adapted to you.
          </p>
        </Container>
      </section>

      <StudioPanorama />

      <div className="bg-muted/25">
        {rooms.map((room) => (
          <RoomSection key={room.title} room={room} />
        ))}
      </div>

      <section className="py-16 sm:py-20">
        <Container className="max-w-[110rem] px-5 sm:px-8 xl:px-10 2xl:px-12">
          <div className="relative isolate flex min-h-[25rem] flex-col justify-end overflow-hidden rounded-3xl border border-border p-8 sm:p-12">
            <div aria-hidden className="absolute inset-0 -z-10">
              <Image
                src={photos.entranceWall.src}
                alt={photos.entranceWall.alt}
                fill
                sizes="(min-width: 1536px) 1472px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15" />
            </div>
            <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
              Come experience the studio
            </h2>
            <p className="mt-3 text-lg text-white/85">
              {site.address.street}, {site.address.locality}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaButton href="/classes" size="lg">
                View Classes
              </CtaButton>
              <CtaButton href="/contact" variant="inverse" size="lg">
                Contact Us
              </CtaButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
