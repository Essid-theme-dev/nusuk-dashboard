"use client";

import type { StatCounter } from "@/app/features/cms/types";
import { wtField } from "@/app/lib/i18n-website";
import { AnimatedStat } from "./animated-stat";
import { useWebsiteLanguage } from "../language-provider";

export function StatsSection({ stats }: { stats: StatCounter[] }) {
  const { lang } = useWebsiteLanguage();
  if (stats.length === 0) return null;

  return (
    <section className="relative -mt-16 z-10 mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid gap-4 rounded-2xl border border-[var(--nusuk-accent)]/20 bg-white p-6 shadow-2xl shadow-[var(--nusuk-primary)]/10 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
        {stats.map((stat, i) => (
          <div
            key={stat.id}
            className="nuxem-card-anim group text-center transition-transform hover:-translate-y-1"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="text-3xl font-bold text-[var(--nusuk-primary)] lg:text-4xl">
              <AnimatedStat value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-500">{wtField(lang, stat, "labelFr", "labelAr")}</p>
            <div className="mx-auto mt-3 h-0.5 w-8 rounded-full bg-[var(--nusuk-accent)]/30 transition-all group-hover:w-12 group-hover:bg-[var(--nusuk-accent)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
