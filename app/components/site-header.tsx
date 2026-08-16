"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "./container";
import { CtaButton } from "./cta-button";
import { mainNav, site, type NavItem } from "@/app/lib/site";
import { links } from "@/app/lib/links";
import { navLogos } from "@/app/lib/images";
import { cn } from "@/app/lib/cn";

function matchesPath(pathname: string, target: string): boolean {
  return target === "/" ? pathname === "/" : pathname.startsWith(target);
}

function isActive(pathname: string | null, item: NavItem): boolean {
  if (!pathname) return false;
  // `match` lets a parent highlight for a whole segment (About → /about,
  // active on all /about/*, including /about/polestar). A parent also
  // highlights when one of its dropdown children is active.
  const targets = [
    item.match ?? item.href,
    ...(item.children?.map((child) => child.href) ?? []),
  ];
  return targets.some((target) => matchesPath(pathname, target));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  // Education routes use the professional ink theme. All other routes,
  // including MVP × Polestar, remain inside the shared Verdant system.
  const isEducation = pathname?.startsWith("/education") ?? false;
  const headerTheme = isEducation ? "education" : undefined;
  // The home hero runs full-bleed behind the header — sit transparent over it
  // until the user scrolls.
  const isHome = pathname === "/";
  // Three header backdrops:
  //   overHero  — transparent, over the dark hero (home, at the top).
  //   brandBar  — translucent brand glass (home, once scrolled / menu open).
  //   else      — theme-tinted glass on every other page.
  const overHero = isHome && !scrolled && !open;
  const brandBar = isHome && !overHero;
  // The logo + nav text sit on a dark/colour backdrop (white) in both the
  // over-hero and brand-bar states; only the light bar uses dark text.
  const onColor = overHero || brandBar;

  // Palette is locked to Verdant brand-wide, so the logo is fixed.
  const logoSrc = navLogos.verdant;
  // The transparent mark is rendered white on any dark/colour bar (over the
  // hero, on the scrolled brand bar, and on the dark Education bar); on the
  // plain light bar of other pages it shows as the coloured mark.
  const logoInvert = onColor || isEducation;

  // Nav link colors flip to white while the header sits on a dark/colour bar.
  const navLink = (active: boolean) =>
    onColor
      ? active
        ? "font-semibold text-white"
        : "text-white/90 hover:text-white"
      : active
        ? "font-semibold text-primary"
        : "text-foreground/90 hover:text-primary";

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
      data-theme={headerTheme}
      className={cn(
        "sticky top-0 z-40 transition-[transform,background-color,border-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none",
        overHero
          ? "border-b border-transparent bg-transparent text-white shadow-none backdrop-blur-none"
          : brandBar
            ? "border-b border-white/20 bg-primary/[0.78] text-white shadow-[0_10px_30px_-18px_rgba(15,35,24,0.7)] backdrop-blur-xl"
            : isEducation
              ? "border-b border-primary/25 bg-[#111a15]/[0.94] text-foreground shadow-[0_10px_30px_-18px_rgba(17,45,31,0.85)] backdrop-blur-xl"
              : "border-b border-border/70 bg-background/[0.78] text-foreground shadow-[0_10px_30px_-20px_rgba(34,61,47,0.45)] backdrop-blur-xl",
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
            : "mx-auto max-w-7xl px-5 sm:px-8",
        )}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center"
            aria-label={`${site.name} — home`}
          >
            <Image
              src={logoSrc}
              alt={site.name}
              width={104}
              height={80}
              priority
              className={cn(
                "h-[4.75rem] w-auto origin-left object-contain transition-[filter,transform] duration-300 group-hover:scale-[1.015] group-focus-visible:scale-[1.015] motion-reduce:transition-none lg:h-20",
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
                  aria-current={pathname === item.href ? "page" : undefined}
                  data-active={isActive(pathname, item)}
                  className={cn(
                    "site-nav-link relative flex items-center gap-1 px-3 py-2 text-lg font-medium transition-colors duration-200 motion-reduce:transition-none",
                    navLink(isActive(pathname, item)),
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
                    className="mt-0.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180 motion-reduce:transition-none"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Link>
                <div className="pointer-events-none invisible absolute left-0 top-full translate-y-1 pt-2 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none">
                  <ul className="w-64 rounded-xl border border-border/80 bg-card/90 p-1.5 shadow-xl backdrop-blur-xl">
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
                aria-current={pathname === item.href ? "page" : undefined}
                data-active={isActive(pathname, item)}
                className={cn(
                  "site-nav-link relative px-3 py-2 text-lg font-medium transition-colors duration-200 motion-reduce:transition-none",
                  navLink(isActive(pathname, item)),
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
            "grid h-10 w-10 place-items-center rounded-lg border transition-[transform,background-color,border-color] duration-200 hover:scale-[1.03] active:scale-95 motion-reduce:transition-none lg:hidden",
            onColor
              ? "border-white/40 text-white hover:bg-white/10"
              : "border-border text-foreground hover:bg-muted/70",
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

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "grid overflow-hidden bg-inherit transition-[grid-template-rows,opacity,border-color] duration-200 ease-out motion-reduce:transition-none lg:hidden",
          open
            ? "grid-rows-[1fr] border-t border-border/60 opacity-100"
            : "pointer-events-none grid-rows-[0fr] border-t border-transparent opacity-0",
        )}
      >
        <div
          className="min-h-0 overflow-hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <div key={item.href} className="flex flex-col">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-muted",
                    isActive(pathname, item)
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
      </div>
    </header>
  );
}
