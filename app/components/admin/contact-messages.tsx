"use client";

import { Mail, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { ContactMessage } from "@/app/lib/mappers";
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

export function ContactMessagesAdmin() {
  const lang = useAdminLanguage();
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const load = useCallback(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then(setMessages);
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id: string, read: boolean) => {
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="nusuk-page-anim space-y-6">
      <h2 className="text-xl font-bold">{t(lang, "Contact messages")}</h2>
      <div className="space-y-4">
        {messages.map((msg) => (
          <article
            key={msg.id}
            className={clsx(
              "rounded-2xl border p-5 shadow-sm",
              msg.read
                ? "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                : "border-[#c9a227]/30 bg-[#faf8f4]/50 dark:border-[#c9a227]/20 dark:bg-[#1a1208]/30",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{msg.name}</p>
                <p className="text-sm text-zinc-500">{msg.email} · {msg.phone}</p>
                <p className="mt-1 text-xs text-zinc-400">
                  {new Date(msg.createdAt).toLocaleString(lang === "AR" ? "ar-TN" : "fr-TN")}
                </p>
              </div>
              <div className="flex gap-2">
                {!msg.read ? (
                  <button
                    type="button"
                    onClick={() => markRead(msg.id, true)}
                    className="rounded-lg bg-[#1a1208] px-3 py-1.5 text-xs font-semibold text-[#c9a227] hover:bg-[#c9a227] hover:text-[#1a1208]"
                  >
                    {t(lang, "Mark all read")}
                  </button>
                ) : null}
                <button type="button" onClick={() => handleDelete(msg.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{msg.message}</p>
          </article>
        ))}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 py-16 text-zinc-400">
            <Mail size={32} />
            <p className="mt-2">{t(lang, "No results")}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
