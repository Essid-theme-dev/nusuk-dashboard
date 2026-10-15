"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { t } from "@/app/lib/i18n";
import { readLanguage, APP_LANGUAGE_EVENT, type AppLanguage } from "@/app/lib/language";
import { useEffect } from "react";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const [lang, setLang] = useState<AppLanguage>("FR");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLang(readLanguage());
    const handler = (e: Event) => setLang((e as CustomEvent<AppLanguage>).detail);
    window.addEventListener(APP_LANGUAGE_EVENT, handler);
    return () => window.removeEventListener(APP_LANGUAGE_EVENT, handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed");
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="relative mx-auto mb-4 h-14 w-40">
          <Image src="/logo.jpg" alt="Nusuk" fill className="object-contain" priority />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{t(lang, "Login")}</h1>
        <p className="mt-2 text-sm text-zinc-500">{t(lang, "auth.login.subtitle")}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        {error ? (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        ) : null}

        <label className="mb-4 block">
          <span className="mb-1.5 block text-sm font-medium">{t(lang, "Email")}</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#c87941] focus:ring-2 focus:ring-[#c87941]/20 dark:border-zinc-700 dark:bg-zinc-950"
            dir="ltr"
          />
        </label>

        <label className="mb-6 block">
          <span className="mb-1.5 block text-sm font-medium">{t(lang, "auth.password")}</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#c87941] focus:ring-2 focus:ring-[#c87941]/20 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#111111] py-3.5 text-sm font-bold text-white transition hover:bg-[#c87941] disabled:opacity-50"
        >
          {loading ? "..." : t(lang, "Login")}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-zinc-400">
        {t(lang, "auth.login.hint")}
      </p>
    </div>
  );
}

export function AdminLoginForm() {
  return (
    <Suspense fallback={<div className="h-64 w-full max-w-md animate-pulse rounded-2xl bg-zinc-100" />}>
      <LoginFormInner />
    </Suspense>
  );
}
