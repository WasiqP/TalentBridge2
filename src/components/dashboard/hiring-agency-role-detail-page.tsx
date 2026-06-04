"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { notFound } from "next/navigation";

import { AgencySuggestedCandidatesPanel } from "@/components/dashboard/agency/agency-suggested-candidates-panel";
import {
  type ChatMessage,
  DashboardChatPanel,
} from "@/components/dashboard/dashboard-chat-panel";
import { getAgencyRole } from "@/config/hiring-agency-roles";
import type { AgencyCandidate } from "@/config/hiring-agency-candidates";
import { cn } from "@/lib/utils";

const initialMessages: ChatMessage[] = [
  {
    id: "r0",
    role: "assistant",
    content:
      "Here are your top matches. Ask me to narrow by location, seniority, or must-have skills.",
  },
];

export function HiringAgencyRoleDetailPage() {
  const params = useParams();
  const roleId = typeof params.roleId === "string" ? params.roleId : "";
  const role = getAgencyRole(roleId);

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  if (!role) {
    notFound();
  }

  function handleSend(message: string) {
    setMessages((prev) => [
      ...prev,
      { id: `u_${Date.now()}`, role: "user", content: message, ts: Date.now() },
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          content:
            "I’ll re-rank candidates with that in mind. Try “only remote” or “5+ years in SaaS”.",
          ts: Date.now(),
        },
      ]);
    }, 600);
  }

  function handleViewResume(candidate: AgencyCandidate) {
    setMessages((prev) => [
      ...prev,
      {
        id: `a_${Date.now()}`,
        role: "assistant",
        content: `Opening ${candidate.name}'s profile — full resume preview ships next. Email on file: ${candidate.email}.`,
        ts: Date.now(),
      },
    ]);
  }

  return (
    <div className="relative h-svh overflow-hidden">
      <main className="relative z-0 flex h-full min-h-0 flex-col overflow-hidden pb-0">
        <motion.div
          className="mx-auto flex h-full min-h-0 w-full max-w-[96rem] flex-col overflow-hidden px-2 pt-[4.5rem] pb-5 sm:px-3 sm:pt-[5rem] sm:pb-6 lg:px-5 lg:pt-[5.5rem] lg:pb-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid min-h-0 max-h-[calc(100svh-7.25rem)] flex-1 grid-cols-1 grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-4 overflow-hidden sm:max-h-[calc(100svh-7.75rem)] sm:gap-5 lg:max-h-[calc(100svh-8.25rem)] lg:grid-cols-[minmax(0,1fr)_minmax(300px,34%)] lg:grid-rows-1 lg:gap-5 xl:gap-6">
            <motion.div
              className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <AgencySuggestedCandidatesPanel
                className="h-full min-h-0"
                role={role}
                onViewResume={handleViewResume}
              />
            </motion.div>
            <motion.div
              className={cn("flex h-full min-h-0 min-w-0 flex-col overflow-hidden")}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <DashboardChatPanel
                className="h-full min-h-0"
                messages={messages}
                onSend={handleSend}
                eyebrow="Copilot"
                title="Refine your shortlist"
              />
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
