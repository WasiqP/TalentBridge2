"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Bot, Compass, LineChart, Send, ShieldCheck, Sparkles } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { agentConversation } from "@/constants/guest-page";
import { cn } from "@/lib/utils";

const capabilities = [
  { icon: Compass, title: "Career direction", text: "“Should I move into design engineering?” — it reasons with your real history." },
  { icon: LineChart, title: "Salary & market", text: "Honest pay ranges and demand for your skills, by city and remote." },
  { icon: ShieldCheck, title: "Always in your corner", text: "It negotiates, preps you for interviews, and never spams employers." },
];

const suggestions = ["What should I learn next?", "Find remote roles", "Is my salary fair?"];

export function GuestCareerAgent() {
  return (
    <section id="agent" className="relative overflow-hidden bg-ink-950 py-24 text-paper-50 sm:py-32">
      <div className="absolute inset-0 gradient-mesh opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div
        aria-hidden
        className="absolute right-[-10%] top-[-10%] h-[460px] w-[460px] rounded-full bg-accent-violet/25 blur-[150px]"
      />
      <div
        aria-hidden
        className="absolute bottom-[-15%] left-[-8%] h-[420px] w-[420px] rounded-full bg-accent-cyan/20 blur-[150px]"
      />

      <Container size="full" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <FadeUp>
              <SectionHeading
                light
                eyebrow="Your career agent"
                title={
                  <>
                    A copilot that actually{" "}
                    <span className="font-serif italic text-gradient-brand">
                      talks about your career.
                    </span>
                  </>
                }
                description="Not a search box. A senior-recruiter-grade agent that knows your history, understands the market, and helps you decide your next move — out loud."
              />
            </FadeUp>

            <FadeUp delay={0.1}>
              <ul className="mt-9 space-y-4">
                {capabilities.map(({ icon: Icon, title, text }) => (
                  <li
                    key={title}
                    className="flex items-start gap-4 rounded-2xl border border-paper-50/10 bg-paper-50/[0.03] p-4 backdrop-blur"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-lime/15 text-accent-lime">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[15px] font-medium text-paper-50">{title}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-paper-100/65">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          <ChatPanel />
        </div>
      </Container>
    </section>
  );
}

function ChatPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    let elapsed = 600;

    agentConversation.forEach((turn, i) => {
      const readTime = Math.min(2600, 700 + turn.text.length * 22);
      if (turn.from === "agent") {
        timers.push(setTimeout(() => setTyping(true), elapsed));
        elapsed += 900;
        timers.push(
          setTimeout(() => {
            setTyping(false);
            setShown(i + 1);
          }, elapsed),
        );
        elapsed += readTime;
      } else {
        timers.push(setTimeout(() => setShown(i + 1), elapsed));
        elapsed += readTime;
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-md rounded-[28px] border border-paper-50/12 bg-paper-50/[0.04] p-2 shadow-2xl shadow-ink-950/60 backdrop-blur-xl"
    >
      <div className="overflow-hidden rounded-[22px] border border-paper-50/10 bg-ink-900/80">
        <div className="flex items-center gap-3 border-b border-paper-50/10 px-4 py-3.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent-lime/15 text-accent-lime">
            <Bot className="h-4.5 w-4.5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-accent-lime" />
          </span>
          <div className="flex-1">
            <p className="text-[14px] font-medium text-paper-50">Career Agent</p>
            <p className="flex items-center gap-1.5 text-[11px] text-paper-100/55">
              <Sparkles className="h-3 w-3 text-accent-lime" /> online · knows your profile
            </p>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex h-[400px] flex-col gap-3 overflow-y-auto scrollbar-hide px-4 py-5"
        >
          <AnimatePresence initial={false}>
            {agentConversation.slice(0, shown).map((turn, i) => (
              <Bubble key={i} from={turn.from} text={turn.text} />
            ))}
          </AnimatePresence>
          {typing && <TypingBubble />}
        </div>

        <div className="border-t border-paper-50/10 px-4 py-3">
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <span
                key={s}
                className="rounded-full border border-paper-50/12 bg-paper-50/[0.04] px-2.5 py-1 text-[11.5px] text-paper-100/70"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-paper-50/12 bg-paper-50/[0.04] px-4 py-2.5">
            <span className="flex-1 text-[13px] text-paper-100/40">
              Ask your agent anything…
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-lime text-ink-950">
              <Send className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Bubble({ from, text }: { from: "agent" | "user"; text: string }) {
  const isUser = from === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed",
          isUser
            ? "bg-accent-lime text-ink-950"
            : "border border-paper-50/10 bg-paper-50/[0.05] text-paper-100/90",
        )}
      >
        {text}
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1 rounded-2xl border border-paper-50/10 bg-paper-50/[0.05] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-paper-100/60"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
