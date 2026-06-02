"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type DashboardPageFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export function DashboardPageFrame({
  children,
  className,
}: DashboardPageFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mx-auto w-full max-w-5xl flex-1 px-4 pt-24 pb-28 sm:px-6 lg:pb-32",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
