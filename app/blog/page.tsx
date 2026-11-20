import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../components/container";
import { CtaButton } from "../components/cta-button";
import { PageHeader } from "../components/page-header";
import { cn } from "../lib/cn";
import { site } from "../lib/site";
import { formatPostDate, posts, type BlogPost } from "./posts";

const description =
  "Stories, workshops and news from Motion Vitality Pilates, a Polestar Pilates and GYROTONIC® studio in Markham.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    url: "/blog",
    title: `Blog | ${site.name}`,
    description,
  },
};

// The global `body *` colour transition (globals.css) overrides Tailwind's
// layered transition utilities, so the image zoom declares its own inline.
// Tailwind v4's scale utility changes `scale`, independently of `transform`.
const zoom = { transition: "scale 850ms cubic-bezier(0.4, 0, 0.2, 1)" };

function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.16em]",
        className,
      )}
    >
      <span className="text-brand-700">{post.category}</span>
      <span aria-hidden className="text-muted-foreground">·</span>
      <time dateTime={post.publishedAt} className="text-muted-foreground">
        {formatPostDate(post.publishedAt)}
      </time>
    </p>
  );
}

/** Newest post: image and text side by side from `lg`, stacked below. */
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <article className="group relative grid bg-white lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="self-center bg-brand-50 motion-safe:group-hover:scale-[1.03]" style={zoom}>
        <Image
          src={post.hero.src}
          alt={post.hero.alt}
          width={post.hero.width}
          height={post.hero.height}
          priority
          sizes="(min-width: 1280px) 44rem, (min-width: 1024px) 58vw, 100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="flex flex-col p-6 sm:p-10">
        <PostMeta post={post} />
        <h2 className="mt-4 text-balance text-4xl leading-none sm:text-5xl">
          {/* Stretched link: the whole card is clickable, the heading is the accessible name. */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-700">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-brand-950/80">{post.description}</p>
        <div className="mt-auto pt-8">
          <CtaButton href={`/blog/${post.slug}`} square arrow className="z-10">
            Read the story
          </CtaButton>
        </div>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex flex-col bg-white">
      <div className="bg-brand-50 motion-safe:group-hover:scale-[1.03]" style={zoom}>
        <Image
          src={post.hero.src}
          alt={post.hero.alt}
          width={post.hero.width}
          height={post.hero.height}
          sizes="(min-width: 1280px) 26rem, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} />
        <h2 className="mt-3 text-balance text-3xl leading-none">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-700">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 leading-relaxed text-brand-950/80">{post.description}</p>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader title="BLOG" tone="dark" compact />

      <Container className="py-12 sm:py-16 lg:py-20">
        {featured ? (
          <FeaturedPost post={featured} />
        ) : (
          <p className="text-lg text-muted-foreground">New stories are on the way.</p>
        )}

        {rest.length > 0 && (
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
