"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { pricingFaqs } from "@/app/lib/pricing-data";
import { Meta } from "./pricing-ui";

function PricingFaqItem({
  item,
  index,
}: {
  item: (typeof pricingFaqs)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const buttonId = `pricing-faq-question-${index}`;
  const panelId = `pricing-faq-answer-${index}`;

  function toggleAnswer() {
    const panel = panelRef.current;
    const content = contentRef.current;
    const nextOpen = !open;

    if (!panel || !content) {
      setOpen(nextOpen);
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const currentHeight = panel.getBoundingClientRect().height;
    const currentOpacity = Number.parseFloat(
      window.getComputedStyle(panel).opacity,
    );

    animationRef.current?.cancel();
    setOpen(nextOpen);

    if (reduceMotion) {
      panel.style.height = nextOpen ? "auto" : "0px";
      panel.style.opacity = nextOpen ? "1" : "0";
      return;
    }

    panel.style.height = `${currentHeight}px`;
    panel.style.opacity = `${currentOpacity}`;

    const animation = panel.animate(
      [
        { height: `${currentHeight}px`, opacity: currentOpacity },
        {
          height: nextOpen ? `${content.scrollHeight}px` : "0px",
          opacity: nextOpen ? 1 : 0,
        },
      ],
      {
        duration: 380,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );

    animationRef.current = animation;
    animation.onfinish = () => {
      panel.style.height = nextOpen ? "auto" : "0px";
      panel.style.opacity = nextOpen ? "1" : "0";
      animationRef.current = null;
    };
  }

  return (
    <div>
      <h3 className="font-sans">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggleAnswer}
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left font-sans text-lg font-medium leading-snug text-foreground transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900 sm:text-xl"
        >
          {item.question}
          <ChevronDown
            aria-hidden
            className={cn(
              "h-5 w-5 shrink-0 text-brand-700 transition-transform duration-500 ease-out motion-reduce:transition-none",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>

      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        inert={!open}
        className="h-0 overflow-hidden opacity-0"
      >
        <div ref={contentRef}>
          <p
            className={cn(
              "max-w-3xl pb-6 pr-10 font-sans text-base leading-relaxed text-muted-foreground transition-transform duration-500 ease-out motion-reduce:transition-none",
              open
                ? "translate-y-0"
                : "-translate-y-3",
            )}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function BeforeYouPurchase() {
  return (
    <div>
      <Meta className="text-muted-foreground">Before you purchase</Meta>
      <h2
        id="before-you-purchase-heading"
        className="mt-2 font-serif text-4xl leading-none tracking-[0.03em] text-foreground sm:text-5xl"
      >
        Pricing FAQ
      </h2>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {pricingFaqs.map((item, index) => (
          <PricingFaqItem key={item.question} item={item} index={index} />
        ))}
      </div>

      <p className="mt-8 font-sans text-base text-muted-foreground">
        Full details are in our{" "}
        <Link
          href="/terms"
          className="font-medium text-foreground underline decoration-brand-400 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-700"
        >
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="/policies"
          className="font-medium text-foreground underline decoration-brand-400 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-700"
        >
          Emergency &amp; Sickness Policies
        </Link>
        .
      </p>
    </div>
  );
}
