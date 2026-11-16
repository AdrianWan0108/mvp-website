import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "../../components/container";
import { site } from "../../lib/site";
import { formatPostDate, getPost, posts } from "../posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog" };

  const url = `/blog/${post.slug}`;
  const title = post.seoTitle ?? post.title;

  return {
    // The SEO title is written to stand alone, so skip the site-name suffix
    // the root layout's template would add (it would push past ~60 chars).
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: post.author.name }],
    openGraph: {
      type: "article",
      locale: "en_CA",
      siteName: site.name,
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: post.socialImage, width: 1200, height: 630, alt: post.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.socialImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Body } = post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [`${site.url}${post.socialImage}`, `${site.url}${post.hero.src}`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="text-brand-950">
      {/* Deep-green masthead; the hero photo below is pulled up to straddle
          its bottom edge, the same seam treatment as the About pages. */}
      <header className="bg-brand-800 text-white">
        <Container className="pb-24 pt-8 sm:pb-36 sm:pt-12 lg:pb-48">
          <div>
            <Link
              href="/blog"
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/80 hover:text-white"
            >
              <ArrowLeft
                aria-hidden
                style={{ transition: "transform 300ms ease" }}
                className="size-4 group-hover:-translate-x-1 motion-reduce:transform-none"
              />
              Blog
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-200 sm:mt-8">
              {post.category}
            </p>
            <h1 className="mt-3 text-balance text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-[52rem] text-lg leading-relaxed text-white/85 sm:text-xl">
              {post.description}
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/75">
              <span>
                By{" "}
                {post.author.href ? (
                  <Link href={post.author.href} className="font-semibold text-white underline-offset-4 hover:underline">
                    {post.author.name}
                  </Link>
                ) : (
                  <span className="font-semibold text-white">{post.author.name}</span>
                )}
              </span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
            </p>
          </div>
        </Container>
      </header>

      <Container>
        <div className="relative -mt-16 aspect-[4/3] overflow-hidden bg-brand-50 sm:-mt-28 sm:aspect-[3/2] lg:-mt-40">
          <Image
            src={post.hero.src}
            alt={post.hero.alt}
            fill
            priority
            sizes="(min-width: 1280px) 76rem, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
            className="object-cover"
            style={post.hero.position ? { objectPosition: post.hero.position } : undefined}
          />
        </div>
      </Container>

      <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
        <Body />

        <div className="mt-16 border-t border-brand-200 pt-8">
          <Link
            href="/blog"
            className="group inline-flex min-h-11 items-center gap-3 font-semibold uppercase tracking-[0.14em] text-brand-900 hover:text-brand-700"
          >
            <span className="grid size-10 place-items-center bg-brand-800 text-white">
              <ArrowLeft
                aria-hidden
                style={{ transition: "transform 300ms ease" }}
                className="size-4 group-hover:-translate-x-1 motion-reduce:transform-none"
              />
            </span>
            All posts
          </Link>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
