"use client";

import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { OmraPackage } from "@/app/features/omra/types";
import { wt, wtField } from "@/app/lib/i18n-website";
import { useWebsiteLanguage } from "./language-provider";
import { clsx } from "clsx";

type OmraCardProps = {
  pkg: OmraPackage;
  featured?: boolean;
};

export function OmraCard({ pkg, featured }: OmraCardProps) {
  const { lang } = useWebsiteLanguage();
  const title = wtField(lang, pkg, "titleFr", "titleAr");
  const remaining = pkg.maxPilgrims - pkg.registeredCount;
  const statusLabel = wt(lang, `omra.status.${pkg.status}`);

  return (
    <article className={clsx("nusuk-hover-card group", featured && "ring-1 ring-[var(--nusuk-accent)]/25")}>
      <div className="nusuk-img-zoom relative aspect-[16/10]">
        <Image
          src={pkg.image}
          alt={title}
          fill
          className="object-cover nusuk-img-inner"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {pkg.featured && (
          <span className="absolute start-3 top-3 rounded-full bg-[var(--nusuk-accent)] px-3 py-1 text-xs font-bold text-white">
            {wt(lang, "omra.featured")}
          </span>
        )}
        <span
          className={clsx(
            "absolute end-3 top-3 rounded-full px-3 py-1 text-xs font-semibold",
            pkg.status === "available" ? "bg-[var(--nusuk-accent)] text-white" : "bg-zinc-500 text-white",
          )}
        >
          {statusLabel}
        </span>
        <div className="absolute bottom-3 start-3 end-3">
          <h3 className="text-lg font-bold text-white drop-shadow">{title}</h3>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-[var(--nusuk-accent)]" />
            {pkg.durationDays} {wt(lang, "omra.days")}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} className="text-[var(--nusuk-accent)]" />
            {new Date(pkg.departureDate).toLocaleDateString(lang === "AR" ? "ar-TN" : "fr-TN")}
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} className="text-[var(--nusuk-accent)]" />
            {remaining} {wt(lang, "omra.places")}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-zinc-400">{wt(lang, "omra.from")}</p>
            <p className="text-2xl font-bold text-[var(--nusuk-primary)]">
              {pkg.price.toLocaleString(lang === "AR" ? "ar-TN" : "fr-TN")}{" "}
              <span className="text-sm font-medium text-zinc-500">{pkg.currency}</span>
            </p>
          </div>
          <Link
            href={`/omra/${pkg.slug}`}
            className="nusuk-btn nusuk-btn-dark px-4 py-2.5"
          >
            {wt(lang, "omra.viewDetails")}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function OmraDetailView({ pkg }: { pkg: OmraPackage }) {
  const { lang } = useWebsiteLanguage();
  const title = wtField(lang, pkg, "titleFr", "titleAr");
  const description = wtField(lang, pkg, "descriptionFr", "descriptionAr");
  const includes = lang === "AR" ? pkg.includesAr : pkg.includesFr;
  const remaining = pkg.maxPilgrims - pkg.registeredCount;

  return (
    <div className="nusuk-page-anim">
      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-3xl">
        <Image src={pkg.image} alt={title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--nusuk-primary)]/80 via-[var(--nusuk-primary)]/30 to-transparent" />
        <div className="absolute bottom-0 start-0 end-0 p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-[var(--nusuk-muted)]">{description}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section className="rounded-2xl border border-[var(--nusuk-accent)]/15 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[var(--nusuk-primary)]">{wt(lang, "omra.includes")}</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[var(--nusuk-accent)]/15 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[var(--nusuk-primary)]">{wt(lang, "omra.hotels")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[var(--nusuk-bg)] p-4">
                <p className="text-xs font-semibold uppercase text-[var(--nusuk-accent)]">{wt(lang, "omra.makkah")}</p>
                <p className="mt-1 flex items-start gap-2 text-sm text-zinc-700">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--nusuk-accent)]" />
                  {pkg.hotelMakkah}
                </p>
              </div>
              <div className="rounded-xl bg-[var(--nusuk-bg)] p-4">
                <p className="text-xs font-semibold uppercase text-[var(--nusuk-accent)]">{wt(lang, "omra.madinah")}</p>
                <p className="mt-1 flex items-start gap-2 text-sm text-zinc-700">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--nusuk-accent)]" />
                  {pkg.hotelMadinah}
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="sticky top-24 rounded-2xl border border-[var(--nusuk-accent)]/20 bg-gradient-to-b from-[var(--nusuk-bg)] to-white p-6 shadow-lg">
            <p className="text-sm text-zinc-500">{wt(lang, "omra.from")}</p>
            <p className="text-3xl font-bold text-[var(--nusuk-primary)]">
              {pkg.price.toLocaleString(lang === "AR" ? "ar-TN" : "fr-TN")}{" "}
              <span className="text-base font-medium text-zinc-500">{pkg.currency}</span>
            </p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-[var(--nusuk-accent)]/15 pb-2">
                <dt className="text-zinc-500">{wt(lang, "omra.duration")}</dt>
                <dd className="font-semibold">{pkg.durationDays} {wt(lang, "omra.days")}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--nusuk-accent)]/15 pb-2">
                <dt className="text-zinc-500">{wt(lang, "omra.departure")}</dt>
                <dd className="font-semibold">
                  {new Date(pkg.departureDate).toLocaleDateString(lang === "AR" ? "ar-TN" : "fr-TN")}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">{wt(lang, "omra.places")}</dt>
                <dd className="font-semibold text-[var(--nusuk-accent)]">{remaining}</dd>
              </div>
            </dl>

            <Link
              href="/contact"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-[var(--nusuk-primary)] py-3.5 text-sm font-bold text-[var(--nusuk-accent)] shadow-md hover:bg-[var(--nusuk-accent)] hover:text-[var(--nusuk-primary)]"
            >
              {wt(lang, "omra.book")}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
