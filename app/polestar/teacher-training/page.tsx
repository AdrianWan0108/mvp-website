import type { Metadata } from "next";
import { RedirectStub } from "../../components/redirect-stub";

export const metadata: Metadata = {
  title: "Polestar Comprehensive Teacher Training 2026",
  robots: { index: false, follow: true },
};

/** Teacher training now lives in the Education section. */
export default function TeacherTrainingRedirect() {
  return (
    <RedirectStub
      to="/education/polestar-comprehensive-training"
      label="Polestar Comprehensive Teacher Training"
    />
  );
}
