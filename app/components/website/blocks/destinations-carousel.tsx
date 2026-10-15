"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Destination } from "@/app/features/cms/types";
import { wtField } from "@/app/lib/i18n-website";
import { useWebsiteLanguage } from "../language-provider";

export function DestinationsCarousel({ destinations }: { destinations: Destination[] }) {
  const { lang } = useWebsiteLanguage();
  const [start, setStart] = useState(0);
  const visible = 4;
  if (destinations.length === 0) return null;

  const canPrev = start > 0;
  const canNext = start + visible < destinations.length;

  return (
    <section className="bg-[var(--nusuk-bg)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--nusuk-accent)]">
              {lang === "AR" ? "وجهات مقدسة" : "Destinations sacrées"}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[var(--nusuk-primary)]">
              {lang === "AR" ? "اكتشف أماكن رحلتك" : "Découvrez vos lieux de voyage"}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setStart((s) => Math.max(0, s - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--nusuk-accent)]/30 disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStart((s) => s + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--nusuk-accent)]/30 disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(start, start + visible).map((d) => (
            <Link
              key={d.id}
              href={d.link ?? "/omra"}
              className="nusuk-hover-card group relative block aspect-[3/4]"
            >
              <div className="nusuk-img-zoom absolute inset-0">
                <Image
                  src={d.image}
                  alt={wtField(lang, d, "nameFr", "nameAr")}
                  fill
                  className="object-cover nusuk-img-inner"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--nusuk-primary)]/90 via-[var(--nusuk-primary)]/20 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="text-lg font-bold text-white">{wtField(lang, d, "nameFr", "nameAr")}</h3>
                {d.tourCount > 0 ? (
                  <p className="mt-1 text-sm text-[var(--nusuk-accent-light)]">
                    {d.tourCount} {lang === "AR" ? "باقة" : "forfaits"}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
