"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { OmraPackage } from "@/app/features/omra/types";
import type { PaginatedResult } from "@/app/features/omra/types";
import type { Pilgrim, PilgrimStatus } from "@/app/features/pilgrims/types";
import { AdminListToolbar } from "@/app/components/admin/admin-list-toolbar";
import { AdminPagination } from "@/app/components/admin/admin-pagination";
import { ImageLightbox } from "@/app/components/website/ui/media-modal";
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

export function PilgrimsAdminList() {
  const lang = useAdminLanguage();
  const searchParams = useSearchParams();
  const initialOmraId = searchParams.get("omraId") ?? "";

  const [data, setData] = useState<PaginatedResult<Pilgrim>>({
    items: [],
    total: 0,
    page: 1,
    pageSize: PAGE_SIZE,
    totalPages: 1,
  });
  const [omraList, setOmraList] = useState<OmraPackage[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [omraFilter, setOmraFilter] = useState(initialOmraId);
  const [statusFilter, setStatusFilter] = useState<PilgrimStatus | "">("");
  const [paymentFilter, setPaymentFilter] = useState<"paid" | "pending" | "">("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/omra").then((r) => r.json()).then(setOmraList);
  }, []);

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
    if (omraFilter) params.set("omraId", omraFilter);
    if (statusFilter) params.set("status", statusFilter);
    if (paymentFilter) params.set("paymentStatus", paymentFilter);

    fetch(`/api/pilgrims?${params}`)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [page, debouncedSearch, omraFilter, statusFilter, paymentFilter]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm(t(lang, "Delete confirm"))) return;
    await fetch(`/api/pilgrims?id=${id}`, { method: "DELETE" });
    load();
  };

  const selectClass =
    "rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  const statusLabel = (s: PilgrimStatus) => {
    const map: Record<PilgrimStatus, string> = {
      registered: t(lang, "Registered"),
      confirmed: t(lang, "Confirmed"),
      visa_pending: t(lang, "Visa pending"),
      cancelled: t(lang, "Cancelled"),
    };
    return map[s];
  };

  return (
    <>
      <div className="nusuk-page-anim space-y-6">
        <AdminListToolbar
          lang={lang}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={t(lang, "Search pilgrim")}
          newHref="/admin/pilgrims/new"
          newLabel={t(lang, "New Pilgrim")}
          filters={
            <>
              <select
                className={selectClass}
                value={omraFilter}
                onChange={(e) => {
                  setOmraFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">{t(lang, "All Omra")}</option>
                {omraList.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.titleFr} ({new Date(o.departureDate).toLocaleDateString("fr-TN")})
                  </option>
                ))}
              </select>
              <select
                className={selectClass}
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as PilgrimStatus | "");
                  setPage(1);
                }}
              >
                <option value="">{t(lang, "All statuses")}</option>
                <option value="registered">{t(lang, "Registered")}</option>
                <option value="confirmed">{t(lang, "Confirmed")}</option>
                <option value="visa_pending">{t(lang, "Visa pending")}</option>
                <option value="cancelled">{t(lang, "Cancelled")}</option>
              </select>
              <select
                className={selectClass}
                value={paymentFilter}
                onChange={(e) => {
                  setPaymentFilter(e.target.value as "paid" | "pending" | "");
                  setPage(1);
                }}
              >
                <option value="">{t(lang, "All payments")}</option>
                <option value="paid">{t(lang, "Paid")}</option>
                <option value="pending">{t(lang, "Payment pending")}</option>
              </select>
            </>
          }
        />

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/80 text-start text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <th className="px-4 py-3 font-medium">{t(lang, "Photo")}</th>
                  <th className="px-4 py-3 font-medium">{t(lang, "Passport image")}</th>
                  <th className="px-4 py-3 font-medium">{t(lang, "Name")}</th>
                  <th className="px-4 py-3 font-medium">{t(lang, "Passport")}</th>
                  <th className="px-4 py-3 font-medium">{t(lang, "Omra")}</th>
                  <th className="px-4 py-3 font-medium">{t(lang, "Payment")}</th>
                  <th className="px-4 py-3 font-medium">{t(lang, "Phone")}</th>
                  <th className="px-4 py-3 font-medium">{t(lang, "Status")}</th>
                  <th className="px-4 py-3 font-medium">{t(lang, "Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-zinc-400">…</td>
                  </tr>
                ) : (
                  data.items.map((p) => (
                    <tr key={p.id} className="border-b border-zinc-50 dark:border-zinc-800/50">
                      <td className="px-4 py-3">
                        {p.photoUrl ? (
                          <button type="button" onClick={() => setPreviewImage(p.photoUrl!)} className="block overflow-hidden rounded-lg">
                            <Image src={p.photoUrl} alt="" width={40} height={40} className="h-10 w-10 object-cover" />
                          </button>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-xs text-zinc-400">—</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {p.passportImageUrl ? (
                          <button type="button" onClick={() => setPreviewImage(p.passportImageUrl!)} className="block overflow-hidden rounded-lg border border-[#c9a227]/30">
                            <Image src={p.passportImageUrl} alt="" width={56} height={40} className="h-10 w-14 object-cover" />
                          </button>
                        ) : (
                          <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-dashed border-zinc-200 text-[10px] text-zinc-400">
                            {t(lang, "No passport")}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold">{p.firstName} {p.lastName}</p>
                        <p className="text-xs text-zinc-400">{p.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-mono text-xs">{p.passportNumber}</p>
                        <p className="text-[10px] text-zinc-400">
                          exp. {new Date(p.passportExpiry).toLocaleDateString("fr-TN")}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#1a1208]">{p.omra?.titleFr ?? "—"}</p>
                        {p.omra ? (
                          <p className="text-xs text-zinc-400">
                            {new Date(p.omra.departureDate).toLocaleDateString("fr-TN")} · {p.omra.price.toLocaleString()} {p.omra.currency}
                          </p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3">
                        {p.paymentStatus === "paid" ? (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                            {t(lang, "Paid")}
                          </span>
                        ) : (
                          <div>
                            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                              {t(lang, "Payment pending")}
                            </span>
                            <p className="mt-1 text-[10px] text-zinc-500">
                              {(p.totalPaid ?? 0).toLocaleString()} / {(p.omraPrice ?? 0).toLocaleString()} {p.omra?.currency}
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap" dir="ltr">{p.phone}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-[#faf8f4] px-2.5 py-0.5 text-xs font-medium text-[#1a1208]">
                          {statusLabel(p.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/pilgrims/${p.id}`} className="text-[#c9a227] hover:text-[#1a1208] text-xs font-semibold">
                            {t(lang, "Edit")}
                          </Link>
                          <button type="button" onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700">
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

      <ImageLightbox
        images={previewImage ? [{ src: previewImage, alt: "" }] : []}
        index={previewImage ? 0 : null}
        onClose={() => setPreviewImage(null)}
        onNavigate={() => {}}
      />
    </>
  );
}
