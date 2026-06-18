"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUp, Bot, Paperclip } from "lucide-react";

import { cn } from "@/lib/utils";

const WELCOME_MESSAGE =
  "Upload your résumé on the next step and I'll build a complete profile — experience, skills, education, and tailored suggestions.";

const STARTER_PROMPTS = [
  "What do you extract from my CV?",
  "How long does parsing take?",
  "Can I edit my profile after?",
  "What file types work?",
] as const;

type Guest2ChatPanelProps = {
  onContinue?: () => void;
};

/** Panel 1 — career copilot intro for guest option 2. */
export function Guest2ChatPanel({ onContinue }: Guest2ChatPanelProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessage("");
    onContinue?.();
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <section className="flex h-screen w-screen shrink-0 grow-0 basis-[100vw] items-center justify-center bg-white px-6 pt-16">
      <div className="w-full max-w-[560px]">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-400">
            Step 1
          </p>
          <h1 className="mt-2 text-[36px] font-medium tracking-[-0.03em] text-ink-950 sm:text-[42px]">
            Hey there
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-500">
            Your career copilot is ready. Start with a question, or continue to
            upload your résumé.
          </p>
        </div>

        <div className="mt-10 rounded-[24px] border border-ink-900/10 bg-white p-5 shadow-[0_8px_40px_rgba(8,8,12,0.04)]">
          <div className="flex items-center gap-3 border-b border-ink-900/8 pb-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-950 text-white">
              <Bot className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-[14px] font-medium text-ink-950">Career copilot</p>
              <p className="text-[12px] text-emerald-600">Online · ready to help</p>
            </div>
          </div>

          <p className="mt-4 text-[14px] leading-relaxed text-ink-700">
            {WELCOME_MESSAGE}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setMessage(prompt);
                  onContinue?.();
                }}
                className="rounded-full border border-ink-900/12 bg-white px-3.5 py-2 text-[13px] text-ink-700 transition hover:border-ink-900/25 hover:bg-ink-900/[0.03]"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-end gap-2 rounded-2xl border border-ink-900/10 bg-ink-900/[0.02] py-2 pl-4 pr-2">
            <button
              type="button"
              className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-500 transition hover:bg-white hover:text-ink-900"
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" strokeWidth={2.25} />
            </button>
            <textarea
              rows={1}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleComposerKeyDown}
              placeholder="Ask anything about your profile..."
              className="max-h-24 min-h-[2.25rem] min-w-0 flex-1 resize-none bg-transparent py-1.5 text-[15px] leading-relaxed text-ink-900 placeholder:text-ink-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!message.trim()}
              aria-label="Send message"
              className={cn(
                "mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition",
                message.trim()
                  ? "bg-ink-950 text-[#CBFF4D] hover:bg-ink-800"
                  : "bg-ink-900/10 text-ink-400",
              )}
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 text-[14px] font-medium text-white transition hover:bg-ink-800"
        >
          Continue to upload
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </section>
  );
}
