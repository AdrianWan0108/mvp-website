import type { ReactNode } from "react";

/** A bullet: plain text, or text carrying a nested sub-list. */
export type PolicyItem = string | { text: ReactNode; sub?: ReactNode[] };

export type PolicySection = {
  title: string;
  /** Optional line between the section heading and its bullets. */
  intro?: string;
  items: PolicyItem[];
};

/**
 * Renders one policy document: an optional title and purpose paragraph, then
 * numbered sections of heading + bullets. Deliberately ships no `Container` —
 * the page supplies the wrapper and reading column, as /faq does.
 */
export function PolicyDocument({
  title,
  intro,
  sections,
  footnote,
}: {
  title?: string;
  intro?: string;
  sections: PolicySection[];
  /** Closing line below the last section. */
  footnote?: string;
}) {
  return (
    <section>
      {title && (
        <h2
          className="text-4xl font-bold text-foreground sm:text-5xl"
          style={{ fontFamily: "var(--font-body)", letterSpacing: "normal" }}
        >
          {title}
        </h2>
      )}
      {intro && (
        <p className="mt-4 text-lg font-medium leading-relaxed text-foreground sm:text-xl">
          {intro}
        </p>
      )}

      <div className="mt-10 divide-y divide-border">
        {sections.map((section, index) => (
          <div key={section.title} className="py-6 first:pt-0">
            <h3
              className="text-2xl font-bold text-foreground sm:text-3xl"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "normal" }}
            >
              {index + 1}. {section.title}
            </h3>
            {section.intro && (
              <p className="mt-2 text-lg font-medium leading-relaxed text-foreground">
                {section.intro}
              </p>
            )}
            <ul className="mt-3 list-disc space-y-2 pl-5 text-lg font-medium leading-relaxed text-foreground">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {typeof item === "string" ? item : item.text}
                  {typeof item !== "string" && item.sub && (
                    <ul className="mt-2 list-[circle] space-y-1 pl-5">
                      {item.sub.map((subItem, subIndex) => (
                        <li key={subIndex}>{subItem}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {footnote && (
        <p className="mt-8 text-lg font-medium leading-relaxed text-foreground">
          {footnote}
        </p>
      )}
    </section>
  );
}
