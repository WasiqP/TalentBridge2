"use client";

import {
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled,
  error,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function updateDigits(nextDigits: string[]) {
    onChange(nextDigits.join("").slice(0, length));
  }

  function updateAt(index: number, char: string) {
    const next = [...digits];
    next[index] = char;
    updateDigits(next);
  }

  function handleChange(index: number, raw: string) {
    const char = raw.replace(/\D/g, "").slice(-1);
    if (!char) {
      updateAt(index, "");
      return;
    }
    updateAt(index, char);
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index]) {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
        updateAt(index - 1, "");
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
    setFocusedIndex(focusIdx);
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-2 sm:gap-3">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            disabled={disabled}
            value={digits[i] ?? ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={() => setFocusedIndex(i)}
            aria-label={`Digit ${i + 1} of ${length}`}
            className={cn(
              "h-14 w-11 rounded-2xl border bg-paper-50 text-center font-mono text-xl font-medium text-ink-950 transition sm:h-16 sm:w-14 sm:text-2xl",
              error
                ? "border-red-400/80"
                : focusedIndex === i
                  ? "border-ink-900 ring-2 ring-accent-lime/25"
                  : "border-ink-900/12",
              disabled && "opacity-50",
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-center text-[13px] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
