import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { site } from "./lib/site";

/* Locked brand pairing: Bebas Neue headings + DM Sans body. Each face is loaded
   as a CSS variable; globals.css maps them onto the heading/body tokens. */

// Heading — Bebas Neue
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

// Body — DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fontVariables = [bebas.variable, dmSans.variable].join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Pilates & GYROTONIC® Studio in Markham`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Pilates Markham",
    "Reformer Pilates Markham",
    "GYROTONIC Markham",
    "Polestar Pilates Toronto",
    "Pilates teacher training Toronto",
    "rehabilitation Pilates",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Pilates & GYROTONIC® Studio in Markham`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: ["Markham", "Toronto", "Richmond Hill", "Unionville"],
  sameAs: [site.social.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="verdant"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </body>
    </html>
  );
}
