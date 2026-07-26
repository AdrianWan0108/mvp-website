/**
 * Pricing — single source of truth.
 *
 * Every option sold through Mindbody lives here. Adding, removing, or
 * repricing an option is a one-file change; the page and cards render
 * whatever this file exports, in the order `pricingSections` declares.
 *
 * `serviceId` is the Mindbody pricing-option id that the healcode buy
 * button loads (see app/components/pricing/buy-now-widget.tsx). The site
 * ids are constant across every option and live with the widget, not here.
 *
 * Private sessions are booked with an instructor rather than checked out
 * online, so they are a separate shape with no serviceId — see
 * `privateOptions`.
 */

export type PricingInterval = "once" | "month";

export type PricingSectionId =
  | "new-here"
  | "group-packs"
  | "memberships"
  | "seniors";

export type PricingOption = {
  key: string;
  serviceId: string;
  name: string;
  price: number;
  interval: PricingInterval;
  /** Singular noun for what `count` counts; pluralized for display. */
  unit?: string;
  count?: number;
  /** Bare duration, e.g. "4 weeks" — rendered as "Valid 4 weeks". */
  validity?: string;
  perUnit?: string;
  section: PricingSectionId;
  badge?: string;
  note?: string;
};

export const pricingSections: {
  id: PricingSectionId;
  heading: string;
  description: string;
}[] = [
  {
    id: "new-here",
    heading: "New here",
    description: "Two ways to try the studio, priced for a first visit.",
  },
  {
    id: "group-packs",
    heading: "Group class packs",
    description:
      "Reformer and group classes, from a single drop-in to a full year.",
  },
  {
    id: "memberships",
    heading: "Memberships",
    description: "Unlimited group classes, billed monthly.",
  },
  {
    id: "seniors",
    heading: "Seniors",
    description: "Ten-session packs at a reduced rate for our senior members.",
  },
];

export const pricingOptions: PricingOption[] = [
  // ---------- New here ----------
  {
    key: "intro-group-class",
    serviceId: "100033",
    name: "Intro group class",
    price: 20,
    interval: "once",
    unit: "class",
    count: 1,
    validity: "2 weeks",
    perUnit: "$20 / class",
    section: "new-here",
    note: "New clients only",
  },
  {
    key: "power-starter-pack",
    serviceId: "100003",
    name: "Power Starter Pack",
    price: 110,
    interval: "once",
    unit: "class",
    count: 4,
    validity: "4 weeks",
    perUnit: "$27.50 / class",
    section: "new-here",
    note: "New clients only",
  },

  // ---------- Group class packs ----------
  {
    key: "group-reformer-drop-in",
    serviceId: "100022",
    name: "Group Reformer drop-in",
    price: 37,
    interval: "once",
    unit: "class",
    count: 1,
    perUnit: "$37 / class",
    section: "group-packs",
  },
  {
    key: "reformer-10-pack",
    serviceId: "100049",
    name: "Reformer 10 pack",
    price: 350,
    interval: "once",
    unit: "class",
    count: 10,
    validity: "13 weeks",
    perUnit: "$35 / class",
    section: "group-packs",
  },
  {
    key: "loyalty-20",
    serviceId: "100031",
    name: "Loyalty 20",
    price: 600,
    interval: "once",
    unit: "class",
    count: 20,
    validity: "25 weeks",
    perUnit: "$30 / class",
    section: "group-packs",
    badge: "Most popular",
  },
  {
    key: "loyalty-30",
    serviceId: "100030",
    name: "Loyalty 30",
    price: 870,
    interval: "once",
    unit: "class",
    count: 30,
    validity: "40 weeks",
    perUnit: "$29 / class",
    section: "group-packs",
  },
  {
    key: "loyalty-40",
    serviceId: "100029",
    name: "Loyalty 40",
    price: 1120,
    interval: "once",
    unit: "class",
    count: 40,
    validity: "52 weeks",
    perUnit: "$28 / class",
    section: "group-packs",
  },

  // ---------- Memberships ----------
  // Names keep their parenthetical: it is the only thing distinguishing the
  // two founding memberships, and it matches the Mindbody product listing
  // (which BuyNowWidget also reports as the GA4 item_name).
  {
    key: "founding-membership-12-month",
    serviceId: "100038",
    name: "Founding membership (12-month term)",
    price: 250,
    interval: "month",
    section: "memberships",
  },
  {
    key: "founding-membership-rolling",
    serviceId: "100",
    name: "Founding membership (unlimited, rolling)",
    price: 250,
    interval: "month",
    section: "memberships",
  },
  {
    key: "monthly-unlimited",
    serviceId: "100041",
    name: "Monthly unlimited (no commitment)",
    price: 300,
    interval: "month",
    section: "memberships",
  },

  // ---------- Seniors ----------
  {
    key: "senior-reformer-10",
    serviceId: "100039",
    name: "Senior Reformer",
    price: 270,
    interval: "once",
    unit: "session",
    count: 10,
    validity: "13 weeks",
    perUnit: "$27 / class",
    section: "seniors",
  },
  {
    key: "senior-fitness-10",
    serviceId: "100058",
    name: "Senior Fitness",
    price: 150,
    interval: "once",
    unit: "session",
    count: 10,
    perUnit: "$15 / class",
    section: "seniors",
  },
];

/**
 * One-on-one training. Booked with an instructor, so these carry a price
 * range rather than a single checkout amount and link to the schedule
 * instead of a Mindbody buy button.
 */
export type PrivateOption = {
  key: string;
  name: string;
  priceLabel: string;
  note?: string;
};

export const privateSection = {
  heading: "One-on-one training",
  description: "Private and semi-private sessions, one instructor to you.",
  intro:
    "Private sessions are booked directly with an instructor. Choose your time and package at booking.",
  /** The studio schedule lives under /classes; #private anchors the section. */
  href: "/classes/schedule#private",
  cta: "Book a private",
} as const;

export const privateOptions: PrivateOption[] = [
  {
    key: "private-pilates",
    name: "Private Pilates",
    priceLabel: "from $100 single, $950 for 10 sessions",
  },
  {
    key: "private-gyrotonic",
    name: "Private Gyrotonic",
    priceLabel: "from $100 single, $950 for 10 sessions",
  },
  {
    key: "semi-private",
    name: "Semi-private",
    priceLabel: "$130 per session, $1,300 for 10",
    note: "Price per person",
  },
];

/* ---------- Display helpers ---------- */

// Whole-dollar options render without cents; anything with a fractional
// amount keeps both digits. Intl does the rounding, so no float artifacts.
const wholeDollars = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const withCents = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats a price in Canadian dollars, e.g. 1120 -> "$1,120". */
export function formatPrice(value: number): string {
  return Number.isInteger(value)
    ? wholeDollars.format(value)
    : withCents.format(value);
}

/** Nouns ending in a sibilant take "-es": class -> classes, not "classs". */
function pluralize(noun: string, count: number): string {
  if (count === 1) return noun;
  return /(?:s|x|z|ch|sh)$/i.test(noun) ? `${noun}es` : `${noun}s`;
}

/** Small label above the option name: "10 classes", "1 class", "Membership". */
export function optionLabel(option: PricingOption): string {
  if (option.count && option.unit) {
    return `${option.count} ${pluralize(option.unit, option.count)}`;
  }
  return option.interval === "month" ? "Membership" : "";
}

/** Term line under the price: pack expiry, or the billing cadence. */
export function optionTerm(option: PricingOption): string | null {
  if (option.validity) return `Valid ${option.validity}`;
  return option.interval === "month" ? "Billed monthly" : null;
}

/** Options for one section, in declaration order. */
export function optionsForSection(section: PricingSectionId): PricingOption[] {
  return pricingOptions.filter((option) => option.section === section);
}
