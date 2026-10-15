"use client";

import { useEffect, useState } from "react";
import type { AgencySettings } from "@/app/lib/mappers";
import { t } from "@/app/lib/i18n";
import { readLanguage, APP_LANGUAGE_EVENT, type AppLanguage } from "@/app/lib/language";

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

export function AgencySettingsForm() {
  const lang = useAdminLanguage();
  const [form, setForm] = useState<Partial<AgencySettings>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setForm);
  }, []);

  const update = (key: keyof AgencySettings, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <form onSubmit={handleSubmit} className="nusuk-page-anim mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold">{t(lang, "Settings")}</h2>
        <p className="mt-1 text-sm text-zinc-500">{t(lang, "General")} — {form.nameFr}</p>
      </div>

      {saved ? (
        <p className="rounded-lg bg-[#faf8f4] px-4 py-2 text-sm text-[#1a1208]">{t(lang, "Save")} ✓</p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Title (FR)")}</label>
          <input className={inputClass} value={form.nameFr ?? ""} onChange={(e) => update("nameFr", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Title (AR)")}</label>
          <input className={inputClass} dir="rtl" value={form.nameAr ?? ""} onChange={(e) => update("nameAr", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Email")}</label>
          <input className={inputClass} type="email" value={form.email ?? ""} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Phone")}</label>
          <input className={inputClass} value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Address")} (FR)</label>
          <input className={inputClass} value={form.addressFr ?? ""} onChange={(e) => update("addressFr", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Address")} (AR)</label>
          <input className={inputClass} dir="rtl" value={form.addressAr ?? ""} onChange={(e) => update("addressAr", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Description")} (AR tagline)</label>
          <input className={inputClass} dir="rtl" value={form.taglineAr ?? ""} onChange={(e) => update("taglineAr", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "Description")} (FR tagline)</label>
          <input className={inputClass} value={form.taglineFr ?? ""} onChange={(e) => update("taglineFr", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Facebook URL</label>
          <input className={inputClass} value={form.facebookUrl ?? ""} onChange={(e) => update("facebookUrl", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Logo URL</label>
          <input className={inputClass} value={form.logoUrl ?? "/logo.jpg"} onChange={(e) => update("logoUrl", e.target.value)} />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-700">
        <h3 className="text-sm font-bold">{lang === "AR" ? "ألوان الموقع" : "Couleurs du site"}</h3>
        <p className="mt-1 text-xs text-zinc-500">
          {lang === "AR" ? "اللون الأساسي واللون المميز للموقع العام" : "Couleur principale et accent pour le site public"}
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {(
            [
              { key: "primaryColor" as const, label: lang === "AR" ? "أساسي (أسود)" : "Primaire (noir)" },
              { key: "accentColor" as const, label: lang === "AR" ? "مميز" : "Accent (#c87941)" },
              { key: "backgroundColor" as const, label: lang === "AR" ? "خلفية" : "Fond" },
            ] as const
          ).map(({ key, label }) => (
            <div key={key}>
              <label className="mb-1 block text-xs font-medium">{label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-12 cursor-pointer rounded-lg border border-zinc-200"
                  value={form[key] ?? (key === "accentColor" ? "#c87941" : key === "primaryColor" ? "#111111" : "#ffffff")}
                  onChange={(e) => update(key, e.target.value)}
                />
                <input
                  className={`${inputClass} font-mono text-xs`}
                  value={form[key] ?? ""}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={key === "accentColor" ? "#c87941" : key === "primaryColor" ? "#111111" : "#ffffff"}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-4 flex items-center gap-3 rounded-xl p-4"
          style={{
            background: form.backgroundColor ?? "#ffffff",
            color: form.primaryColor ?? "#111111",
          }}
        >
          <span
            className="rounded-lg px-3 py-1.5 text-xs font-bold"
            style={{
              background: form.primaryColor ?? "#111111",
              color: form.accentColor ?? "#c87941",
            }}
          >
            Aperçu
          </span>
          <span className="text-sm font-medium" style={{ color: form.accentColor ?? "#c87941" }}>
            {form.nameFr ?? "Nusuk"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "contact.hours")} (FR)</label>
          <input className={inputClass} value={form.hoursFr ?? ""} onChange={(e) => update("hoursFr", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "contact.hours")} (AR)</label>
          <input className={inputClass} dir="rtl" value={form.hoursAr ?? ""} onChange={(e) => update("hoursAr", e.target.value)} />
        </div>
      </div>

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
