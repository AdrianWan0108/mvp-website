"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CtaButton } from "./cta-button";
import { mainNav, site, type NavItem } from "@/app/lib/site";
import { links } from "@/app/lib/links";
import { brandLogos } from "@/app/lib/images";
import { cn } from "@/app/lib/cn";

function matchesPath(pathname: string, target: string): boolean {
  return target === "/" ? pathname === "/" : pathname.startsWith(target);
}

function isActive(pathname: string | null, item: NavItem): boolean {
  if (!pathname) return false;
  const targets = [
    item.match ?? item.href,
    ...(item.children?.map((child) => child.href) ?? []),
  ];
  return targets.some((target) => matchesPath(pathname, target));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<{ open: boolean; path: string | null }>({
    open: false,
    path: null,
  });
  const [scrolled, setScrolled] = useState(false);
  const open = menu.open && menu.path === pathname;

  const isEducation = pathname?.startsWith("/education") ?? false;
  const isHome = pathname === "/";
  const overHero = isHome && !scrolled && !open;
  const onDarkSurface = overHero || isEducation;
  const logoSrc = onDarkSurface
    ? brandLogos.primary.white
    : brandLogos.primary.verdant;

  const closeMenu = () => {
    setMenu((current) => ({ ...current, open: false }));
  };

  const toggleMenu = () => {
    setMenu((current) => ({
      open: !(current.open && current.path === pathname),
      path: pathname,
    }));
  };

  const navLink = (active: boolean) =>
    onDarkSurface
      ? active
        ? "font-semibold text-white"
        : "text-white/82 hover:text-white"
      : active
        ? "font-semibold text-brand-700"
        : "text-brand-950/78 hover:text-brand-700";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu((current) => ({ ...current, open: false }));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenu((current) => ({ ...current, open: false }));
      }
    };

    desktop.addEventListener("change", onBreakpointChange);
    return () => desktop.removeEventListener("change", onBreakpointChange);
  }, []);

  return (
    <>
      <header
        data-theme={isEducation ? "education" : undefined}
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out motion-reduce:transition-none",
          overHero
            ? "border-transparent bg-transparent text-white shadow-none"
            : isEducation
              ? "border-white/10 bg-[#111412]/95 text-white shadow-[0_14px_42px_-26px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-brand-200/75 bg-[#fbfaf6]/94 text-brand-950 shadow-[0_14px_38px_-28px_rgba(21,36,31,0.5)] backdrop-blur-xl",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[96rem] items-center justify-between gap-5 px-5 transition-[height,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:px-8 lg:px-10 xl:px-12",
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-24",
          )}
        >
          <Link
            href="/"
            className="group/logo relative z-10 flex shrink-0 items-center rounded-sm focus-visible:outline-offset-8"
            aria-label={`${site.name} — home`}
            onClick={closeMenu}
          >
            <Image
              src={logoSrc}
              alt={site.name}
              width={176}
              height={80}
              priority
              className={cn(
                "w-auto object-contain transition-[height,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logo:-translate-y-0.5 group-hover/logo:scale-[1.025] group-focus-visible/logo:-translate-y-0.5 group-focus-visible/logo:scale-[1.025] motion-reduce:transition-none",
                scrolled ? "h-10 lg:h-11" : "h-11 lg:h-14",
              )}
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    aria-current={pathname === item.href ? "page" : undefined}
                    data-active={isActive(pathname, item)}
                    className={cn(
                      "site-nav-link relative flex items-center gap-1.5 px-3 py-3 text-[0.98rem] font-medium tracking-[0.01em] transition-[color,transform] duration-300 hover:-translate-y-0.5 motion-reduce:transition-none xl:px-3.5",
                      navLink(isActive(pathname, item)),
                    )}
                  >
                    {item.label}
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className="mt-0.5 transition-transform duration-300 ease-out group-hover:rotate-180 group-focus-within:rotate-180 motion-reduce:transition-none"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </Link>
                  <div className="pointer-events-none invisible absolute left-1/2 top-full w-max min-w-72 -translate-x-1/2 -translate-y-1 scale-[0.97] pt-2 opacity-0 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 motion-reduce:transition-none">
                    <ul className="overflow-hidden rounded-xl border border-brand-200/80 bg-[#fbfaf6]/98 p-2 shadow-[0_22px_55px_-24px_rgba(21,36,31,0.45)] backdrop-blur-xl">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "group/drop flex items-center justify-between gap-5 rounded-lg px-3.5 py-3 text-sm text-brand-950/75 transition-[background-color,color,padding] duration-200 hover:bg-brand-100/80 hover:pl-4 hover:text-brand-800",
                              pathname === child.href &&
                                "bg-brand-100/65 font-semibold text-brand-700",
                            )}
                          >
                            <span>{child.label}</span>
                            <span
                              aria-hidden
                              className="translate-x-1 text-brand-500 opacity-0 transition-[opacity,transform] duration-200 group-hover/drop:translate-x-0 group-hover/drop:opacity-100"
                            >
                              →
                            </span>
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
                    "site-nav-link relative px-3 py-3 text-[0.98rem] font-medium tracking-[0.01em] transition-[color,transform] duration-300 hover:-translate-y-0.5 motion-reduce:transition-none xl:px-3.5",
                    navLink(isActive(pathname, item)),
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
            <CtaButton
              href={links.book}
              variant={onDarkSurface ? "inverse" : "primary"}
              className="group/book ml-3 overflow-hidden shadow-[0_10px_24px_-16px_rgba(21,36,31,0.65)]"
            >
              <span>Book Now</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover/book:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </CtaButton>
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className={cn(
              "group/menu relative z-10 grid h-11 w-11 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300 hover:scale-105 active:scale-95 motion-reduce:transition-none lg:hidden",
              onDarkSurface
                ? "border-white/35 text-white hover:bg-white/10"
                : "border-brand-300/80 text-brand-900 hover:bg-brand-100/80",
            )}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-[opacity,transform] duration-200 motion-reduce:transition-none",
                  open && "scale-x-0 opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0.5 left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none",
                  open && "-translate-y-[5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-menu"
          aria-hidden={!open}
          inert={!open}
          className={cn(
            "absolute inset-x-0 top-full z-50 grid overflow-hidden border-t transition-[grid-template-rows,opacity,transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden",
            isEducation
              ? "border-white/10 bg-[#111412]/98 text-white"
              : "border-brand-200/80 bg-[#fbfaf6]/98 text-brand-950",
            open
              ? "visible grid-rows-[1fr] translate-y-0 opacity-100"
              : "pointer-events-none invisible grid-rows-[0fr] -translate-y-2 opacity-0",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <nav
              aria-label="Mobile primary"
              className="mx-auto flex max-h-[calc(100dvh-4rem)] w-full max-w-3xl flex-col overflow-y-auto px-5 py-5 sm:px-8 sm:py-7"
            >
              {mainNav.map((item, index) => (
                <div
                  key={item.href}
                  className={cn(
                    "border-b last:border-b-0",
                    isEducation ? "border-white/10" : "border-brand-200/75",
                    open && "mobile-nav-enter",
                  )}
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center justify-between rounded-sm py-3.5 text-xl font-medium transition-[color,padding] duration-200 hover:pl-1",
                      isEducation
                        ? isActive(pathname, item)
                          ? "text-brand-300"
                          : "text-white/88 hover:text-white"
                        : isActive(pathname, item)
                          ? "text-brand-700"
                          : "text-brand-950/82 hover:text-brand-700",
                    )}
                  >
                    {item.label}
                    <span aria-hidden className="text-base opacity-45">
                      →
                    </span>
                  </Link>
                  {item.children && (
                    <div
                      className={cn(
                        "mb-3 ml-1 flex flex-col border-l pl-4",
                        isEducation ? "border-white/15" : "border-brand-300/80",
                      )}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className={cn(
                            "py-2 text-sm leading-snug transition-[color,transform] duration-200 hover:translate-x-1",
                            isEducation
                              ? pathname === child.href
                                ? "font-semibold text-brand-300"
                                : "text-white/65 hover:text-white"
                              : pathname === child.href
                                ? "font-semibold text-brand-700"
                                : "text-brand-950/60 hover:text-brand-800",
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
                variant={isEducation ? "inverse" : "primary"}
                className={cn("mt-5 w-full", open && "mobile-nav-enter")}
              >
                Book Now <span aria-hidden>→</span>
              </CtaButton>
            </nav>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close navigation menu"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
        className={cn(
          "fixed inset-0 z-40 bg-brand-950/35 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />
    </>
  );
}
