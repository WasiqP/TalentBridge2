"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgeCheck,
  Briefcase,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Wand2,
  Wallet,
  X,
} from "lucide-react";

import { DashboardChatInput } from "@/components/dashboard/dashboard-chat-input";
import { getMockReply } from "@/components/dashboard/dashboard-floating-chat";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi — I'm your TalentDrobe career copilot. Tell me what you're looking for and I'll match roles, salary, and next steps to the real you.",
};

const STARTER_PROMPTS = [
  "Find remote product roles",
  "What salary should I expect?",
  "Help me switch careers",
  "Polish my resume bullets",
] as const;

const CAPABILITIES = [
  {
    icon: Briefcase,
    title: "Smart matching",
    detail: "Roles ranked with reasons — not keyword spam",
  },
  {
    icon: Wallet,
    title: "Salary upfront",
    detail: "Pay bands before you invest time applying",
  },
  {
    icon: Wand2,
    title: "Resume coach",
    detail: "AI fixes that sound like you, not a template",
  },
  {
    icon: BadgeCheck,
    title: "Verified roles",
    detail: "Fewer ghost jobs, more real recruiters",
  },
] as const;

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="inline-flex items-center gap-1.5 rounded-2xl border border-white/60 bg-white/55 px-4 py-3 backdrop-blur-md">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-accent-lime-dark"
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
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: EASE }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser ? (
        <span className="mr-2.5 mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-accent-lime">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
      ) : null}
      <div
        className={cn(
          "max-w-[min(88%,28rem)] text-pretty rounded-2xl px-4 py-3 text-[14px] leading-relaxed sm:text-[15px]",
          isUser
            ? "bg-ink-950 text-paper-50"
            : "border border-white/55 bg-white/60 text-ink-800 backdrop-blur-md",
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

type Guest3CopilotProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seed?: string;
  showFab?: boolean;
};

export function Guest3Copilot({
  open,
  onOpenChange,
  seed,
  showFab = false,
}: Guest3CopilotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSeed = useRef<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  const engaged = messages.some((m) => m.role === "user");

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  const send = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: `u_${Date.now()}`, role: "user", content: trimmed },
    ]);
    setTyping(true);

    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `a_${Date.now()}`, role: "assistant", content: getMockReply(trimmed) },
      ]);
    }, 700);
  }, []);

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
  }, []);

  useEffect(() => {
    if (seed && seed !== lastSeed.current) {
      lastSeed.current = seed;
      send(seed);
    }
  }, [seed, send]);

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="fullscreen-copilot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Career copilot"
            className="fixed inset-0 z-[100] flex flex-col bg-paper-50/72 backdrop-blur-2xl backdrop-saturate-150"
          >
            {/* Header */}
            <header className="shrink-0 border-b border-white/50 bg-white/35 px-4 py-3 backdrop-blur-xl sm:px-6">
              <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-accent-lime">
                    <Sparkles className="h-4 w-4" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-paper-50 bg-accent-lime" />
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="text-[15px] font-semibold text-ink-950">Career copilot</p>
                    <p className="flex items-center gap-1.5 text-[12px] text-ink-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                      Online · matches jobs to the real you
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close copilot"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-900/10 bg-white/60 text-ink-700 backdrop-blur-sm transition hover:border-ink-900/20 hover:bg-white/90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto px-4 py-6 scrollbar-hide sm:px-6"
              data-lenis-prevent
            >
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </AnimatePresence>
                {typing ? <TypingIndicator /> : null}

                {!engaged ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                    className="mt-4 space-y-5"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CAPABILITIES.map((cap) => {
                        const Icon = cap.icon;
                        return (
                          <div
                            key={cap.title}
                            className="rounded-xl border border-white/55 bg-white/45 px-4 py-3.5 backdrop-blur-md"
                          >
                            <div className="flex items-start gap-3">
                              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-lime text-ink-950">
                                <Icon className="h-4 w-4" strokeWidth={2} />
                              </span>
                              <div className="min-w-0 text-left">
                                <p className="text-[13px] font-semibold text-ink-950 sm:text-[14px]">
                                  {cap.title}
                                </p>
                                <p className="mt-0.5 text-[12px] leading-snug text-ink-600 sm:text-[13px]">
                                  {cap.detail}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 pt-1">
                      {STARTER_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => send(prompt)}
                          className="rounded-full border border-accent-lime/35 bg-accent-lime/15 px-3.5 py-2 text-[12px] font-medium text-ink-800 transition hover:bg-accent-lime/25 sm:text-[13px]"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-wrap gap-2 pt-2"
                  >
                    {["Show matched roles", "Salary for my level", "Resume tips"].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => send(chip)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-3 py-1.5 text-[11.5px] font-medium text-ink-700 backdrop-blur-sm transition hover:bg-accent-lime/20 sm:text-[12px]"
                      >
                        <TrendingUp className="h-3 w-3 text-accent-lime-dark" />
                        {chip}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Composer */}
            <footer className="shrink-0 border-t border-white/50 bg-white/40 px-4 py-4 backdrop-blur-xl sm:px-6 sm:py-5">
              <div className="mx-auto w-full max-w-4xl space-y-2">
                <DashboardChatInput
                  variant="inline"
                  accent="lime"
                  showDisclaimer={false}
                  placeholder="Ask about roles, salary, or your resume…"
                  onSend={send}
                  className="[&_form>div]:border-white/60 [&_form>div]:bg-white/70 [&_form>div]:backdrop-blur-md"
                />
                <p className="text-center text-[11px] text-ink-400">
                  AI copilot can make mistakes. Verify important details.
                </p>
              </div>
            </footer>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!open && showFab ? (
          <motion.button
            key="fab"
            type="button"
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.24, ease: EASE }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenChange(true)}
            aria-label="Open career copilot"
            className="fixed bottom-6 right-5 z-[55] inline-flex h-14 items-center gap-3 rounded-full border border-ink-900/10 bg-ink-950 pl-3.5 pr-5 text-paper-50 shadow-[0_8px_32px_rgba(8,8,12,0.28)] transition-colors hover:bg-ink-800 sm:right-6"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-paper-50/10">
              <MessageCircle className="h-[18px] w-[18px]" />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-accent-lime" />
            </span>
            <span className="text-left">
              <span className="block text-[13px] font-medium leading-tight">Ask AI</span>
              <span className="block text-[12px] text-paper-100/55">Career copilot</span>
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
