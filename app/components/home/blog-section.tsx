import Image from "next/image";
import Link from "next/link";
import { Container } from "../container";
import { SectionHeading } from "../section-heading";
import { photos } from "@/app/lib/images";

type Post = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  photo: { src: string; alt: string };
  href: string;
};

const featured: Post = {
  category: "Wellness",
  title: "3 Reasons Why Kids Need to Start Pilates",
  excerpt:
    "Posture, focus, and confidence — here's how a mindful movement practice sets young bodies up for a lifetime of healthy habits.",
  date: "Coming soon",
  photo: photos.florencePose,
  href: "#",
};

const posts: Post[] = [
  {
    category: "Community",
    title: "Mon Sheong Event",
    excerpt:
      "A recap of our community wellness day with Mon Sheong — movement, connection, and giving back.",
    date: "Coming soon",
    photo: photos.team,
    href: "#",
  },
  {
    category: "Training",
    title: "Polestar Training Program Announcements",
    excerpt:
      "New 2026 cohort dates, faculty updates, and what to expect from our Polestar teacher-training pathway.",
    date: "Coming soon",
    photo: photos.polestarCohort,
    href: "#",
  },
];

export function BlogSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Blog & news"
          title="Latest from the studio"
          intro="Tips, stories, and announcements from the MVP community."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {/* Featured (largest) card */}
          <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg lg:col-span-2">
            <Link href={featured.href} className="flex h-full flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={featured.photo.src}
                  alt={featured.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  <span>{featured.category}</span>
                  <span className="text-muted-foreground">{featured.date}</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <span className="mt-auto pt-5 text-sm font-semibold text-primary">
                  Read more →
                </span>
              </div>
            </Link>
          </article>

          {/* Two equal smaller cards */}
          {posts.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg lg:col-span-1"
            >
              <Link href={post.href} className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.photo.src}
                    alt={post.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    <span>{post.category}</span>
                    <span className="text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-primary">
                    Read more →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
