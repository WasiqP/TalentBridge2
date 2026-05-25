"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  by?: "word" | "char";
  stagger?: number;
  delay?: number;
};

export function TextReveal({
  text,
  className,
  as: Tag = "span",
  by = "word",
  stagger = 0.05,
  delay = 0,
}: TextRevealProps) {
  const parts = by === "word" ? text.split(" ") : text.split("");

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.span;

  return (
    <MotionTag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className="inline-block overflow-hidden align-baseline"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {part}
            {by === "word" && i < parts.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
