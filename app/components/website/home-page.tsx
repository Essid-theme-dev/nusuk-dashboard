"use client";

import Link from "next/link";
import type { HomePageContent } from "@/app/features/cms/types";
import type { OmraPackage } from "@/app/features/omra/types";
import { wt } from "@/app/lib/i18n-website";
import { ScrollReveal } from "./animations/scroll-reveal";
import { SacredPlacesSection } from "./blocks/sacred-places";
import { TrustBadgesSection } from "./blocks/trust-badges";
import { AchievementsRow, FaqAccordion, GalleryGrid, PromoBanners } from "./blocks/gallery-faq-promo";
import { DestinationsCarousel } from "./blocks/destinations-carousel";
import { FeaturesGrid } from "./blocks/features-grid";
import { HeroCarousel } from "./blocks/hero-carousel";
import { NewsletterSection } from "./blocks/newsletter-section";
import { StatsSection } from "./blocks/stats-section";
import { TestimonialsCarousel, VideoSection } from "./blocks/video-testimonials";
import { OmraCard } from "./omra-card";
import { useWebsiteLanguage } from "./language-provider";

type HomePageClientProps = {
  packages: OmraPackage[];
  cms: HomePageContent;
};

export function HomePageClient({ packages, cms }: HomePageClientProps) {
  const { lang } = useWebsiteLanguage();
  const featured = packages.filter((p) => p.status === "available").slice(0, 6);

  return (
    <>
      <HeroCarousel slides={cms.heroSlides} />
      <StatsSection stats={cms.stats} />
      <TrustBadgesSection />

      <ScrollReveal>
        <FeaturesGrid features={cms.features} />
      </ScrollReveal>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="nusuk-section-glow absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="fade">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nusuk-accent)]">
                  {lang === "AR" ? "باقات خاصة" : "Forfaits spéciaux"}
                </span>
                <h2 className="nusuk-section-title">{wt(lang, "omra.title")}</h2>
                <p className="mt-2 max-w-xl text-zinc-500">{wt(lang, "omra.subtitle")}</p>
              </div>
              <Link
                href="/omra"
                className="nusuk-btn nusuk-btn-outline px-5 py-2.5"
              >
                {wt(lang, "omra.all")} →
              </Link>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((pkg, i) => (
              <ScrollReveal key={pkg.id} delay={i * 80}>
                <OmraCard pkg={pkg} featured={pkg.featured} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal><SacredPlacesSection /></ScrollReveal>
      <ScrollReveal><DestinationsCarousel destinations={cms.destinations} /></ScrollReveal>
      <ScrollReveal><VideoSection videos={cms.videos} /></ScrollReveal>
      <AchievementsRow achievements={cms.achievements} />
      <ScrollReveal><TestimonialsCarousel testimonials={cms.testimonials} /></ScrollReveal>
      <ScrollReveal><GalleryGrid images={cms.gallery} /></ScrollReveal>
      <ScrollReveal><FaqAccordion faqs={cms.faqs} /></ScrollReveal>
      <NewsletterSection />
      <PromoBanners promos={cms.promos} />
    </>
  );
}
