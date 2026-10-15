"use client";

import type { OmraPackage } from "@/app/features/omra/types";
import { wt } from "@/app/lib/i18n-website";
import { ScrollReveal } from "./animations/scroll-reveal";
import { OmraCard } from "./omra-card";
import { PageHero } from "./page-hero";
import { useWebsiteLanguage } from "./language-provider";

export function OmraListPageClient({ packages }: { packages: OmraPackage[] }) {
  const { lang } = useWebsiteLanguage();

  return (
    <>
      <PageHero
        badge={lang === "AR" ? "باقات العمرة" : "Forfaits Omra"}
        title={wt(lang, "omra.title")}
        subtitle={wt(lang, "omra.subtitle")}
        image="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&q=80"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 60}>
              <OmraCard pkg={pkg} featured={pkg.featured} />
            </ScrollReveal>
          ))}
        </div>
        {packages.length === 0 && (
          <p className="mt-12 text-center text-zinc-400">{wt(lang, "omra.all")}</p>
        )}
      </div>
    </>
  );
}
