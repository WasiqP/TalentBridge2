import type { Metadata } from "next";

import { Guest3Page } from "@/components/guest-pages/guest-3";

export const metadata: Metadata = {
  title: "Guest option 3",
  description: "TalentDrobe guest page design option 3.",
};

export default function Page() {
  return <Guest3Page />;
}
