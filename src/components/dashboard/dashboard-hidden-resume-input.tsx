"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type DashboardHiddenResumeInputHandle = {
  open: () => void;
};

type DashboardHiddenResumeInputProps = {
  accept: string;
  onFileSelected: (file: File) => void;
};

export const DashboardHiddenResumeInput = forwardRef<
  DashboardHiddenResumeInputHandle,
  DashboardHiddenResumeInputProps
>(function DashboardHiddenResumeInput({ accept, onFileSelected }, ref) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => inputRef.current?.click(),
  }));

  if (!mounted) return null;

  return (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      className="sr-only"
      tabIndex={-1}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onFileSelected(file);
        e.target.value = "";
      }}
    />
  );
});
