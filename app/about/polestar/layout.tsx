import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MVP × Polestar",
  description:
    "The relationship between Motion Vitality Pilates and Polestar Pilates — a rehabilitation-informed method, faculty-level mentorship, and Canada's first Polestar Comprehensive Teacher Training in Markham/Toronto.",
};

/** Keeps the relationship page inside MVP's shared Verdant visual system. */
export default function PolestarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      {children}
    </div>
  );
}
