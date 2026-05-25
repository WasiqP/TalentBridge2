"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  offset?: number;
};

export function Parallax({ children, className, offset = 80 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
