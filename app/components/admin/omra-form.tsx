"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { OmraPackage, OmraStatus } from "@/app/features/omra/types";
import { t } from "@/app/lib/i18n";
import { readLanguage, APP_LANGUAGE_EVENT, type AppLanguage } from "@/app/lib/language";
import Link from "next/link";

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

const emptyOmra = (): Partial<OmraPackage> => ({
  titleFr: "",
  titleAr: "",
  descriptionFr: "",
  descriptionAr: "",
  price: 0,
  currency: "TND",
  durationDays: 10,
  departureDate: "",
  returnDate: "",
  guideFr: "",
  guideAr: "",
  guidePhone: "",
  hotelMakkah: "",
  hotelMadinah: "",
  includesFr: [],
  includesAr: [],
  image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=800&q=80",
  status: "available" as OmraStatus,
  maxPilgrims: 40,
  featured: false,
});

type OmraFormProps = { id?: string };

export function OmraForm({ id }: OmraFormProps) {
  const lang = useAdminLanguage();
  const router = useRouter();
  const [form, setForm] = useState<Partial<OmraPackage>>(emptyOmra());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch("/api/omra")
      .then((r) => r.json())
      .then((all: OmraPackage[]) => {
        const found = all.find((p) => p.id === id);
        if (found) setForm(found);
      });
  }, [id]);

  const update = (key: keyof OmraPackage, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = id ? "PUT" : "POST";
    const body = id ? { ...form, id } : form;
    await fetch("/api/omra", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    router.push("/admin/omra");
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <form onSubmit={handleSubmit} className="nusuk-page-anim mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{id ? t(lang, "Edit") : t(lang, "New Omra")}</h2>
        <Link href="/admin/omra" className="text-sm text-[#c9a227]">{t(lang, "Back to list")}</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Title (FR)")}</label>
          <input required className={inputClass} value={form.titleFr ?? ""} onChange={(e) => update("titleFr", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Title (AR)")}</label>
          <input required className={inputClass} dir="rtl" value={form.titleAr ?? ""} onChange={(e) => update("titleAr", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Description (FR)")}</label>
          <textarea required rows={3} className={inputClass} value={form.descriptionFr ?? ""} onChange={(e) => update("descriptionFr", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Description (AR)")}</label>
          <textarea required rows={3} className={inputClass} dir="rtl" value={form.descriptionAr ?? ""} onChange={(e) => update("descriptionAr", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Price")}</label>
          <input required type="number" className={inputClass} value={form.price ?? 0} onChange={(e) => update("price", Number(e.target.value))} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Currency")}</label>
          <input required className={inputClass} value={form.currency ?? "DZD"} onChange={(e) => update("currency", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Duration")}</label>
          <input required type="number" className={inputClass} value={form.durationDays ?? 10} onChange={(e) => update("durationDays", Number(e.target.value))} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Departure")}</label>
          <input required type="date" className={inputClass} value={form.departureDate ?? ""} onChange={(e) => update("departureDate", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Return")}</label>
          <input required type="date" className={inputClass} value={form.returnDate ?? ""} onChange={(e) => update("returnDate", e.target.value)} />
        </div>
      </div>

      <section className="rounded-2xl border border-[#c9a227]/15 bg-[#faf8f4]/50 p-5">
        <h3 className="mb-4 font-semibold text-[#1a1208]">{t(lang, "Guide")}</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Guide")} (FR)</label>
            <input className={inputClass} value={form.guideFr ?? ""} onChange={(e) => update("guideFr", e.target.value)} placeholder="Sheikh Ahmed Ben Ali" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Guide")} (AR)</label>
            <input className={inputClass} dir="rtl" value={form.guideAr ?? ""} onChange={(e) => update("guideAr", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Guide phone")}</label>
            <input className={inputClass} dir="ltr" value={form.guidePhone ?? ""} onChange={(e) => update("guidePhone", e.target.value)} placeholder="+216 XX XXX XXX" />
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Hotel Makkah")}</label>
          <input required className={inputClass} value={form.hotelMakkah ?? ""} onChange={(e) => update("hotelMakkah", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Hotel Madinah")}</label>
          <input required className={inputClass} value={form.hotelMadinah ?? ""} onChange={(e) => update("hotelMadinah", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Includes (FR)")}</label>
          <textarea
            rows={4}
            className={inputClass}
            value={(form.includesFr ?? []).join("\n")}
            onChange={(e) => update("includesFr", e.target.value.split("\n").filter(Boolean))}
            placeholder="One item per line"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Includes (AR)")}</label>
          <textarea
            rows={4}
            className={inputClass}
            dir="rtl"
            value={(form.includesAr ?? []).join("\n")}
            onChange={(e) => update("includesAr", e.target.value.split("\n").filter(Boolean))}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Image")}</label>
          <input required className={inputClass} value={form.image ?? ""} onChange={(e) => update("image", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Max pilgrims")}</label>
          <input required type="number" className={inputClass} value={form.maxPilgrims ?? 40} onChange={(e) => update("maxPilgrims", Number(e.target.value))} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Status")}</label>
          <select className={inputClass} value={form.status ?? "available"} onChange={(e) => update("status", e.target.value)}>
            <option value="available">{t(lang, "Available")}</option>
            <option value="full">{t(lang, "Full")}</option>
            <option value="closed">{t(lang, "Closed")}</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.featured ?? false} onChange={(e) => update("featured", e.target.checked)} />
        {t(lang, "Featured")}
      </label>

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-[#1a1208] px-8 py-3 text-sm font-bold text-[#c9a227] hover:bg-[#c9a227] hover:text-[#1a1208] disabled:opacity-50"
      >
        {saving ? "..." : t(lang, "Save")}
      </button>
    </form>
  );
}
