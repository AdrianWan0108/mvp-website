/**
 * Central business + navigation config.
 *
 * Single source of truth for NAP (name / address / phone), nav structure,
 * and brand strings. Anything the client may correct lives here so updates
 * are one-file changes. Items marked TODO need confirmation from the client.
 */

export const site = {
  name: "Motion Vitality Pilates",
  shortName: "MVP",
  tagline: "Strong Mind Starts with a Fit Body",
  description:
    "Motion Vitality Pilates is a Polestar-certified Pilates and GYROTONIC® studio in Markham, Ontario, offering reformer, mat, rehab, and teacher-training programs for every body.",
  url: "https://www.motionvitalitypilates.com",

  phone: "+16475883098",
  phoneDisplay: "647-588-3098",
  email: "info@MotionVitalityPilates.com",

  address: {
    street: "Unit 3, 7780 Woodbine Avenue",
    locality: "Markham",
    region: "ON",
    country: "CA",
    postalCode: "L3R 2N7",
  },

  // TODO: confirm hours with the client
  hours: [
    { days: "Monday – Friday", time: "7:00 AM – 9:00 PM" },
    { days: "Saturday – Sunday", time: "8:00 AM – 4:00 PM" },
  ],

  social: {
    // TODO: confirm handle/URL
    instagram: "https://www.instagram.com/motionvitalitypilates/",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Optional path prefix for active-state matching when it differs from href
   *  (e.g. "About" stays active across all /about/* pages). */
  match?: string;
  /** Optional dropdown sub-links (desktop) / nested links (mobile). */
  children?: NavItem[];
};

/** Primary navigation — Studio and Education are MVP's two parallel business
 *  directions (equal-weight items); Polestar lives under About as the
 *  credibility/relationship story, not a direction of its own. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Studio",
    href: "/classes",
    match: "/classes",
    children: [
      { label: "Classes", href: "/classes" },
      { label: "Schedule", href: "/classes/schedule" },
    ],
  },
  {
    label: "Education",
    href: "/education",
    children: [
      { label: "Overview", href: "/education" },
      {
        label: "Polestar Comprehensive Pilates Teacher Training",
        href: "/education/polestar-comprehensive-training",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    match: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "MVP × Polestar", href: "/about/polestar" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/** Footer link groups — policies live here, not in the main nav. */
export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Explore",
    items: [
      { label: "Studio", href: "/classes" },
      { label: "Education", href: "/education" },
      {
        label: "Polestar Comprehensive Pilates Teacher Training",
        href: "/education/polestar-comprehensive-training",
      },
    ],
  },
  {
    heading: "Studio",
    items: [
      { label: "About", href: "/about" },
      { label: "MVP × Polestar", href: "/about/polestar" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Policies",
    items: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Emergency & Sickness", href: "/policies" },
    ],
  },
];
