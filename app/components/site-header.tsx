"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Award, Building2, Compass, Users } from "lucide-react";
import { CtaButton } from "./cta-button";
import { mainNav, site, type NavItem } from "@/app/lib/site";
import { brandLogos } from "@/app/lib/images";
import { cn } from "@/app/lib/cn";

// Maps the icon *name* stored in site.ts to the actual lucide component —
// site.ts stays a plain data file rather than importing React components.
const dropdownIcons = { Compass, Award, Building2, Users } satisfies Record<
  NonNullable<NavItem["icon"]>,
  React.ComponentType<{ className?: string }>
>;

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

  // Desktop dropdown, keyed by the parent item's href. Held in state rather
  // than pure `group-hover` so the close can be delayed — a diagonal cursor
  // path toward an off-centre child link used to slip outside the group and
  // snap the menu shut. Also lets the trigger expose aria-expanded.
  // Stored with the path it was opened on so a navigation implicitly dismisses
  // it — the panel used to stay up after a child link navigated, since the
  // cursor never leaves it and no mouseleave ever fires.
  const [dropdown, setDropdown] = useState<{ href: string; path: string | null }>(
    { href: "", path: null },
  );
  const openMenu = dropdown.path === pathname ? dropdown.href : "";
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openDropdown = useCallback(
    (href: string) => {
      cancelClose();
      setDropdown({ href, path: pathname });
    },
    [cancelClose, pathname],
  );

  const closeDropdown = useCallback(() => {
    cancelClose();
    setDropdown({ href: "", path: null });
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(
      () => setDropdown({ href: "", path: null }),
      120,
    );
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    if (!openMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdown();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openMenu, closeDropdown]);

  const isEducation = pathname?.startsWith("/education") ?? false;
  const isHome = pathname === "/";
  const overHero = isHome && !scrolled && !open;
  const onDarkSurface = overHero || isEducation;
  const logoSrc = onDarkSurface
    ? brandLogos.primary.white
    : brandLogos.primary.verdant;

  // Bar width matches whatever the page's own sections are doing: the
  // education landing page (Teacher Training) runs its showcase sections
  // edge-to-edge, home and about/studio use the site's established
  // max-w-[110rem] "wide" convention, and everything else keeps the
  // standard max-w-7xl Container width.
  const isAboutStudio = pathname === "/about/studio";
  const barMaxWidth =
    pathname === "/education"
      ? ""
      : isHome || isAboutStudio
        ? "max-w-[110rem]"
        : "max-w-7xl";
  // about/studio's own sections add extra inset at xl/2xl on top of the base
  // px-5 sm:px-8 — match it so the bar doesn't run wider than the content.
  const barExtraPadding = isAboutStudio ? "xl:px-10 2xl:px-12" : "";

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

  // The dropdown panel follows the bar it hangs from. Previously it was
  // hardcoded cream, so over the home hero and on the dark /education header
  // a white trigger opened a light panel — a hard theme break mid-interaction.
  const panelSurface = onDarkSurface
    ? "border-white/12 bg-[#111412]/97 shadow-[0_22px_55px_-24px_rgba(0,0,0,0.85)]"
    : "border-brand-200/80 bg-[#fbfaf6]/98 shadow-[0_22px_55px_-24px_rgba(21,36,31,0.45)]";

  const panelItem = (active: boolean) =>
    onDarkSurface
      ? active
        ? "bg-white/10 font-semibold text-white"
        : "text-white/72 hover:bg-white/8 hover:text-white"
      : active
        ? "bg-brand-100/65 font-semibold text-brand-700"
        : "text-brand-950/75 hover:bg-brand-100/80 hover:text-brand-800";

  const panelDescription = onDarkSurface ? "text-white/65" : "text-brand-950/65";

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
          "fixed top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out motion-reduce:transition-none lg:sticky",
          overHero
            ? "border-transparent bg-transparent text-white shadow-none"
            : isEducation
              ? "border-white/10 bg-[#111412]/95 text-white shadow-[0_14px_42px_-26px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-brand-200/75 bg-[#fbfaf6]/94 text-brand-950 shadow-[0_14px_38px_-28px_rgba(21,36,31,0.5)] backdrop-blur-xl",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-16 w-full items-center justify-between gap-5 px-5 sm:px-8 lg:h-[4.5rem]",
            barMaxWidth,
            barExtraPadding,
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
              className="h-10 w-auto object-contain transition-transform duration-300 ease-out group-hover/logo:-translate-y-0.5 group-hover/logo:scale-[1.025] group-focus-visible/logo:-translate-y-0.5 group-focus-visible/logo:scale-[1.025] motion-reduce:transition-none lg:h-11"
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {mainNav.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openDropdown(item.href)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => openDropdown(item.href)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                      closeDropdown();
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    data-active={isActive(pathname, item)}
                    // Enter still navigates to the section landing page, but
                    // the panel opens on focus and the overview row repeats
                    // that destination, so keyboard users never lose it.
                    className={cn(
                      "site-nav-link relative flex items-center gap-1.5 px-3 py-3 text-[0.98rem] font-medium tracking-[0.01em] transition-colors duration-300 motion-reduce:transition-none xl:px-3.5",
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
                      className={cn(
                        "mt-0.5 transition-transform duration-300 ease-out motion-reduce:transition-none",
                        openMenu === item.href && "rotate-180",
                      )}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </Link>
                  <div
                    className={cn(
                      // Anchored to the trigger's leading edge rather than
                      // centred — a centred panel under a wide label reads as
                      // floating, and About sits close enough to the CTA that
                      // a centred wide panel crowded it.
                      "absolute left-0 top-full pt-2 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      item.menu === "descriptive" ? "w-80" : "w-56",
                      openMenu === item.href
                        ? "visible translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none invisible -translate-y-1 scale-[0.97] opacity-0",
                    )}
                  >
                    <ul
                      className={cn(
                        "overflow-hidden rounded-xl border p-2 backdrop-blur-xl",
                        panelSurface,
                      )}
                    >
                      {item.children.map((child) => {
                        const Icon = child.icon
                          ? dropdownIcons[child.icon]
                          : null;
                        const active = pathname === child.href;

                        return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeDropdown}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "group/drop flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-[background-color,color] duration-200",
                              panelItem(active),
                            )}
                          >
                            {Icon && (
                              <Icon
                                aria-hidden
                                className={cn(
                                  "size-[18px] shrink-0",
                                  onDarkSurface
                                    ? "text-white/60"
                                    : "text-brand-500",
                                )}
                              />
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold leading-snug">
                                {child.label}
                              </span>
                              {child.description && (
                                <span
                                  className={cn(
                                    "mt-0.5 block text-xs font-medium leading-snug",
                                    panelDescription,
                                  )}
                                >
                                  {child.description}
                                </span>
                              )}
                            </span>
                            <span
                              aria-hidden
                              className={cn(
                                "shrink-0 translate-x-1 opacity-0 transition-[opacity,transform] duration-200 group-hover/drop:translate-x-0 group-hover/drop:opacity-100 motion-reduce:transition-none",
                                onDarkSurface ? "text-white/70" : "text-brand-500",
                              )}
                            >
                              →
                            </span>
                          </Link>
                        </li>
                        );
                      })}
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
                    "site-nav-link relative px-3 py-3 text-[0.98rem] font-medium tracking-[0.01em] transition-colors duration-300 motion-reduce:transition-none xl:px-3.5",
                    navLink(isActive(pathname, item)),
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
            {/* Points at the studio's own schedule page rather than straight
                out to Mindbody — the schedule is where the week's classes and
                the booking hand-off both live. */}
            <CtaButton
              href="/schedule"
              square
              arrow
              variant={onDarkSurface ? "inverse" : "primary"}
              className="ml-3"
            >
              Book a Class
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
                href="/schedule"
                size="lg"
                square
                arrow
                variant={isEducation ? "inverse" : "primary"}
                className={cn("mt-5 w-full", open && "mobile-nav-enter")}
              >
                Book a Class
              </CtaButton>
            </nav>
          </div>
        </div>
      </header>

      {/* Keep mobile pages in normal document flow while the fixed header and
          its menu remain reachable at every scroll position. The home hero's
          matching negative margin still lets its image run behind the bar. */}
      <div aria-hidden className="h-20 shrink-0 lg:hidden" />

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
