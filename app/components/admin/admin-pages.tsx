"use client";

import {
  CalendarDays,
  Layout,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { OmraPackage } from "@/app/features/omra/types";
import type { Pilgrim } from "@/app/features/pilgrims/types";
import { t } from "@/app/lib/i18n";
import { readLanguage, type AppLanguage } from "@/app/lib/language";
import { APP_LANGUAGE_EVENT } from "@/app/lib/language";

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

export function AdminOverview() {
  const lang = useAdminLanguage();
  const [omra, setOmra] = useState<OmraPackage[]>([]);
  const [pilgrims, setPilgrims] = useState<Pilgrim[]>([]);

  useEffect(() => {
    Promise.all([fetch("/api/omra").then((r) => r.json()), fetch("/api/pilgrims").then((r) => r.json())]).then(
      ([o, p]) => {
        setOmra(o);
        setPilgrims(p);
      },
    );
  }, []);

  const totalSeats = omra.reduce((s, p) => s + p.maxPilgrims, 0);
  const registered = omra.reduce((s, p) => s + p.registeredCount, 0);
  const available = totalSeats - registered;

  const stats = [
    { label: t(lang, "Total Omra"), value: omra.length, icon: CalendarDays, color: "emerald" },
    { label: t(lang, "Total Pilgrims"), value: pilgrims.length, icon: Users, color: "blue" },
    { label: t(lang, "Available seats"), value: available, icon: CalendarDays, color: "amber" },
  ];

  return (
    <div className="nusuk-page-anim space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="nuxem-kpi-card rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500">{s.label}</p>
              <s.icon size={20} className="text-[#c9a227]" />
            </div>
            <p className="nuxem-kpi-value mt-2 text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">{t(lang, "Quick actions")}</h2>
            <p className="text-sm text-zinc-500">{t(lang, "Manage dynamic blocks")}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/content" className="rounded-xl border border-[#c9a227]/20 bg-[#faf8f4] p-4 transition-all hover:border-[#c9a227] hover:shadow-md">
            <Layout className="text-[#c9a227]" size={22} />
            <p className="mt-2 font-semibold">{t(lang, "Website content")}</p>
            <p className="text-xs text-zinc-500">Hero, gallery, FAQ…</p>
          </Link>
          <Link href="/admin/omra/new" className="rounded-xl border border-zinc-200 p-4 transition-all hover:border-[#c9a227]/30 hover:shadow-md">
            <CalendarDays className="text-[#c9a227]" size={22} />
            <p className="mt-2 font-semibold">{t(lang, "New Omra")}</p>
          </Link>
          <Link href="/admin/pilgrims/new" className="rounded-xl border border-zinc-200 p-4 transition-all hover:border-[#c9a227]/30 hover:shadow-md">
            <Users className="text-[#c9a227]" size={22} />
            <p className="mt-2 font-semibold">{t(lang, "New Pilgrim")}</p>
          </Link>
          <Link href="/admin/settings" className="rounded-xl border border-zinc-200 p-4 transition-all hover:border-[#c9a227]/30 hover:shadow-md">
            <p className="mt-2 font-semibold">{t(lang, "General")}</p>
            <p className="text-xs text-zinc-500">{t(lang, "Agency settings")}</p>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{t(lang, "Recent registrations")}</h2>
          <Link href="/admin/pilgrims" className="text-sm font-medium text-[#c9a227] hover:text-[#1a1208]">
            {t(lang, "Manage pilgrims")} →
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-start text-zinc-500 dark:border-zinc-800">
                <th className="pb-3 pe-4 font-medium">{t(lang, "Name")}</th>
                <th className="pb-3 pe-4 font-medium">{t(lang, "Email")}</th>
                <th className="pb-3 pe-4 font-medium">{t(lang, "Status")}</th>
                <th className="pb-3 font-medium">{t(lang, "Omra")}</th>
              </tr>
            </thead>
            <tbody>
              {pilgrims.slice(0, 5).map((p) => {
                const omraPkg = omra.find((o) => o.id === p.omraId);
                return (
                  <tr key={p.id} className="nuxem-row-anim border-b border-zinc-50 dark:border-zinc-800/50">
                    <td className="py-3 pe-4">
                      <div className="flex items-center gap-2">
                        {p.photoUrl && (
                          <Image src={p.photoUrl} alt="" width={32} height={32} className="rounded-full" />
                        )}
                        <span className="font-medium">{p.firstName} {p.lastName}</span>
                      </div>
                    </td>
                    <td className="py-3 pe-4 text-zinc-500">{p.email}</td>
                    <td className="py-3 pe-4">
                      <span className="rounded-full bg-[#faf8f4] px-2.5 py-0.5 text-xs font-medium text-[#1a1208] dark:bg-[#c9a227]/20 dark:text-[#c9a227]">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 text-zinc-500">{omraPkg?.titleFr ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
