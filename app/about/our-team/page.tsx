import type { Metadata } from "next";
import { RedirectStub } from "../../components/redirect-stub";

export const metadata: Metadata = {
  title: "Our Team",
  robots: { index: false, follow: true },
};

/** The instructor story now lives on the dedicated Team page. */
export default function OurTeamRedirect() {
  return <RedirectStub to="/about/team" label="Our Team" />;
}
