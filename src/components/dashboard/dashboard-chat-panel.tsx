"use client";

import { useEffect, useMemo, useRef } from "react";
import { Bot, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { DashboardChatInput } from "@/components/dashboard/dashboard-chat-input";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  ts?: number;
};

type DashboardChatPanelProps = {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  className?: string;
};

export function DashboardChatPanel({
  messages,
  onSend,
  className,
}: DashboardChatPanelProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  const rendered = useMemo(() => messages, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [rendered.length]);

  return (
    <section
      className={cn(
        "flex h-full min-h-0 max-h-full flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px]",
        className,
      )}
      aria-label="Chat"
    >
      <div className="flex items-center justify-between border-b border-ink-900/8 px-5 py-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-400">
            Chat
          </p>
          <p className="mt-1 text-[14px] font-medium text-ink-950">
            Resume onboarding
          </p>
        </div>
      </div>

      <div
        className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
        data-lenis-prevent
        data-lenis-prevent-wheel
        onWheel={(e) => e.stopPropagation()}
      >
        {rendered.length === 0 ? (
          <p className="text-[14px] leading-relaxed text-ink-400">
            Upload a resume to start. I&apos;ll guide you step by step.
          </p>
        ) : null}

        <AnimatePresence initial={false}>
          {rendered.map((m) => {
            const isUser = m.role === "user";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex gap-3",
                  isUser ? "justify-end" : "justify-start",
                )}
              >
                {!isUser ? (
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-ink-900/10 bg-paper-100 text-ink-700">
                    <Bot className="h-4.5 w-4.5" aria-hidden />
                  </span>
                ) : null}

                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed sm:text-[15px]",
                    isUser
                      ? "bg-ink-950 text-paper-50"
                      : "border border-ink-900/10 bg-paper-100 text-ink-800",
                  )}
                >
                  {m.content}
                </div>

                {isUser ? (
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-ink-900/10 bg-paper-100 text-ink-700">
                    <UserRound className="h-4.5 w-4.5" aria-hidden />
                  </span>
                ) : null}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="border-t border-ink-900/8 px-4 py-4 sm:px-5">
        <DashboardChatInput
          variant="inline"
          onSend={onSend}
          placeholder="Message the copilot…"
          showDisclaimer={false}
        />
      </div>
    </section>
  );
}

