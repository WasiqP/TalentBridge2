"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const teamSizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-ink-900/8 bg-paper-100 p-10 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-lime text-ink-950">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="mt-5 font-serif text-2xl italic text-ink-950">
          Thanks — your demo request is in.
        </h3>
        <p className="mt-3 text-sm text-ink-500">
          A member of the TalentBridge team will email you within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="firstName" label="First name" required />
        <Field name="lastName" label="Last name" required />
      </div>
      <Field name="email" label="Work email" type="email" required />
      <Field name="company" label="Company" required />
      <div>
        <label className="text-[11px] uppercase tracking-[0.16em] text-ink-500">
          Team size
        </label>
        <select
          name="teamSize"
          required
          defaultValue=""
          className="mt-2 h-12 w-full rounded-2xl border border-ink-900/12 bg-paper-50 px-4 text-sm text-ink-900 outline-none focus:border-ink-900"
        >
          <option value="" disabled>
            Select a range
          </option>
          {teamSizes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-[11px] uppercase tracking-[0.16em] text-ink-500">
          What are you hoping to solve?
        </label>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full rounded-2xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-sm text-ink-900 outline-none focus:border-ink-900"
          placeholder="A few sentences about your team and where you're stuck."
        />
      </div>
      {error && (
        <p className="text-[13px] text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink-950 px-6 text-[15px] font-medium text-paper-50 transition hover:bg-ink-800 disabled:opacity-60",
        )}
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Request a demo
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p className="text-center text-[12px] text-ink-400">
        We&apos;ll reply within one business day. No marketing automation.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[11px] uppercase tracking-[0.16em] text-ink-500"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 h-12 w-full rounded-2xl border border-ink-900/12 bg-paper-50 px-4 text-sm text-ink-900 outline-none focus:border-ink-900"
      />
    </div>
  );
}
