import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "../../components/page-header";
import { Container } from "../../components/container";
import { Card } from "../../components/card";
import { CtaBand } from "../../components/home/cta-band";
import { photos } from "@/app/lib/images";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the instructors at Motion Vitality Pilates in Markham, Ontario — a Polestar-trained team teaching Pilates and GYROTONIC® with precision and care.",
};

/**
 * PLACEHOLDER team copy — drafted for the prototype from existing site content.
 * The client should replace names, roles, and bios (and confirm certifications)
 * before launch. Open item for Gary: confirm the roster — an earlier brief
 * listed "Dorothy Leung" and "Vivian Lam", which don't match these names.
 */
const team = [
  {
    name: "Gary Fok",
    role: "Founder & Lead Instructor",
    photo: photos.garyHeadshot,
    bio: "Gary founded MVP after three decades in fitness and martial arts, drawn to Pilates as a way to move with strength and freedom at any age. He leads the studio's teaching and mentors the team.",
  },
  {
    name: "Dorothy",
    role: "Pilates & GYROTONIC® Instructor",
    photo: photos.dorothyHeadshot,
    bio: "Dorothy brings a precise, hands-on style to every session, with a gift for meeting each client exactly where their body is. She specialises in detailed reformer and equipment work.",
  },
  {
    name: "Florence",
    role: "Pilates Instructor",
    photo: photos.florenceHeadshot,
    bio: "Florence focuses on graceful, controlled movement that builds confidence and lasting mobility. Her classes balance challenge with genuine care for how every body feels.",
  },
];

export default function OurTeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="The people"
        title="Meet the Team"
        intro="A small team of instructors who teach with precision, patience, and a deep respect for how every body moves."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name}>
              <div className="relative aspect-[4/5]">
                <Image
                  src={member.photo.src}
                  alt={member.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-primary">
                  {member.role}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
