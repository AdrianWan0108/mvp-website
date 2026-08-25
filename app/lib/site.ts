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
  /** One-line supporting copy shown under the label in desktop dropdowns.
   *  Only set on children of `menu: "descriptive"` items. */
  description?: string;
  /** Desktop dropdown presentation. "simple" (default) is a compact list of
   *  labels; "descriptive" gives each row a label + `description` line, which
   *  lets the labels stay short when the destinations need explaining. */
  menu?: "simple" | "descriptive";
  /** Optional dropdown sub-links (desktop) / nested links (mobile). */
  children?: NavItem[];
};

/** Primary navigation — pricing and scheduling are exposed directly so
 *  visitors can reach the studio's main booking tasks without a dropdown.
 *  Polestar lives under About as the credibility/relationship story. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Schedule", href: "/schedule" },
  {
    label: "Teacher Training",
    href: "/education",
    // Descriptive menu: the Polestar programme's full name is far too long to
    // sit in a dropdown row, so the label carries a short form and the
    // description does the explaining.
    menu: "descriptive",
    children: [
      {
        label: "Why Train at MVP",
        href: "/education",
        description: "Our approach, studio, and mentorship",
      },
      {
        label: "Polestar Comprehensive",
        href: "/education/polestar-comprehensive-training",
        description: "The full certification pathway",
      },
    ],
  },
  {
    label: "About",
    href: "/about/studio",
    match: "/about",
    menu: "descriptive",
    children: [
      {
        label: "Studio",
        href: "/about/studio",
        description: "Our space, equipment, and Polestar roots",
      },
      {
        label: "Team",
        href: "/about/team",
        description: "Meet the instructors and staff",
      },
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
      { label: "Teacher Training", href: "/education" },
      {
        label: "Polestar Comprehensive Pilates Teacher Training",
        href: "/education/polestar-comprehensive-training",
      },
    ],
  },
  {
    heading: "Studio",
    items: [
      { label: "Our Studio", href: "/about/studio" },
      { label: "Our Team", href: "/about/team" },
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
