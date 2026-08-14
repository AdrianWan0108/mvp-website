import type { Metadata } from "next";
import { RedirectStub } from "../components/redirect-stub";

export const metadata: Metadata = {
  title: "About",
  robots: { index: false, follow: true },
};

/** About now has dedicated Studio and Team pages; Studio is the landing route. */
export default function AboutRedirect() {
  return <RedirectStub to="/about/studio" label="Our Studio" />;
}
