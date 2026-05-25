import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "dark" | "lime" | "outline";
};

const variantStyles = {
  default:
    "border-ink-900/12 bg-ink-900/5 text-ink-700",
  dark: "border-paper-50/15 bg-paper-50/5 text-paper-50",
  lime: "border-accent-lime/30 bg-accent-lime/15 text-ink-950",
  outline: "border-ink-900/20 bg-transparent text-ink-900",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
