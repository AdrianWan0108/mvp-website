"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "./container";
import { CtaButton } from "./cta-button";
import { mainNav, site } from "@/app/lib/site";
import { links } from "@/app/lib/links";
import { navLogos } from "@/app/lib/images";
import { cn } from "@/app/lib/cn";

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  // Polestar routes use the dark theme; scope it to the header too for cohesion.
  const isPolestar = pathname?.startsWith("/polestar") ?? false;
  // The home hero runs full-bleed behind the header — sit transparent over it
  // until the user scrolls.
  const isHome = pathname === "/";
  // Three header backdrops:
  //   overHero  — transparent, over the dark hero (home, at the top).
  //   brandBar  — solid brand-colour bar (home, once scrolled / menu open).
  //   else      — the light bar on every other page.
  const overHero = isHome && !scrolled && !open;
  const brandBar = isHome && !overHero;
  // The logo + nav text sit on a dark/colour backdrop (white) in both the
  // over-hero and brand-bar states; only the light bar uses dark text.
  const onColor = overHero || brandBar;

  // Palette is locked to Verdant brand-wide, so the logo is fixed.
  const logoSrc = navLogos.verdant;
  // The transparent mark is rendered white on any dark/colour bar (over the
  // hero, on the scrolled brand bar, and on the dark Polestar bar); on the plain
  // light bar of other pages it shows as the coloured mark.
  const logoInvert = onColor || isPolestar;

  // Nav link colors flip to white while the header sits on a dark/colour bar.
  const navLink = (active: boolean) =>
    onColor
      ? active
        ? "font-semibold text-white"
        : "text-white/90 hover:text-white"
      : active
        ? "font-semibold text-primary"
        : "text-foreground/90";

  // Hide the header when scrolling down, reveal it when scrolling up.
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      setScrolled(y > 24);
      // Ignore tiny jitters; always show near the top of the page.
      if (Math.abs(y - lastScrollY.current) > 6) {
        setHidden(goingDown && y > 96);
        lastScrollY.current = y;
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-theme={isPolestar ? "polestar-dark" : undefined}
      className={cn(
        "sticky top-0 z-40 transition-[transform,background-color,border-color] duration-300",
        overHero
          ? "border-b border-transparent bg-transparent text-white"
          : brandBar
            ? "border-b border-transparent bg-primary text-white"
            : "border-b border-border bg-background/85 text-foreground backdrop-blur",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "flex h-20 w-full items-center justify-between gap-3",
          // Home: full-bleed so the bar reaches near the screen edges on large
          // screens. Other pages: the standard centered content width.
          isHome
            ? "px-5 sm:px-8 lg:px-10 xl:px-12"
            : "mx-auto max-w-6xl px-5 sm:px-8",
        )}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center"
            aria-label={`${site.name} — home`}
          >
            <Image
              src={logoSrc}
              alt={site.name}
              width={90}
              height={64}
              priority
              className={cn(
                "h-16 w-auto object-contain transition-[filter]",
                logoInvert && "brightness-0 invert",
              )}
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-haspopup="true"
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-lg font-medium underline-offset-8 transition-colors hover:underline hover:decoration-2",
                    navLink(isActive(pathname, item.href)),
                  )}
                >
                  {item.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="mt-0.5 transition-transform group-hover:rotate-180"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="min-w-48 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                            pathname === child.href
                              ? "font-semibold text-primary"
                              : "text-foreground/80",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-lg font-medium underline-offset-8 transition-colors hover:underline hover:decoration-2",
                  navLink(isActive(pathname, item.href)),
                )}
              >
                {item.label}
              </Link>
            ),
          )}
          <CtaButton
            href={links.book}
            variant={brandBar ? "inverse" : "primary"}
            className="ml-2"
          >
            Book Now
          </CtaButton>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          className={cn(
            "grid h-10 w-10 place-items-center rounded-lg border lg:hidden",
            onColor ? "border-white/40 text-white" : "border-border",
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <div key={item.href} className="flex flex-col">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-muted",
                    isActive(pathname, item.href)
                      ? "font-semibold text-primary"
                      : "text-foreground/90",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 flex flex-col border-l border-border pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                          pathname === child.href
                            ? "font-semibold text-primary"
                            : "text-foreground/75",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <CtaButton
              href={links.book}
              size="lg"
              className="mt-3"
            >
              Book Now
            </CtaButton>
          </Container>
        </div>
      )}
    </header>
  );
}
