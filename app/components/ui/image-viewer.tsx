"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type ImageViewerItem = {
  src: string;
  alt: string;
};

type ImageViewerProps = {
  items: ImageViewerItem[];
  index: number;
  onIndexChange: (nextIndex: number) => void;
  onClose: () => void;
};

export function ImageViewer({ items, index, onIndexChange, onClose }: ImageViewerProps) {
  const safeIndex = Math.max(0, Math.min(index, items.length - 1));
  const [zoom, setZoom] = useState(1);

  const current = useMemo(() => items[safeIndex], [items, safeIndex]);

  useEffect(() => {
    setZoom(1);
  }, [safeIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && safeIndex > 0) onIndexChange(safeIndex - 1);
      if (e.key === "ArrowRight" && safeIndex < items.length - 1) onIndexChange(safeIndex + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onIndexChange, safeIndex, items.length]);

  const canPrev = safeIndex > 0;
  const canNext = safeIndex < items.length - 1;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/55 px-4 py-6">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-zinc-100 hover:bg-black/55"
          aria-label="Close image viewer"
          title="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
          <div className="text-sm font-semibold text-zinc-200">
            {safeIndex + 1} / {items.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-xl border border-white/10 bg-black/40 px-3 text-sm font-semibold text-zinc-100 hover:bg-black/55"
              onClick={() => setZoom((z) => Math.max(1, Math.round((z - 0.2) * 10) / 10))}
              aria-label="Zoom out"
              title="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-xl border border-white/10 bg-black/40 px-3 text-sm font-semibold text-zinc-100 hover:bg-black/55"
              onClick={() => setZoom((z) => Math.min(2.5, Math.round((z + 0.2) * 10) / 10))}
              aria-label="Zoom in"
              title="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
          </div>
        </div>

        <div className="relative aspect-[16/9] w-full bg-black">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            priority
            className="object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>

        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => canPrev && onIndexChange(safeIndex - 1)}
            className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-zinc-200 hover:bg-black/45 disabled:opacity-40"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
          <button
            type="button"
            disabled={!canNext}
            onClick={() => canNext && onIndexChange(safeIndex + 1)}
            className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-zinc-200 hover:bg-black/45 disabled:opacity-40"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

