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
} from "@/app/lib/pricing-data";
import type { FinderScope } from "@/app/lib/plan-finder";
import { sectionAnchorId, sectionHeadingId } from "./section-anchors";

/**
 * Which option is selected in each section of the pricing page.
 *
 * This lives in context rather than in each section because the plan finder
 * has to reach across the page: "View this option" both selects an option in
 * a section it does not own and scrolls the page to it.
 *
 * The provider is a client boundary, but the page passes its sections through
 * as `children`, so all the static headings and copy stay server-rendered.
 */

type Selection = Record<string, string>;

type PricingSelectionValue = {
  selectedKey: (scope: FinderScope) => string;
  select: (scope: FinderScope, optionKey: string) => void;
  /**
   * Select an option (optionally) and scroll to its section. Pass a null
   * `optionKey` to scroll without changing the selection — used by the
   * memberships branch of the finder, which deliberately picks no winner.
   */
  selectAndScroll: (scope: FinderScope, optionKey: string | null) => void;
  /**
   * Whether the visitor has changed this section's selection yet. Sections
   * use it to keep their live region silent until there is something worth
   * announcing, rather than reading the default option out on page load.
   */
  hasTouched: (scope: FinderScope) => boolean;
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

  const select = useCallback((scope: FinderScope, optionKey: string) => {
    setSelection((current) => ({ ...current, [scope]: optionKey }));
    setTouched((current) =>
      current[scope] ? current : { ...current, [scope]: true },
    );
  }, []);

  const selectAndScroll = useCallback(
    (scope: FinderScope, optionKey: string | null) => {
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
      // not back at the finder. The heading carries tabIndex={-1} for this.
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
