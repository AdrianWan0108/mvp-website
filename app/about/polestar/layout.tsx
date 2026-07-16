import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MVP × Polestar",
  description:
    "The relationship between Motion Vitality Pilates and Polestar Pilates — a rehabilitation-informed method, faculty-level mentorship, and Canada's first Polestar Comprehensive Teacher Training in Markham/Toronto.",
};

/**
 * Scopes the "polestar-brand" theme (Polestar's official slate + amber colors)
 * to the MVP × Polestar page. This page represents Polestar's identity rather
 * than MVP's, so it deliberately steps outside the studio palette. flex-1
 * ensures the dark surface fills the viewport height even on short pages.
 */
export default function PolestarBrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-theme="polestar-brand"
      className="flex flex-1 flex-col bg-background text-foreground"
    >
      {children}
    </div>
  );
}
