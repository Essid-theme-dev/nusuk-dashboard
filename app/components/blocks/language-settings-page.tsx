"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { applyLanguage, readLanguage, type AppLanguage } from "@/app/lib/language";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const options = [
  { code: "FR", label: "Français", locale: "fr-FR" },
  { code: "AR", label: "العربية", locale: "ar-DZ" },
];

export function LanguageSettingsPage() {
  const [primary, setPrimary] = useState<AppLanguage>("FR");
  const [secondary, setSecondary] = useState<AppLanguage>("AR");

  useEffect(() => {
    setPrimary(readLanguage());
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Preferences</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Language selector</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Configure the primary interface language and fallback language for multilingual UI.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2">
            <Languages size={16} className="text-violet-600 dark:text-violet-300" />
            <h3 className="text-base font-semibold">Primary language</h3>
          </div>
          <div className="mt-4 space-y-2">
            {options.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => {
                  const next = opt.code as AppLanguage;
                  setPrimary(next);
                  applyLanguage(next);
                }}
                className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm ${
                  primary === opt.code
                    ? "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300"
                    : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{opt.label}</span>
                <span className="text-xs font-semibold">{opt.locale}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold">Fallback language</h3>
          <p className="mt-1 text-sm text-zinc-500">
            Used when a translation key is missing in your primary language.
          </p>
          <div className="mt-4 space-y-2">
            {options.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => setSecondary(opt.code as AppLanguage)}
                className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm ${
                  secondary === opt.code
                    ? "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300"
                    : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{opt.label}</span>
                <span className="text-xs font-semibold">{opt.code}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          onClick={() => {
            setPrimary("FR");
            setSecondary("AR");
            applyLanguage("FR");
          }}
        >
          Reset
        </Button>
        <Button variant="primary" onClick={() => applyLanguage(primary)}>
          Save language settings
        </Button>
      </div>
    </div>
  );
}
