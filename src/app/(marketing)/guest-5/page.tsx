import type { Metadata } from "next";

import { Guest5Page } from "@/components/guest-pages/guest-5";

export const metadata: Metadata = {
  title: "Guest option 5",
  description: "TalentDrobe guest page design option 5.",
};

export default function Page() {
  return <Guest5Page />;
}
