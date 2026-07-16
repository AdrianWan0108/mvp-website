import type { Metadata } from "next";
import { RedirectStub } from "../components/redirect-stub";

export const metadata: Metadata = {
  title: "About Us",
  robots: { index: false, follow: true },
};

/** /about split into /about/our-story + /about/our-team; forward to the story. */
export default function AboutRedirect() {
  return <RedirectStub to="/about/our-story" label="Our Story" />;
}
