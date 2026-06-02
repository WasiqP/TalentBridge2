import { cn } from "@/lib/utils";

type SettingsSelectFieldProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  id?: string;
};

export function SettingsSelectField({
  label,
  hint,
  value,
  onChange,
  options,
  id,
}: SettingsSelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <label
        htmlFor={fieldId}
        className="block text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500"
      >
        {label}
      </label>
      <select
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "flex h-12 w-full appearance-none rounded-2xl border border-ink-900/12 bg-paper-50 px-4 text-[15px] text-ink-900 transition focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-lime/30",
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint ? <p className="text-[13px] text-ink-400">{hint}</p> : null}
    </div>
  );
}
