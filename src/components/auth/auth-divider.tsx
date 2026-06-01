type SocialProvider = "google" | "microsoft" | "linkedin";

const providers: { id: SocialProvider; label: string }[] = [
  { id: "google", label: "Google" },
  { id: "microsoft", label: "Microsoft" },
  { id: "linkedin", label: "LinkedIn" },
];

function SocialIcon({ provider }: { provider: SocialProvider }) {
  if (provider === "google") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    );
  }

  if (provider === "microsoft") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
        <path fill="#f25022" d="M1 1h10v10H1z" />
        <path fill="#00a4ef" d="M13 1h10v10H13z" />
        <path fill="#7fba00" d="M1 13h10v10H1z" />
        <path fill="#ffb900" d="M13 13h10v10H13z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM22.225 0H1.771A1.77 1.77 0 0 0 0 1.771v20.458A1.77 1.77 0 0 0 1.771 24h20.451A1.77 1.77 0 0 0 24 22.229V1.771A1.77 1.77 0 0 0 22.225 0z"
      />
    </svg>
  );
}

export function AuthDivider() {
  return (
    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-ink-900/10" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-paper-50 px-3 text-[12px] uppercase tracking-[0.14em] text-ink-400">
          or continue with
        </span>
      </div>
    </div>
  );
}

export function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {providers.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          disabled
          title="Coming soon"
          className="inline-flex h-11 flex-col items-center justify-center gap-1 rounded-2xl border border-ink-900/12 bg-paper-50 px-1 text-[11px] font-medium text-ink-700 opacity-60 transition hover:border-ink-900/20 sm:h-11 sm:flex-row sm:gap-2 sm:px-3 sm:text-[13px]"
        >
          <SocialIcon provider={id} />
          <span className="truncate">{label}</span>
        </button>
      ))}
    </div>
  );
}
