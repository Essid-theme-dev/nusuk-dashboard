"use client";

import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Testimonial, VideoBlock } from "@/app/features/cms/types";
import { wtField } from "@/app/lib/i18n-website";
import { VideoModal } from "../ui/media-modal";
import { ScrollReveal } from "../animations/scroll-reveal";
import { useWebsiteLanguage } from "../language-provider";

export function VideoSection({ videos }: { videos: VideoBlock[] }) {
  const { lang } = useWebsiteLanguage();
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  if (videos.length === 0) return null;

  const video = videos[active];

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--nusuk-primary)] py-24 text-white">
        <div className="nusuk-section-glow absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nusuk-accent)]">
                {lang === "AR" ? "فيديو" : "Vidéo"}
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{wtField(lang, video, "titleFr", "titleAr")}</h2>
              {video.descFr ? (
                <p className="mt-4 leading-relaxed text-[var(--nusuk-muted)]/80">
                  {wtField(lang, video, "descFr", "descAr")}
                </p>
              ) : null}
              {videos.length > 1 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {videos.map((v, i) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                        i === active ? "bg-[var(--nusuk-accent)] text-[var(--nusuk-primary)]" : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {wtField(lang, v, "titleFr", "titleAr")}
                    </button>
                  ))}
                </div>
              ) : null}
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150}>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-[var(--nusuk-accent)]/30 shadow-2xl"
              >
                <Image
                  src={video.thumbnail || "https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=800&q=80"}
                  alt={video.titleFr}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[var(--nusuk-primary)]/40 transition-colors group-hover:bg-[var(--nusuk-primary)]/25" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--nusuk-accent)] text-[var(--nusuk-primary)] shadow-2xl transition-transform group-hover:scale-110 nusuk-pulse-play">
                    <Play size={32} fill="currentColor" className="ms-1" />
                  </span>
                </span>
                <span className="absolute bottom-4 start-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {lang === "AR" ? "▶ تشغيل الفيديو" : "▶ Lire la vidéo"}
                </span>
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <VideoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        videoUrl={video.videoUrl}
        title={wtField(lang, video, "titleFr", "titleAr")}
      />
    </>
  );
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const { lang } = useWebsiteLanguage();
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;

  const t = testimonials[index];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <ScrollReveal direction="fade">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nusuk-accent)]">
            {lang === "AR" ? "آراء العملاء" : "Témoignages"}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-[var(--nusuk-primary)] sm:text-4xl">
            {lang === "AR" ? "ماذا يقول عملاؤنا" : "Ce que disent nos clients"}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <blockquote className="nuxem-card-anim relative mt-10 overflow-hidden rounded-3xl border border-[var(--nusuk-accent)]/20 bg-gradient-to-b from-[var(--nusuk-bg)] to-white p-8 sm:p-12">
            <div className="absolute -end-4 -top-4 text-8xl font-serif text-[var(--nusuk-accent)]/10">&ldquo;</div>
            <div className="flex justify-center gap-1 text-[var(--nusuk-accent)]">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 italic">
              &ldquo;{wtField(lang, t, "textFr", "textAr")}&rdquo;
            </p>
            <footer className="mt-6 flex flex-col items-center gap-2">
              {t.avatar ? (
                <Image src={t.avatar} alt="" width={56} height={56} className="rounded-full border-2 border-[var(--nusuk-accent)]/30" />
              ) : null}
              <p className="font-bold text-[var(--nusuk-primary)]">{wtField(lang, t, "nameFr", "nameAr")}</p>
              {(t.locationFr || t.locationAr) && (
                <p className="text-sm text-zinc-400">{lang === "AR" ? t.locationAr : t.locationFr}</p>
              )}
            </footer>
          </blockquote>
        </ScrollReveal>
        {testimonials.length > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="rounded-full border border-[var(--nusuk-accent)]/30 p-2.5 text-[var(--nusuk-primary)] transition-colors hover:bg-[var(--nusuk-accent)] hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-[var(--nusuk-accent)]" : "w-2 bg-zinc-300"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="rounded-full border border-[var(--nusuk-accent)]/30 p-2.5 text-[var(--nusuk-primary)] transition-colors hover:bg-[var(--nusuk-accent)] hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
