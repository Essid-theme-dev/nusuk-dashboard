"use client";

import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { boxedListItems, type BoxedListStatus } from "./boxed-list-data";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const tabs: { id: BoxedListStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "archived", label: "Archived" },
];

export function BoxedListPage() {
  const [filter, setFilter] = useState<BoxedListStatus>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return boxedListItems;
    return boxedListItems.filter((item) => item.status === filter);
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 text-sm text-zinc-500">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5">
          <span className="text-zinc-400">List pages</span>
          <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
            /
          </span>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Boxed list</span>
        </nav>
        <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Boxed list layout with filters and card-style rows—similar intent to Facit&apos;s list
          pages&nbsp;
          <a
            href="https://facit-modern.omtanke.studio/list-pages/boxed-list"
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            boxed list
          </a>
          .
        </p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-zinc-200/80 px-6 py-4 dark:border-zinc-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Boxes</h2>
              <p className="text-sm text-zinc-500">Switch tabs to filter the grid</p>
            </div>
            <Button variant="primary" type="button" className="shrink-0">
              Add new
            </Button>
          </div>

          <div
            role="tablist"
            aria-label="List filter"
            className="flex w-full gap-1 rounded-xl border border-zinc-200 bg-zinc-50/80 p-1 dark:border-zinc-700 dark:bg-zinc-950/50 sm:w-fit"
          >
            {tabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(tab.id)}
                  className={`min-w-[4.5rem] rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 pt-5">
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed border-zinc-200 px-4 py-12 text-center text-sm text-zinc-500 dark:border-zinc-700">
              Nothing in this tab yet.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item, index) => (
                <li key={item.id}>
                  <article className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/40 shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] dark:border-zinc-800 dark:bg-zinc-950/40">
                    <div
                      className={
                        index % 2 === 0
                          ? "h-28 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-indigo-950/60 dark:via-zinc-900 dark:to-indigo-900/40"
                          : "h-28 bg-[linear-gradient(135deg,rgba(129,140,248,0.35),rgb(244,244,245))] dark:bg-[linear-gradient(135deg,rgba(67,56,202,0.35),rgb(24,24,27))]"
                      }
                    />
                    <div className="space-y-3 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            {item.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                            {item.subtitle}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                          aria-label={`More actions for ${item.title}`}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="amber">{item.category}</Badge>
                        <Badge tone={item.status === "active" ? "green" : "red"}>
                          {item.status === "active" ? "Active" : "Archived"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between border-t border-zinc-200/80 pt-3 text-xs text-zinc-500 dark:border-zinc-800">
                        <span>Updated {item.updatedAt}</span>
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
}
