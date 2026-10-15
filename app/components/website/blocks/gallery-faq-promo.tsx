"use client";

import { ChevronDown, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Achievement, FaqItem, GalleryImage, PromoBanner } from "@/app/features/cms/types";
import Link from "next/link";
import { wtField } from "@/app/lib/i18n-website";
import { ImageLightbox } from "../ui/media-modal";
import { ScrollReveal } from "../animations/scroll-reveal";
import { useWebsiteLanguage } from "../language-provider";
import { clsx } from "clsx";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const { lang } = useWebsiteLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = useMemo(
    () =>
      images.map((img) => ({
        src: img.image,
        alt: img.captionFr ?? "",
        caption: lang === "AR" ? (img.captionAr ?? img.captionFr ?? "") : (img.captionFr ?? ""),
      })),
    [images, lang],
  );

  if (images.length === 0) return null;

  return (
    <>
      <section className="bg-[var(--nusuk-bg)] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="fade">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nusuk-accent)]">
                {lang === "AR" ? "معرض" : "Galerie"}
              </span>
              <h2 className="mt-2 text-3xl font-bold text-[var(--nusuk-primary)] sm:text-4xl">
                {lang === "AR" ? "معرض الصور" : "Galerie photos"}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-500">
                {lang === "AR" ? "انقر على أي صورة للتكبير" : "Cliquez sur une image pour l'agrandir"}
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
            {images.map((img, i) => (
              <ScrollReveal key={img.id} delay={i * 50}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="nuxem-row-anim group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--nusuk-accent)]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Image
                    src={img.image}
                    alt={img.captionFr ?? ""}
                    width={400}
                    height={300}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--nusuk-primary)]/0 transition-all group-hover:bg-[var(--nusuk-primary)]/40">
                    <span className="flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-[var(--nusuk-accent)] text-[var(--nusuk-primary)] opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                      <ZoomIn size={20} />
                    </span>
                  </div>
                  {(img.captionFr || img.captionAr) && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-xs text-white">{lang === "AR" ? img.captionAr : img.captionFr}</p>
                    </div>
                  )}
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const { lang } = useWebsiteLanguage();
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);
  if (faqs.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nusuk-accent)]">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold text-[var(--nusuk-primary)]">
            {lang === "AR" ? "الأسئلة الشائعة" : "Questions fréquentes"}
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((faq) => {
            const isOpen = open === faq.id;
            return (
              <div key={faq.id} className="overflow-hidden rounded-xl border border-[var(--nusuk-accent)]/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 bg-[var(--nusuk-bg)] px-5 py-4 text-start font-semibold text-[var(--nusuk-primary)]"
                >
                  {wtField(lang, faq, "questionFr", "questionAr")}
                  <ChevronDown size={18} className={clsx("shrink-0 transition-transform", isOpen && "rotate-180")} />
                </button>
                <div className={clsx("grid transition-all", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-zinc-600">
                      {wtField(lang, faq, "answerFr", "answerAr")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AchievementsRow({ achievements }: { achievements: Achievement[] }) {
  const { lang } = useWebsiteLanguage();
  if (achievements.length === 0) return null;

  return (
    <section className="border-y border-[var(--nusuk-accent)]/15 bg-[var(--nusuk-primary)] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <div key={a.id} className="rounded-xl border border-[var(--nusuk-accent)]/20 bg-[var(--nusuk-primary)] p-6 text-center">
              <p className="text-2xl font-bold text-[var(--nusuk-accent)]">{a.year}</p>
              <h3 className="mt-2 font-bold text-white">{wtField(lang, a, "titleFr", "titleAr")}</h3>
              <p className="mt-1 text-sm text-[var(--nusuk-muted)]/70">{wtField(lang, a, "orgFr", "orgAr")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PromoBanners({ promos }: { promos: PromoBanner[] }) {
  const { lang } = useWebsiteLanguage();
  if (promos.length === 0) return null;

  return (
    <>
      {promos.map((promo) => (
        <section
          key={promo.id}
          className={clsx(
            "relative overflow-hidden py-20",
            promo.style === "dark" ? "bg-[var(--nusuk-primary)]" : "bg-gradient-to-r from-[var(--nusuk-accent)] to-[var(--nusuk-accent-light)]",
          )}
        >
          {promo.image ? (
            <>
              <Image src={promo.image} alt="" fill className="object-cover opacity-20" />
              <div className="absolute inset-0 bg-[var(--nusuk-primary)]/60" />
            </>
          ) : null}
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className={clsx("text-3xl font-bold", promo.style === "dark" ? "text-white" : "text-[var(--nusuk-primary)]")}>
              {wtField(lang, promo, "titleFr", "titleAr")}
            </h2>
            {promo.subtitleFr ? (
              <p className={clsx("mt-4", promo.style === "dark" ? "text-[var(--nusuk-muted)]" : "text-[var(--nusuk-primary)]/80")}>
                {wtField(lang, promo, "subtitleFr", "subtitleAr")}
              </p>
            ) : null}
            <Link
              href={promo.ctaLink}
              className="mt-8 inline-flex rounded-full bg-[var(--nusuk-primary)] px-10 py-3.5 text-sm font-bold text-[var(--nusuk-accent)] shadow-lg hover:bg-black"
            >
              {lang === "AR" ? promo.ctaAr : promo.ctaFr}
            </Link>
          </div>
        </section>
      ))}
    </>
  );
}
