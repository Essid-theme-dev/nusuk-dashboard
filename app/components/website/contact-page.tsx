"use client";

import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useAgencySettings } from "@/app/components/website/agency-settings-provider";
import { ScrollReveal } from "./animations/scroll-reveal";
import { PageHero } from "./page-hero";
import { wt } from "@/app/lib/i18n-website";
import { useWebsiteLanguage } from "./language-provider";

export function ContactPageClient() {
  const { lang } = useWebsiteLanguage();
  const settings = useAgencySettings();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const address = lang === "AR" ? settings.addressAr : settings.addressFr;
  const hours = lang === "AR" ? settings.hoursAr : settings.hoursFr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to send");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { icon: MapPin, title: wt(lang, "contact.address"), value: address },
    { icon: Phone, title: wt(lang, "contact.phone"), value: settings.phone, dir: "ltr" as const },
    { icon: Mail, title: "Email", value: settings.email },
    { icon: Clock, title: wt(lang, "contact.hours"), value: hours },
  ];

  return (
    <>
      <PageHero
        badge={lang === "AR" ? "تواصل معنا" : "Contact"}
        title={wt(lang, "contact.title")}
        subtitle={wt(lang, "contact.subtitle")}
        image="https://images.unsplash.com/photo-1633542116865-8a88a83a77c4?w=1920&q=85"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {cards.map(({ icon: Icon, title, value, dir }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div className="nusuk-hover-card p-6">
                  <div className="nusuk-icon-box h-11 w-11 rounded-xl">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-3 font-bold text-[var(--nusuk-primary)]">{title}</h3>
                  <p className="mt-1 text-sm text-zinc-600" dir={dir}>{value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="right" className="lg:col-span-3">
            {sent ? (
              <div className="flex h-full min-h-[360px] items-center justify-center rounded-3xl border border-[var(--nusuk-accent)]/30 bg-[var(--nusuk-bg)] p-8 text-center">
                <p className="text-lg font-medium text-[var(--nusuk-primary)]">{wt(lang, "contact.success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-[var(--nusuk-accent)]/15 bg-white p-8 shadow-xl">
                {error ? <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">{wt(lang, "contact.name")}</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-[var(--nusuk-accent)] focus:ring-2 focus:ring-[var(--nusuk-accent)]/20" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">{wt(lang, "contact.phone")}</label>
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-[var(--nusuk-accent)] focus:ring-2 focus:ring-[var(--nusuk-accent)]/20" dir="ltr" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">{wt(lang, "contact.email")}</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-[var(--nusuk-accent)] focus:ring-2 focus:ring-[var(--nusuk-accent)]/20" dir="ltr" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">{wt(lang, "contact.message")}</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-[var(--nusuk-accent)] focus:ring-2 focus:ring-[var(--nusuk-accent)]/20" />
                </div>
                <button type="submit" disabled={loading}
                  className="nusuk-btn nusuk-btn-dark w-full py-3.5 sm:w-auto sm:px-10">
                  <Send size={18} />
                  {loading ? "..." : wt(lang, "contact.send")}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
