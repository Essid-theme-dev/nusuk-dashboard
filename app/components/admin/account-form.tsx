"use client";

import { useEffect, useState } from "react";
import { t } from "@/app/lib/i18n";
import { readLanguage, APP_LANGUAGE_EVENT, type AppLanguage } from "@/app/lib/language";

type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

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

export function AdminAccountForm() {
  const lang = useAdminLanguage();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
          setProfile({ name: data.name, email: data.email });
        }
      });
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileError("");
    setProfileMsg("");
    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setUser(data);
      setProfileMsg(t(lang, "Save") + " ✓");
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Error");
    } finally {
      setProfileSaving(false);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordError("");
    setPasswordMsg("");
    try {
      const res = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordMsg(t(lang, "auth.password.updated"));
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Error");
    } finally {
      setPasswordSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <div className="nusuk-page-anim mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="text-xl font-bold">{t(lang, "auth.account.title")}</h2>
        <p className="mt-1 text-sm text-zinc-500">{t(lang, "auth.account.subtitle")}</p>
      </div>

      <form onSubmit={saveProfile} className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="font-semibold">{t(lang, "auth.profile")}</h3>
        {profileError ? <p className="text-sm text-red-600">{profileError}</p> : null}
        {profileMsg ? <p className="text-sm text-emerald-600">{profileMsg}</p> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Name")}</label>
            <input
              className={inputClass}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "Email")}</label>
            <input
              className={inputClass}
              type="email"
              dir="ltr"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              required
            />
          </div>
        </div>
        {user ? (
          <p className="text-xs text-zinc-400">
            {t(lang, "auth.role")}: {user.role}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={profileSaving}
          className="rounded-xl bg-[#111111] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#c87941] disabled:opacity-50"
        >
          {profileSaving ? "..." : t(lang, "Save")}
        </button>
      </form>

      <form onSubmit={savePassword} className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="font-semibold">{t(lang, "auth.changePassword")}</h3>
        {passwordError ? <p className="text-sm text-red-600">{passwordError}</p> : null}
        {passwordMsg ? <p className="text-sm text-emerald-600">{passwordMsg}</p> : null}
        <div>
          <label className="mb-1 block text-sm font-medium">{t(lang, "auth.currentPassword")}</label>
          <input
            type="password"
            className={inputClass}
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "auth.newPassword")}</label>
            <input
              type="password"
              className={inputClass}
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(lang, "auth.confirmPassword")}</label>
            <input
              type="password"
              className={inputClass}
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={passwordSaving}
          className="rounded-xl border border-zinc-300 px-6 py-2.5 text-sm font-bold hover:border-[#c87941] hover:text-[#c87941] disabled:opacity-50 dark:border-zinc-600"
        >
          {passwordSaving ? "..." : t(lang, "auth.changePassword")}
        </button>
      </form>
    </div>
  );
}
