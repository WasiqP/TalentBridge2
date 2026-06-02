export type WorkTypeFilter = "remote" | "hybrid" | "onsite";

export type CategoryFilter =
  | "design"
  | "engineering"
  | "product"
  | "marketing"
  | "operations";

export type CompanySizeFilter = "startup" | "mid" | "enterprise";

export type RatingFilter = "any" | "4.0" | "4.5";

export const workTypeFilterOptions: {
  value: WorkTypeFilter;
  label: string;
}[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

export const categoryFilterOptions: {
  value: CategoryFilter;
  label: string;
}[] = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
];

export const companySizeFilterOptions: {
  value: CompanySizeFilter;
  label: string;
}[] = [
  { value: "startup", label: "Startup (1–50)" },
  { value: "mid", label: "Mid-size (51–500)" },
  { value: "enterprise", label: "Enterprise (500+)" },
];

export const ratingFilterOptions: {
  value: RatingFilter;
  label: string;
}[] = [
  { value: "any", label: "Any rating" },
  { value: "4.0", label: "4.0 & up" },
  { value: "4.5", label: "4.5 & up" },
];
