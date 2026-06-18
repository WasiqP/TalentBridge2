"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Maximize2, Minimize2, Sparkles } from "lucide-react";

import { DashboardChatInput } from "@/components/dashboard/dashboard-chat-input";
import { getMockReply } from "@/components/dashboard/dashboard-floating-chat";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const WELCOME_MESSAGE =
  "I'm your job-search copilot. Ask about roles, career pivots, salary, or résumé polish — I'll answer with your goals in mind.";

const STARTER_PROMPTS = [
  "Find remote product roles",
  "Help me switch careers",
  "What salary should I expect?",
  "Tailor my résumé",
] as const;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Guest1ChatProps = {
  className?: string;
  /** Fill parent height — for split-panel layout. */
  fillHeight?: boolean;
  /** Collapse to a compact dock bar (split layout only). */
  minimized?: boolean;
  /** Fires when the user sends their first message. */
  onEngagedChange?: (engaged: boolean) => void;
  onMinimizedChange?: (minimized: boolean) => void;
};

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="inline-flex items-center gap-1 rounded-2xl bg-paper-100/90 px-4 py-3 backdrop-blur-sm">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-ink-400"
            animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: dot * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: EASE }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[88%] text-pretty rounded-[18px] px-3.5 py-2.5 text-[13.5px] leading-relaxed sm:max-w-[85%] sm:px-4 sm:py-3 sm:text-[14px]",
          isUser
            ? "bg-ink-950 text-paper-50"
            : "bg-paper-100/85 text-ink-800 backdrop-blur-sm",
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

/** Conversation-first chat for guest option 1. */
export function Guest1Chat({
  className,
  fillHeight = false,
  minimized = false,
  onEngagedChange,
  onMinimizedChange,
}: Guest1ChatProps) {
  const [engaged, setEngaged] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    };
  }, []);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setEngaged(true);
    onEngagedChange?.(true);
    setMessages((prev) => [
      ...prev,
      { id: `u_${Date.now()}`, role: "user", content: trimmed },
    ]);
    setTyping(true);

    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);

    replyTimerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          content: getMockReply(trimmed),
        },
      ]);
    }, 700);
  }, [onEngagedChange]);

  function handleStarter(prompt: string) {
    sendMessage(prompt);
  }

  const showMinimize = fillHeight && engaged;

  if (minimized && showMinimize) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className={cn("w-full", className)}
      >
        <div className="overflow-hidden rounded-[22px] border border-ink-900/12 bg-paper-50/90 shadow-[0_16px_48px_-24px_rgba(8,8,12,0.28)] backdrop-blur-xl backdrop-saturate-150">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-ink-950 text-accent-lime">
              <Bot className="h-4 w-4" aria-hidden />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-paper-50 bg-accent-lime" />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-[13px] font-medium text-ink-950 sm:text-[14px]">
                Career copilot
              </p>
              <p className="truncate text-[11px] text-ink-500">
                {typing ? "Typing…" : "Tap to expand"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onMinimizedChange?.(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink-900/10 bg-paper-100 text-ink-800 transition hover:border-ink-900/20 hover:bg-paper-200"
              aria-label="Expand chat"
            >
              <Maximize2 className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="border-t border-ink-900/6 px-4 pb-4 pt-3 sm:px-5">
            <DashboardChatInput
              variant="inline"
              showAttach
              showDisclaimer={false}
              placeholder="Ask anything about your job search…"
              onSend={sendMessage}
              className="[&_form>div]:border-ink-900/10 [&_form>div]:bg-paper-50/90 [&_form>div]:shadow-none"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={cn("w-full", fillHeight && "flex min-h-0 flex-1 flex-col", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-[26px] bg-paper-50/70 shadow-[0_24px_64px_-40px_rgba(8,8,12,0.22)] backdrop-blur-xl backdrop-saturate-150",
          fillHeight && "flex min-h-0 flex-1 flex-col",
        )}
      >
        <div className="flex items-center gap-3 border-b border-ink-900/6 px-4 py-3 sm:px-5">
          <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-ink-950 text-accent-lime">
            <Bot className="h-4 w-4" aria-hidden />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-paper-50 bg-accent-lime" />
          </span>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[13px] font-medium text-ink-950 sm:text-[14px]">
              Career copilot
            </p>
            <p className="flex items-center gap-1.5 text-[11px] text-ink-500">
              <Sparkles className="h-3 w-3 text-accent-lime" aria-hidden />
              Online · ready to help
            </p>
          </div>
          {showMinimize ? (
            <button
              type="button"
              onClick={() => onMinimizedChange?.(true)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink-900/10 bg-paper-100 text-ink-800 transition hover:border-ink-900/20 hover:bg-paper-200"
              aria-label="Minimize chat"
            >
              <Minimize2 className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>

        <div
          ref={scrollRef}
          className={cn(
            "overflow-y-auto px-4 scrollbar-hide sm:px-5",
            fillHeight
              ? cn(
                  "min-h-0 flex-1 transition-[flex] duration-500 ease-out",
                  engaged ? "py-4" : "py-0",
                )
              : cn(
                  "transition-[max-height] duration-500 ease-out",
                  engaged ? "max-h-[min(42vh,17rem)] py-4 sm:max-h-[min(38vh,18rem)]" : "max-h-0 py-0",
                ),
          )}
        >
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>
            {typing ? <TypingIndicator /> : null}
          </div>
        </div>

        <div
          className={cn(
            "space-y-3 px-4 pb-4 pt-3 sm:px-5 sm:pb-5",
            fillHeight && "shrink-0",
          )}
        >
          {!engaged ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="space-y-3 text-left"
            >
              <div className="flex justify-start">
                <div className="max-w-[95%] rounded-[18px] bg-paper-100/85 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink-800 backdrop-blur-sm sm:px-4 sm:py-3 sm:text-[14px]">
                  {WELCOME_MESSAGE}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleStarter(prompt)}
                    className="rounded-full bg-paper-100/90 px-3 py-1.5 text-[11.5px] font-medium text-ink-700 transition hover:bg-accent-lime/20 hover:text-ink-950 sm:text-[12px]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}

          <DashboardChatInput
            variant="inline"
            showAttach
            showDisclaimer={false}
            placeholder="Ask anything about your job search…"
            onSend={sendMessage}
            className="[&_form>div]:border-ink-900/10 [&_form>div]:bg-paper-50/90 [&_form>div]:shadow-none"
          />

          <p className="text-center text-[11px] text-ink-400">
            AI copilot can make mistakes. Verify important details.
          </p>
        </div>
      </div>
    </div>
  );
}
