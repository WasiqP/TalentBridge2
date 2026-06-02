"use client";

import { SlidersHorizontal, X } from "lucide-react";

import {
  categoryFilterOptions,
  companySizeFilterOptions,
  type CategoryFilter,
  type CompanySizeFilter,
  type RatingFilter,
  ratingFilterOptions,
  type WorkTypeFilter,
  workTypeFilterOptions,
} from "@/config/job-seeker-search-filters";
import { cn } from "@/lib/utils";

export type SearchFiltersState = {
  workTypes: WorkTypeFilter[];
  categories: CategoryFilter[];
  companySizes: CompanySizeFilter[];
  rating: RatingFilter;
};

export const defaultSearchFilters: SearchFiltersState = {
  workTypes: [],
  categories: [],
  companySizes: [],
  rating: "any",
};

type SearchFiltersPanelProps = {
  filters: SearchFiltersState;
  onChange: (filters: SearchFiltersState) => void;
  onClear: () => void;
  activeCount: number;
  className?: string;
};

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl px-1 py-1.5 text-[14px] text-ink-800 transition hover:bg-paper-100/80">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 shrink-0 rounded border-ink-900/20 text-ink-950 accent-ink-950"
      />
      <span>{label}</span>
    </label>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-ink-900/8 pb-5 last:border-b-0 last:pb-0">
      <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
        {title}
      </h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

export function SearchFiltersPanel({
  filters,
  onChange,
  onClear,
  activeCount,
  className,
}: SearchFiltersPanelProps) {
  function toggleWorkType(value: WorkTypeFilter, checked: boolean) {
    const next = checked
      ? [...filters.workTypes, value]
      : filters.workTypes.filter((v) => v !== value);
    onChange({ ...filters, workTypes: next });
  }

  function toggleCategory(value: CategoryFilter, checked: boolean) {
    const next = checked
      ? [...filters.categories, value]
      : filters.categories.filter((v) => v !== value);
    onChange({ ...filters, categories: next });
  }

  function toggleCompanySize(value: CompanySizeFilter, checked: boolean) {
    const next = checked
      ? [...filters.companySizes, value]
      : filters.companySizes.filter((v) => v !== value);
    onChange({ ...filters, companySizes: next });
  }

  return (
    <aside
      className={cn(
        "rounded-[24px] border border-ink-900/12 bg-paper-50 p-5 shadow-[0_2px_20px_rgba(8,8,12,0.04)] sm:rounded-[28px] sm:p-6",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-ink-500" strokeWidth={2} />
          <h2 className="text-[16px] font-medium tracking-[-0.02em] text-ink-950">
            Filters
          </h2>
          {activeCount > 0 ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink-950 px-1.5 text-[11px] font-medium text-paper-50">
              {activeCount}
            </span>
          ) : null}
        </div>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-500 transition hover:text-ink-950"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
            Clear
          </button>
        ) : null}
      </div>

      <div className="space-y-5">
        <FilterSection title="Work location">
          {workTypeFilterOptions.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.workTypes.includes(opt.value)}
              onChange={(checked) => toggleWorkType(opt.value, checked)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Category">
          {categoryFilterOptions.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.categories.includes(opt.value)}
              onChange={(checked) => toggleCategory(opt.value, checked)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Company size">
          {companySizeFilterOptions.map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.companySizes.includes(opt.value)}
              onChange={(checked) => toggleCompanySize(opt.value, checked)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Rating">
          {ratingFilterOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl px-1 py-1.5 text-[14px] text-ink-800 transition hover:bg-paper-100/80"
            >
              <input
                type="radio"
                name="rating-filter"
                checked={filters.rating === opt.value}
                onChange={() => onChange({ ...filters, rating: opt.value })}
                className="h-4 w-4 shrink-0 border-ink-900/20 text-ink-950 accent-ink-950"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </FilterSection>
      </div>
    </aside>
  );
}
