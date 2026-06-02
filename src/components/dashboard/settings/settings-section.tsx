import { cn } from "@/lib/utils";

type SettingsSectionProps = {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function SettingsSection({
  id,
  title,
  description,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 rounded-[28px] border border-ink-900/12 bg-paper-50 p-6 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px] sm:p-8",
        className,
      )}
    >
      <header className="mb-6 border-b border-ink-900/8 pb-5">
        <h2 className="text-[18px] font-medium tracking-[-0.02em] text-ink-950 sm:text-[20px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
            {description}
          </p>
        ) : null}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
