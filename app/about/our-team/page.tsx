import type { Metadata } from "next";
import { RedirectStub } from "../../components/redirect-stub";

export const metadata: Metadata = {
  title: "Our Team",
  robots: { index: false, follow: true },
};

/** Merged into the combined /about page; forward old links there. */
export default function OurTeamRedirect() {
  return <RedirectStub to="/about" label="About" />;
}
