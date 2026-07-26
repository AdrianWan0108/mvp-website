"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import {
  privateOptions,
  privateSection,
  publicOptionsForSection,
  pricingSections,
  type PricingScope,
} from "@/app/lib/pricing-data";
import { sectionAnchorId, sectionHeadingId } from "./section-anchors";

/**
 * Which option is selected in each section of the pricing page.
 *
 * This lives in context rather than in each section because the "Explore
 * pricing" nav at the top of the page has to reach across it — jumping to a
 * section it does not own, and moving focus there once it arrives.
 *
 * The provider is a client boundary, but the page passes its sections through
 * as `children`, so all the static headings and copy stay server-rendered.
 */

type Selection = Record<string, string>;

type PricingSelectionValue = {
  selectedKey: (scope: PricingScope) => string;
  select: (scope: PricingScope, optionKey: string) => void;
  /**
   * Scroll to a section, optionally selecting an option on the way. The
   * category nav passes a null `optionKey`: it jumps to a section without
   * presuming which option you want once you get there.
   */
  selectAndScroll: (scope: PricingScope, optionKey: string | null) => void;
  /**
   * Whether the visitor has changed this section's selection yet. Sections
   * use it to keep their live region silent until there is something worth
   * announcing, rather than reading the default option out on page load.
   */
  hasTouched: (scope: PricingScope) => boolean;
};

const PricingSelectionContext = createContext<PricingSelectionValue | null>(
  null,
);

/**
 * First public option of each section — the default selection, and the
 * fallback whenever a lookup misses. Derived so that hiding an option (or
 * reordering pricing-data.ts) cannot leave a section pointing at nothing.
 */
function initialSelection(): Selection {
  const selection: Selection = {};
  for (const section of pricingSections) {
    const first = publicOptionsForSection(section.id)[0];
    if (first) selection[section.id] = first.key;
  }
  selection[privateSection.id] = privateOptions[0].key;
  return selection;
}

export function PricingSelectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selection, setSelection] = useState<Selection>(initialSelection);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const select = useCallback((scope: PricingScope, optionKey: string) => {
    setSelection((current) => ({ ...current, [scope]: optionKey }));
    setTouched((current) =>
      current[scope] ? current : { ...current, [scope]: true },
    );
  }, []);

  const selectAndScroll = useCallback(
    (scope: PricingScope, optionKey: string | null) => {
      // flushSync commits the new selection before we measure and scroll.
      // Without it we would scroll against the pre-change layout, and the card
      // growing or shrinking underneath would land the section off-position.
      if (optionKey) flushSync(() => select(scope, optionKey));

      const target = document.getElementById(sectionAnchorId(scope));
      if (!target) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });

      // Keyboard and screen-reader users need to land where the page moved,
      // not back at the nav. The heading carries tabIndex={-1} for this.
      document
        .getElementById(sectionHeadingId(scope))
        ?.focus({ preventScroll: true });
    },
    [select],
  );

  const value = useMemo<PricingSelectionValue>(
    () => ({
      selectedKey: (scope) => selection[scope] ?? "",
      select,
      selectAndScroll,
      hasTouched: (scope) => Boolean(touched[scope]),
    }),
    [selection, touched, select, selectAndScroll],
  );

  return (
    <PricingSelectionContext.Provider value={value}>
      {children}
    </PricingSelectionContext.Provider>
  );
}

export function usePricingSelection(): PricingSelectionValue {
  const value = useContext(PricingSelectionContext);
  if (!value) {
    throw new Error(
      "usePricingSelection must be used inside <PricingSelectionProvider>",
    );
  }
  return value;
}
