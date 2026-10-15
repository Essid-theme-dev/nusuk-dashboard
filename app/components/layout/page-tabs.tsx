"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PageTabItem } from "@/app/config/navigation";

type PageTabsProps = {
  items: PageTabItem[];
  className?: string;
};

export function PageTabs({ items, className }: PageTabsProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Section tabs"
      className={clsx(
        "no-scrollbar flex w-full flex-nowrap gap-1 overflow-x-auto rounded-[18px] border border-slate-200/90 bg-white/92 p-[5px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.55),0_10px_30px_-34px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/75 sm:flex-wrap sm:overflow-visible",
        className,
      )}
    >
      {items.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            prefetch={false}
            className={clsx(
              "whitespace-nowrap rounded-[13px] px-4 py-[9px] text-center text-[13px] font-semibold tracking-tight transition-all sm:flex-none sm:px-5",
              isActive
                ? "bg-gradient-to-br from-white to-[var(--theme-accent-bg)] text-[var(--theme-accent-deep)] shadow-[0_10px_28px_-22px_var(--theme-accent-shadow)] ring-1 ring-[var(--theme-accent-soft)] dark:from-zinc-900 dark:to-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)] dark:ring-[var(--theme-accent-soft)]"
                : "text-slate-500 hover:bg-white/70 hover:text-slate-950 dark:text-zinc-400 dark:hover:bg-zinc-900/85 dark:hover:text-zinc-100",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
