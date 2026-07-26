/**
 * "Find your best fit" — the question flow, as data.
 *
 * Kept out of pricing-data.ts so that file stays purely pricing. Everything
 * here refers to options by `key`, so a reprice or a rename in pricing-data.ts
 * flows through without touching this file.
 *
 * To revise the flow: edit `finderQuestions`. Each choice either points at the
 * next question (`next`) or ends the flow with a result. There is no other
 * logic — the component just walks this map.
 */

import type { PricingSectionId } from "./pricing-data";

/** Where a result sends you. Sections plus the private-training block. */
export type FinderScope = PricingSectionId | "private";

export type FinderResult =
  /** Recommend one specific option and preselect it on arrival. */
  | {
      kind: "option";
      scope: FinderScope;
      optionKey: string;
      explanation: string;
    }
  /**
   * Point at a section without picking a winner. Used where the options are
   * genuinely a trade-off rather than better and worse, so the panel shows
   * them side by side and arrives without changing the selector.
   */
  | {
      kind: "compare";
      scope: FinderScope;
      heading: string;
      explanation: string;
    };

export type FinderChoice = {
  label: string;
  /** Optional second line under the label. */
  hint?: string;
} & ({ next: string } | { result: FinderResult });

export type FinderQuestion = {
  id: string;
  question: string;
  choices: FinderChoice[];
};

export const FINDER_START = "how";

export const finderQuestions: Record<string, FinderQuestion> = {
  how: {
    id: "how",
    question: "How would you like to train?",
    choices: [
      { label: "Group classes", hint: "Reformer and studio classes", next: "first-visit" },
      {
        label: "Private or semi-private",
        hint: "One instructor to you",
        result: {
          kind: "option",
          scope: "private",
          optionKey: "private-pilates",
          explanation:
            "A full session built around your body — the usual starting point for one-on-one training.",
        },
      },
      {
        label: "Senior-focused classes",
        hint: "Gentler pace, smaller groups",
        result: {
          kind: "option",
          scope: "seniors",
          optionKey: "senior-reformer-10",
          explanation:
            "Reformer work at a gentler pace, sold as a ten-session pack at the senior rate.",
        },
      },
    ],
  },

  "first-visit": {
    id: "first-visit",
    question: "Is this your first visit to MVP?",
    choices: [
      { label: "Yes, I'm new", next: "new-start" },
      { label: "No, I've been before", next: "returning" },
    ],
  },

  "new-start": {
    id: "new-start",
    question: "How would you like to start?",
    choices: [
      {
        label: "Try one class",
        result: {
          kind: "option",
          scope: "new-here",
          optionKey: "intro-group-class",
          explanation:
            "Our lowest-priced first visit, so you can see whether the studio suits you before committing.",
        },
      },
      {
        label: "Start with four classes",
        result: {
          kind: "option",
          scope: "new-here",
          optionKey: "power-starter-pack",
          explanation:
            "Enough sessions to learn the reformer properly and feel a difference, still at the new-client rate.",
        },
      },
    ],
  },

  returning: {
    id: "returning",
    question: "What kind of option are you looking for?",
    choices: [
      {
        label: "One class",
        result: {
          kind: "option",
          scope: "group-packs",
          optionKey: "group-reformer-drop-in",
          explanation:
            "A single class with nothing to use up — best if you come in every so often.",
        },
      },
      {
        label: "A flexible class pack",
        result: {
          kind: "option",
          scope: "group-packs",
          optionKey: "loyalty-20",
          explanation:
            "Our most-chosen pack. You can slide the scale to any size once you get there.",
        },
      },
      {
        label: "Unlimited monthly classes",
        result: {
          kind: "compare",
          scope: "memberships",
          heading: "Two ways to go unlimited",
          explanation:
            "Both memberships give you the same access. The difference is how long you commit, so it is worth comparing them directly.",
        },
      },
    ],
  },
};
