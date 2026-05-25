import Link from "next/link";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "lime"
  | "dark";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-950 text-paper-50 hover:bg-ink-800 shadow-sm",
  secondary:
    "bg-paper-100 text-ink-900 border border-ink-900/10 hover:bg-paper-200",
  ghost: "text-ink-900 hover:bg-ink-900/5",
  outline:
    "border border-ink-900/15 bg-transparent text-ink-900 hover:border-ink-900/40",
  lime: "bg-accent-lime text-ink-950 hover:bg-accent-lime-dark shadow-[0_0_0_1px_rgba(154,220,54,0.4)] hover:shadow-glow-lime",
  dark: "bg-ink-900/5 text-ink-50 border border-paper-50/15 hover:bg-paper-50/10 backdrop-blur",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
  xl: "h-14 px-8 text-base",
  icon: "h-10 w-10",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild,
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    if (asChild && href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
