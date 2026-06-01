"use client";

import { type FormEvent, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

export function DashboardChatInput() {
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    console.log("[dashboard-chat]", trimmed);
    setMessage("");
  }

  const canSend = message.trim().length > 0;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[15] flex justify-center px-4 pb-5 sm:px-6 sm:pb-6"
      aria-label="Chat composer"
    >
      <form
        onSubmit={handleSubmit}
        className="pointer-events-auto w-full max-w-2xl"
      >
        <div
          className={cn(
            "flex items-end gap-2 rounded-[1.75rem] border border-ink-900/12 bg-paper-50 px-4 py-2.5 shadow-[0_4px_24px_rgba(8,8,12,0.08)] transition",
            "focus-within:border-ink-900/25 focus-within:shadow-[0_8px_32px_rgba(8,8,12,0.1)]",
          )}
        >
          <label className="sr-only" htmlFor="dashboard-chat-message">
            Message
          </label>
          <textarea
            id="dashboard-chat-message"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Ask anything about your job search…"
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
        <p className="mt-2 text-center text-[11px] text-ink-400">
          AI copilot can make mistakes. Verify important details.
        </p>
      </form>
    </div>
  );
}
