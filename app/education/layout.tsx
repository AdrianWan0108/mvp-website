import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher Training",
  description:
    "Pilates teacher training at Motion Vitality Pilates, the Markham/Toronto host site for Polestar Pilates programs.",
};

/**
 * Scopes the neutral-ink "education" theme to the entire /education segment.
 * The attribute cascades to all descendants, giving the section its editorial
 * course-catalog treatment while typography, spacing, and components stay
 * identical to the rest of the site. flex-1 ensures the dark surface fills the
 * viewport height even on short pages.
 */
export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-theme="education"
      className="flex flex-1 flex-col bg-background text-foreground"
    >
      {children}
    </div>
  );
}
