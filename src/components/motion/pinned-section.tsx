"use client";

import { useEffect, useRef } from "react";

import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type PinnedSectionProps = {
  children: React.ReactNode;
  className?: string;
  end?: string;
};

export function PinnedSection({
  children,
  className,
  end = "+=200%",
}: PinnedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end,
        pin: true,
        pinSpacing: true,
      });
    }, ref);

    return () => ctx.revert();
  }, [end]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
    </div>
  );
}
