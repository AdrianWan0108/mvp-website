import Image from "next/image";
import Link from "next/link";
import { posts, formatPostDate } from "@/app/blog/posts";
import { Container } from "../container";
import { CtaButton } from "../cta-button";
import { SectionHeading } from "../section-heading";

export function BlogSection() {
  const featured = posts[0];
  if (!featured) return null;

  const href = `/blog/${featured.slug}`;

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Blog"
          title="Stories from the studio"
          intro="Teaching, movement, and the people we share them with."
        />
        <article className="group relative mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div
            className="motion-safe:group-hover:scale-[1.03]"
            style={{ transition: "scale 850ms cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            <Image
              src={featured.hero.src}
              alt={featured.hero.alt}
              width={featured.hero.width}
              height={featured.hero.height}
              sizes="(min-width: 1280px) 43rem, (min-width: 1024px) 58vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
              <span>{featured.category}</span>
              <time dateTime={featured.publishedAt}>{formatPostDate(featured.publishedAt)}</time>
            </p>
            <h3 className="mt-4 text-balance text-4xl leading-none sm:text-5xl">
              <Link href={href} className="after:absolute after:inset-0 group-hover:text-brand-700">
                {featured.title}
              </Link>
            </h3>
            <p className="mt-4 text-sm text-brand-700">By {featured.author.name}</p>
            <p className="mt-4 text-lg leading-relaxed text-brand-950">{featured.description}</p>
            <CtaButton href={href} square arrow className="z-10 mt-6">
              Read the story
            </CtaButton>
          </div>
        </article>
        <div className="mt-10">
          <Link href="/blog" className="text-sm font-medium text-brand-800 underline underline-offset-4 hover:text-brand-950">
            Visit the blog
          </Link>
        </div>
      </Container>
    </section>
  );
}
