"use client";

import { Eye, Trash2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { OmraPackage, OmraStatus, PaginatedResult } from "@/app/features/omra/types";
import { AdminListToolbar } from "@/app/components/admin/admin-list-toolbar";
import { AdminPagination } from "@/app/components/admin/admin-pagination";
import { t } from "@/app/lib/i18n";
import { readLanguage, APP_LANGUAGE_EVENT, type AppLanguage } from "@/app/lib/language";
import { clsx } from "clsx";

function useAdminLanguage() {
  const [lang, setLang] = useState<AppLanguage>("FR");
  useEffect(() => {
    setLang(readLanguage());
    const handler = (e: Event) => setLang((e as CustomEvent<AppLanguage>).detail);
    window.addEventListener(APP_LANGUAGE_EVENT, handler);
    return () => window.removeEventListener(APP_LANGUAGE_EVENT, handler);
  }, []);
  return lang;
}

const PAGE_SIZE = 10;

export function OmraAdminList() {
  const lang = useAdminLanguage();
  const [data, setData] = useState<PaginatedResult<OmraPackage>>({
    items: [],
    total: 0,
    page: 1,
    pageSize: PAGE_SIZE,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OmraStatus | "">("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
    });
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (statusFilter) params.set("status", statusFilter);

    fetch(`/api/omra?${params}`)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [page, debouncedSearch, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm(t(lang, "Delete confirm"))) return;
    await fetch(`/api/omra?id=${id}`, { method: "DELETE" });
    load();
  };

  const selectClass =
    "rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <div className="nusuk-page-anim space-y-6">
      <AdminListToolbar
        lang={lang}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={t(lang, "Search omra")}
        newHref="/admin/omra/new"
        newLabel={t(lang, "New Omra")}
        filters={
          <select
            className={selectClass}
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as OmraStatus | "");
              setPage(1);
            }}
          >
            <option value="">{t(lang, "All statuses")}</option>
            <option value="available">{t(lang, "Available")}</option>
            <option value="full">{t(lang, "Full")}</option>
            <option value="closed">{t(lang, "Closed")}</option>
          </select>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/80 text-start text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/50">
                <th className="px-4 py-3 font-medium">{t(lang, "Image")}</th>
                <th className="px-4 py-3 font-medium">{t(lang, "Title")}</th>
                <th className="px-4 py-3 font-medium">{t(lang, "Departure")}</th>
                <th className="px-4 py-3 font-medium">{t(lang, "Guide")}</th>
                <th className="px-4 py-3 font-medium">{t(lang, "Price")}</th>
                <th className="px-4 py-3 font-medium">{t(lang, "Registered count")}</th>
                <th className="px-4 py-3 font-medium">{t(lang, "Status")}</th>
                <th className="px-4 py-3 font-medium">{t(lang, "Actions")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-zinc-400">…</td>
                </tr>
              ) : (
                data.items.map((pkg) => (
                    <tr key={pkg.id} className="border-b border-zinc-50 dark:border-zinc-800/50">
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded-lg">
                        <Image src={pkg.image} alt="" fill className="object-cover" sizes="64px" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#1a1208]">{pkg.titleFr}</p>
                      <p className="text-xs text-zinc-400">{pkg.durationDays} {t(lang, "Days")}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p>{new Date(pkg.departureDate).toLocaleDateString("fr-TN")}</p>
                      <p className="text-xs text-zinc-400">→ {new Date(pkg.returnDate).toLocaleDateString("fr-TN")}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{pkg.guideFr ?? "—"}</p>
                      {pkg.guidePhone ? <p className="text-xs text-zinc-400" dir="ltr">{pkg.guidePhone}</p> : null}
                    </td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {pkg.price.toLocaleString()} {pkg.currency}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1">
                        <Users size={14} className="text-[#c9a227]" />
                        {pkg.registeredCount}/{pkg.maxPilgrims}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        pkg.status === "available" ? "bg-[#faf8f4] text-[#1a1208]" : "bg-zinc-100 text-zinc-600",
                      )}>
                        {t(lang, pkg.status === "available" ? "Available" : pkg.status === "full" ? "Full" : "Closed")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/pilgrims?omraId=${pkg.id}`}
                          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100"
                          title={t(lang, "View pilgrims")}
                        >
                          <Eye size={16} />
                        </Link>
                        <Link href={`/admin/omra/${pkg.id}`} className="text-[#c9a227] hover:text-[#1a1208] text-xs font-semibold">
                          {t(lang, "Edit")}
                        </Link>
                        <button type="button" onClick={() => handleDelete(pkg.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && data.items.length === 0 && (
          <p className="p-8 text-center text-zinc-400">{t(lang, "No results")}</p>
        )}
        <AdminPagination
          page={data.page}
          totalPages={data.totalPages}
          total={data.total}
          pageSize={data.pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
