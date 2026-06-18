import type { Metadata } from "next";

import { Guest1Page } from "@/components/guest-pages/guest-1";

export const metadata: Metadata = {
  title: "Guest option 1",
  description: "TalentDrobe guest page design option 1.",
};

export default function Page() {
  return <Guest1Page />;
}
