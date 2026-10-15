"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

type AdminPaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  labels?: { prev?: string; next?: string; showing?: string };
};

export function AdminPagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  labels,
}: AdminPaginationProps) {
  if (total === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const pages = buildPageNumbers(page, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
      <p className="text-xs text-zinc-500">
        {labels?.showing ?? "Affichage"} {start}–{end} / {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 disabled:opacity-40 dark:border-zinc-700"
          aria-label={labels?.prev ?? "Previous"}
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-zinc-400">…</span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p as number)}
              className={clsx(
                "flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold",
                p === page ? "bg-[#1a1208] text-[#c9a227]" : "border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700",
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 disabled:opacity-40 dark:border-zinc-700"
          aria-label={labels?.next ?? "Next"}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function buildPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}
