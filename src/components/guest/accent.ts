import type { GuestAccent } from "@/constants/guest-page";

/** Shared accent class maps for guest-page components. */
export const accentText: Record<GuestAccent, string> = {
  lime: "text-accent-lime",
  violet: "text-accent-violet",
  cyan: "text-accent-cyan",
  amber: "text-accent-amber",
};

export const accentDot: Record<GuestAccent, string> = {
  lime: "bg-accent-lime",
  violet: "bg-accent-violet",
  cyan: "bg-accent-cyan",
  amber: "bg-accent-amber",
};

/** Soft tinted chip/badge — works on dark backgrounds. */
export const accentSoft: Record<GuestAccent, string> = {
  lime: "border-accent-lime/30 bg-accent-lime/15 text-accent-lime",
  violet: "border-accent-violet/30 bg-accent-violet/15 text-accent-violet",
  cyan: "border-accent-cyan/30 bg-accent-cyan/15 text-accent-cyan",
  amber: "border-accent-amber/30 bg-accent-amber/15 text-accent-amber",
};

/** Soft tinted chip/badge — works on light backgrounds. */
export const accentSoftLight: Record<GuestAccent, string> = {
  lime: "border-accent-lime/40 bg-accent-lime/15 text-ink-900",
  violet: "border-accent-violet/30 bg-accent-violet/12 text-accent-violet",
  cyan: "border-accent-cyan/40 bg-accent-cyan/18 text-ink-900",
  amber: "border-accent-amber/40 bg-accent-amber/18 text-ink-900",
};

export const accentGlow: Record<GuestAccent, string> = {
  lime: "rgba(193, 249, 104, 0.35)",
  violet: "rgba(139, 92, 246, 0.4)",
  cyan: "rgba(94, 234, 212, 0.3)",
  amber: "rgba(245, 185, 66, 0.3)",
};

export const accentSpot: Record<GuestAccent, string> = {
  lime: "rgba(193, 249, 104, 0.18)",
  violet: "rgba(139, 92, 246, 0.22)",
  cyan: "rgba(94, 234, 212, 0.18)",
  amber: "rgba(245, 185, 66, 0.18)",
};
