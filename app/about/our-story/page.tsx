import type { Metadata } from "next";
import { RedirectStub } from "../../components/redirect-stub";

export const metadata: Metadata = {
  title: "Our Story",
  robots: { index: false, follow: true },
};

/** The studio story now lives on the dedicated Studio page. */
export default function OurStoryRedirect() {
  return <RedirectStub to="/about/studio" label="Our Studio" />;
}
