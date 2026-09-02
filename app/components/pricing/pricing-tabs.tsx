"use client";

import { Check } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/app/lib/cn";
import {
  dropInPrice,
  formatPrice,
  privateOptions,
  privateSection,
  pricingSections,
  publicOptionsForSection,
  savingsVsDropIn,
  type PricingOption,
  type PricingScope,
  type PricingSection,
  type PrivatePackage,
  type PrivateOption,
} from "@/app/lib/pricing-data";
import { BuyNowWidget, MindbodyPricingLoader } from "./buy-now-widget";
import { focusRing } from "./pricing-ui";
import { sectionAnchorId, sectionHeadingId } from "./section-anchors";

type TabEntry = {
  scope: PricingScope;
  label: string;
};

type MotionDirection = "forward" | "backward" | null;

const tabs: TabEntry[] = [
  ...pricingSections.map((section) => ({
    scope: section.id as PricingScope,
    label: section.heading,
  })),
  {
    scope: privateSection.id,
    label: privateSection.heading,
  },
];

const validScopes = new Set<PricingScope>(tabs.map((tab) => tab.scope));
const PANEL_MOTION_MS = 260;

function tabId(scope: PricingScope) {
  return `${scope}-tab`;
}

function scopeFromHash(hash: string): PricingScope {
  const value = hash.replace(/^#pricing-/, "") as PricingScope;
  return validScopes.has(value) ? value : "new-here";
}

function scopeIndex(scope: PricingScope) {
  return tabs.findIndex((tab) => tab.scope === scope);
}

function pluralizeUnit(unit: string, count: number) {
  if (count === 1) return unit;
  return /(?:s|x|z|ch|sh)$/i.test(unit) ? `${unit}es` : `${unit}s`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-700">
        {label}
      </dt>
      <dd className="mt-1 font-serif text-2xl leading-none tabular-nums text-foreground">
        {value}
      </dd>
    </div>
  );
}

function optionDetails(option: PricingOption): string[] {
  const repeatedUpperFacts = new Set([
    "Ten group Reformer classes",
    "Twenty group Reformer classes",
    "Thirty group Reformer classes",
    "Forty group Reformer classes",
    "Unlimited access to eligible group classes",
  ]);

  return [
    ...(option.validity
      ? [`Valid for ${option.validity} from the date of purchase`]
      : []),
    option.blurb,
    ...(option.highlights ?? []).filter(
      (highlight) => !repeatedUpperFacts.has(highlight),
    ),
  ]
    .filter(Boolean)
    .slice(0, 4);
}

function DetailList({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-8">
      <p className="font-sans text-sm font-semibold text-foreground">
        What to expect
      </p>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 font-sans text-[0.95rem] leading-relaxed text-muted-foreground"
          >
            <Check
              aria-hidden
              className="mt-1 h-4 w-4 shrink-0 text-brand-600"
              strokeWidth={2.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingCard({
  option,
  section,
  membershipBaseline,
}: {
  option: PricingOption;
  section: PricingSection;
  membershipBaseline?: number;
}) {
  const saving = section.showSavings ? savingsVsDropIn(option) : null;
  const membershipTotalSaving =
    option.interval === "month" && membershipBaseline
      ? (membershipBaseline - option.price) * 12
      : 0;
  const quantity =
    option.count && option.unit
      ? `${option.count} ${pluralizeUnit(option.unit, option.count)}`
      : "Unlimited classes";
  const savingLabel = saving
    ? `Save ${formatPrice(saving)} total`
    : membershipTotalSaving > 0
      ? `Save ${formatPrice(membershipTotalSaving)} total`
      : null;

  return (
    <article className="pricing-panel flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
      <div
        aria-hidden={!savingLabel}
        className={cn(
          "relative flex min-h-12 items-center justify-center px-4 text-center font-sans text-base font-bold",
          savingLabel && "bg-brand-500 text-brand-900",
        )}
      >
        {savingLabel}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-1 flex-col text-center lg:h-[17rem] lg:flex-none">
          <h3 className="font-serif text-3xl uppercase leading-none tracking-[0.025em] text-foreground sm:text-[2rem]">
            {option.shortName ?? option.name}
          </h3>

          <p className="mt-4 text-foreground">
            <span className="font-serif text-[3.4rem] leading-none tabular-nums sm:text-6xl">
              {formatPrice(option.price)}
            </span>
            {option.interval === "month" && (
              <span className="ml-1.5 font-sans text-base text-muted-foreground">
                / month
              </span>
            )}
          </p>

          <dl className="mt-5 flex flex-wrap justify-center gap-x-10 gap-y-4">
            <Stat
              label={option.count ? "Includes" : "Access"}
              value={quantity}
            />
            {option.commitment && (
              <Stat label="Commitment" value={option.commitment} />
            )}
          </dl>

          <div className="mt-auto pt-6 text-left">
            <BuyNowWidget
              serviceId={option.serviceId}
              serviceName={option.name}
              priceNumber={option.price}
            />
          </div>
        </div>

        <DetailList items={optionDetails(option)} />
      </div>
    </article>
  );
}

type PrivatePriceChoice = {
  key: string;
  option: PrivateOption;
  package: PrivatePackage;
};

function privateChoice(
  option: PrivateOption,
  pkg: PrivatePackage,
): PrivatePriceChoice {
  return { key: pkg.key, option, package: pkg };
}

const singleSessionChoices = privateOptions.flatMap((option) =>
  option.packages
    .filter((pkg) => pkg.sessionCount === 1)
    .map((pkg) => privateChoice(option, pkg)),
);

const tenSessionChoices = privateOptions.flatMap((option) =>
  option.packages
    .filter((pkg) => pkg.sessionCount === 10)
    .map((pkg) => privateChoice(option, pkg)),
);

const extendedPackageChoices = privateOptions.flatMap((option) =>
  option.packages
    .filter((pkg) => pkg.sessionCount === 20 || pkg.sessionCount === 30)
    .map((pkg) => privateChoice(option, pkg)),
);

function PrivateCard({ choice }: { choice: PrivatePriceChoice }) {
  const { option, package: pkg } = choice;
  const defaultVariant =
    pkg.variants.find((candidate) => candidate.key === "instructor") ??
    pkg.variants[0];
  const [selectedKey, setSelectedKey] = useState(defaultVariant.key);
  const [committedKey, setCommittedKey] = useState(defaultVariant.key);
  const variant =
    pkg.variants.find((candidate) => candidate.key === committedKey) ??
    defaultVariant;
  const isLoading = selectedKey !== committedKey;
  const hasInstructorSelector = pkg.variants.some(
    (candidate) => candidate.instructor,
  );
  const sessionLabel = `${pkg.sessionCount} ${pkg.sessionCount === 1 ? "session" : "sessions"}`;
  const singlePrice =
    option.packages.find((candidate) => candidate.sessionCount === 1)
      ?.variants[0]?.price ?? 0;
  const totalSaving =
    pkg.sessionCount === 10 ? singlePrice * pkg.sessionCount - variant.price : 0;
  const savingLabel =
    totalSaving > 0 ? `Save ${formatPrice(totalSaving)} total` : null;
  const details = [
    ...(pkg.newcomerOnly
      ? ["New clients only — one-time use per person."]
      : []),
    option.blurb,
    ...option.highlights,
  ]
    .filter(Boolean)
    .slice(0, 4);

  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setTimeout(() => setCommittedKey(selectedKey), 350);
    return () => window.clearTimeout(timer);
  }, [isLoading, selectedKey]);

  return (
    <article className="pricing-panel flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
      <div
        aria-hidden={!savingLabel && !isLoading}
        className={cn(
          "flex min-h-12 items-center justify-center px-4 text-center font-sans text-base font-bold",
          !isLoading && savingLabel && "bg-brand-500 text-brand-900",
        )}
      >
        {isLoading ? (
          <span className="h-4 w-32 animate-pulse rounded bg-brand-200" />
        ) : (
          savingLabel
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex min-h-[21rem] flex-1 flex-col text-center lg:flex-none">
          <h3 className="font-serif text-3xl uppercase leading-none tracking-[0.025em] text-foreground sm:text-[2rem]">
            {option.name}
          </h3>

          <p
            aria-live="polite"
            aria-busy={isLoading}
            className="mt-4 flex min-h-15 items-center justify-center text-foreground"
          >
            {isLoading ? (
              <span className="h-12 w-40 animate-pulse rounded-lg bg-brand-100" />
            ) : (
              <span className="font-serif text-[3.4rem] leading-none tabular-nums sm:text-6xl">
                {formatPrice(variant.price)}
              </span>
            )}
          </p>

          <dl className="mt-5 flex justify-center">
            <Stat
              label={pkg.sessionCount === 1 ? "Booking" : "Package"}
              value={sessionLabel}
            />
          </dl>

          <div className="mt-auto space-y-3 pt-6 text-left">
            {hasInstructorSelector && (
              <label className="block">
                <span className="mb-1.5 block font-sans text-sm font-semibold text-foreground">
                  Instructor type
                </span>
                <select
                  value={selectedKey}
                  disabled={pkg.variants.length === 1}
                  onChange={(event) => setSelectedKey(event.target.value)}
                  className={cn(
                    "min-h-11 w-full rounded-lg border border-border bg-white px-3 py-2 font-sans text-base text-foreground disabled:cursor-not-allowed disabled:bg-brand-50 disabled:text-muted-foreground",
                    focusRing,
                  )}
                >
                  {pkg.variants.map((candidate) => (
                    <option key={candidate.key} value={candidate.key}>
                      {candidate.instructor}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {isLoading ? (
              <div
                aria-label="Updating booking option"
                className="h-12 w-full animate-pulse rounded-lg bg-brand-200"
              />
            ) : (
              <BuyNowWidget
                key={variant.serviceId}
                serviceId={variant.serviceId}
                serviceName={`${option.name} — ${sessionLabel}${variant.instructor ? ` — ${variant.instructor}` : ""}`}
                priceNumber={variant.price}
                label="Book now"
              />
            )}
          </div>
        </div>

        <DetailList items={details} />
      </div>
    </article>
  );
}

const sharedNotes: Record<PricingScope, string> = {
  "new-here":
    "Introductory offers are for new clients and may be purchased once per person.",
  "group-packs": `Savings are calculated against the current ${formatPrice(dropInPrice)} Group Reformer drop-in rate.`,
  memberships:
    "Both plans include unlimited eligible group classes and are billed monthly.",
  seniors:
    "Choose supportive Reformer sessions or accessible mat-based fitness.",
  private:
    "Choose a single visit or a 10-, 20-, or 30-session package.",
};

function CategoryHeader({
  scope,
  heading,
  description,
}: {
  scope: PricingScope;
  heading: string;
  description: string;
}) {
  return (
    <header className="max-w-4xl">
      <h2
        id={sectionHeadingId(scope)}
        className="font-serif text-[2.5rem] leading-[0.95] tracking-[0.02em] text-foreground sm:text-5xl"
      >
        {heading}
      </h2>
      <p className="mt-4 max-w-3xl font-sans text-lg leading-relaxed text-muted-foreground">
        {description} {sharedNotes[scope]}
      </p>
    </header>
  );
}

function cardPlacement(index: number, count: number) {
  if (count === 2) {
    return index === 0 ? "lg:col-start-2" : "lg:col-start-4";
  }
  if (count === 5 && index >= 3) {
    return index === 3 ? "lg:col-start-2" : "lg:col-start-4";
  }
  return undefined;
}

function PublicSectionPanel({ section }: { section: PricingSection }) {
  const options = publicOptionsForSection(section.id);
  const membershipBaseline =
    section.id === "memberships"
      ? Math.max(...options.map((option) => option.price))
      : undefined;

  return (
    <>
      <CategoryHeader
        scope={section.id}
        heading={section.heading}
        description={section.description}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {options.map((option, index) => (
          <div
            key={option.key}
            className={cn(
              "h-full lg:col-span-2",
              cardPlacement(index, options.length),
            )}
          >
            <PricingCard
              option={option}
              section={section}
              membershipBaseline={membershipBaseline}
            />
          </div>
        ))}
      </div>
      {section.id === "new-here" && (
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {singleSessionChoices.map((choice) => (
            <div key={choice.key} className="h-full lg:col-span-2">
              <PrivateCard choice={choice} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function PrivatePanel() {
  const standardChoices = [
    ...singleSessionChoices,
    ...tenSessionChoices,
  ];

  return (
    <>
      <CategoryHeader
        scope={privateSection.id}
        heading={privateSection.heading}
        description={privateSection.description}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {standardChoices.map((choice) => (
          <div key={choice.key} className="h-full lg:col-span-2">
            <PrivateCard choice={choice} />
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {extendedPackageChoices.map((choice, index) => (
          <div
            key={choice.key}
            className={cn(
              "h-full lg:col-span-2",
              cardPlacement(index, extendedPackageChoices.length),
            )}
          >
            <PrivateCard choice={choice} />
          </div>
        ))}
      </div>
    </>
  );
}

export function PricingTabs() {
  const [activeScope, setActiveScope] =
    useState<PricingScope>("new-here");
  const [direction, setDirection] = useState<MotionDirection>(null);
  const activeScopeRef = useRef<PricingScope>("new-here");
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const activate = useCallback(
    (scope: PricingScope, addHistory = true, animate = true) => {
      const previous = activeScopeRef.current;

      if (addHistory && typeof window !== "undefined") {
        const nextHash = `#${sectionAnchorId(scope)}`;
        if (window.location.hash !== nextHash) {
          window.history.pushState(
            null,
            "",
            `${window.location.pathname}${window.location.search}${nextHash}`,
          );
        }
      }

      if (scope === previous) return;
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      activeScopeRef.current = scope;
      if (!animate || reduceMotion) {
        setDirection(null);
        setActiveScope(scope);
        return;
      }

      setDirection(
        scopeIndex(scope) > scopeIndex(previous) ? "forward" : "backward",
      );
      setActiveScope(scope);
      transitionTimerRef.current = setTimeout(() => {
        setDirection(null);
        transitionTimerRef.current = null;
      }, PANEL_MOTION_MS);
    },
    [],
  );

  useEffect(() => {
    const syncFromLocation = (animate: boolean) => {
      activate(scopeFromHash(window.location.hash), false, animate);
    };

    syncFromLocation(false);
    const handleHistoryChange = () => syncFromLocation(true);
    window.addEventListener("popstate", handleHistoryChange);
    window.addEventListener("hashchange", handleHistoryChange);
    return () => {
      window.removeEventListener("popstate", handleHistoryChange);
      window.removeEventListener("hashchange", handleHistoryChange);
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [activate]);

  const panelEntries = useMemo(
    () => [
      ...pricingSections.map((section) => ({
        scope: section.id as PricingScope,
        content: <PublicSectionPanel section={section} />,
      })),
      { scope: privateSection.id as PricingScope, content: <PrivatePanel /> },
    ],
    [],
  );

  function handleTabKeyDown(
    index: number,
    event: KeyboardEvent<HTMLButtonElement>,
  ) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const next = tabs[nextIndex];
    activate(next.scope);
    document.getElementById(tabId(next.scope))?.focus();
  }

  return (
    <div>
      <MindbodyPricingLoader />

      <div>
        <div
          role="tablist"
          aria-label="Pricing categories"
          aria-orientation="horizontal"
          className="flex w-full snap-x snap-mandatory items-end gap-1 overflow-x-auto border-b border-border lg:overflow-visible"
        >
          {tabs.map((tab, index) => {
            const active = tab.scope === activeScope;
            return (
              <button
                key={tab.scope}
                id={tabId(tab.scope)}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={sectionAnchorId(tab.scope)}
                tabIndex={active ? 0 : -1}
                onClick={() => activate(tab.scope)}
                onKeyDown={(event) => handleTabKeyDown(index, event)}
                className={cn(
                  "group relative -mb-px min-h-16 w-40 shrink-0 cursor-pointer snap-start px-4 py-3 text-left font-sans transition-[color,transform] duration-200 after:absolute after:inset-x-4 after:bottom-0 after:h-1 after:origin-center after:rounded-t-full after:bg-brand-500 after:transition-transform after:duration-200 sm:w-44 lg:w-auto lg:flex-1",
                  active
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground after:scale-x-0 hover:-translate-y-0.5 hover:text-foreground hover:after:scale-x-50",
                  focusRing,
                )}
              >
                <span
                  className={cn(
                    "inline-flex min-w-6 items-center justify-center rounded-full text-[0.65rem] font-semibold tabular-nums tracking-[0.1em] transition-colors duration-200",
                    active
                      ? "bg-brand-500 px-1.5 py-0.5 text-brand-900"
                      : "text-brand-700",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-base leading-tight sm:text-lg",
                    active ? "font-bold" : "font-normal",
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="relative isolate pb-10 pt-12 sm:pb-14 sm:pt-16">
          {panelEntries.map((panel) => {
            const active = panel.scope === activeScope;
            return (
              <section
                key={panel.scope}
                id={sectionAnchorId(panel.scope)}
                role="tabpanel"
                aria-labelledby={tabId(panel.scope)}
                aria-hidden={!active}
                inert={!active}
                tabIndex={active ? 0 : -1}
                hidden={!active}
                className={cn(
                  active ? "relative z-10" : "pointer-events-none absolute inset-x-0 top-0 z-0",
                  active &&
                    direction === "forward" &&
                    "pricing-tab-panel-enter-forward",
                  active &&
                    direction === "backward" &&
                    "pricing-tab-panel-enter-backward",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand-900",
                )}
              >
                {panel.content}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
