"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  dark?: boolean;
};

export function NewsletterForm({ dark = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "group relative flex items-center rounded-full border p-1 transition",
        dark
          ? "border-paper-50/15 bg-paper-50/5 focus-within:border-paper-50/30"
          : "border-ink-900/12 bg-paper-50 focus-within:border-ink-900",
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className={cn(
          "flex-1 bg-transparent px-4 py-2 text-sm outline-none",
          dark ? "text-paper-50 placeholder:text-paper-100/40" : "text-ink-900 placeholder:text-ink-400",
        )}
      />
      <button
        type="submit"
        className={cn(
          "inline-flex h-9 items-center gap-1 rounded-full px-4 text-sm font-medium transition",
          dark
            ? "bg-accent-lime text-ink-950 hover:bg-accent-lime-dark"
            : "bg-ink-950 text-paper-50 hover:bg-ink-800",
        )}
      >
        {sent ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        {sent ? "Joined" : "Join"}
      </button>
    </form>
  );
}
