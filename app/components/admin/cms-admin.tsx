"use client";

import { Edit, Layout, Plus, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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

type FieldDef = { key: string; label: string; type?: "text" | "textarea" | "number" | "checkbox" | "select"; options?: string[] };

const schemas: Record<string, { label: string; type: string; fields: FieldDef[] }> = {
  heroSlides: {
    label: "Hero Carousel",
    type: "hero-slides",
    fields: [
      { key: "badgeFr", label: "Badge FR" },
      { key: "badgeAr", label: "Badge AR" },
      { key: "titleFr", label: "Title FR" },
      { key: "titleAr", label: "Title AR" },
      { key: "subtitleFr", label: "Subtitle FR", type: "textarea" },
      { key: "subtitleAr", label: "Subtitle AR", type: "textarea" },
      { key: "image", label: "Image URL" },
      { key: "videoUrl", label: "Video URL" },
      { key: "ctaLabelFr", label: "CTA FR" },
      { key: "ctaLabelAr", label: "CTA AR" },
      { key: "ctaLink", label: "CTA Link" },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
  stats: {
    label: "Statistics",
    type: "stats",
    fields: [
      { key: "value", label: "Value" },
      { key: "suffix", label: "Suffix (+, %)" },
      { key: "labelFr", label: "Label FR" },
      { key: "labelAr", label: "Label AR" },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
  features: {
    label: "Features",
    type: "features",
    fields: [
      { key: "icon", label: "Icon", type: "select", options: ["shield", "hotel", "award", "support", "star", "users", "map", "clock", "heart"] },
      { key: "titleFr", label: "Title FR" },
      { key: "titleAr", label: "Title AR" },
      { key: "descFr", label: "Description FR", type: "textarea" },
      { key: "descAr", label: "Description AR", type: "textarea" },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
  destinations: {
    label: "Destinations",
    type: "destinations",
    fields: [
      { key: "nameFr", label: "Name FR" },
      { key: "nameAr", label: "Name AR" },
      { key: "descFr", label: "Description FR", type: "textarea" },
      { key: "descAr", label: "Description AR", type: "textarea" },
      { key: "image", label: "Image URL" },
      { key: "tourCount", label: "Tour count", type: "number" },
      { key: "link", label: "Link" },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
  videos: {
    label: "Videos",
    type: "videos",
    fields: [
      { key: "titleFr", label: "Title FR" },
      { key: "titleAr", label: "Title AR" },
      { key: "descFr", label: "Description FR", type: "textarea" },
      { key: "descAr", label: "Description AR", type: "textarea" },
      { key: "videoUrl", label: "Video URL (YouTube embed)" },
      { key: "thumbnail", label: "Thumbnail URL" },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
  testimonials: {
    label: "Testimonials",
    type: "testimonials",
    fields: [
      { key: "nameFr", label: "Name FR" },
      { key: "nameAr", label: "Name AR" },
      { key: "locationFr", label: "Location FR" },
      { key: "locationAr", label: "Location AR" },
      { key: "textFr", label: "Text FR", type: "textarea" },
      { key: "textAr", label: "Text AR", type: "textarea" },
      { key: "avatar", label: "Avatar URL" },
      { key: "rating", label: "Rating (1-5)", type: "number" },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
  gallery: {
    label: "Gallery",
    type: "gallery",
    fields: [
      { key: "image", label: "Image URL" },
      { key: "captionFr", label: "Caption FR" },
      { key: "captionAr", label: "Caption AR" },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
  faqs: {
    label: "FAQ",
    type: "faqs",
    fields: [
      { key: "questionFr", label: "Question FR" },
      { key: "questionAr", label: "Question AR" },
      { key: "answerFr", label: "Answer FR", type: "textarea" },
      { key: "answerAr", label: "Answer AR", type: "textarea" },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
  achievements: {
    label: "Achievements",
    type: "achievements",
    fields: [
      { key: "titleFr", label: "Title FR" },
      { key: "titleAr", label: "Title AR" },
      { key: "orgFr", label: "Organization FR" },
      { key: "orgAr", label: "Organization AR" },
      { key: "year", label: "Year" },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
  promos: {
    label: "Promo Banners",
    type: "promos",
    fields: [
      { key: "titleFr", label: "Title FR" },
      { key: "titleAr", label: "Title AR" },
      { key: "subtitleFr", label: "Subtitle FR", type: "textarea" },
      { key: "subtitleAr", label: "Subtitle AR", type: "textarea" },
      { key: "image", label: "Image URL" },
      { key: "ctaFr", label: "CTA FR" },
      { key: "ctaAr", label: "CTA AR" },
      { key: "ctaLink", label: "CTA Link" },
      { key: "style", label: "Style", type: "select", options: ["gold", "dark"] },
      { key: "sortOrder", label: "Order", type: "number" },
      { key: "active", label: "Active", type: "checkbox" },
    ],
  },
};

type CmsData = Record<string, Array<Record<string, unknown> & { id: string }>>;

function getTitle(item: Record<string, unknown>): string {
  return String(item.titleFr ?? item.nameFr ?? item.questionFr ?? item.labelFr ?? item.id);
}

export function CmsAdminPage() {
  const lang = useAdminLanguage();
  const [data, setData] = useState<CmsData>({});
  const [activeTab, setActiveTab] = useState("heroSlides");
  const [modal, setModal] = useState<{ mode: "create" | "edit"; item?: Record<string, unknown> } | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(() => {
    fetch("/api/cms?scope=admin")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError("Failed to load content"));
  }, []);

  useEffect(() => { load(); }, [load]);

  const schema = schemas[activeTab];
  const items = data[activeTab] ?? [];

  const sanitizePayload = (raw: Record<string, unknown>) => {
    const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = raw;
    return rest;
  };

  const openCreate = () => {
    setError("");
    setSuccess("");
    const defaults: Record<string, unknown> = { active: true, sortOrder: items.length };
    setForm(defaults);
    setModal({ mode: "create" });
  };

  const openEdit = (item: Record<string, unknown>) => {
    setError("");
    setSuccess("");
    setForm({ ...item });
    setModal({ mode: "edit", item });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    const type = schema.type;

    try {
      let res: Response;
      if (modal?.mode === "edit" && form.id) {
        res = await fetch("/api/cms", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, id: form.id, data: sanitizePayload(form) }),
        });
      } else {
        res = await fetch("/api/cms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, data: sanitizePayload(form) }),
        });
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `Save failed (${res.status})`);
      }

      setSuccess(t(lang, "Save") + " ✓");
      setModal(null);
      load();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/cms?type=${schema.type}&id=${id}`, { method: "DELETE" });
    load();
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <div className="nusuk-page-anim space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Layout className="text-[#c9a227]" size={24} />
          <div>
            <h2 className="text-xl font-bold">{t(lang, "Website content")}</h2>
            <p className="text-sm text-zinc-500">{t(lang, "Manage dynamic blocks")}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1a1208] px-4 py-2.5 text-sm font-semibold text-[#c9a227]"
        >
          <Plus size={16} /> {t(lang, "Add new")}
        </button>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}
      {success ? (
        <p className="rounded-xl border border-[#c9a227]/30 bg-[#faf8f4] px-4 py-3 text-sm text-[#1a1208]">{success}</p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {Object.entries(schemas).map(([key, s]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === key ? "bg-[#1a1208] text-[#c9a227]" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800"
            }`}
          >
            {s.label} ({(data[key] ?? []).length})
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-zinc-50 text-start text-zinc-500 dark:bg-zinc-800/50">
              <th className="px-4 py-3 font-medium">{t(lang, "Title")}</th>
              <th className="px-4 py-3 font-medium">{t(lang, "Status")}</th>
              <th className="px-4 py-3 font-medium">{t(lang, "Actions")}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-zinc-50 dark:border-zinc-800/50">
                <td className="px-4 py-3 font-medium">{getTitle(item)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${item.active !== false ? "bg-[#faf8f4] text-[#1a1208]" : "bg-zinc-100"}`}>
                    {item.active !== false ? t(lang, "Available") : t(lang, "Closed")}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => openEdit(item)} className="text-[#c9a227] hover:text-[#1a1208]">
                      <Edit size={16} />
                    </button>
                    <button type="button" onClick={() => handleDelete(item.id)} className="text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="p-8 text-center text-zinc-400">{t(lang, "No results")}</p>}
      </div>

      {modal ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">{modal.mode === "create" ? t(lang, "Add new") : t(lang, "Edit")} — {schema.label}</h3>
              <button type="button" onClick={() => setModal(null)} aria-label="Close"><X size={20} /></button>
            </div>
            {modal.mode === "create" ? (
              <p className="mb-4 rounded-lg bg-[#faf8f4] px-3 py-2 text-xs text-zinc-500">
                {lang === "AR" ? "املأ الحقول المطلوبة (العنوان FR/AR، الصورة…)" : "Remplissez les champs requis (titres FR/AR, image…)"}
              </p>
            ) : null}
            <div className="space-y-3">
              {schema.fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-xs font-medium text-zinc-500">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={String(form[field.key] ?? "")}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    />
                  ) : field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(form[field.key] ?? true)}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })}
                    />
                  ) : field.type === "number" ? (
                    <input
                      type="number"
                      className={inputClass}
                      value={Number(form[field.key] ?? 0)}
                      onChange={(e) => setForm({ ...form, [field.key]: Number(e.target.value) })}
                    />
                  ) : field.type === "select" ? (
                    <select
                      className={inputClass}
                      value={String(form[field.key] ?? field.options?.[0] ?? "")}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    >
                      {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      className={inputClass}
                      value={String(form[field.key] ?? "")}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
            {error && modal ? (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
            ) : null}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-[#1a1208] px-6 py-2.5 text-sm font-bold text-[#c9a227] disabled:opacity-50"
              >
                {saving ? "..." : t(lang, "Save")}
              </button>
              <button type="button" onClick={() => setModal(null)} className="text-sm text-zinc-500">{t(lang, "Cancel")}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
