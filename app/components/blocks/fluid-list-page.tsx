"use client";

import { users } from "./dashboard-data";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export function FluidListPage() {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="border-b border-zinc-200/80 px-6 py-4 dark:border-zinc-800">
        <h2 className="text-lg font-semibold tracking-tight">Fluid rows</h2>
        <p className="text-sm text-zinc-500">Dense list spanning the full container width.</p>
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {users.map((row) => {
          const tone =
            row.status === "Active" ? "green" : row.status === "Pending" ? "amber" : "red";
          return (
            <div
              key={row.email}
              className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-zinc-900 dark:text-zinc-50">{row.name}</p>
                <p className="truncate text-sm text-zinc-500">{row.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={tone}>{row.status}</Badge>
                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
