"use client";

import Link from "next/link";
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
  type PrivateOption,
} from "@/app/lib/pricing-data";
import { BuyNowWidget } from "./buy-now-widget";
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
const PANEL_MOTION_MS = 320;

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
      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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
  const membershipSaving =
    option.interval === "month" && membershipBaseline
      ? membershipBaseline - option.price
      : 0;
  const quantity =
    option.count && option.unit
      ? `${option.count} ${pluralizeUnit(option.unit, option.count)}`
      : "Unlimited classes";
  const savingLabel = saving
    ? `Save ${formatPrice(saving)} total`
    : membershipSaving > 0
      ? `Save ${formatPrice(membershipSaving)} / month`
      : null;
  const hasSavingsSlot = Boolean(
    section.showSavings || section.id === "memberships",
  );

  return (
    <article className="pricing-panel flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
      {hasSavingsSlot && (
        <div
          className={cn(
            "relative flex min-h-12 items-center justify-center px-4 text-center font-sans text-base font-bold",
            savingLabel
              ? "bg-brand-700 text-white"
              : "bg-transparent text-transparent",
          )}
          aria-hidden={!savingLabel}
        >
          {savingLabel ?? "No package saving"}
          {option.badge && (
            <span className="absolute right-3 rounded-full bg-white px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-brand-900 shadow-sm">
              {option.badge}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-1 flex-col text-center lg:h-[17rem] lg:flex-none">
          {!hasSavingsSlot && option.badge && (
            <span className="mx-auto rounded-full bg-brand-100 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-brand-900">
              {option.badge}
            </span>
          )}

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

function PrivateCard({ option }: { option: PrivateOption }) {
  const single = `${option.singleQualifier ? "from " : ""}${formatPrice(option.singlePrice)}`;
  const details = [option.blurb, ...option.highlights].filter(Boolean).slice(0, 4);

  return (
    <article className="pricing-panel flex h-full flex-col rounded-2xl border border-border bg-white p-6 sm:p-7">
      <div className="flex flex-1 flex-col text-center lg:h-[17rem] lg:flex-none">
        <h3 className="font-serif text-3xl uppercase leading-none tracking-[0.025em] text-foreground sm:text-[2rem]">
          {option.name}
        </h3>

        <p className="mt-4 font-serif text-[3.4rem] leading-none tabular-nums text-foreground sm:text-6xl">
          {formatPrice(option.tenPrice)}
        </p>

        <dl className="mt-5 flex flex-wrap justify-center gap-x-10 gap-y-4">
          <Stat label="Package" value="10 sessions" />
          <Stat label="Single session" value={single} />
          {option.note && <Stat label="Pricing note" value={option.note} />}
        </dl>

        <div className="mt-auto pt-6 text-left">
          <Link
            href={privateSection.href}
            className={cn(
              "block rounded-lg bg-brand-800 px-5 py-3 text-center font-serif text-xl uppercase leading-none tracking-[0.08em] text-white transition-colors hover:bg-brand-900",
              focusRing,
            )}
          >
            {privateSection.cta}
            <span className="sr-only"> — {option.name}</span>
            <span aria-hidden> →</span>
          </Link>
        </div>
      </div>

      <DetailList items={details} />
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
    "Book directly with an instructor and choose a single visit or a ten-session package.",
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
    </>
  );
}

function PrivatePanel() {
  return (
    <>
      <CategoryHeader
        scope={privateSection.id}
        heading={privateSection.heading}
        description={privateSection.description}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {privateOptions.map((option) => (
          <div key={option.key} className="h-full lg:col-span-2">
            <PrivateCard option={option} />
          </div>
        ))}
      </div>
    </>
  );
}

export function PricingTabs() {
  const [activeScope, setActiveScope] =
    useState<PricingScope>("new-here");
  const [outgoingScope, setOutgoingScope] =
    useState<PricingScope | null>(null);
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
        setOutgoingScope(null);
        setDirection(null);
        setActiveScope(scope);
        return;
      }

      setOutgoingScope(previous);
      setDirection(
        scopeIndex(scope) > scopeIndex(previous) ? "forward" : "backward",
      );
      setActiveScope(scope);
      transitionTimerRef.current = setTimeout(() => {
        setOutgoingScope(null);
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
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="border-b border-border">
        <div
          role="tablist"
          aria-label="Pricing categories"
          aria-orientation="horizontal"
          className="mx-auto flex w-full max-w-7xl snap-x snap-mandatory items-end gap-1 overflow-x-auto px-5 sm:px-8 lg:overflow-visible"
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
                  "group relative -mb-px min-h-16 w-40 shrink-0 cursor-pointer snap-start px-4 py-3 text-left font-sans transition-[color,transform] duration-200 after:absolute after:inset-x-4 after:bottom-0 after:h-1 after:origin-center after:rounded-t-full after:bg-brand-700 after:transition-transform after:duration-200 sm:w-44 lg:w-auto lg:flex-1",
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
                      ? "bg-brand-800 px-1.5 py-0.5 text-white"
                      : "text-brand-700",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-base leading-tight sm:text-lg",
                    active ? "font-bold" : "font-semibold",
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-background">
        <div className="relative isolate mx-auto w-full max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16">
          {panelEntries.map((panel) => {
            const active = panel.scope === activeScope;
            const outgoing = panel.scope === outgoingScope;
            return (
              <section
                key={panel.scope}
                id={sectionAnchorId(panel.scope)}
                role="tabpanel"
                aria-labelledby={tabId(panel.scope)}
                aria-hidden={!active}
                inert={!active}
                tabIndex={active ? 0 : -1}
                hidden={!active && !outgoing}
                className={cn(
                  active ? "relative z-10" : "pointer-events-none absolute inset-x-0 top-0 z-0",
                  active &&
                    direction === "forward" &&
                    "pricing-tab-panel-enter-forward",
                  active &&
                    direction === "backward" &&
                    "pricing-tab-panel-enter-backward",
                  outgoing &&
                    direction === "forward" &&
                    "pricing-tab-panel-exit-forward",
                  outgoing &&
                    direction === "backward" &&
                    "pricing-tab-panel-exit-backward",
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
