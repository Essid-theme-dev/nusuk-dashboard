"use client";

import Image from "next/image";
import { ScrollReveal } from "./animations/scroll-reveal";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  image?: string;
};

export function PageHero({ title, subtitle, badge, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--nusuk-primary)] py-20 sm:py-28">
      {image ? (
        <>
          <Image src={image} alt="" fill className="object-cover opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--nusuk-primary)]/80 via-[var(--nusuk-primary)]/60 to-[var(--nusuk-primary)]" />
        </>
      ) : (
        <div className="nusuk-section-glow absolute inset-0" />
      )}
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal direction="fade">
          {badge ? (
            <span className="inline-flex rounded-full border border-[var(--nusuk-accent)]/40 bg-[var(--nusuk-accent)]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--nusuk-accent-light)]">
              {badge}
            </span>
          ) : null}
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">{title}</h1>
          {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--nusuk-muted)]/90">{subtitle}</p> : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
