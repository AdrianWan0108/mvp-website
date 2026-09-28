import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "../components/container";
import { RegistrationWidget } from "../components/registration/registration-widget";

export const metadata: Metadata = {
  title: "Create your Mindbody account",
  description:
    "Register with Motion Vitality Pilates in Markham through Mindbody, including if you plan to pay at the studio.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <>
      <section className="bg-brand-800 text-white">
        <Container className="py-12 text-center sm:py-14 lg:py-16">
          <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[1.05] sm:text-6xl">
            Register with MVP
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Create your Mindbody account for Motion Vitality Pilates. You can
            register here even if you plan to pay at the studio.
          </p>
        </Container>
      </section>

      <section aria-label="Registration form" className="bg-brand-50 py-10 text-brand-900 sm:py-12">
        <Container>
          <RegistrationWidget />
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <Link
              href="/schedule"
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900"
            >
              View class schedule
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900"
            >
              Need help? Contact us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
