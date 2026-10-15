"use client";

import type { LucideIcon } from "lucide-react";
import {
  Award,
  Clock,
  Headphones,
  Heart,
  Hotel,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import type { FeatureBlock } from "@/app/features/cms/types";
import { wtField } from "@/app/lib/i18n-website";
import { useWebsiteLanguage } from "../language-provider";

const iconMap: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  hotel: Hotel,
  award: Award,
  support: Headphones,
  star: Star,
  users: Users,
  map: MapPin,
  clock: Clock,
  heart: Heart,
};

export function FeaturesGrid({ features }: { features: FeatureBlock[] }) {
  const { lang } = useWebsiteLanguage();
  if (features.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="nusuk-eyebrow">Nusuk</span>
          <h2 className="nusuk-section-title">
            {lang === "AR" ? "لماذا تختار نسك؟" : "Pourquoi choisir Nusuk ?"}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon] ?? Star;
            return (
              <div
                key={f.id}
                className="nusuk-hover-card nuxem-row-anim group p-6 text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="nusuk-icon-box mx-auto h-14 w-14">
                  <Icon size={26} />
                </div>
                <h3 className="mt-4 font-bold text-[var(--nusuk-primary)]">{wtField(lang, f, "titleFr", "titleAr")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{wtField(lang, f, "descFr", "descAr")}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
