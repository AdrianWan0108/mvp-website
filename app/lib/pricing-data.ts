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
 *
 * Display strings are DERIVED, not stored: the per-class rate and the saving
 * against drop-in are both computed from `price` and `count` (see the helpers
 * at the bottom). A reprice is therefore a single number edit and can never
 * leave a stale "$30 / class" behind.
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
  section: PricingSectionId;
  badge?: string;
  /** One-sentence "best for". Provisional copy — rewrite freely. */
  blurb: string;
  /** Who may buy this, e.g. "New clients only". Verified notes only. */
  eligibility?: string;
  /** Memberships: the term being agreed to. Shown as the deciding difference. */
  commitment?: string;
  /**
   * Omit (or `true`) to sell the option on the website. `false` keeps the row
   * here — and the product untouched in Mindbody — while hiding it from every
   * public selector. See `founding-membership-rolling`.
   */
  public?: boolean;
  /** Short label for this option's selector button. Falls back to `name`. */
  selectorLabel?: string;
};

export type PricingSection = {
  id: PricingSectionId;
  heading: string;
  description: string;
  /** Visible question above the selector; also labels the radiogroup. */
  selectorLabel: string;
  /** `scale` is the 1→40 rail; `segmented` is a row of buttons. */
  selector: "segmented" | "scale";
  /**
   * Show "save $N vs drop-in". Only meaningful where the pack buys the same
   * class the drop-in buys — intro packs are a promotional rate for new
   * clients and seniors have their own rate, so neither compares cleanly.
   */
  showSavings?: boolean;
};

export const pricingSections: PricingSection[] = [
  {
    id: "new-here",
    heading: "New here",
    description: "Two ways to try the studio, priced for a first visit.",
    selectorLabel: "How would you like to start?",
    selector: "segmented",
  },
  {
    id: "group-packs",
    heading: "Group class packs",
    description:
      "Reformer and group classes, from a single drop-in to a full year. The more classes you buy up front, the less each one costs.",
    selectorLabel: "How many classes would you like?",
    selector: "scale",
    showSavings: true,
  },
  {
    id: "memberships",
    heading: "Memberships",
    description:
      "Unlimited group classes, billed monthly. Both options give you the same access — the difference is how long you commit.",
    selectorLabel: "How long would you like to commit?",
    selector: "segmented",
  },
  {
    id: "seniors",
    heading: "Seniors",
    description: "Ten-session packs at a reduced rate for our senior members.",
    selectorLabel: "Which class would you like?",
    selector: "segmented",
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
    section: "new-here",
    selectorLabel: "1 class",
    blurb: "The cheapest way to see whether the studio suits you.",
    eligibility: "New clients only, once per person",
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
    section: "new-here",
    selectorLabel: "4 classes",
    blurb: "Enough sessions to learn the reformer and feel a difference.",
    eligibility: "New clients only, once per person",
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
    section: "group-packs",
    blurb: "A single class, no commitment. Best if you visit occasionally.",
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
    section: "group-packs",
    blurb: "A steady start — roughly one class a week over a season.",
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
    section: "group-packs",
    badge: "Most popular",
    blurb: "Our most-chosen pack, and the first real drop in price per class.",
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
    section: "group-packs",
    blurb: "For a regular twice-a-week habit across most of the year.",
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
    section: "group-packs",
    blurb: "The lowest price per class we offer, spread over a full year.",
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
    selectorLabel: "12-month term",
    commitment: "12-month term",
    blurb: "A lower monthly rate in exchange for committing to a year.",
  },
  {
    // HIDDEN FROM THE PUBLIC WEBSITE pending confirmation from Gary.
    // Deliberately kept here, and untouched in Mindbody — `public: false`
    // only removes it from the site's selectors. Note its serviceId is three
    // digits where every other option is six; that is part of what needs
    // confirming before it goes back on sale.
    key: "founding-membership-rolling",
    serviceId: "100",
    name: "Founding membership (unlimited, rolling)",
    price: 250,
    interval: "month",
    section: "memberships",
    public: false,
    selectorLabel: "Rolling",
    commitment: "Rolling",
    blurb: "",
  },
  {
    key: "monthly-unlimited",
    serviceId: "100041",
    name: "Monthly unlimited (no commitment)",
    price: 300,
    interval: "month",
    section: "memberships",
    selectorLabel: "No commitment",
    commitment: "No commitment",
    blurb: "The same unlimited access, month to month, with no term.",
  },

  // ---------- Seniors ----------
  // TO CONFIRM WITH GARY: Senior Fitness has no stated validity period, and
  // neither senior option has a confirmed age or assessment requirement. The
  // optional `validity` and `eligibility` fields are where those belong —
  // filling them in here is all the card needs to start showing them.
  {
    key: "senior-reformer-10",
    serviceId: "100039",
    name: "Senior Reformer",
    price: 270,
    interval: "once",
    unit: "session",
    count: 10,
    validity: "13 weeks",
    section: "seniors",
    selectorLabel: "Senior Reformer",
    blurb: "Reformer work at a gentler pace, in a smaller group.",
  },
  {
    key: "senior-fitness-10",
    serviceId: "100058",
    name: "Senior Fitness",
    price: 150,
    interval: "once",
    unit: "session",
    count: 10,
    section: "seniors",
    selectorLabel: "Senior Fitness",
    blurb: "Mat-based strength, balance, and mobility without the reformer.",
  },
];

/**
 * One-on-one training. Booked with an instructor rather than checked out
 * online, so these carry no serviceId and link to the schedule instead of a
 * Mindbody buy button.
 */
export type PrivateOption = {
  key: string;
  name: string;
  blurb: string;
  singlePrice: number;
  /** "from" when the single-session price is a starting rate, not a fixed one. */
  singleQualifier?: "from";
  tenPrice: number;
  /** Verified notes only — e.g. semi-private pricing being per person. */
  note?: string;
};

export const privateSection = {
  id: "private",
  heading: "One-on-one training",
  description: "Private and semi-private sessions, one instructor to you.",
  intro:
    "Private sessions are booked directly with an instructor. Choose your time and package at booking.",
  selectorLabel: "Which session would you like?",
  /** The studio schedule lives under /classes; #private anchors the section. */
  href: "/classes/schedule#private",
  cta: "Book a private",
} as const;

export const privateOptions: PrivateOption[] = [
  {
    key: "private-pilates",
    name: "Private Pilates",
    blurb: "A full session built around your body, at whatever pace suits you.",
    singlePrice: 100,
    singleQualifier: "from",
    tenPrice: 950,
  },
  {
    key: "private-gyrotonic",
    name: "Private GYROTONIC®",
    blurb: "Circular, flowing movement on the GYROTONIC® tower, one to one.",
    singlePrice: 100,
    singleQualifier: "from",
    tenPrice: 950,
  },
  {
    key: "semi-private",
    name: "Semi-private",
    blurb: "Train alongside a partner and share the instructor's attention.",
    singlePrice: 130,
    tenPrice: 1300,
    note: "Price per person",
  },
];

/**
 * Purchase terms shown near the bottom of the pricing page. Kept here so the
 * wording is edited in one place rather than in the markup.
 *
 * TO CONFIRM WITH GARY: the studio's own price list corroborates the HST,
 * new-client, 13-week validity, and availability lines. The refund, transfer,
 * cancellation, and waiver lines should be checked against the final Terms &
 * Conditions once /terms is written.
 */
export const purchaseTerms = [
  "All prices are in Canadian dollars and do not include 13% HST.",
  "Packages are non-refundable and non-transferable.",
  "Sessions cannot be transferred or shared between clients.",
  "Packages must be used within their stated validity period.",
  "A 24-hour cancellation policy applies to all bookings.",
  "Late cancellations and missed sessions are charged.",
  "Classes are subject to availability.",
  "Please complete the required health assessment and waiver before your first session.",
] as const;

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

/** Options for one section, in declaration order — including hidden ones. */
export function optionsForSection(section: PricingSectionId): PricingOption[] {
  return pricingOptions.filter((option) => option.section === section);
}

/** What the website actually sells: `optionsForSection` minus `public: false`. */
export function publicOptionsForSection(
  section: PricingSectionId,
): PricingOption[] {
  return optionsForSection(section).filter((option) => option.public !== false);
}

/** Look up one option by key. Undefined for an unknown or hidden-away key. */
export function optionByKey(key: string): PricingOption | undefined {
  return pricingOptions.find((option) => option.key === key);
}

/**
 * The single-class price every pack is measured against. Read from the
 * drop-in option rather than written as a literal, so repricing the drop-in
 * re-derives every "save $N" on the page.
 */
const dropIn = pricingOptions.find(
  (option) => option.key === "group-reformer-drop-in",
);

export const dropInPrice = dropIn?.price ?? 0;

/** Rate line under the price: "$28 / class". Null when there is nothing to divide. */
export function formatPerUnit(option: PricingOption): string | null {
  if (!option.count || !option.unit || option.count < 1) return null;
  // Rate is quoted per class even where the pack counts "sessions" — that is
  // how the studio's own price list phrases it.
  return `${formatPrice(option.price / option.count)} / class`;
}

/**
 * Dollars saved against buying the same number of drop-ins. Null when the
 * comparison does not hold: single classes, or no count at all.
 */
export function savingsVsDropIn(option: PricingOption): number | null {
  if (!option.count || option.count < 2 || !dropInPrice) return null;
  const saving = option.count * dropInPrice - option.price;
  return saving > 0 ? saving : null;
}
