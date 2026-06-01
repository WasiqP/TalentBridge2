type DashboardContentPanelProps = {
  children: React.ReactNode;
};

export function DashboardContentPanel({ children }: DashboardContentPanelProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 pt-24 pb-6 sm:px-6">
      <div className="relative flex min-h-[min(440px,54vh)] w-full flex-col overflow-hidden rounded-[28px] border border-ink-900/12 bg-paper-50 p-4 shadow-[0_2px_24px_rgba(8,8,12,0.04)] sm:rounded-[32px] sm:p-5">
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
