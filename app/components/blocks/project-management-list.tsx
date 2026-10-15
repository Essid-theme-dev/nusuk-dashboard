"use client";

import { CalendarDays, Flag, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

type ProjectStatus = "On track" | "At risk" | "Blocked";

type ProjectItem = {
  id: string;
  name: string;
  owner: string;
  team: number;
  dueDate: string;
  progress: number;
  status: ProjectStatus;
};

const projects: ProjectItem[] = [
  { id: "pr-101", name: "Orbit Rollout", owner: "Mira Stone", team: 8, dueDate: "May 28", progress: 72, status: "On track" },
  { id: "pr-102", name: "Northwind QA", owner: "Dylan Fox", team: 5, dueDate: "Jun 02", progress: 49, status: "At risk" },
  { id: "pr-103", name: "Design Tokens v3", owner: "Emma Carter", team: 6, dueDate: "Jun 08", progress: 81, status: "On track" },
  { id: "pr-104", name: "Payments Migration", owner: "Noah Kim", team: 7, dueDate: "May 22", progress: 34, status: "Blocked" },
  { id: "pr-105", name: "Mobile Parity", owner: "Alex Carter", team: 9, dueDate: "Jun 11", progress: 63, status: "At risk" },
];

export function ProjectManagementList() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(normalized) ||
        project.owner.toLowerCase().includes(normalized) ||
        project.status.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Project Management</h2>
          <p className="text-sm text-zinc-500">List view inspired by Facit project list layout.</p>
        </div>
        <Button variant="primary">Create project</Button>
      </div>

      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, owners, status..."
              className="pl-9"
            />
          </div>
          <p className="text-sm text-zinc-500">{filtered.length} projects</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Project</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Owner</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Team</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Due date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-zinc-100 hover:bg-zinc-50/70 dark:border-zinc-800/80 dark:hover:bg-zinc-800/30"
                >
                  <td className="px-4 py-3.5 font-semibold">{project.name}</td>
                  <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-300">{project.owner}</td>
                  <td className="px-4 py-3.5 text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} />
                      {project.team}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      {project.dueDate}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="w-32">
                      <div className="h-2 rounded-full bg-zinc-200/80 dark:bg-zinc-800">
                        <div
                          className="h-2 rounded-full bg-violet-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-zinc-500">{project.progress}%</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge
                      tone={
                        project.status === "On track"
                          ? "green"
                          : project.status === "At risk"
                            ? "amber"
                            : "red"
                      }
                      className="inline-flex items-center gap-1"
                    >
                      <Flag size={11} />
                      {project.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
