import type { Metadata } from "next";
import { RedirectStub } from "../components/redirect-stub";

export const metadata: Metadata = {
  title: "MVP × Polestar",
  robots: { index: false, follow: true },
};

/** The Polestar relationship story moved under About. */
export default function PolestarRedirect() {
  return <RedirectStub to="/about/polestar" label="MVP × Polestar" />;
}
