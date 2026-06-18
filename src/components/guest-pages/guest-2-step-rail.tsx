"use client";

import { cn } from "@/lib/utils";

const STEPS = [
  { id: 0, label: "Copilot" },
  { id: 1, label: "Upload" },
  { id: 2, label: "Profile" },
] as const;

type Guest2StepRailProps = {
  activeStep: number;
  profileReady: boolean;
  onStepClick?: (index: number) => void;
  locked?: boolean;
};

/** Top progress rail for guest option 2. */
export function Guest2StepRail({
  activeStep,
  profileReady,
  onStepClick,
  locked = false,
}: Guest2StepRailProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-6 pt-6 sm:pt-8">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-ink-900/8 bg-white px-2 py-2 shadow-[0_4px_24px_rgba(8,8,12,0.06)]">
        {STEPS.map((step, index) => {
          const isActive = activeStep === step.id;
          const isDone =
            step.id < activeStep ||
            (step.id === 1 && profileReady) ||
            (step.id === 2 && profileReady && activeStep === 2);
          const isDisabled =
            locked ||
            (step.id === 2 && !profileReady);

          return (
            <div key={step.id} className="flex items-center gap-2">
              {index > 0 ? (
                <span
                  className={cn(
                    "h-px w-6 sm:w-10",
                    isDone || isActive ? "bg-ink-900/25" : "bg-ink-900/10",
                  )}
                  aria-hidden
                />
              ) : null}
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium transition sm:px-3.5",
                  isActive
                    ? "bg-ink-950 text-white"
                    : isDone
                      ? "text-ink-700 hover:bg-ink-900/5"
                      : "text-ink-400",
                  isDisabled && "cursor-not-allowed opacity-45",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
                    isActive
                      ? "bg-white/15 text-white"
                      : isDone
                        ? "bg-ink-900/8 text-ink-800"
                        : "bg-ink-900/6 text-ink-500",
                  )}
                >
                  {step.id + 1}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
