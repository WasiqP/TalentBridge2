"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export const dashboardScreenVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "18%" : "-18%",
    opacity: 0,
    filter: "blur(10px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-14%" : "14%",
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.42, ease: EASE },
  }),
};

type DashboardScreenTransitionProps = {
  children: React.ReactNode;
  direction: number;
  className?: string;
};

export function DashboardScreenTransition({
  children,
  direction,
  className,
}: DashboardScreenTransitionProps) {
  return (
    <motion.div
      custom={direction}
      variants={dashboardScreenVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className={cn("min-h-svh w-full", className)}
    >
      {children}
    </motion.div>
  );
}
