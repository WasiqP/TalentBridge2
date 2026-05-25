import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-ink-950 text-paper-50">
      <div className="mx-auto flex h-9 w-full max-w-[1440px] items-center justify-center gap-2 px-5 text-[12px] sm:px-8 lg:px-10">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-lime" />
        <span className="text-paper-100/80">
          New: Autonomous sourcing across LinkedIn, GitHub, and portfolios is live.
        </span>
        <Link
          href="/changelog"
          className="ml-2 hidden items-center gap-1 font-medium text-paper-50 underline-offset-4 hover:underline sm:inline-flex"
        >
          See what shipped
          <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
