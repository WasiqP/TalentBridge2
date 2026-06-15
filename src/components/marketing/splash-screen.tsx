"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { MARKETING_TRANSITION_COLOR } from "@/config/marketing-routes";

const INTRO_EASE = [0.22, 1, 0.36, 1] as const;
const EXIT_EASE = [0.77, 0, 0.175, 1] as const;
const HOLD_MS = 2200;
const EXIT_MS = 1150;

type SplashScreenProps = {
  onComplete: () => void;
};

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"hold" | "exit">("hold");

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = window.setTimeout(onComplete, 100);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => setPhase("exit"), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center will-change-transform"
      style={{ backgroundColor: MARKETING_TRANSITION_COLOR }}
      initial={{ x: 0 }}
      animate={phase === "exit" ? { x: "-100%" } : { x: 0 }}
      transition={
        phase === "exit"
          ? { duration: EXIT_MS / 1000, ease: EXIT_EASE }
          : { duration: 0 }
      }
      onAnimationComplete={() => {
        if (phase === "exit") onComplete();
      }}
    >
      <motion.h1
        className="text-center text-[clamp(2.75rem,9vw,5.5rem)] font-bold leading-none tracking-[-0.03em] text-ink-950"
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        initial={{ opacity: 0, x: 56 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.05, delay: 0.2, ease: INTRO_EASE }}
      >
        TalentDrobe
      </motion.h1>
    </motion.div>
  );
}
