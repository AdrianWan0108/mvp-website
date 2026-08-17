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

/**
 * Everything the pricing page can select within or scroll to: the four
 * Mindbody sections plus one-on-one training, which is booked rather than
 * bought and so is not a PricingSectionId.
 */
export type PricingScope = PricingSectionId | "private";

export type PricingOption = {
  key: string;
  serviceId: string;
  name: string;
  /** Short comparison-card title when the Mindbody product name is verbose. */
  shortName?: string;
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
  /** Concrete inclusions or outcomes shown inside the selected pricing card. */
  highlights?: string[];
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
};

export type PricingSection = {
  id: PricingSectionId;
  heading: string;
  description: string;
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
  },
  {
    id: "group-packs",
    heading: "Group class packs",
    description: "Choose a single drop-in or save with a larger class pack.",
    showSavings: true,
  },
  {
    id: "memberships",
    heading: "Memberships",
    description:
      "Unlimited group classes with a fixed-term or flexible monthly option.",
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
    section: "new-here",
    blurb:
      "A low-commitment first visit to meet the studio, try the equipment, and experience our teaching style.",
    highlights: [
      "One guided group session on professional equipment",
      "Polestar-certified instruction with form-focused cueing",
      "A simple way to find the class format that fits you",
    ],
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
    blurb:
      "Four visits give you time to learn the reformer, try our signature group formats, and begin building confidence.",
    highlights: [
      "Four Reformer, Fit-lates, Cardio Pilates, Circuit, or TRX classes",
      "Build strength, balance, endurance, and flexibility",
      "Suitable for new clients at every fitness level",
    ],
    eligibility: "New clients only, once per person",
  },

  // ---------- Group class packs ----------
  {
    key: "group-reformer-drop-in",
    serviceId: "100022",
    name: "Group Reformer drop-in",
    shortName: "Drop-in",
    price: 37,
    interval: "once",
    unit: "class",
    count: 1,
    section: "group-packs",
    blurb:
      "One focused group Reformer class with no package commitment — ideal for an occasional visit or a flexible schedule.",
    highlights: [
      "Professional Reformer equipment in a guided group setting",
      "Low-impact work for core strength, posture, and mobility",
      "Book one class without committing to a pack",
    ],
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
    blurb:
      "A steady start for building consistency — roughly one class a week across a season.",
    highlights: [
      "Ten group Reformer classes",
      "Enough repetition to build technique and confidence",
      "A joint-friendly way to strengthen your whole body",
    ],
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
    blurb:
      "Our most-chosen pack balances a meaningful per-class saving with enough sessions to make movement a real habit.",
    highlights: [
      "Twenty group Reformer classes",
      "Designed for a regular one-to-two-class weekly rhythm",
      "More time to improve core strength, posture, and control",
    ],
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
    blurb:
      "For members ready to practise regularly and keep momentum going across most of the year.",
    highlights: [
      "Thirty group Reformer classes",
      "Well suited to a consistent twice-weekly routine",
      "Longer runway for strength, mobility, and coordination",
    ],
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
    blurb:
      "Our best-value class pack for making Pilates part of your year, with the lowest class rate we offer.",
    highlights: [
      "Forty group Reformer classes",
      "A full year to build a durable movement practice",
      "Best per-class value among our group packs",
    ],
  },

  // ---------- Memberships ----------
  // Names keep their parenthetical: it is the only thing distinguishing the
  // two founding memberships, and it matches the Mindbody product listing
  // (which BuyNowWidget also reports as the GA4 item_name).
  {
    key: "founding-membership-12-month",
    serviceId: "100038",
    name: "Founding membership (12-month term)",
    shortName: "12-month membership",
    price: 250,
    interval: "month",
    section: "memberships",
    commitment: "12-month term",
    blurb:
      "Unlimited group training at our lower monthly membership rate, for clients ready to commit to a full year.",
    highlights: [
      "Unlimited access to eligible group classes",
      "Freedom to build a more frequent weekly routine",
      "Lower monthly rate with a 12-month commitment",
    ],
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
    commitment: "Rolling",
    blurb: "",
    highlights: [],
  },
  {
    key: "monthly-unlimited",
    serviceId: "100041",
    name: "Monthly unlimited (no commitment)",
    shortName: "Flexible membership",
    price: 300,
    interval: "month",
    section: "memberships",
    commitment: "No commitment",
    blurb:
      "The same unlimited group-class access, with the flexibility to stay month to month and no fixed term.",
    highlights: [
      "Unlimited access to eligible group classes",
      "Train as often as your schedule allows",
      "Month-to-month flexibility with no commitment",
    ],
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
    blurb:
      "Supportive Reformer sessions at a gentler pace, designed to build everyday strength and confidence.",
    highlights: [
      "Ten guided Senior Reformer sessions",
      "Low-impact strength, posture, and mobility work",
      "A measured pace with attentive instruction",
    ],
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
    blurb:
      "Accessible mat-based movement focused on the strength, balance, and mobility that support everyday life.",
    highlights: [
      "Ten mat-based Senior Fitness sessions",
      "Functional strength and balance without the Reformer",
      "Mobility-focused movement in a supportive group",
    ],
  },
];

/** One-on-one training prices opened through the Mindbody Appointments widget. */
export type PrivateOption = {
  key: string;
  name: string;
  blurb: string;
  highlights: string[];
  singlePrice: number;
  tenPrice: number;
};

export const privateSection = {
  id: "private",
  heading: "One-on-one training",
  description: "Private and semi-private sessions, one instructor to you.",
} as const;

export const privateOptions: PrivateOption[] = [
  {
    key: "private-pilates",
    name: "Private Pilates",
    blurb:
      "Fully personalized Pilates coaching, with every exercise adapted to your body, goals, experience, and pace.",
    highlights: [
      "One-to-one programming tailored to your goals",
      "Mat, Reformer, and studio equipment as appropriate",
      "Ideal for rehabilitation, focused goals, or faster progress",
    ],
    singlePrice: 100,
    tenPrice: 950,
  },
  {
    key: "private-gyrotonic",
    name: "Private GYROTONIC®",
    blurb:
      "One-to-one GYROTONIC® training using flowing, three-dimensional movement on the Professional Pulley Tower.",
    highlights: [
      "Personalized work on the GYROTONIC® tower",
      "Build spinal mobility and joint articulation",
      "Develop functional strength, flexibility, and coordination",
    ],
    singlePrice: 100,
    tenPrice: 950,
  },
  {
    key: "semi-private",
    name: "Semi-private",
    blurb:
      "Personalized instruction shared with a partner, combining focused coaching with the energy of training together.",
    highlights: [
      "Individual guidance within a two-person session",
      "Whole-body work for control, balance, and coordination",
      "A motivating format for partners with compatible goals",
    ],
    singlePrice: 130,
    tenPrice: 1300,
  },
];

/**
 * Purchase terms shown near the bottom of the pricing page. Kept here so the
 * wording is edited in one place rather than in the markup.
 *
 * The studio's own price list corroborates the HST, new-client, 13-week
 * validity, and availability lines. The refund, transfer, cancellation, and
 * waiver lines are reconciled with /terms — keep the two in step if either
 * changes.
 */
export const pricingFaqs = [
  {
    question: "Are taxes included in the displayed prices?",
    answer:
      "All prices are shown in Canadian dollars. The required 13% HST is added separately.",
  },
  {
    question: "Can I refund, transfer, or share a package?",
    answer:
      "Packages are non-refundable and non-transferable. Sessions cannot be transferred or shared between clients.",
  },
  {
    question: "When does my package expire?",
    answer:
      "Packages must be used within the validity period shown on the selected pricing option.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "A 24-hour cancellation policy applies to all bookings. Late cancellations and missed sessions are charged.",
  },
  {
    question: "Are classes subject to availability?",
    answer: "Yes. Classes are subject to availability.",
  },
  {
    question: "What do I need to complete before my first session?",
    answer:
      "Please complete the required health assessment and waiver before your first session.",
  },
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
