import type { Stat } from "@/types";

export const heroStats: Stat[] = [
  { value: 10, suffix: "x", label: "Faster sourcing" },
  { value: 3.2, suffix: "x", decimals: 1, label: "Higher reply rate" },
  { value: 72, suffix: "%", label: "Less manual work" },
];

export const stats: Stat[] = [
  {
    value: 12,
    suffix: "M+",
    label: "Hours saved",
    description: "by recruiting teams across our platform in the last 12 months.",
  },
  {
    value: 87,
    suffix: "%",
    label: "Faster shortlists",
    description: "from job posted to first qualified candidate in pipeline.",
  },
  {
    value: 70,
    suffix: "%",
    label: "Less busywork",
    description: "spent on sourcing, screening, and outreach drafting.",
  },
  {
    value: 41,
    suffix: "%",
    label: "Average reply rate",
    description:
      "on AI-personalized outreach — 3.2x the industry baseline.",
  },
];
