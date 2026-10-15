"use client";

import Image from "next/image";
import Link from "next/link";
import { SACRED_IMAGES } from "@/app/lib/theme";
import { wt } from "@/app/lib/i18n-website";
import { ScrollReveal } from "../animations/scroll-reveal";
import { useWebsiteLanguage } from "../language-provider";

const sacredPlaces = [
  { image: SACRED_IMAGES.kaaba, titleKey: "sacred.kaaba", descKey: "sacred.kaaba.desc" },
  { image: SACRED_IMAGES.makkah, titleKey: "sacred.makkah", descKey: "sacred.makkah.desc" },
  { image: SACRED_IMAGES.madinah, titleKey: "sacred.madinah", descKey: "sacred.madinah.desc" },
  { image: SACRED_IMAGES.haram, titleKey: "sacred.tawaf", descKey: "sacred.tawaf.desc" },
] as const;

export function SacredPlacesSection() {
  const { lang } = useWebsiteLanguage();

  return (
    <section className="bg-[var(--nusuk-bg)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="fade">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nusuk-accent)]">
              {wt(lang, "sacred.badge")}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[var(--nusuk-primary)] sm:text-4xl">
              {wt(lang, "sacred.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-600">{wt(lang, "sacred.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sacredPlaces.map(({ image, titleKey, descKey }, i) => (
            <ScrollReveal key={titleKey} delay={i * 80}>
              <article className="nusuk-hover-card group overflow-hidden">
                <div className="nusuk-img-zoom relative aspect-[4/3]">
                  <Image
                    src={image}
                    alt={wt(lang, titleKey)}
                    fill
                    className="object-cover nusuk-img-inner"
                    sizes="(max-width:768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--nusuk-primary)]/80 via-transparent to-transparent" />
                  <h3 className="absolute bottom-4 start-4 end-4 text-lg font-bold text-white">
                    {wt(lang, titleKey)}
                  </h3>
                </div>
                <p className="p-4 text-sm leading-relaxed text-zinc-600">{wt(lang, descKey)}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 text-center">
          <Link
            href="/omra"
            className="nusuk-btn nusuk-btn-primary px-8 py-3"
          >
            {wt(lang, "hero.cta")} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
