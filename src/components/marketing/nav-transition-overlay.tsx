"use client";

import { motion, useReducedMotion } from "motion/react";

import { MARKETING_TRANSITION_COLOR } from "@/config/marketing-routes";

const EASE = [0.77, 0, 0.175, 1] as const;

export function NavTransitionOverlay() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[150]"
        style={{ backgroundColor: MARKETING_TRANSITION_COLOR }}
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[150] will-change-transform"
      style={{ backgroundColor: MARKETING_TRANSITION_COLOR }}
      initial={{ x: "100%" }}
      animate={{ x: ["100%", "0%", "0%", "-100%"] }}
      transition={{
        duration: 0.95,
        times: [0, 0.4, 0.52, 1],
        ease: EASE,
      }}
      aria-hidden
    />
  );
}
