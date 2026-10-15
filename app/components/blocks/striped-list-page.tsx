"use client";

import { users } from "./dashboard-data";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export function StripedListPage() {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="border-b border-zinc-200/80 px-6 py-4 dark:border-zinc-800">
        <h2 className="text-lg font-semibold tracking-tight">Striped table</h2>
        <p className="text-sm text-zinc-500">Alternating row backgrounds improve scanability.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/60">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((row, index) => {
              const tone =
                row.status === "Active" ? "green" : row.status === "Pending" ? "amber" : "red";
              return (
                <tr
                  key={row.email}
                  className={
                    index % 2 === 0
                      ? "bg-white dark:bg-zinc-950/20"
                      : "bg-zinc-50/80 dark:bg-zinc-900/50"
                  }
                >
                  <td className="px-6 py-3.5 font-medium text-zinc-900 dark:text-zinc-50">
                    {row.name}
                  </td>
                  <td className="px-6 py-3.5 text-zinc-600 dark:text-zinc-400">{row.email}</td>
                  <td className="px-6 py-3.5">
                    <Badge tone={tone}>{row.status}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
