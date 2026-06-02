"use client";

import { cn } from "@/lib/utils";

type SettingsToggleRowProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function SettingsToggleRow({
  label,
  description,
  checked,
  onChange,
  disabled,
}: SettingsToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-ink-900/8 bg-paper-100/60 px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[14px] font-medium text-ink-950">{label}</p>
        {description ? (
          <p className="mt-1 text-[13px] leading-relaxed text-ink-500">
            {description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition",
          checked
            ? "border-ink-950 bg-ink-950"
            : "border-ink-900/15 bg-paper-50",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 rounded-full bg-paper-50 shadow-sm transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}
