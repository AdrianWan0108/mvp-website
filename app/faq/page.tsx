import type { Metadata } from "next";
import { PageHeader } from "../components/page-header";
import { Container } from "../components/container";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about Pilates at Motion Vitality Pilates — what Pilates is, age suitability, grip socks, and small class sizes.",
};

const faqIntro =
  "The essentials before your first session at Motion Vitality Pilates (MVP). If your question isn't answered below, please reach out any time.";

const faqs = [
  {
    q: "What is Pilates?",
    a: "Pilates is a low-impact method developed by Joseph Pilates that builds core strength, flexibility, posture, and body awareness through controlled movement — on the mat and on specialized equipment like the reformer.",
  },
  {
    q: "Is there an age limit for Pilates?",
    a: "No. Pilates suits teens through seniors. Programming adapts to each body and stage of life, including pre/postnatal, senior, and rehabilitation needs.",
  },
  {
    q: "Why are grip socks required in class?",
    a: "Grip socks are about hygiene and safety. They prevent slipping on the reformer and studio equipment, giving you stable, confident footing throughout your session.",
  },
  {
    q: "Why do you cap reformer classes at 8 participants?",
    a: "Smaller classes mean every participant receives personalized attention and hands-on cueing, so your form stays safe, precise, and effective.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        eyebrow="Good to know"
        title="Frequently asked questions"
        intro="The essentials before your first session. Don't see your question? Reach out any time."
        tone="dark"
      />
      <Container className="py-16">
        <section>
          <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
            {faqIntro}
          </p>

          <dl className="mt-10 divide-y divide-border">
            {faqs.map((item, index) => (
              <div key={item.q} className="py-6 first:pt-0">
                <dt
                  className="text-2xl font-bold text-foreground sm:text-3xl"
                  style={{
                    fontFamily: "var(--font-body)",
                    letterSpacing: "normal",
                  }}
                >
                  {index + 1}. {item.q}
                </dt>
                <dd className="mt-3 text-lg font-medium leading-relaxed text-foreground">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>
    </>
  );
}
