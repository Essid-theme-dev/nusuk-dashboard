"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { HeroSlide } from "@/app/features/cms/types";
import { wtField } from "@/app/lib/i18n-website";
import { VideoModal } from "../ui/media-modal";
import { HeroSearchBar } from "./hero-search-bar";
import { useWebsiteLanguage } from "../language-provider";
import { clsx } from "clsx";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const { lang } = useWebsiteLanguage();
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const go = useCallback(
    (next: number) => {
      if (animating || slides.length === 0) return;
      setAnimating(true);
      setIndex((next + slides.length) % slides.length);
      setTimeout(() => setAnimating(false), 600);
    },
    [animating, slides.length],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => go(index + 1), 7000);
    return () => clearInterval(timer);
  }, [index, go, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[index];
  const title = wtField(lang, slide, "titleFr", "titleAr");
  const subtitle = wtField(lang, slide, "subtitleFr", "subtitleAr");
  const badge = lang === "AR" ? slide.badgeAr : slide.badgeFr;
  const cta = lang === "AR" ? slide.ctaLabelAr : slide.ctaLabelFr;

  return (
    <>
      <section className="relative h-[min(92vh,820px)] overflow-hidden bg-[var(--nusuk-primary)]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={clsx(
              "absolute inset-0 transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <Image src={s.image} alt="" fill className="object-cover nusuk-hero-pan" priority={i === 0} sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--nusuk-primary)]/95 via-[var(--nusuk-primary)]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--nusuk-primary)]/80 via-transparent to-[var(--nusuk-primary)]/30" />
          </div>
        ))}

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className={clsx("max-w-2xl transition-all duration-700", animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
            {badge ? (
              <span className="inline-flex rounded-full border border-[var(--nusuk-accent)]/40 bg-[var(--nusuk-accent)]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--nusuk-accent-light)] nusuk-shimmer">
                {badge}
              </span>
            ) : null}
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--nusuk-muted)]/90">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={slide.ctaLink}
                className="nusuk-btn nusuk-btn-primary px-8 py-3.5 shadow-lg"
              >
                {cta}
              </Link>
              {slide.videoUrl ? (
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--nusuk-accent)] text-[var(--nusuk-primary)] nusuk-pulse-play">
                    <Play size={14} fill="currentColor" />
                  </span>
                  {lang === "AR" ? "شاهد الفيديو" : "Voir la vidéo"}
                </button>
              ) : null}
            </div>
            <HeroSearchBar />
          </div>
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute start-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur hover:bg-[var(--nusuk-accent)] hover:text-[var(--nusuk-primary)] lg:start-8"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute end-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur hover:bg-[var(--nusuk-accent)] hover:text-[var(--nusuk-primary)] lg:end-8"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-8 start-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  className={clsx(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-8 bg-[var(--nusuk-accent)]" : "w-2 bg-white/40 hover:bg-white/70",
                  )}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </section>

      {slide.videoUrl ? (
        <VideoModal
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoUrl={slide.videoUrl}
          title={title}
        />
      ) : null}
    </>
  );
}
