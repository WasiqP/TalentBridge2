import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
            light
              ? "border-paper-50/15 bg-paper-50/5 text-paper-100"
              : "border-ink-900/12 bg-ink-900/5 text-ink-700",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              light ? "bg-accent-lime" : "bg-ink-900",
            )}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]",
          centered && "mx-auto max-w-3xl",
          light ? "text-paper-50" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-pretty text-lg leading-relaxed",
            centered && "mx-auto max-w-2xl",
            light ? "text-paper-100/70" : "text-ink-500",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
