"use client";

import { Calendar, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useWebsiteLanguage } from "../language-provider";

export function HeroSearchBar() {
  const { lang } = useWebsiteLanguage();
  const isAr = lang === "AR";

  return (
    <div className="nusuk-search-bar mt-10 w-full max-w-4xl rounded-2xl border border-[var(--nusuk-accent)]/25 bg-white/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-full sm:p-1.5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 sm:rounded-full sm:py-2.5">
          <MapPin size={18} className="shrink-0 text-[var(--nusuk-accent)]" />
          <div className="min-w-0 flex-1 text-start">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              {isAr ? "الوجهة" : "Destination"}
            </p>
            <p className="truncate text-sm font-semibold text-[var(--nusuk-primary)]">
              {isAr ? "مكة · المدينة" : "Makkah · Madinah"}
            </p>
          </div>
        </div>

        <div className="hidden h-8 w-px bg-zinc-200 sm:block" />

        <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 sm:rounded-full sm:py-2.5">
          <Calendar size={18} className="shrink-0 text-[var(--nusuk-accent)]" />
          <div className="min-w-0 flex-1 text-start">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              {isAr ? "التاريخ" : "Date"}
            </p>
            <p className="truncate text-sm font-semibold text-[var(--nusuk-primary)]">
              {isAr ? "عمرة رمضان · العمرة الاقتصادية" : "Omra Ramadan · Omra Économique"}
            </p>
          </div>
        </div>

        <Link
          href="/omra"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--nusuk-primary)] px-8 py-3.5 text-sm font-bold text-[var(--nusuk-accent)] transition-all hover:bg-[var(--nusuk-accent)] hover:text-[var(--nusuk-primary)] sm:rounded-full sm:py-3"
        >
          <Search size={16} />
          {isAr ? "ابحث" : "Rechercher"}
        </Link>
      </div>
    </div>
  );
}
