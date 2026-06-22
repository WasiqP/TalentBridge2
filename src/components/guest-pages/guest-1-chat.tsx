"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  CircleDot,
  Info,
  Minimize2,
  Sparkles,
  Wand2,
} from "lucide-react";

import { DashboardChatInput } from "@/components/dashboard/dashboard-chat-input";
import { getMockReply } from "@/components/dashboard/dashboard-floating-chat";
import {
  guest1ProfileCompleteIntro,
  guest1ProfileSuggestions,
  guest1SuggestionStatusMeta,
  type Guest1ProfileSuggestion,
  type Guest1SuggestionStatus,
} from "@/constants/guest-1-profile";
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

const STATUS_STYLE: Record<
  Guest1SuggestionStatus,
  { icon: typeof AlertTriangle; badge: string; rail: string; glow: string }
> = {
  critical: {
    icon: AlertTriangle,
    badge: "border-red-200/80 bg-red-50 text-red-800",
    rail: "bg-red-500",
    glow: "from-red-500/10 to-transparent",
  },
  "needs-work": {
    icon: Wand2,
    badge: "border-amber-200/80 bg-amber-50 text-amber-900",
    rail: "bg-amber-500",
    glow: "from-amber-500/10 to-transparent",
  },
  satisfactory: {
    icon: CheckCircle2,
    badge: "border-accent-lime/40 bg-accent-lime/15 text-ink-900",
    rail: "bg-accent-lime-dark",
    glow: "from-accent-lime/15 to-transparent",
  },
  optional: {
    icon: Info,
    badge: "border-ink-900/10 bg-paper-100 text-ink-600",
    rail: "bg-ink-400",
    glow: "from-ink-900/5 to-transparent",
  },
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  insights?: Guest1ProfileSuggestion[];
};

type Guest1ChatProps = {
  className?: string;
  fillHeight?: boolean;
  minimized?: boolean;
  onEngagedChange?: (engaged: boolean) => void;
  onMinimizedChange?: (minimized: boolean) => void;
  notice?: { key: number; fileName: string };
  profileComplete?: { key: number };
  /** Increment to clear messages and return to the welcome state. */
  resetKey?: number;
};

function CopilotAvatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-accent-lime",
        className,
      )}
    >
      <Bot className="h-3.5 w-3.5" aria-hidden />
      <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-paper-50 bg-accent-lime" />
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <CopilotAvatar />
      <div className="inline-flex items-center gap-1 rounded-2xl border border-ink-900/6 bg-white px-4 py-3 shadow-sm">
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

function SuggestionCard({
  suggestion,
  index,
}: {
  suggestion: Guest1ProfileSuggestion;
  index: number;
}) {
  const meta = guest1SuggestionStatusMeta[suggestion.status];
  const style = STATUS_STYLE[suggestion.status];
  const Icon = style.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.12, ease: EASE }}
      className="relative overflow-hidden rounded-[18px] border border-ink-900/8 bg-white shadow-[0_8px_28px_-20px_rgba(8,8,12,0.25)]"
    >
      <span className={cn("absolute inset-y-0 left-0 w-1", style.rail)} aria-hidden />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-r opacity-80",
          style.glow,
        )}
        aria-hidden
      />

      <div className="relative px-4 py-3.5 sm:px-4 sm:py-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              {suggestion.category}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                style.badge,
              )}
            >
              <Icon className="h-3 w-3" aria-hidden />
              {meta.label}
            </span>
          </div>
          <span className="text-[10px] font-medium tabular-nums text-ink-400">
            {index + 1}/{guest1ProfileSuggestions.length}
          </span>
        </div>

        <h4 className="mt-2 text-[14px] font-semibold leading-snug tracking-[-0.01em] text-ink-950 sm:text-[14.5px]">
          {suggestion.title}
        </h4>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{suggestion.text}</p>

        {suggestion.outcome ? (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-ink-900/8 bg-paper-50 px-2.5 py-1 text-[11px] font-medium text-ink-700">
            <Sparkles className="h-3 w-3 text-accent-lime-dark" aria-hidden />
            {suggestion.outcome}
          </p>
        ) : null}

        <p className="mt-2 text-[10px] text-ink-400">{meta.hint}</p>
      </div>
    </motion.article>
  );
}

function InsightsMessage({ suggestions }: { suggestions: Guest1ProfileSuggestion[] }) {
  const criticalCount = suggestions.filter((s) => s.status === "critical").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex items-start gap-2 sm:gap-2.5"
    >
      <CopilotAvatar className="mt-1" />
      <div className="min-w-0 max-w-[92%] flex-1 space-y-3 sm:max-w-[88%]">
        <div className="overflow-hidden rounded-[20px] border border-ink-900/10 bg-gradient-to-br from-ink-950 via-ink-950 to-ink-900 p-4 text-paper-50 shadow-[0_12px_40px_-24px_rgba(8,8,12,0.45)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-paper-100/55">
                {guest1ProfileCompleteIntro.eyebrow}
              </p>
              <h3 className="mt-1 text-[16px] font-semibold tracking-tight sm:text-[17px]">
                {guest1ProfileCompleteIntro.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-paper-100/75">
                {guest1ProfileCompleteIntro.subtitle}
              </p>
            </div>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-lime/15 text-accent-lime">
              <Wand2 className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {criticalCount > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-semibold text-red-100">
                <CircleDot className="h-3 w-3" />
                {criticalCount} critical
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 rounded-full bg-paper-50/10 px-2.5 py-1 text-[10px] font-semibold text-paper-100/80">
              {suggestions.length} suggestions
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard key={suggestion.id} suggestion={suggestion} index={index} />
          ))}
        </div>

        <p className="rounded-[16px] border border-ink-900/8 bg-paper-100/80 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink-600">
          Want me to rewrite a bullet or draft a skills update? Ask below — I&apos;ll use your
          profile context.
        </p>
      </div>
    </motion.div>
  );
}

function AssistantTextBubble({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: EASE }}
      className="flex items-end gap-2 sm:gap-2.5"
    >
      <CopilotAvatar className="mb-0.5" />
      <div className="max-w-[88%] rounded-[18px] border border-ink-900/6 bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink-800 shadow-sm sm:max-w-[85%] sm:px-4 sm:py-3 sm:text-[14px]">
        {content}
      </div>
    </motion.div>
  );
}

function UserBubble({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: EASE }}
      className="flex justify-end"
    >
      <div className="max-w-[88%] rounded-[18px] bg-ink-950 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-paper-50 sm:max-w-[85%] sm:px-4 sm:py-3 sm:text-[14px]">
        {content}
      </div>
    </motion.div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return <UserBubble content={message.content} />;
  }

  if (message.insights?.length) {
    return <InsightsMessage suggestions={message.insights} />;
  }

  return <AssistantTextBubble content={message.content} />;
}

/** Conversation-first chat for guest option 1. */
export function Guest1Chat({
  className,
  fillHeight = false,
  minimized = false,
  onEngagedChange,
  onMinimizedChange,
  notice,
  profileComplete,
  resetKey = 0,
}: Guest1ChatProps) {
  const [engaged, setEngaged] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastNoticeKeyRef = useRef(0);
  const lastProfileKeyRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.insights?.length) return;
    if (typing && lastMessage?.role !== "user") return;
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
      if (suggestionTimerRef.current) clearTimeout(suggestionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!resetKey) return;

    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    if (suggestionTimerRef.current) clearTimeout(suggestionTimerRef.current);

    setMessages([]);
    setEngaged(false);
    setTyping(false);
    lastNoticeKeyRef.current = 0;
    lastProfileKeyRef.current = 0;
  }, [resetKey]);

  useEffect(() => {
    if (!profileComplete || profileComplete.key === lastProfileKeyRef.current) return;
    lastProfileKeyRef.current = profileComplete.key;

    if (suggestionTimerRef.current) clearTimeout(suggestionTimerRef.current);

    setEngaged(true);
    onEngagedChange?.(true);
    onMinimizedChange?.(false);
    setTyping(true);

    suggestionTimerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a_insights_${Date.now()}`,
          role: "assistant",
          content: "",
          insights: guest1ProfileSuggestions,
        },
      ]);
    }, 900);
  }, [profileComplete, onEngagedChange, onMinimizedChange]);

  useEffect(() => {
    if (!notice || notice.key === lastNoticeKeyRef.current) return;
    lastNoticeKeyRef.current = notice.key;

    setEngaged(true);
    onEngagedChange?.(true);
    setTyping(true);

    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          content: `Your CV “${notice.fileName}” is uploaded and initialized ✓ — I can build your full profile now. Tap “Create my profile” when you're ready.`,
        },
      ]);
    }, 700);
  }, [notice, onEngagedChange]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setEngaged(true);
      onEngagedChange?.(true);
      setMessages((prev) => [...prev, { id: `u_${Date.now()}`, role: "user", content: trimmed }]);
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
    },
    [onEngagedChange],
  );

  function handleStarter(prompt: string) {
    sendMessage(prompt);
  }

  const showMinimize = fillHeight && engaged;

  if (minimized && showMinimize) {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full",
        fillHeight && "flex h-full min-h-0 max-h-full flex-1 flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-[26px] border border-ink-900/8 bg-paper-50/70 shadow-[0_24px_64px_-40px_rgba(8,8,12,0.22)] backdrop-blur-xl backdrop-saturate-150",
          fillHeight && "flex h-full min-h-0 max-h-full flex-1 flex-col",
        )}
      >
        <div className="flex items-center gap-3 border-b border-ink-900/6 px-4 py-3 sm:px-5">
          <CopilotAvatar className="h-9 w-9" />
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[13px] font-medium text-ink-950 sm:text-[14px]">Career copilot</p>
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
            "overflow-y-auto overscroll-contain px-4 scrollbar-hide sm:px-5",
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
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          onWheel={(event) => event.stopPropagation()}
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

        <div className={cn("space-y-3 px-4 pb-4 pt-3 sm:px-5 sm:pb-5", fillHeight && "shrink-0")}>
          {!engaged ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="space-y-3 text-left"
            >
              <AssistantTextBubble content={WELCOME_MESSAGE} />

              <div className="flex flex-wrap justify-center gap-2 pl-9 sm:pl-10">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleStarter(prompt)}
                    className="rounded-full border border-ink-900/8 bg-white px-3 py-1.5 text-[11.5px] font-medium text-ink-700 shadow-sm transition hover:border-accent-lime/40 hover:bg-accent-lime/10 hover:text-ink-950 sm:text-[12px]"
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
