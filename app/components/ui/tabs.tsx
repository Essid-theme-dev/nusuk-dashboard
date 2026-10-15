"use client";

import { clsx } from "clsx";

export type LocalTab<T extends string> = {
  id: T;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
};

type TabsProps<T extends string> = {
  tabs: LocalTab<T>[];
  activeId: T;
  onChange: (nextId: T) => void;
  className?: string;
};

export function Tabs<T extends string>({ tabs, activeId, onChange, className }: TabsProps<T>) {
  return (
    <div className={clsx("flex flex-wrap items-center gap-2", className)}>
      {tabs.map((tab) => {
        const active = activeId === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={clsx(
              "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition",
              active
                ? "border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] text-[var(--theme-accent-deep)] dark:border-[var(--theme-accent-soft)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]"
                : "border-slate-200 bg-white text-slate-600 hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)]",
            )}
          >
            {Icon ? <Icon size={15} /> : null}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

