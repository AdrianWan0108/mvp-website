import type { Metadata } from "next";
import { RedirectStub } from "../../components/redirect-stub";

export const metadata: Metadata = {
  title: "Our Story",
  robots: { index: false, follow: true },
};

/** Merged into the combined /about page; forward old links there. */
export default function OurStoryRedirect() {
  return <RedirectStub to="/about" label="About" />;
}
