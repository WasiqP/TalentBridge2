export type Guest1SuggestionStatus = "critical" | "needs-work" | "satisfactory" | "optional";

export type Guest1ProfileSuggestion = {
  id: string;
  category: "Impact" | "Skills" | "Completeness" | "Clarity";
  status: Guest1SuggestionStatus;
  title: string;
  text: string;
  /** Short outcome if the user applies the fix. */
  outcome?: string;
};

/** Résumé quick wins surfaced in chat after profile assembly completes. */
export const guest1ProfileSuggestions: Guest1ProfileSuggestion[] = [
  {
    id: "s-impact",
    category: "Impact",
    status: "critical",
    title: "Lead with the outcome, not the task",
    text: "Your Northwind bullet opens with what you did — flip it so “lifted activation 23%” lands first, then the action.",
    outcome: "Stronger recruiter scan in the first 6 seconds",
  },
  {
    id: "s-skills",
    category: "Skills",
    status: "needs-work",
    title: "Skills list is missing proof from your experience",
    text: "“Design Ops” and “Workshop facilitation” appear in your roles but not in skills — add them so ATS and recruiters connect the dots.",
    outcome: "+2 better-fit matches this week",
  },
  {
    id: "s-complete",
    category: "Completeness",
    status: "critical",
    title: "Two gaps blocking 100% completeness",
    text: "Confirm your 2016–2018 role dates and add a portfolio link — both are quick edits that unlock full profile strength.",
    outcome: "Reach 100% profile completeness",
  },
  {
    id: "s-clarity",
    category: "Clarity",
    status: "satisfactory",
    title: "Summary reads well — one tighten-up",
    text: "Your opening line is solid. Trim the second sentence by ~12 words so the hook stays punchy on mobile previews.",
    outcome: "Cleaner preview in search results",
  },
];

export const guest1ProfileCompleteIntro = {
  eyebrow: "AI résumé insights",
  title: "4 fixes before you apply",
  subtitle:
    "I compared your résumé to strong profiles in your lane. Tackle the critical items first — the rest is polish.",
};

export type Guest1SuggestionStatusMeta = {
  label: string;
  hint: string;
};

export const guest1SuggestionStatusMeta: Record<
  Guest1SuggestionStatus,
  Guest1SuggestionStatusMeta
> = {
  critical: { label: "Critical", hint: "Fix before applying" },
  "needs-work": { label: "Needs work", hint: "Worth addressing soon" },
  satisfactory: { label: "Satisfactory", hint: "Good — minor polish" },
  optional: { label: "Optional", hint: "Nice to have" },
};
