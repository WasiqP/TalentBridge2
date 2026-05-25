import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
  light?: boolean;
};

export function Logo({ className, href = "/", light = false }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 font-semibold tracking-tight",
        light ? "text-paper-50" : "text-ink-950",
        className,
      )}
      aria-label="TalentBridge home"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-ink-950">
        <span className="absolute inset-0 bg-gradient-to-br from-accent-lime via-accent-cyan to-accent-violet opacity-90" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="relative h-4 w-4 text-ink-950"
          aria-hidden
        >
          <path
            d="M4 7L12 3L20 7M4 7V17L12 21M4 7L12 11M12 21L20 17V7M12 21V11M20 7L12 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[15px]">TalentBridge</span>
    </Link>
  );
}
