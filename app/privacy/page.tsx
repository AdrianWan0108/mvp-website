import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "../components/page-header";
import { Container } from "../components/container";
import { PolicyDocument, type PolicySection } from "../components/policy-document";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Motion Vitality Pilates collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

/** Update this whenever the policy changes. */
const lastUpdated = "November 16, 2026";

const linkStyle =
  "font-medium text-foreground underline decoration-brand-400 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-700";

const external = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkStyle}>
    {label}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

const email = (
  <a href={`mailto:${site.email}`} className={`${linkStyle} break-words`}>
    {site.email}
  </a>
);

const lead =
  "At Motion Vitality Pilates (MVP), we respect your privacy. This policy explains what personal information we collect through our website and studio, how we use it, who we share it with, and the choices you have. It follows Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA).";

/**
 * Written to match what the site actually does: the anniversary RSVP form
 * (worker/index.ts → Brevo), Mindbody booking/registration widgets, GTM +
 * Google Analytics (app/layout.tsx), the Meta Pixel on /anniversary, and the
 * Google Maps embed on /contact. If a new form, tracker, or provider is added,
 * update the relevant section here and `lastUpdated` above.
 */
const privacySections: PolicySection[] = [
  {
    title: "Information We Collect",
    items: [
      {
        text: "Information you give us, for example when you:",
        sub: [
          "Book classes, buy packages, or create an account through our booking system (name, email, phone number, and payment details)",
          "RSVP for an event on our website (name, email, phone number, and the events you plan to attend)",
          "Complete our Health Assessment and Waiver Form before your first session (health history, injuries, and emergency contact details)",
          "Contact us by email, phone, or social media",
        ],
      },
      "Information collected automatically when you visit our website, such as your browser and device type, the pages you view, and how you arrived at our site. This is collected through cookies and similar technologies (see section 4).",
    ],
  },
  {
    title: "How We Use Your Information",
    items: [
      "To book and manage your classes, packages, and event RSVPs, and to send confirmations and reminders",
      "To keep you safe in the studio, including tailoring your sessions to any health conditions or injuries you tell us about",
      "To answer your questions and provide customer service",
      "To understand how our website is used and improve it",
      "To measure and improve our advertising, including ads on Facebook and Instagram",
      "To send you news and offers, only where you have agreed to receive them. You can unsubscribe at any time.",
    ],
  },
  {
    title: "Health Information",
    items: [
      "Information on your Health Assessment and Waiver Form is used only by MVP staff and instructors to provide safe, appropriate instruction.",
      "We never use health information for advertising, and we never share it with advertising partners.",
    ],
  },
  {
    title: "Cookies, Analytics, and Advertising",
    items: [
      {
        text: "Our website uses the following tools, which may set cookies on your device:",
        sub: [
          <>
            <strong>Google Analytics</strong> (through Google Tag Manager), to see how visitors use our site. See{" "}
            {external("https://policies.google.com/technologies/partner-sites", "how Google uses this information")}.
          </>,
          <>
            <strong>Meta Pixel</strong>, to measure how well our Facebook and Instagram ads work, for example
            whether someone who saw an ad later RSVPed for an event. See{" "}
            {external("https://www.facebook.com/privacy/policy/", "Meta’s Privacy Policy")}.
          </>,
          <>
            <strong>Google Maps</strong>, shown on our contact page.
          </>,
        ],
      },
      {
        text: "You can limit these at any time:",
        sub: [
          "Block or delete cookies in your browser settings",
          <>Install the {external("https://tools.google.com/dlpage/gaoptout", "Google Analytics opt-out add-on")}</>,
          <>Change your {external("https://www.facebook.com/adpreferences/", "Facebook ad preferences")}</>,
        ],
      },
      "Blocking cookies won’t stop you from using our website.",
    ],
  },
  {
    title: "Who We Share Information With",
    items: [
      "We do not sell or rent your personal information.",
      {
        text: "We share information only with trusted service providers who help us run the studio and website, and only as needed for them to do so:",
        sub: [
          "Mindbody, our class booking, scheduling, and payment system",
          "Brevo, which stores event RSVPs and sends confirmation emails",
          "Google, for website analytics and maps",
          "Meta (Facebook and Instagram), for advertising measurement",
          "Cloudflare, which hosts our website",
        ],
      },
      "Some of these providers may store or process information outside Canada, including in the United States, where it may be subject to the laws of that country.",
      "We may also disclose information if required by law, or in an emergency to protect someone’s health or safety.",
    ],
  },
  {
    title: "How Long We Keep Information",
    items: [
      "We keep personal information only as long as we need it for the purposes above, or as required by law. When it is no longer needed, we delete it or make it anonymous.",
    ],
  },
  {
    title: "How We Protect Information",
    items: [
      "We use reasonable physical, administrative, and technical safeguards to protect your information, including secure (HTTPS) connections on our website and limiting access to the staff who need it.",
      "No method of transmission or storage is completely secure, but we work to protect your information and will notify you if a breach puts you at real risk of harm, as the law requires.",
    ],
  },
  {
    title: "Your Choices and Rights",
    items: [
      {
        text: "You may ask us to:",
        sub: [
          "Tell you what personal information we hold about you",
          "Correct information that is inaccurate or out of date",
          "Withdraw your consent to us using your information, for example to stop marketing emails",
        ],
      },
      {
        text: (
          <>
            To make a request, email us at {email}. We’ll respond within 30 days. Withdrawing consent may mean we
            can’t provide some services, such as booking classes.
          </>
        ),
      },
    ],
  },
  {
    title: "Children",
    items: [
      "Our website is not directed to children under 13. Information about clients under 18 is provided by a parent or guardian.",
    ],
  },
  {
    title: "Changes to This Policy",
    items: [
      "We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studio policies"
        title="Privacy Policy"
        intro="How we collect, use, and protect your personal information."
        tone="dark"
      />
      <Container className="py-16">
        <p className="mb-8 text-base font-medium text-muted-foreground">Last updated: {lastUpdated}</p>
        <PolicyDocument intro={lead} sections={privacySections} />
        <div className="mt-10 space-y-2 text-lg font-medium leading-relaxed text-foreground">
          <p>Questions about this policy or your information? Contact us:</p>
          <p>
            {site.name}
            <br />
            {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}
            <br />
            {email} ·{" "}
            <a href={`tel:${site.phone}`} className={linkStyle}>
              {site.phoneDisplay}
            </a>
          </p>
          <p>
            See also our{" "}
            <Link href="/terms" className={linkStyle}>
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
