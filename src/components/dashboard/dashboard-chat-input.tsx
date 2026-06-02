"use client";

import { type FormEvent, useId, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

type DashboardChatInputProps = {
  variant?: "fixed" | "inline";
  placeholder?: string;
  onSend?: (message: string) => void;
  className?: string;
  showDisclaimer?: boolean;
};

export function DashboardChatInput({
  variant = "fixed",
  placeholder = "Ask anything about your job search…",
  onSend,
  className,
  showDisclaimer = true,
}: DashboardChatInputProps) {
  const [message, setMessage] = useState("");
  const id = useId();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    onSend?.(trimmed);
    console.log("[dashboard-chat]", trimmed);
    setMessage("");
  }

  const canSend = message.trim().length > 0;

  const wrapperClass =
    variant === "fixed"
      ? "pointer-events-none fixed inset-x-0 bottom-0 z-[15] flex justify-center px-4 pb-5 sm:px-6 sm:pb-6"
      : "w-full";

  const formClass =
    variant === "fixed" ? "pointer-events-auto w-full max-w-2xl" : "w-full";

  return (
    <div className={cn(wrapperClass, className)} aria-label="Chat composer">
      <form onSubmit={handleSubmit} className={formClass}>
        <div
          className={cn(
            "flex items-end gap-2 rounded-[1.75rem] border border-ink-900/12 bg-paper-50 px-4 py-2.5 shadow-[0_4px_24px_rgba(8,8,12,0.08)] transition",
            "focus-within:border-ink-900/25 focus-within:shadow-[0_8px_32px_rgba(8,8,12,0.1)]",
          )}
        >
          <label className="sr-only" htmlFor={id}>
            Message
          </label>
          <textarea
            id={id}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder={placeholder}
            className="max-h-32 min-h-[2.25rem] flex-1 resize-none bg-transparent py-1.5 text-[15px] leading-relaxed text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
            className={cn(
              "mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition",
              canSend
                ? "bg-ink-950 text-paper-50 hover:bg-ink-800"
                : "bg-ink-900/10 text-ink-400",
            )}
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
        {showDisclaimer ? (
          <p className="mt-2 text-center text-[11px] text-ink-400">
            AI copilot can make mistakes. Verify important details.
          </p>
        ) : null}
      </form>
    </div>
  );
}
