"use client";

import Image from "next/image";
import { Heart, Shield, Star } from "lucide-react";
import type { StatCounter } from "@/app/features/cms/types";
import { wt, wtField } from "@/app/lib/i18n-website";
import { SacredPlacesSection } from "./blocks/sacred-places";
import { ScrollReveal } from "./animations/scroll-reveal";
import { PageHero } from "./page-hero";
import { useWebsiteLanguage } from "./language-provider";
import { useAgencySettings } from "./agency-settings-provider";

const values = [
  { key: "about.values.trust", icon: Shield },
  { key: "about.values.quality", icon: Star },
  { key: "about.values.devotion", icon: Heart },
];

type AboutPageClientProps = {
  stats: StatCounter[];
};

export function AboutPageClient({ stats }: AboutPageClientProps) {
  const { lang } = useWebsiteLanguage();
  const settings = useAgencySettings();

  return (
    <div className="nusuk-page-anim">
      <PageHero
        badge={lang === "AR" ? settings.nameAr : settings.nameFr}
        title={wt(lang, "about.title")}
        subtitle={wt(lang, "about.subtitle")}
        image="https://images.unsplash.com/photo-1633542116865-8a88a83a77c4?w=1920&q=85"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <ScrollReveal direction="left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nusuk-accent)]">
              {wt(lang, "about.story.title")}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--nusuk-primary)]">{settings.nameFr}</h2>
            <p className="mt-2 text-lg font-semibold text-[var(--nusuk-accent)]" dir="rtl">{settings.nameAr}</p>
            <p className="mt-6 leading-relaxed text-zinc-600">{wt(lang, "about.story.p1")}</p>
            <p className="mt-4 leading-relaxed text-zinc-600">{wt(lang, "about.story.p2")}</p>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=1200&q=85"
                alt="Kaaba Makkah"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--nusuk-primary)]/60 to-transparent" />
            </div>
          </ScrollReveal>
        </div>

        {stats.length > 0 ? (
          <ScrollReveal className="mt-16">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.id}
                  className="nuxem-row-anim rounded-2xl border border-[var(--nusuk-accent)]/20 bg-gradient-to-br from-[var(--nusuk-bg)] to-white p-6 text-center shadow-sm"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <p className="text-3xl font-bold text-[var(--nusuk-primary)]">
                    {s.value}
                    {s.suffix ? <span className="text-[var(--nusuk-accent)]">{s.suffix}</span> : null}
                  </p>
                  <p className="mt-1 text-xs font-medium text-zinc-500">{wtField(lang, s, "labelFr", "labelAr")}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        ) : null}
      </section>

      <section className="bg-[var(--nusuk-primary)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="fade">
            <h2 className="text-center text-3xl font-bold text-white">{wt(lang, "about.values.title")}</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map(({ key, icon: Icon }, i) => (
              <ScrollReveal key={key} delay={i * 100}>
                <div className="rounded-2xl border border-[var(--nusuk-accent)]/20 bg-[var(--nusuk-primary)] p-8 text-center transition-all hover:-translate-y-1 hover:border-[var(--nusuk-accent)]/50">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--nusuk-accent)] text-[var(--nusuk-primary)] nusuk-float">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-4 font-bold text-white">{wt(lang, key)}</h3>
                  <p className="mt-2 text-sm text-[var(--nusuk-muted)]/70">{wt(lang, `${key}.desc`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SacredPlacesSection />
    </div>
  );
}
