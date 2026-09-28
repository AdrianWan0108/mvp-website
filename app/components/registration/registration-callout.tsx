import Link from "next/link";
import { links } from "@/app/lib/links";

export function RegistrationCallout() {
  return (
    <aside
      aria-labelledby="registration-callout-heading"
      className="mb-6 flex flex-col gap-3 text-brand-900 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <div>
        <p
          id="registration-callout-heading"
          className="text-xl font-semibold leading-relaxed"
        >
          Need a Mindbody account?
        </p>
        <p className="mt-1 text-lg leading-relaxed text-muted-foreground">
          You can register here even if you plan to pay at the studio.
        </p>
      </div>
      <Link
        href={links.register}
        className="inline-flex min-h-11 shrink-0 items-center self-start text-lg font-semibold underline underline-offset-4 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900 sm:self-center"
      >
        Create an account →
      </Link>
    </aside>
  );
}
