import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/page-header";
import { Container } from "../components/container";
import { PolicyDocument, type PolicySection } from "../components/policy-document";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for classes, packages, and bookings at Motion Vitality Pilates.",
};

const linkStyle =
  "font-medium text-foreground underline decoration-brand-400 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-700";

const lead =
  "At Motion Vitality Pilates (MVP), we strive to provide a supportive and professional environment where all clients can experience the benefits of mindful movement. Please review the following terms and conditions carefully, as they are designed to ensure fairness, transparency, and optimal experience for all participants.";

/**
 * Migrated from the studio's existing Terms & Conditions. Wording is verbatim
 * apart from two fixes: the package-validity line now defers to /pricing rather
 * than hard-coding a period that would drift out of sync, and "Wavier" is
 * corrected to "Waiver".
 */
const termsSections: PolicySection[] = [
  {
    title: "Session and Package Options",
    items: [
      {
        text: "Clients may choose to purchase:",
        sub: [
          "Single sessions (drop-in is based on availability)",
          <>
            Multi-session packages, valid for the period shown on the selected
            option on our{" "}
            <Link href="/pricing" className={linkStyle}>
              pricing page
            </Link>
          </>,
        ],
      },
      "MVP reserves the right to adjust the duration, validity, and structure of packages at its discretion and without prior notice.",
    ],
  },
  {
    title: "Booking and Instructor Allocation",
    items: [
      "Advance booking is available only to clients who have purchased a 10-session package. Drop-in clients are not eligible for pre-booking, except for Assessment and Introductory Group Classes.",
      "Only clients with Private session packages are guaranteed the instructor of their choice. While MVP strives to accommodate instructor preferences in other session types, this cannot be guaranteed.",
    ],
  },
  {
    title: "Session Flexibility and Substitution",
    items: [
      "Clients with higher-priced session packages (e.g., Reformer) may choose to attend lower-priced classes (e.g., Mat). However, no monetary or credit refund will be issued for the price difference.",
      "In the event that a Semi-Private or Group session becomes a Private session due to the absence of other participants, an additional fee may apply, particularly for Semi-Private clients.",
    ],
  },
  {
    title: "Payment and Package Use",
    items: [
      "All session fees must be paid in full and in advance before booking.",
      "Packages are non-refundable, non-transferable, and must be used within the stated validity period. Unused sessions will not be carried over, nor will they be eligible for make-up classes unless approved under exceptional circumstances by MVP.",
      "Sessions cannot be transferred, exchanged, or shared with other individuals under any circumstances.",
    ],
  },
  {
    title: "Cancellations and Late Policy",
    items: [
      "MVP maintains a 24-hour cancellation policy for both Private and Group classes. Any cancellations made within 24 hours of the scheduled session will be considered a late cancellation and will be fully charged.",
      "Clients must notify MVP or their instructor directly to cancel or reschedule. Missed sessions without proper notice will be forfeited.",
    ],
  },
  {
    title: "Class Adjustments by MVP",
    items: [
      "If MVP cancels a Group session booked in advance, the client may choose to reschedule the missed session(s) in accordance with the updated MVP schedule.",
    ],
  },
  {
    title: "Health & Safety",
    items: [
      "All clients are required to complete a Health Assessment and Waiver Form prior to participation. Clients with medical conditions or injuries must inform MVP staff in advance.",
      "MVP strongly encourages clients over the age of 50 or those with existing health concerns to consult a physician before beginning any exercise program.",
    ],
  },
  {
    title: "Policy Agreement",
    items: [
      "By purchasing and/or participating in any session at MVP, clients acknowledge and agree to these Terms and Conditions.",
      "These terms are subject to change at any time without prior notice. The most current version will always be available upon request or on our website.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studio policies"
        title="Terms & Conditions"
        intro="The terms that apply to classes, packages, and bookings at Motion Vitality Pilates."
        tone="dark"
      />
      <Container className="py-16">
        <PolicyDocument intro={lead} sections={termsSections} />
        <p className="mt-10 text-lg font-medium leading-relaxed text-foreground">
          Please{" "}
          <Link href="/contact" className={linkStyle}>
            contact us
          </Link>{" "}
          for further explanation for the above and/or to book an assessment
          session.
        </p>
      </Container>
    </>
  );
}
