"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CtaButton } from "../components/cta-button";
import { photos, type PhotoKey } from "@/app/lib/images";

const NEEDS = ["rehab", "prenatal", "strength", "alignment"] as const;
type Need = (typeof NEEDS)[number];

const needLabels: Record<Need, string> = {
  rehab: "Rehab & recovery",
  prenatal: "Pre & postnatal",
  strength: "Strength & conditioning",
  alignment: "Posture & alignment",
};

type Pkg = {
  name: string;
  price: string;
  photo: PhotoKey;
  description: string;
  includes: string[];
  needs: Need[];
  featured?: boolean;
};

const packages: Pkg[] = [
  {
    name: "First-Timer Power Pack",
    price: "$110",
    photo: "garyPose",
    description:
      "The perfect way to get started. This 4-class intro pack lets new clients sample our signature group sessions to discover the format that fits best, all on professional equipment with a Polestar-certified team.",
    includes: [
      "4 classes — Reformer, Fit-lates, Cardio Pilates, Circuit, or TRX",
      "Build lean muscle and improve endurance",
      "Enhance balance, strength, and flexibility",
      "Suitable for all fitness levels",
    ],
    needs: ["strength", "alignment"],
    featured: true,
  },
  {
    name: "Group Reformer",
    price: "$350",
    photo: "reformer",
    description:
      "Our most popular group format, built around the reformer. Mix energizing, heart-pumping sessions with focused, core-building strength work across multiple class types.",
    includes: [
      "10 classes, valid across multiple group class types",
      "Strengthen the core and improve posture",
      "Low-impact, joint-friendly movement",
      "For every level, beginner to advanced",
    ],
    needs: ["strength", "alignment"],
  },
  {
    name: "Private 1:1 Pilates",
    price: "$950",
    photo: "privateSession",
    description:
      "Fully personalized one-on-one coaching. Your instructor tailors every exercise to your body, goals, and pace, whether you're just starting out or deepening your practice.",
    includes: [
      "10 sessions of one-on-one coaching",
      "Programming tailored to your goals and level",
      "Available in Mat, Reformer, and studio equipment",
      "Ideal for rehab, focused goals, or fast progress",
    ],
    needs: ["rehab", "prenatal", "strength", "alignment"],
  },
  {
    name: "Semi-Private Pilates",
    price: "$1,300",
    photo: "konnector",
    description:
      "The same personalized guidance in a small group, valid for Konnector®, Fit-lates, or Cardio Pilates — so the whole body works as one integrated unit with shared motivation.",
    includes: [
      "10 sessions — Konnector®, Fit-lates, or Cardio Pilates",
      "Engage the entire body in every movement",
      "Improve coordination, control, and balance",
      "Reduce muscular imbalances",
    ],
    needs: ["prenatal", "strength"],
  },
  {
    name: "Private 1:1 GYROTONIC®",
    price: "$950",
    photo: "gyrotonic",
    description:
      "One-on-one training in the GYROTONIC® Method on the Professional Pulley Tower — flowing, low-impact movement that's easy on the joints and inspired by yoga, dance, and tai chi.",
    includes: [
      "10 sessions of one-on-one GYROTONIC® training",
      "Improve spinal mobility and joint articulation",
      "Build flexibility and functional strength",
      "Personalized one-on-one coaching",
    ],
    needs: ["rehab", "alignment"],
  },
];

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base">
          <span aria-hidden className="mt-0.5 font-bold text-brand-700">
            &#10003;
          </span>
          <span className="font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Featured package (top row): large photo on the left, all copy on the right.
 * No card/border — sits directly on the section background.
 */
function FeaturedPackage({ pkg }: { pkg: Pkg }) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <Image
          src={photos[pkg.photo].src}
          alt={photos[pkg.photo].alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {pkg.featured && (
          <span className="absolute left-4 top-4 z-10 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            Best for new clients
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <h3 className="font-serif text-3xl font-semibold lg:text-4xl">
          {pkg.name}
        </h3>
        <p className="mt-2 text-4xl font-bold text-foreground lg:text-5xl">
          {pkg.price}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {pkg.description}
        </p>
        <BenefitList items={pkg.includes} />
        <CtaButton
          href="/pricing"
          variant="outline"
          size="lg"
          className="mt-7 self-start bg-card hover:bg-muted"
        >
          Book Now
        </CtaButton>
      </div>
    </div>
  );
}

/**
 * Grid package: large photo on top, then name + price, details, and CTA
 * stacked below. No card/border — sits directly on the section background.
 */
function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <Image
          src={photos[pkg.photo].src}
          alt={photos[pkg.photo].alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl font-semibold lg:text-3xl">
          {pkg.name}
        </h3>
        <p className="shrink-0 text-3xl font-bold text-foreground">
          {pkg.price}
        </p>
      </div>

      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {pkg.description}
      </p>
      <BenefitList items={pkg.includes} />
      <CtaButton
        href="/pricing"
        variant="outline"
        size="lg"
        className="mt-7 self-start bg-card hover:bg-muted"
      >
        Book Now
      </CtaButton>
    </div>
  );
}

export function ClassPackages() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("need");
  const activeNeed = (NEEDS as readonly string[]).includes(raw ?? "")
    ? (raw as Need)
    : null;

  const filtered = activeNeed
    ? packages.filter((pkg) => pkg.needs.includes(activeNeed))
    : packages;
  const shown = filtered.length > 0 ? filtered : packages;

  const useSpecialLayout = !activeNeed && shown.length === 5;

  return (
    <>
      {activeNeed && (
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm">
          <span className="font-semibold">
            Showing packages for: {needLabels[activeNeed]}
          </span>
          <Link
            href="/classes"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>
      )}

      {useSpecialLayout ? (
        <div className="mt-8 flex flex-col gap-14 lg:gap-20">
          <FeaturedPackage pkg={shown[0]} />
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14">
            {shown.slice(1).map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14">
          {shown.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
      )}
    </>
  );
}
