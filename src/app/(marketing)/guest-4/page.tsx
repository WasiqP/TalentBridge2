import type { Metadata } from "next";

import { Guest4Page } from "@/components/guest-pages/guest-4";

export const metadata: Metadata = {
  title: "Guest option 4",
  description: "TalentDrobe guest page design option 4.",
};

export default function Page() {
  return <Guest4Page />;
}
