import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  ({ label, hint, error, className, id, ...props }, ref) => {
    const fieldId = id ?? props.name;

    return (
      <div className="space-y-2">
        <label
          htmlFor={fieldId}
          className="block text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          className={cn(
            "flex h-12 w-full rounded-2xl border bg-paper-50 px-4 text-[15px] text-ink-900 transition placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-accent-lime/30 disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-400/80 focus:border-red-400"
              : "border-ink-900/12 focus:border-ink-900",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-[13px] text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-[13px] text-ink-400">{hint}</p>
        )}
      </div>
    );
  },
);

AuthField.displayName = "AuthField";
