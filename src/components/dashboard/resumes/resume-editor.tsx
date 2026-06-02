"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Download, Star } from "lucide-react";

import { AuthField } from "@/components/auth/auth-field";
import { Button } from "@/components/ui/button";
import type { JobSeekerResume } from "@/config/job-seeker-resumes";
import { cn } from "@/lib/utils";

type ResumeEditorProps = {
  resume: JobSeekerResume;
  onSave: (updated: JobSeekerResume) => void;
  onSetPrimary: (id: string) => void;
};

function FieldTextarea({
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex w-full resize-y rounded-2xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-[15px] leading-relaxed text-ink-900 transition placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-lime/30"
      />
      {hint ? <p className="text-[13px] text-ink-400">{hint}</p> : null}
    </div>
  );
}

export function ResumeEditor({
  resume,
  onSave,
  onSetPrimary,
}: ResumeEditorProps) {
  const [draft, setDraft] = useState(resume);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDraft(resume);
    setDirty(false);
    setSaved(false);
  }, [resume.id, resume]);

  function update<K extends keyof JobSeekerResume>(
    key: K,
    value: JobSeekerResume[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setSaved(false);
  }

  function handleSave() {
    const updated: JobSeekerResume = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };
    onSave(updated);
    setDraft(updated);
    setDirty(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <motion.div
      key={resume.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[28px] border border-ink-900/12 bg-paper-50 p-6 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px] sm:p-8"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-ink-900/8 pb-5">
        <div>
          <h2 className="text-[18px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[20px]">
            Edit resume
          </h2>
          <p className="mt-1 text-[14px] text-ink-500">{resume.fileName}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!draft.isPrimary ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => onSetPrimary(draft.id)}
              className="gap-1.5"
            >
              <Star className="h-4 w-4" strokeWidth={2} />
              Set as primary
            </Button>
          ) : null}
          <Button type="button" variant="ghost" size="md" className="gap-1.5">
            <Download className="h-4 w-4" strokeWidth={2} />
            Download
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        <AuthField
          label="Resume title"
          name="title"
          value={draft.title}
          onChange={(e) => update("title", e.target.value)}
        />
        <FieldTextarea
          label="Professional summary"
          value={draft.summary}
          onChange={(v) => update("summary", v)}
          rows={3}
          hint="Shown at the top of your parsed profile."
        />
        <FieldTextarea
          label="Skills"
          value={draft.skills}
          onChange={(v) => update("skills", v)}
          rows={2}
          hint="Comma-separated — used for matching and search."
        />
        <FieldTextarea
          label="Experience"
          value={draft.experience}
          onChange={(v) => update("experience", v)}
          rows={8}
          hint="Role, company, dates, and bullet points."
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink-900/8 pt-5">
        <p className={cn("text-[13px]", saved ? "text-ink-950" : "text-ink-500")}>
          {saved
            ? "Resume saved."
            : dirty
              ? "You have unsaved changes."
              : "All changes saved."}
        </p>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={!dirty && !saved}
        >
          {saved ? "Saved" : "Save resume"}
        </Button>
      </div>
    </motion.div>
  );
}
