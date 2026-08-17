"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import { footerNav, site } from "@/app/lib/site";
import { brandLogos } from "@/app/lib/images";
import { cn } from "@/app/lib/cn";

export function SiteFooter() {
  const pathname = usePathname();
  const isEducation = pathname?.startsWith("/education") ?? false;
  const footerTheme = isEducation ? "education" : undefined;
  const year = new Date().getFullYear();

  // Mirrors the header's per-page width logic: the Teacher Training landing
  // page runs edge-to-edge, home and about/studio use the site's established
  // max-w-[110rem] "wide" convention, everything else stays at max-w-7xl.
  const isAboutStudio = pathname === "/about/studio";
  const footerSize =
    pathname === "/education"
      ? "full"
      : pathname === "/" || isAboutStudio
        ? "extraWide"
        : "default";
  // about/studio's own sections add extra inset at xl/2xl on top of the base
  // px-5 sm:px-8 — match it so the footer doesn't run wider than the content.
  const footerExtraPadding = isAboutStudio ? "xl:px-10 2xl:px-12" : "";

  return (
    <footer
      data-theme={footerTheme}
      className={cn(
        "mt-auto border-t border-white/15 text-white",
        // Both surfaces are dark now — near-black keeps Education's separate
        // brand direction (see the education theme's own comment), while the
        // default site gets a dark Verdant instead of the old pale tint.
        footerTheme ? "bg-background" : "bg-brand-900",
      )}
    >
      <Container
        size={footerSize}
        className={cn(
          "grid gap-10 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]",
          footerExtraPadding,
        )}
      >
        <div>
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="inline-flex rounded-sm focus-visible:outline-offset-4"
          >
            <Image
              src={brandLogos.scriptLockup.white}
              alt={site.name}
              width={220}
              height={100}
              className="h-24 w-auto object-contain"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            A Polestar-certified Pilates &amp; GYROTONIC&reg; studio in Markham,
            Ontario — movement for strength, mobility, and recovery.
          </p>
          <address className="mt-4 space-y-1 text-sm not-italic text-white/85">
            <p>{site.address.street}</p>
            <p>
              <a className="hover:text-white" href={`tel:${site.phone}`}>
                {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a className="hover:text-white" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </address>
        </div>

        {footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">
              {group.heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-white/15">
        <Container
          size={footerSize}
          className={cn(
            "flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row",
            footerExtraPadding,
          )}
        >
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Polestar-certified studio in Markham, Ontario.</p>
        </Container>
      </div>
    </footer>
  );
}
