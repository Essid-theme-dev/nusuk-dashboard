"use client";

import { ArrowUpDown, CalendarDays, Flag, Plus, Search, SlidersHorizontal, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

type Project = {
  id: string;
  name: string;
  owner: string;
  team: number;
  dueDate: string;
  dueDateISO: string;
  progress: number;
  budgetK: number;
  priority: "Low" | "Medium" | "High";
  status: "Planning" | "In progress" | "Review" | "Done";
};

const projects: Project[] = [
  {
    id: "p-01",
    name: "Customer onboarding redesign",
    owner: "Mira Stone",
    team: 6,
    dueDate: "May 26, 2026",
    dueDateISO: "2026-05-26",
    progress: 72,
    budgetK: 85,
    priority: "High",
    status: "In progress",
  },
  {
    id: "p-02",
    name: "Billing automation rollout",
    owner: "Alex Carter",
    team: 4,
    dueDate: "Jun 03, 2026",
    dueDateISO: "2026-06-03",
    progress: 46,
    budgetK: 62,
    priority: "Medium",
    status: "Review",
  },
  {
    id: "p-03",
    name: "Mobile retention experiments",
    owner: "Noah Kim",
    team: 5,
    dueDate: "Jun 14, 2026",
    dueDateISO: "2026-06-14",
    progress: 24,
    budgetK: 40,
    priority: "High",
    status: "Planning",
  },
  {
    id: "p-04",
    name: "Knowledge base migration",
    owner: "Emma Lewis",
    team: 3,
    dueDate: "May 19, 2026",
    dueDateISO: "2026-05-19",
    progress: 100,
    budgetK: 28,
    priority: "Low",
    status: "Done",
  },
  {
    id: "p-05",
    name: "Warehouse fulfillment integration",
    owner: "Sophie Evans",
    team: 7,
    dueDate: "Jun 24, 2026",
    dueDateISO: "2026-06-24",
    progress: 58,
    budgetK: 74,
    priority: "Medium",
    status: "In progress",
  },
  {
    id: "p-06",
    name: "Marketing automation migration",
    owner: "Dylan Fox",
    team: 4,
    dueDate: "Jul 05, 2026",
    dueDateISO: "2026-07-05",
    progress: 33,
    budgetK: 51,
    priority: "High",
    status: "Planning",
  },
  {
    id: "p-07",
    name: "Support ops dashboard v2",
    owner: "Mia Rivera",
    team: 5,
    dueDate: "Jun 08, 2026",
    dueDateISO: "2026-06-08",
    progress: 81,
    budgetK: 44,
    priority: "Low",
    status: "Review",
  },
  {
    id: "p-08",
    name: "Identity and SSO hardening",
    owner: "Alex Carter",
    team: 3,
    dueDate: "Jun 29, 2026",
    dueDateISO: "2026-06-29",
    progress: 52,
    budgetK: 36,
    priority: "Low",
    status: "In progress",
  },
];

function priorityTone(priority: Project["priority"]) {
  if (priority === "High") return "red";
  if (priority === "Medium") return "amber";
  return "green";
}

function statusTone(status: Project["status"]) {
  if (status === "Done") return "green";
  if (status === "Review") return "amber";
  if (status === "Planning") return "red";
  return "amber";
}

export function ProjectManagementListPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Project["status"]>("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | Project["priority"]>("All");
  const [sortBy, setSortBy] = useState<"dueDate" | "progress">("dueDate");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredProjects = useMemo(() => {
    const base = projects.filter((project) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        project.name.toLowerCase().includes(q) ||
        project.owner.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || project.status === statusFilter;
      const matchPriority = priorityFilter === "All" || project.priority === priorityFilter;
      return matchQuery && matchStatus && matchPriority;
    });

    return base.sort((a, b) => {
      if (sortBy === "progress") return b.progress - a.progress;
      return a.dueDateISO.localeCompare(b.dueDateISO);
    });
  }, [query, statusFilter, priorityFilter, sortBy]);

  const pages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const pagedProjects = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, page]);

  const kpis = useMemo(() => {
    const active = projects.filter((project) => project.status !== "Done");
    const avgProgress = Math.round(active.reduce((acc, project) => acc + project.progress, 0) / active.length);
    return {
      active: active.length,
      atRisk: projects.filter((project) => project.progress < 40).length,
      avgProgress,
      budgetK: projects.reduce((acc, project) => acc + project.budgetK, 0),
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Project management</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Project list</h2>
          <p className="mt-1 text-sm text-zinc-500">Operational list view with risk, priority, owners, and progress.</p>
        </div>
        <Button variant="primary" className="h-10">
          <Plus size={15} className="mr-1.5" />
          New project
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="nuxem-kpi-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Active projects</p>
          <p className="nuxem-kpi-value mt-2 text-2xl font-semibold tracking-tight">{kpis.active}</p>
        </Card>
        <Card className="nuxem-kpi-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">At risk</p>
          <p className="nuxem-kpi-value mt-2 text-2xl font-semibold tracking-tight text-rose-600 dark:text-rose-300">
            {kpis.atRisk}
          </p>
        </Card>
        <Card className="nuxem-kpi-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Average progress</p>
          <p className="nuxem-kpi-value mt-2 text-2xl font-semibold tracking-tight text-violet-600 dark:text-violet-300">
            {kpis.avgProgress}%
          </p>
        </Card>
        <Card className="nuxem-kpi-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Allocated budget</p>
          <p className="nuxem-kpi-value mt-2 text-2xl font-semibold tracking-tight">${kpis.budgetK}k</p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search project or owner..."
              className="pl-9"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <SlidersHorizontal size={14} />
            Display
          </button>
          <button
            type="button"
            onClick={() => setSortBy((prev) => (prev === "dueDate" ? "progress" : "dueDate"))}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <ArrowUpDown size={14} />
            Sort: {sortBy === "dueDate" ? "Due date" : "Progress"}
          </button>
        </div>

        <div className="mb-2 flex flex-wrap gap-2">
          {["All", "Planning", "In progress", "Review", "Done"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status as "All" | Project["status"])}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
                statusFilter === status
                  ? "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-300"
                  : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {["All", "Low", "Medium", "High"].map((priority) => (
            <button
              key={priority}
              type="button"
              onClick={() => setPriorityFilter(priority as "All" | Project["priority"])}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
                priorityFilter === priority
                  ? "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-300"
                  : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Priority: {priority}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Project
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Team
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Due date
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Risk
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Priority
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Status
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Budget
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {pagedProjects.map((project) => (
                <tr
                  key={project.id}
                  className="nuxem-row-anim border-b border-zinc-100 hover:bg-zinc-50/70 dark:border-zinc-800/80 dark:hover:bg-zinc-800/30"
                >
                  <td className="px-4 py-3.5">
                    <p className="font-semibold">{project.name}</p>
                    <p className="text-xs text-zinc-500">Owner: {project.owner}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="inline-flex items-center gap-1 text-zinc-500">
                      <Users size={13} />
                      {project.team} members
                    </p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="inline-flex items-center gap-1 text-zinc-500">
                      <CalendarDays size={13} />
                      {project.dueDate}
                    </p>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge tone={project.progress < 40 ? "red" : project.progress < 70 ? "amber" : "green"}>
                      <span className="inline-flex items-center gap-1">
                        <Flag size={11} />
                        {project.progress < 40 ? "High" : project.progress < 70 ? "Medium" : "Low"}
                      </span>
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge tone={priorityTone(project.priority)}>{project.priority}</Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge tone={statusTone(project.status)}>{project.status}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-zinc-500">${project.budgetK}k</td>
                  <td className="px-4 py-3.5">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-zinc-500">{project.progress}%</p>
                      <div className="h-2 w-32 rounded-full bg-zinc-200 dark:bg-zinc-700">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-zinc-500">
            Showing {pagedProjects.length} of {filteredProjects.length} projects
          </p>
          <div className="flex items-center gap-2">
            <Button onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page <= 1}>
              Previous
            </Button>
            <p className="text-sm text-zinc-500">
              Page {page} / {pages}
            </p>
            <Button onClick={() => setPage((prev) => Math.min(pages, prev + 1))} disabled={page >= pages}>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
