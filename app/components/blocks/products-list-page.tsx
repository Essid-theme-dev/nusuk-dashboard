"use client";

import Image from "next/image";
import { ArrowUpDown, Boxes, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { demoAvatarUrl } from "@/app/lib/demo-avatars";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

type ProductItem = {
  id: string;
  product: string;
  owner: string;
  team: string;
  projects: number;
  completion: number;
  status: "Active" | "Scaling" | "Paused";
};

const products: ProductItem[] = [
  {
    id: "prd-01",
    product: "Nuxem Analytics",
    owner: "Mira Stone",
    team: "Design Team",
    projects: 5,
    completion: 82,
    status: "Active",
  },
  {
    id: "prd-02",
    product: "Nuxem Mobile",
    owner: "Alex Carter",
    team: "Development Team",
    projects: 7,
    completion: 64,
    status: "Scaling",
  },
  {
    id: "prd-03",
    product: "Nuxem Campaigns",
    owner: "Sophie Evans",
    team: "Marketing Team",
    projects: 4,
    completion: 71,
    status: "Active",
  },
  {
    id: "prd-04",
    product: "Nuxem AI Assistant",
    owner: "Noah Kim",
    team: "Development Team",
    projects: 3,
    completion: 39,
    status: "Paused",
  },
  {
    id: "prd-05",
    product: "Nuxem Billing",
    owner: "Emma Lewis",
    team: "Design Team",
    projects: 6,
    completion: 77,
    status: "Scaling",
  },
];

function statusTone(status: ProductItem["status"]) {
  if (status === "Active") return "green";
  if (status === "Scaling") return "amber";
  return "red";
}

export function ProductsListPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"completion" | "projects">("completion");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = products.filter(
      (item) =>
        q.length === 0 ||
        item.product.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q) ||
        item.team.toLowerCase().includes(q),
    );
    return base.sort((a, b) =>
      sortBy === "completion" ? b.completion - a.completion : b.projects - a.projects,
    );
  }, [query, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Products</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Products list</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Professional list view with owners, teams, active projects, and completion percentage.
          </p>
        </div>
        <Button variant="primary" className="h-10">
          New product
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Products tracked</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{products.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Active projects</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">
            {products.reduce((acc, item) => acc + item.projects, 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Average completion</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-violet-600 dark:text-violet-300">
            {Math.round(products.reduce((acc, item) => acc + item.completion, 0) / products.length)}%
          </p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, owner or team..."
              className="pl-9"
            />
          </div>
          <button
            type="button"
            onClick={() => setSortBy((prev) => (prev === "completion" ? "projects" : "completion"))}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <ArrowUpDown size={14} />
            Sort: {sortBy === "completion" ? "Completion" : "Projects"}
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Product
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Owner
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Team
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Projects
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Status
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Finalization
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const seed = item.owner.replace(/\s+/g, "-").toLowerCase();
                return (
                  <tr
                    key={item.id}
                    className="nuxem-row-anim border-b border-zinc-100 hover:bg-zinc-50/70 dark:border-zinc-800/80 dark:hover:bg-zinc-800/30"
                  >
                    <td className="px-4 py-3.5">
                      <p className="inline-flex items-center gap-2 font-semibold">
                        <Boxes size={14} className="text-violet-600 dark:text-violet-300" />
                        {item.product}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700">
                          <Image
                            src={demoAvatarUrl(seed, 96)}
                            alt={item.owner}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-zinc-600 dark:text-zinc-300">{item.owner}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-zinc-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Users size={13} />
                        {item.team}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-zinc-500">{item.projects}</td>
                    <td className="px-4 py-3.5">
                      <Badge tone={statusTone(item.status)}>{item.status}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-zinc-500">{item.completion}%</p>
                        <div className="h-2 w-32 rounded-full bg-zinc-200 dark:bg-zinc-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[var(--brand-fill-from)] to-[var(--brand-fill-to)]"
                            style={{ width: `${item.completion}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
