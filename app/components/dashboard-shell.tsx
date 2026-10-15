"use client";

import { Bell, CheckCheck, ChevronDown, ChevronRight, LogOut, Maximize2, Menu, Minimize2, Moon, Palette, PanelLeftClose, PanelLeftOpen, Search, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { LogoLockup } from "@/app/components/brand/logo";
import { demoAvatars } from "@/app/lib/demo-avatars";
import { PageTabs } from "@/app/components/layout/page-tabs";
import { getTabGroupForPath, navSections, resolvePageMeta } from "@/app/config/navigation";
import { t } from "@/app/lib/i18n";
import { APP_LANGUAGE_EVENT, applyLanguage, readLanguage, type AppLanguage } from "@/app/lib/language";

type DashboardShellProps = {
  children: React.ReactNode;
};

type AccentTheme = "violet" | "blue" | "emerald" | "rose" | "amber" | "cyan" | "slate" | "fuchsia" | "lime";

const accentThemes: Array<{ id: AccentTheme; color: string }> = [
  { id: "violet", color: "#7c3aed" },
  { id: "blue", color: "#3b82f6" },
  { id: "emerald", color: "#10b981" },
  { id: "rose", color: "#f43f5e" },
  { id: "amber", color: "#f59e0b" },
  { id: "cyan", color: "#06b6d4" },
  { id: "slate", color: "#64748b" },
  { id: "fuchsia", color: "#d946ef" },
  { id: "lime", color: "#84cc16" },
];

const marketingTeamAvatars = [
  { src: demoAvatars.sophieEvans, name: "Sophie Evans" },
  { src: demoAvatars.linaPorter, name: "Lina Porter" },
  { src: demoAvatars.masonClark, name: "Mason Clark" },
];

export default function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState<AppLanguage>("FR");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [accentTheme, setAccentTheme] = useState<AccentTheme>("emerald");
  const [showAccentMenu, setShowAccentMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showTopNotice, setShowTopNotice] = useState(true);
  const [topNoticeProgress, setTopNoticeProgress] = useState(0);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const accentMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState([
    "New comment on Orbit rollout.",
    "Build #128 deployed successfully.",
    "2 tasks are overdue this week.",
  ]);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navSections.forEach((s) => {
      initial[s.id] = true;
    });
    return initial;
  });

  const header = resolvePageMeta(pathname);
  const siblingTabs = getTabGroupForPath(pathname);

  const flatItems = useMemo(() => navSections.flatMap((s) => s.items), []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const shouldUseDark = savedTheme ? savedTheme === "dark" : true;

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    const storedAccent = window.localStorage.getItem("accent-theme");
    const initialAccent: AccentTheme = accentThemes.some((item) => item.id === storedAccent)
      ? (storedAccent as AccentTheme)
      : "emerald";
    setAccentTheme(initialAccent);
    document.documentElement.setAttribute("data-accent-theme", initialAccent);
    const initialLanguage = readLanguage();
    setLanguage(initialLanguage);
    applyLanguage(initialLanguage);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.email) setAdminUser({ name: data.name, email: data.email });
      })
      .catch(() => undefined);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const userInitials = adminUser?.name
    ? adminUser.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AD";

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    sync();
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<AppLanguage>;
      if (custom.detail === "FR" || custom.detail === "AR") {
        setLanguage(custom.detail);
      }
    };
    window.addEventListener(APP_LANGUAGE_EVENT, handler);
    return () => window.removeEventListener(APP_LANGUAGE_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!showTopNotice) return;
    const timer = window.setInterval(() => {
      setTopNoticeProgress((prev) => {
        const next = Math.min(prev + 8, 100);
        return next;
      });
    }, 70);
    return () => window.clearInterval(timer);
  }, [showTopNotice]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setShowLangMenu(false);
      }
      if (accentMenuRef.current && !accentMenuRef.current.contains(target)) {
        setShowAccentMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDarkMode;
    setIsDarkMode(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  const selectAccentTheme = (nextTheme: AccentTheme) => {
    setAccentTheme(nextTheme);
    document.documentElement.setAttribute("data-accent-theme", nextTheme);
    window.localStorage.setItem("accent-theme", nextTheme);
    setShowAccentMenu(false);
  };

  useEffect(() => {
    navSections.forEach((section) => {
      const activeHere = section.items.some(
        (item) =>
          item.href !== "#" &&
          (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))),
      );
      if (activeHere) setOpenSections((prev) => ({ ...prev, [section.id]: true }));
    });
  }, [pathname]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  const toggleSection = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const linkActive = (href: string) =>
    href !== "#" && (pathname === href || (href !== "/admin" && pathname.startsWith(href)));

  return (
    <div className="dashboard-canvas-bg flex min-h-screen overflow-x-hidden text-slate-900 dark:text-zinc-100 lg:h-screen lg:overflow-y-hidden lg:overflow-x-visible">
      {mobileNavOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px] lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}
      <aside
        className={`fixed left-3 top-3 z-50 flex h-[calc(100vh-24px)] w-[280px] flex-shrink-0 flex-col overflow-visible rounded-[24px] border border-[var(--sidebar-shell-border)] bg-gradient-to-b from-[var(--sidebar-shell-bg-from)] via-[var(--sidebar-shell-bg-via)] to-[var(--sidebar-shell-bg-to)] text-[var(--sidebar-shell-text)] shadow-[0_26px_64px_-22px_var(--theme-accent-shadow)] transition-transform duration-300 dark:border-[var(--sidebar-shell-border)] dark:from-[var(--sidebar-shell-bg-from)] dark:via-[var(--sidebar-shell-bg-via)] dark:to-[var(--sidebar-shell-bg-to)] dark:shadow-black/80 lg:relative lg:left-auto lg:top-auto lg:z-auto lg:m-[18px] lg:h-[calc(100vh-36px)] lg:transition-[width] ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"
        } ${
          collapsed ? "lg:w-[86px]" : "lg:w-[280px]"
        }`}
      >
        <header
          className={`border-b border-[var(--sidebar-shell-border)] dark:border-[var(--sidebar-shell-border)] ${
            collapsed ? "flex flex-col items-center gap-3 px-2 py-4" : "flex items-center justify-between px-5 py-[18px]"
          }`}
        >
          <LogoLockup collapsed={collapsed} />
          <div className="group relative hidden lg:block">
            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              className="inline-flex size-11 items-center justify-center rounded-xl border border-[var(--sidebar-shell-border)] bg-black/20 text-[var(--sidebar-shell-text)] shadow-[0_2px_8px_rgba(0,0,0,0.35)] hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-ink)] dark:border-[var(--sidebar-shell-border)] dark:bg-black/20 dark:text-[var(--sidebar-shell-text)] dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)]"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? <PanelLeftOpen className="size-[18px]" /> : <PanelLeftClose className="size-[18px]" />}
            </button>
            {collapsed ? (
              <span className="pointer-events-none absolute left-full top-1/2 z-30 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold text-zinc-700 shadow-lg group-hover:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                Expand sidebar
              </span>
            ) : null}
          </div>
        </header>

        <nav
          className={`no-scrollbar flex flex-1 flex-col gap-1 px-3 pb-3 pt-2 ${
            collapsed ? "overflow-visible" : "overflow-y-auto overflow-x-hidden"
          }`}
        >
          {!collapsed ? (
            navSections.map((section) => {
              const sectionOpen = openSections[section.id] ?? true;
              const SectionChevron = sectionOpen ? ChevronDown : ChevronRight;
              return (
                <div key={section.id} className="pb-4">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="mb-2 flex w-full items-center gap-2 rounded-xl border border-transparent px-2.5 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sidebar-shell-muted)] hover:border-[var(--sidebar-shell-border)] hover:bg-[var(--sidebar-shell-hover)] hover:text-[var(--sidebar-shell-text)] dark:text-[var(--sidebar-shell-muted)] dark:hover:border-[var(--sidebar-shell-border)] dark:hover:bg-[var(--sidebar-shell-hover)] dark:hover:text-[var(--sidebar-shell-text)]"
                  >
                    <SectionChevron className="size-4 shrink-0 opacity-85" aria-hidden />
                    <span className="min-w-0 flex-1">{t(language, section.title)}</span>
                  </button>
                  <ul className={`space-y-0.5 pl-1 ${sectionOpen ? "" : "hidden"}`}>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = linkActive(item.href);

                      return (
                        <li key={`${section.id}-${item.href}`}>
                          <Link
                            href={item.href}
                            prefetch={false}
                            className={`group relative flex items-center gap-3 rounded-xl border px-3.5 py-[10px] text-[13px] font-semibold leading-tight tracking-tight transition-all ${
                              active
                                ? "border-[var(--theme-accent-soft)] bg-gradient-to-r from-zinc-800 to-zinc-800 text-zinc-50 shadow-[0_12px_30px_-22px_var(--theme-accent-shadow)] ring-1 ring-[var(--theme-accent-ring)] dark:border-[var(--theme-accent-soft)] dark:bg-gradient-to-r dark:from-zinc-800 dark:to-zinc-800 dark:text-zinc-50 dark:ring-[var(--theme-accent-ring)]"
                                : "border-transparent text-[var(--sidebar-shell-muted)] hover:border-[var(--sidebar-shell-border)] hover:bg-[var(--sidebar-shell-hover)] hover:text-[var(--sidebar-shell-text)] dark:text-[var(--sidebar-shell-muted)] dark:hover:border-[var(--sidebar-shell-border)] dark:hover:bg-[var(--sidebar-shell-hover)] dark:hover:text-[var(--sidebar-shell-text)]"
                            }`}
                          >
                            <Icon
                              size={18}
                              strokeWidth={1.95}
                              className={
                                active
                                  ? "text-[var(--theme-accent-ink)] dark:text-[var(--theme-accent-ink)]"
                                  : "text-[var(--sidebar-shell-muted)] group-hover:text-[var(--sidebar-shell-text)] dark:text-[var(--sidebar-shell-muted)] dark:group-hover:text-[var(--sidebar-shell-text)]"
                              }
                              aria-hidden
                            />
                            <span className="min-w-0 flex-1">{t(language, item.label)}</span>
                            {active ? (
                              <span className="absolute right-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[var(--theme-accent)] shadow-[0_0_0_4px_var(--theme-accent-ring)] dark:bg-[var(--theme-accent)]" />
                            ) : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          ) : (
            <ul className="flex flex-col items-center gap-2 pb-2 pt-1">
              {flatItems.map((item) => {
                const Icon = item.icon;
                const active = linkActive(item.href);
                return (
                  <li key={`${item.label}-${item.href}`} className="group relative">
                    <Link
                      href={item.href}
                      prefetch={false}
                      aria-label={item.label}
                      title={t(language, item.label)}
                      className={`grid size-[46px] place-items-center rounded-2xl border transition-all ${
                        active
                          ? "border-[var(--theme-accent-soft)] bg-zinc-800 text-[var(--theme-accent-ink)] shadow-[0_12px_30px_-20px_var(--theme-accent-shadow)] ring-2 ring-[var(--theme-accent-ring)] dark:bg-zinc-800 dark:text-[var(--theme-accent-ink)] dark:ring-[var(--theme-accent-ring)]"
                          : "border-transparent text-[var(--sidebar-shell-muted)] hover:border-[var(--sidebar-shell-border)] hover:bg-[var(--sidebar-shell-hover)] hover:text-[var(--sidebar-shell-text)] dark:border-transparent dark:text-[var(--sidebar-shell-muted)] dark:hover:border-[var(--sidebar-shell-border)] dark:hover:bg-[var(--sidebar-shell-hover)] dark:hover:text-[var(--sidebar-shell-text)]"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.95} />
                    </Link>
                    {collapsed ? (
                      <span className="pointer-events-none absolute left-full top-1/2 z-30 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold text-zinc-700 shadow-lg group-hover:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                        {t(language, item.label)}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        <div
          className={`mt-auto border-t border-[var(--sidebar-shell-border)] dark:border-[var(--sidebar-shell-border)] ${collapsed ? "flex flex-col items-center gap-2 px-3 py-4" : "px-5 py-4"}`}
        >
          <div className={`flex items-center ${collapsed ? "flex-col gap-2" : "gap-3"}`}>
          <div className="relative flex size-[42px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-fill-from)] to-[var(--brand-fill-to)] text-sm font-bold text-white shadow-md ring-4 ring-white/35 dark:ring-white/10">
            {userInitials}
          </div>
          {!collapsed ? (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold text-[var(--sidebar-shell-text)]">
                {adminUser?.name ?? "Admin"}
              </p>
              <p className="truncate text-xs font-medium text-[var(--sidebar-shell-muted)]" dir="ltr">
                {adminUser?.email ?? "—"}
              </p>
            </div>
          ) : null}
          </div>
          <div className="group relative">
            <button
              type="button"
              onClick={handleLogout}
              className={`mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/85 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-ink)] ${
                collapsed ? "h-10 w-10 p-0" : "w-full"
              }`}
              aria-label={t(language, "Logout")}
              title={t(language, "Logout")}
            >
              <LogOut size={16} />
              {!collapsed ? <span>{t(language, "Logout")}</span> : null}
            </button>
            {collapsed ? (
              <span className="pointer-events-none absolute left-full top-[60%] z-30 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold text-zinc-700 shadow-lg group-hover:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                Logout
              </span>
            ) : null}
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-2 pb-[12px] pt-[12px] sm:pb-[16px] sm:pt-[16px] lg:pr-6 lg:pb-[18px] lg:pt-[18px] lg:pl-2">
        {showTopNotice ? (
          <div className="pointer-events-none fixed right-4 top-4 z-[70] w-[calc(100vw-2rem)] max-w-[360px] sm:right-6 sm:top-6">
            <div className="pointer-events-auto w-full overflow-hidden rounded-2xl border border-[var(--theme-accent-soft)] bg-gradient-to-r from-[var(--theme-accent-bg)] via-white to-white shadow-[0_16px_34px_-22px_var(--theme-accent-shadow)] dark:from-[var(--theme-accent-bg-dark)] dark:via-zinc-900 dark:to-zinc-900">
              <div className="h-1.5 w-full bg-zinc-200/90 dark:bg-zinc-700">
                <div
                  className="h-full rounded-r-full bg-gradient-to-r from-[var(--brand-fill-from)] to-[var(--brand-fill-to)] transition-[width] duration-150"
                  style={{ width: `${topNoticeProgress}%` }}
                />
              </div>
              <div className="flex items-start gap-3 p-3.5">
                <div className="relative mt-0.5 size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/70 dark:ring-zinc-800">
                  <Image src={demoAvatars.emma} alt="Emma avatar" fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]">
                      Project notification
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-300">
                    Emma added a new task to Backlog. Team sync update is now visible on the project board.
                  </p>
                </div>
                {topNoticeProgress >= 100 ? (
                  <button
                    type="button"
                    onClick={() => setShowTopNotice(false)}
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/90 text-zinc-500 hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)]"
                    aria-label="Close notification"
                  >
                    <X size={14} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <header className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-slate-200/85 bg-[var(--sidebar-surface)] px-4 py-[12px] shadow-[0_16px_50px_-42px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-zinc-950/62 sm:px-5 sm:py-[13px] lg:mb-5 lg:px-7 lg:py-[14px]">
          <div className="min-w-[200px]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="inline-flex size-9 items-center justify-center rounded-xl border border-slate-200/95 bg-white/95 text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.05)] hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)] lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu size={17} />
              </button>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                {t(language, header.title)}
              </h1>
              <span className="hidden rounded-full border border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--theme-accent-deep)] lg:inline-flex dark:border-[var(--theme-accent-soft)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]">
                {t(language, "Live")}
              </span>
            </div>
            <p className="mt-1 max-w-xl text-[13px] font-medium leading-relaxed text-slate-600 dark:text-zinc-400">
              {t(language, header.subtitle)}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Marketing Team</p>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {marketingTeamAvatars.map((member) => (
                    <div
                      key={member.src}
                      className="group relative h-7 w-7 overflow-visible"
                    >
                      <div className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white shadow-sm dark:border-zinc-900">
                        <Image src={member.src} alt={member.name} fill className="object-cover" />
                      </div>
                      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-lg group-hover:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                        {member.name}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="group relative ml-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  +3
                  <span className="pointer-events-none absolute -top-8 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-lg group-hover:block dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                    3 more teammates
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex shrink-0 items-center gap-2 sm:gap-2.5">
            <div className="relative hidden md:block md:w-[250px]">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400 dark:text-zinc-500"
                aria-hidden
              />
              <input
                type="search"
                placeholder={t(language, "Search dashboards, routes…")}
                className="h-11 w-full rounded-2xl border border-slate-200/95 bg-white/95 pl-[44px] pr-4 text-sm font-medium outline-none placeholder:font-normal placeholder:text-slate-400 focus:border-[var(--theme-accent)] focus:ring-[3px] focus:ring-[var(--theme-accent-ring)] dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-[var(--theme-accent)]"
              />
            </div>
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => {
                  setShowNotifications((prev) => !prev);
                  setShowLangMenu(false);
                  setShowAccentMenu(false);
                  setShowProfileMenu(false);
                }}
                className="relative inline-flex size-11 items-center justify-center rounded-2xl border border-slate-200/95 bg-white/95 text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.05)] hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)]"
                aria-label="Notifications"
              >
                <Bell className="size-[18px]" />
                {notifications.length > 0 ? (
                  <span className="absolute right-3 top-[9px] size-2 rounded-full bg-red-500 ring-4 ring-white/90 dark:bg-red-400 dark:ring-zinc-900" />
                ) : null}
              </button>
              {showNotifications ? (
                <div className="absolute right-0 z-20 mt-2 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-zinc-700">
                    <p className="text-sm font-semibold">{t(language, "Notifications")}</p>
                    <button
                      type="button"
                      onClick={() => setNotifications([])}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--theme-accent-deep)] hover:underline dark:text-[var(--theme-accent-ink)]"
                    >
                      <CheckCheck size={13} />
                      {t(language, "Mark all read")}
                    </button>
                  </div>
                  <div className="max-h-72 overflow-auto p-2">
                    {notifications.length === 0 ? (
                      <p className="rounded-xl p-3 text-sm text-zinc-500">{t(language, "You are all caught up.")}</p>
                    ) : (
                      notifications.map((item) => (
                        <p
                          key={item}
                          className="rounded-xl px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
                        >
                          {item}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setShowLangMenu((prev) => !prev);
                  setShowAccentMenu(false);
                  setShowNotifications(false);
                  setShowProfileMenu(false);
                }}
                className="inline-flex h-11 items-center rounded-2xl border border-slate-200/95 bg-white/95 px-3 text-sm font-semibold text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.05)] hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)]"
                aria-label={t(language, "Select language")}
              >
                <span aria-hidden>{language === "FR" ? "🇫🇷" : "🇸🇦"}</span>
              </button>
              {showLangMenu ? (
                <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                  {[
                    { code: "FR", flag: "🇫🇷", label: "Français" },
                    { code: "AR", flag: "🇸🇦", label: "العربية" },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        const next = lang.code as AppLanguage;
                        setLanguage(next);
                        applyLanguage(next);
                        setShowLangMenu(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm ${
                        language === lang.code
                          ? "bg-[var(--theme-accent-bg)] text-[var(--theme-accent-deep)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]"
                          : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
                      }`}
                      aria-label={`Switch language to ${lang.code}`}
                    >
                      <span className="text-base" aria-hidden>{lang.flag}</span>
                      <span className="text-sm font-semibold">{lang.label}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative hidden sm:block" ref={accentMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setShowAccentMenu((prev) => !prev);
                  setShowLangMenu(false);
                  setShowNotifications(false);
                  setShowProfileMenu(false);
                }}
                className="inline-flex h-11 items-center gap-1.5 rounded-2xl border border-slate-200/95 bg-white/95 px-3 text-sm font-semibold text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.05)] hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)]"
                aria-label="Select color theme"
                title="Color theme"
              >
                <Palette size={15} />
                <span className="size-2.5 rounded-full border border-slate-300/70 dark:border-zinc-700" style={{ backgroundColor: accentThemes.find((item) => item.id === accentTheme)?.color ?? "#3b82f6" }} />
              </button>
              {showAccentMenu ? (
                <div className="absolute right-0 z-20 mt-2 grid w-[124px] grid-cols-3 gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                  {accentThemes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectAccentTheme(item.id)}
                      className={`grid h-9 w-full place-items-center rounded-lg border transition ${
                        accentTheme === item.id
                          ? "border-[var(--theme-accent)] ring-2 ring-[var(--theme-accent-ring)]"
                          : "border-slate-200 hover:border-slate-300 dark:border-zinc-700 dark:hover:border-zinc-500"
                      }`}
                      aria-label={`Use ${item.id} theme`}
                      title={item.id}
                    >
                      <span className="size-4 rounded-full" style={{ backgroundColor: item.color }} />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex size-10 items-center justify-center rounded-2xl border border-slate-200/95 bg-white/95 text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.05)] hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)] sm:size-11"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>

            <button
              type="button"
              onClick={async () => {
                try {
                  if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                  } else {
                    await document.exitFullscreen();
                  }
                } catch {
                  // ignore if browser denies fullscreen
                }
              }}
              className="hidden size-11 items-center justify-center rounded-2xl border border-slate-200/95 bg-white/95 text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.05)] hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)] md:inline-flex"
              aria-label="Toggle fullscreen"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={18} strokeWidth={1.75} /> : <Maximize2 size={18} strokeWidth={1.75} />}
            </button>

            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu((prev) => !prev);
                  setShowLangMenu(false);
                  setShowAccentMenu(false);
                  setShowNotifications(false);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-br from-[var(--brand-fill-from)] via-[var(--brand-fill-from)] to-[var(--brand-fill-to)] px-2.5 py-2 text-[13px] font-semibold text-white shadow-[0_10px_34px_-20px_var(--theme-accent-shadow)] hover:brightness-105 hover:shadow-lg sm:px-[14px]"
                aria-label="Profile menu"
              >
                <span className="relative flex size-7 items-center justify-center overflow-hidden rounded-full bg-white/20 text-[11px] font-bold ring-2 ring-white/35">
                  {userInitials}
                </span>
                <span className="hidden xl:inline-block max-w-[120px] truncate">
                  {adminUser?.name ?? t(language, "Profile")}
                </span>
                <ChevronDown size={14} />
              </button>
              {showProfileMenu ? (
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                  <div className="border-b border-zinc-100 px-3 py-2 dark:border-zinc-800">
                    <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">{adminUser?.name}</p>
                    <p className="truncate text-xs text-zinc-500" dir="ltr">{adminUser?.email}</p>
                  </div>
                  <Link
                    href="/admin/account"
                    onClick={() => setShowProfileMenu(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
                  >
                    {t(language, "My account")}
                  </Link>
                  <Link
                    href="/admin/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
                  >
                    {t(language, "Settings")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      void handleLogout();
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-start text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    {t(language, "Logout")}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="nuxem-page-anim min-h-0 flex-1 overflow-y-auto rounded-[22px] border border-slate-200/85 bg-[var(--sidebar-surface)] p-4 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.32)] ring-1 ring-white/40 backdrop-blur dark:border-white/10 dark:bg-zinc-950/55 dark:ring-white/[0.05] sm:p-6 lg:p-[34px]">
          {siblingTabs ? (
            <div className="mb-[22px]">
              <PageTabs items={siblingTabs.map((item) => ({ ...item, label: t(language, item.label) }))} />
            </div>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  );
}
