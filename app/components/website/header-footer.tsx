"use client";

import { Globe, Mail, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/app/components/brand/logo";
import { useAgencySettings } from "@/app/components/website/agency-settings-provider";
import { wt } from "@/app/lib/i18n-website";
import { clsx } from "clsx";
import { useWebsiteLanguage } from "./language-provider";

const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/omra", key: "nav.omra" },
  { href: "/contact", key: "nav.contact" },
];

export function WebsiteHeader() {
  const { lang, setLang } = useWebsiteLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const settings = useAgencySettings();
  const logoSrc = settings.logoUrl ?? "/logo.jpg";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="hidden border-b border-[var(--nusuk-border)] bg-[var(--nusuk-primary)] sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 text-xs text-white/80 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a href={`tel:${settings.phone}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--nusuk-accent-light)]" dir="ltr">
              <Phone size={12} className="text-[var(--nusuk-accent)]" />
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--nusuk-accent-light)]">
              <Mail size={12} className="text-[var(--nusuk-accent)]" />
              {settings.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            {settings.facebookUrl ? (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--nusuk-accent-light)]">
                <Globe size={14} />
              </a>
            ) : null}
            <span className="text-[var(--nusuk-accent)]/60">|</span>
            <button type="button" onClick={() => setLang("FR")} className={clsx(lang === "FR" && "font-bold text-[var(--nusuk-accent)]")}>FR</button>
            <button type="button" onClick={() => setLang("AR")} className={clsx(lang === "AR" && "font-bold text-[var(--nusuk-accent)]")}>ع</button>
          </div>
        </div>
      </div>

      <header
        className={clsx(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[var(--nusuk-border)] bg-white/98 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "border-b border-[var(--nusuk-border)] bg-white backdrop-blur-xl",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0 transition-transform hover:scale-[1.02]">
            <LogoMark width={130} height={40} src={logoSrc} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "nusuk-nav-link",
                  pathname === link.href && "is-active",
                )}
              >
                {wt(lang, link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/omra"
              className="nusuk-btn nusuk-btn-primary hidden px-6 py-2.5 sm:inline-flex"
            >
              {lang === "AR" ? "احجز عمرتك" : "Réserver Omra"}
            </Link>

            <div className="flex items-center rounded-full border border-[var(--nusuk-accent)]/30 bg-[var(--nusuk-bg)] p-0.5 sm:hidden">
              <button
                type="button"
                onClick={() => setLang("FR")}
                className={clsx(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  lang === "FR" ? "bg-[var(--nusuk-primary)] text-[var(--nusuk-accent)]" : "text-[var(--nusuk-primary)]",
                )}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang("AR")}
                className={clsx(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  lang === "AR" ? "bg-[var(--nusuk-primary)] text-[var(--nusuk-accent)]" : "text-[var(--nusuk-primary)]",
                )}
              >
                ع
              </button>
            </div>

            <button
              type="button"
              className="rounded-lg p-2 text-zinc-600 hover:bg-[var(--nusuk-bg)] lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-[var(--nusuk-accent)]/15 bg-white px-4 py-4 lg:hidden nusuk-modal-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    pathname === link.href ? "bg-[var(--nusuk-bg)] text-[var(--nusuk-primary)]" : "text-zinc-600",
                  )}
                >
                  {wt(lang, link.key)}
                </Link>
              ))}
              <Link
                href="/omra"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-[var(--nusuk-accent)] px-4 py-3 text-center text-sm font-bold text-[var(--nusuk-primary)]"
              >
                {lang === "AR" ? "احجز عمرتك" : "Réserver Omra"}
              </Link>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}

export function WebsiteFooter() {
  const { lang } = useWebsiteLanguage();
  const settings = useAgencySettings();
  const address = lang === "AR" ? settings.addressAr : settings.addressFr;
  const tagline = lang === "AR" ? settings.taglineAr : settings.taglineFr;
  const logoSrc = settings.logoUrl ?? "/logo.jpg";

  return (
    <footer className="border-t border-[var(--nusuk-accent)]/10 bg-gradient-to-b from-[var(--nusuk-primary)] to-[var(--nusuk-primary-dark)] text-[var(--nusuk-muted)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <LogoMark width={140} height={42} variant="white" src={logoSrc} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--nusuk-muted)]/80">
              {tagline ?? wt(lang, "footer.tagline")}
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--nusuk-accent)]" dir="rtl">
              {settings.nameAr}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--nusuk-accent)]">
              {wt(lang, "footer.links")}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--nusuk-muted)]/80 transition-colors hover:text-white hover:translate-x-0.5 inline-block">
                    {wt(lang, link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admin" className="text-sm text-[var(--nusuk-muted)]/50 hover:text-[var(--nusuk-accent)]">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--nusuk-accent)]">
              {lang === "AR" ? "وجهات" : "Destinations"}
            </h3>
            <ul className="space-y-2.5 text-sm text-[var(--nusuk-muted)]/80">
              <li>{lang === "AR" ? "مكة المكرمة" : "La Mecque"}</li>
              <li>{lang === "AR" ? "المدينة المنورة" : "Médine"}</li>
              <li>{lang === "AR" ? "جدة" : "Jeddah"}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--nusuk-accent)]">
              {wt(lang, "footer.contact")}
            </h3>
            <ul className="space-y-2.5 text-sm text-[var(--nusuk-muted)]/80">
              <li>{address}</li>
              <li dir="ltr">
                <a href={`tel:${settings.phone}`} className="hover:text-[var(--nusuk-accent)]">{settings.phone}</a>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-[var(--nusuk-accent)]">{settings.email}</a>
              </li>
            </ul>
            <h3 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--nusuk-accent)]">
              {wt(lang, "footer.follow")}
            </h3>
            {settings.facebookUrl ? (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--nusuk-accent)]/30 px-4 py-2 text-sm text-[var(--nusuk-muted)]/80 transition-colors hover:border-[var(--nusuk-accent)] hover:text-white"
              >
                <Globe size={16} />
                Facebook
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--nusuk-accent)]/20 pt-8 sm:flex-row">
          <p className="text-xs text-[var(--nusuk-muted)]/50">
            © {new Date().getFullYear()} Nusuk — {wt(lang, "footer.rights")}
          </p>
          <div className="flex gap-6 text-xs text-[var(--nusuk-muted)]/40">
            <Link href="/contact" className="hover:text-[var(--nusuk-accent)]">
              {lang === "AR" ? "سياسة الخصوصية" : "Confidentialité"}
            </Link>
            <Link href="/contact" className="hover:text-[var(--nusuk-accent)]">
              {lang === "AR" ? "الشروط" : "Conditions"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
