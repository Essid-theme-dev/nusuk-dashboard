"use client";

import { Award, BadgeCheck, Headphones, Plane } from "lucide-react";
import { wt } from "@/app/lib/i18n-website";
import { ScrollReveal } from "../animations/scroll-reveal";
import { useWebsiteLanguage } from "../language-provider";

const badges = [
  { key: "trust.licensed", icon: BadgeCheck },
  { key: "trust.visa", icon: Plane },
  { key: "trust.pilgrims", icon: Award },
  { key: "trust.support", icon: Headphones },
] as const;

export function TrustBadgesSection() {
  const { lang } = useWebsiteLanguage();

  return (
    <section className="border-y border-[var(--nusuk-border)] bg-[var(--nusuk-bg)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {badges.map(({ key, icon: Icon }, i) => (
            <ScrollReveal key={key} delay={i * 60}>
              <div className="nusuk-hover-card flex flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:text-start">
                <div className="nusuk-icon-box h-12 w-12 shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--nusuk-primary)]">{wt(lang, key)}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{wt(lang, `${key}.desc`)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
