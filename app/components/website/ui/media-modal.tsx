"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { clsx } from "clsx";

function toYoutubeEmbed(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
  }
  if (url.includes("youtube.com/embed/")) {
    return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
  }
  return null;
}

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
};

export function VideoModal({ open, onClose, videoUrl, title }: VideoModalProps) {
  const embed = toYoutubeEmbed(videoUrl);
  const isDirect = !embed && (videoUrl.endsWith(".mp4") || videoUrl.endsWith(".webm"));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md nusuk-modal-in"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Video"}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--nusuk-accent)]/30 bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute end-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-[var(--nusuk-accent)] hover:text-[var(--nusuk-primary)]"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="relative aspect-video w-full">
          {embed ? (
            <iframe
              src={embed}
              title={title ?? "Video"}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : isDirect ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video src={videoUrl} controls autoPlay className="h-full w-full object-contain" />
          ) : (
            <iframe src={videoUrl} title={title ?? "Video"} className="absolute inset-0 h-full w-full" allowFullScreen />
          )}
        </div>
        {title ? <p className="border-t border-white/10 px-5 py-3 text-sm text-[var(--nusuk-muted)]">{title}</p> : null}
      </div>
    </div>
  );
}

export type LightboxImage = { src: string; alt?: string; caption?: string };

type ImageLightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const open = index !== null && images[index];
  const current = index !== null ? images[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [images.length, index, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [images.length, index, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goPrev, goNext]);

  if (!open || !current) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-black/92 backdrop-blur-md nusuk-modal-in"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm text-[var(--nusuk-muted)]">
          {index! + 1} / {images.length}
          {current.caption ? <span className="ms-3 text-white">{current.caption}</span> : null}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[var(--nusuk-accent)] hover:text-[var(--nusuk-primary)]"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 ? (
          <button
            type="button"
            onClick={goPrev}
            className="absolute start-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-[var(--nusuk-accent)] hover:text-[var(--nusuk-primary)] sm:start-6"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
        ) : null}

        <div className="relative max-h-[75vh] w-full max-w-5xl">
          <Image
            src={current.src}
            alt={current.alt ?? ""}
            width={1400}
            height={900}
            className="mx-auto max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl"
            priority
          />
        </div>

        {images.length > 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="absolute end-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-[var(--nusuk-accent)] hover:text-[var(--nusuk-primary)] sm:end-6"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex justify-center gap-2 overflow-x-auto px-4 pb-4" onClick={(e) => e.stopPropagation()}>
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onNavigate(i)}
              className={clsx(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                i === index ? "border-[var(--nusuk-accent)] scale-105" : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
