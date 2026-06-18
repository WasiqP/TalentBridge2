import type { Metadata } from "next";

import { Guest2Page } from "@/components/guest-pages/guest-2";

export const metadata: Metadata = {
  title: "Guest option 2 — Horizontal scroll",
  description:
    "TalentDrobe guest page design option 2 — chat, résumé upload, profile extraction, and sign-up gate.",
};

export default function Page() {
  return <Guest2Page />;
}
