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

  return (
    <footer
      data-theme={footerTheme}
      className={cn(
        "mt-auto border-t border-border text-foreground",
        // A solid surface on the dark themes: bg-muted/40 is 40%-opaque, so over
        // the light page body it composites to a washed gray that kills text
        // contrast. The light theme keeps the subtle translucent tint.
        footerTheme ? "bg-background" : "bg-muted/40",
      )}
    >
      <Container className="grid gap-10 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="inline-flex rounded-sm focus-visible:outline-offset-4"
          >
            <Image
              src={
                isEducation
                  ? brandLogos.primary.white
                  : brandLogos.primary.verdant
              }
              alt={site.name}
              width={220}
              height={100}
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A Polestar-certified Pilates &amp; GYROTONIC&reg; studio in Markham,
            Ontario — movement for strength, mobility, and recovery.
          </p>
          <address className="mt-4 space-y-1 text-sm not-italic">
            <p>{site.address.street}</p>
            <p>
              <a className="hover:text-foreground" href={`tel:${site.phone}`}>
                {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a className="hover:text-foreground" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </address>
        </div>

        {footerNav.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <p className="text-sm font-semibold uppercase tracking-wide">
              {group.heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Polestar-certified studio in Markham, Ontario.</p>
        </Container>
      </div>
    </footer>
  );
}
