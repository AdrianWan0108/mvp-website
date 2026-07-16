"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container } from "./container";

/**
 * Client-side redirect for moved routes. The site is a static export
 * (output: "export"), so server redirects aren't available — old URLs keep a
 * tiny page that forwards to the new location instead of 404ing.
 *
 * basePath note: router.replace and <Link> go through Next's router, which
 * injects the /mvp-website basePath automatically. The <meta> refresh is raw
 * HTML that bypasses the router, so it must carry the prefix itself.
 */
const BASE_PATH = "/mvp-website";

export function RedirectStub({ to, label }: { to: string; label: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <Container className="py-28 text-center">
      <meta httpEquiv="refresh" content={`1;url=${BASE_PATH}${to}`} />
      <p className="text-lg text-muted-foreground">This page has moved.</p>
      <p className="mt-4">
        <Link
          href={to}
          className="font-semibold text-primary underline underline-offset-4"
        >
          Continue to {label}
        </Link>
      </p>
    </Container>
  );
}
