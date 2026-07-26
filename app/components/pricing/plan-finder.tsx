"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw, ChevronLeft } from "lucide-react";
import { cn } from "@/app/lib/cn";
import {
  FINDER_START,
  finderQuestions,
  type FinderResult,
} from "@/app/lib/plan-finder";
import {
  formatPerUnit,
  formatPrice,
  optionByKey,
  optionTerm,
  privateOptions,
  publicOptionsForSection,
  type PricingSectionId,
} from "@/app/lib/pricing-data";
import { usePricingSelection } from "./pricing-selection-context";

/** What the recommendation panel shows for a single-option result. */
type Recommendation = {
  name: string;
  price: string;
  /** Secondary price detail — rate, validity, or the ten-session price. */
  detail?: string;
};

function resolveRecommendation(
  scope: FinderResult["scope"],
  optionKey: string,
): Recommendation | null {
  if (scope === "private") {
    const option = privateOptions.find((item) => item.key === optionKey);
    if (!option) return null;
    const single = option.singleQualifier
      ? `from ${formatPrice(option.singlePrice)}`
      : formatPrice(option.singlePrice);
    return {
      name: option.name,
      price: `${single} per session`,
      detail: `${formatPrice(option.tenPrice)} for 10 sessions`,
    };
  }

  const option = optionByKey(optionKey);
  if (!option) return null;
  return {
    name: option.name,
    price:
      option.interval === "month"
        ? `${formatPrice(option.price)} / month`
        : formatPrice(option.price),
    detail:
      (option.count && option.count > 1 ? formatPerUnit(option) : null) ??
      optionTerm(option) ??
      undefined,
  };
}

const choiceButton =
  "group flex w-full items-center justify-between gap-4 rounded-[2px] border border-brand-300 bg-card px-5 py-4 text-left transition-colors hover:border-primary hover:bg-brand-50";

/**
 * "Find your best fit" — a short question flow that ends in one recommended
 * option and takes you to it.
 *
 * All the branching lives in app/lib/plan-finder.ts as plain data; this
 * component only walks it, so changing the questions never means touching
 * this file.
 */
export function PlanFinder() {
  const { selectAndScroll } = usePricingSelection();

  const [questionId, setQuestionId] = useState<string>(FINDER_START);
  const [result, setResult] = useState<FinderResult | null>(null);
  // Answers so far, as {question id, chosen label} — drives the trail of
  // chips and the Back button.
  const [trail, setTrail] = useState<{ id: string; label: string }[]>([]);

  const question = finderQuestions[questionId];

  function reset() {
    setQuestionId(FINDER_START);
    setResult(null);
    setTrail([]);
  }

  function goBack() {
    const previous = trail[trail.length - 1];
    if (!previous) return;
    setTrail(trail.slice(0, -1));
    setQuestionId(previous.id);
    setResult(null);
  }

  function choose(label: string, choice: (typeof question)["choices"][number]) {
    setTrail([...trail, { id: questionId, label }]);
    if ("result" in choice) {
      setResult(choice.result);
    } else {
      setQuestionId(choice.next);
    }
  }

  const recommendation =
    result?.kind === "option"
      ? resolveRecommendation(result.scope, result.optionKey)
      : null;

  const comparison =
    result?.kind === "compare" && result.scope !== "private"
      ? publicOptionsForSection(result.scope as PricingSectionId)
      : null;

  return (
    <div className="mt-8 max-w-3xl rounded-[2px] border border-brand-300 bg-card p-6 text-card-foreground sm:p-8">
      {/* Answers so far, so the flow keeps its context on screen. */}
      {trail.length > 0 && (
        <ol className="mb-5 flex flex-wrap items-center gap-2">
          {trail.map((entry, index) => (
            <li key={`${entry.id}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden className="text-muted-foreground">
                  ›
                </span>
              )}
              <span className="rounded-[2px] bg-secondary px-2.5 py-1 text-sm text-secondary-foreground">
                {entry.label}
              </span>
            </li>
          ))}
        </ol>
      )}

      {!result && question && (
        <>
          <h3 className="font-sans text-xl font-medium leading-snug sm:text-2xl">
            {question.question}
          </h3>
          <div className="mt-5 grid gap-3">
            {question.choices.map((choice) => (
              <button
                key={choice.label}
                type="button"
                onClick={() => choose(choice.label, choice)}
                className={choiceButton}
              >
                <span className="min-w-0">
                  <span className="block text-base font-medium sm:text-lg">
                    {choice.label}
                  </span>
                  {choice.hint && (
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {choice.hint}
                    </span>
                  )}
                </span>
                <ArrowRight
                  aria-hidden
                  strokeWidth={2}
                  className="h-5 w-5 shrink-0 text-primary"
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* A single recommended option. */}
      {result?.kind === "option" && recommendation && (
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            We&rsquo;d suggest
          </p>
          <h3 className="mt-2 font-sans text-2xl font-medium leading-snug sm:text-3xl">
            {recommendation.name}
          </h3>
          <p className="mt-2 max-w-prose text-base leading-relaxed text-muted-foreground">
            {result.explanation}
          </p>
          <p className="mt-4 font-serif text-4xl leading-none text-brand-800">
            {recommendation.price}
          </p>
          {recommendation.detail && (
            <p className="mt-1.5 text-base text-muted-foreground">
              {recommendation.detail}
            </p>
          )}
        </div>
      )}

      {/* Two options that are a genuine trade-off, so neither is "the answer". */}
      {result?.kind === "compare" && comparison && (
        <div>
          <h3 className="font-sans text-2xl font-medium leading-snug sm:text-3xl">
            {result.heading}
          </h3>
          <p className="mt-2 max-w-prose text-base leading-relaxed text-muted-foreground">
            {result.explanation}
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {comparison.map((option) => (
              <li
                key={option.key}
                className="rounded-[2px] border border-brand-200 bg-brand-50 p-4"
              >
                <p className="text-base font-medium leading-snug">
                  {option.name}
                </p>
                <p className="mt-2 font-serif text-3xl leading-none text-brand-800">
                  {formatPrice(option.price)}
                  <span className="ml-1 font-sans text-sm font-normal text-muted-foreground">
                    / month
                  </span>
                </p>
                {option.commitment && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {option.commitment}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(result || trail.length > 0) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {result && (
            <button
              type="button"
              onClick={() =>
                selectAndScroll(
                  result.scope,
                  result.kind === "option" ? result.optionKey : null,
                )
              }
              className="rounded-[2px] bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-brand-600"
            >
              {result.kind === "option"
                ? "View this option"
                : "View these options"}
            </button>
          )}
          {trail.length > 0 && !result && (
            <button
              type="button"
              onClick={goBack}
              className={cn(
                "inline-flex items-center gap-1.5 text-base font-medium underline underline-offset-4",
                "text-muted-foreground hover:text-foreground",
              )}
            >
              <ChevronLeft aria-hidden className="h-4 w-4" />
              Back
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-base font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            <RotateCcw aria-hidden className="h-4 w-4" />
            Start again
          </button>
        </div>
      )}
    </div>
  );
}
