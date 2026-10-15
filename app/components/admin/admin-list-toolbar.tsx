"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { t } from "@/app/lib/i18n";
import type { AppLanguage } from "@/app/lib/language";

type AdminListToolbarProps = {
  lang: AppLanguage;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  newHref: string;
  newLabel: string;
  filters?: React.ReactNode;
};

export function AdminListToolbar({
  lang,
  search,
  onSearchChange,
  searchPlaceholder,
  newHref,
  newLabel,
  filters,
}: AdminListToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1 max-w-md">
          <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder ?? t(lang, "Search")}
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 ps-10 pe-4 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        {filters}
      </div>
      <Link
        href={newHref}
        className="inline-flex items-center gap-2 rounded-xl bg-[#1a1208] px-4 py-2.5 text-sm font-semibold text-[#c9a227] hover:bg-[#c9a227] hover:text-[#1a1208]"
      >
        <Plus size={18} />
        {newLabel}
      </Link>
    </div>
  );
}
