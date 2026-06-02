export function getTotalPages(totalItems: number, pageSize: number) {
  if (pageSize <= 0 || totalItems <= 0) return 1;
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function getPageSlice<T>(
  items: T[],
  page: number,
  pageSize: number,
): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

/** Compact page numbers with ellipsis, e.g. [1, "ellipsis", 4, 5, 6, "ellipsis", 12]. */
export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
): Array<number | "ellipsis"> {
  if (totalPages <= 1) return [1];

  const range: Array<number | "ellipsis"> = [];
  const left = Math.max(2, currentPage - siblingCount);
  const right = Math.min(totalPages - 1, currentPage + siblingCount);

  range.push(1);

  if (left > 2) range.push("ellipsis");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) range.push("ellipsis");

  if (totalPages > 1) range.push(totalPages);

  return range;
}
