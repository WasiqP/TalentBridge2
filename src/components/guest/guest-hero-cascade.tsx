"use client";

import { GuestHero } from "@/components/guest/guest-hero";
import { GuestHowItWorks } from "@/components/guest/guest-how-it-works";

/**
 * Hero stays pinned; how-it-works scrolls up naturally and pins for step snapping.
 * No transforms on parents — keeps ScrollTrigger reliable.
 */
export function GuestHeroCascade() {
  return (
    <div className="relative">
      <div className="sticky top-0 z-0 h-[100svh] overflow-hidden">
        <GuestHero pinned />
      </div>

      <GuestHowItWorks />
    </div>
  );
}
