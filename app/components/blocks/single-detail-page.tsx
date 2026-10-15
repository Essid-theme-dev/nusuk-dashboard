"use client";

import { useState } from "react";
import { CheckCircle2, CircleDashed, ListTodo, PlayCircle, Timer, X } from "lucide-react";
import Image from "next/image";
import { demoAvatarUrl } from "@/app/lib/demo-avatars";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ActionModal } from "../ui/action-modal";

type SingleDetailVariant = "product" | "project";
type ProjectStage = "backlog" | "todo" | "pending" | "run" | "done";

type ProjectTask = {
  id: string;
  title: string;
  assignee: string;
  stage: ProjectStage;
  status: string;
};

const copy: Record<SingleDetailVariant, { eyebrow: string; title: string; description: string }> = {
  product: {
    eyebrow: "Single page · Product",
    title: "Canvas backpack Pro",
    description:
      "A detail layout inspired by Facit single pages—a hero overview, KPI row, timeline, and side panel.",
  },
  project: {
    eyebrow: "Single page · Project",
    title: "Orbit customer rollout",
    description:
      "Project detail with milestones, owners, priority, and a compact timeline for stakeholder updates.",
  },
};

export function SingleDetailPage({ variant }: { variant: SingleDetailVariant }) {
  const c = copy[variant];
  const [actionOpen, setActionOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [dragTaskId, setDragTaskId] = useState<string | null>(null);
  const [dropStage, setDropStage] = useState<ProjectStage | null>(null);
  const [showProjectNotice, setShowProjectNotice] = useState(true);
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([
    { id: "PT-301", title: "Finalize rollout scope", assignee: "Lina", stage: "backlog", status: "Backlog" },
    { id: "PT-302", title: "Draft QA checklist", assignee: "Noah", stage: "backlog", status: "Backlog" },
    { id: "PT-303", title: "Confirm migration script", assignee: "Emma", stage: "todo", status: "To Do" },
    { id: "PT-304", title: "Prepare stakeholder notes", assignee: "Mason", stage: "todo", status: "To Do" },
    { id: "PT-305", title: "Run smoke tests", assignee: "Alex", stage: "run", status: "Run" },
  ]);
  const metrics =
    variant === "product"
      ? [
          { label: "Monthly Revenue", value: "$124,200", change: "+11.2%" },
          { label: "Orders", value: "2,184", change: "+7.4%" },
          { label: "Return Rate", value: "1.8%", change: "-0.4%" },
          { label: "Inventory Health", value: "94%", change: "+2.1%" },
        ]
      : [
          { label: "Completion", value: "68%", change: "+9.0%" },
          { label: "Open Tasks", value: "27", change: "-6" },
          { label: "Risks", value: "3", change: "-1" },
          { label: "Team Capacity", value: "86%", change: "+4.3%" },
        ];

  const tableRows =
    variant === "product"
      ? [
          ["Region", "Sales", "Growth"],
          ["North America", "$42,840", "+12.4%"],
          ["Europe", "$31,220", "+8.2%"],
          ["MENA", "$18,650", "+10.1%"],
          ["APAC", "$31,490", "+14.8%"],
        ]
      : [
          ["Workstream", "Owner", "Status"],
          ["Onboarding flow", "Lina Moore", "In progress"],
          ["Billing integration", "Noah Smith", "Review"],
          ["Role permissions", "Emma Lewis", "In progress"],
          ["QA and rollout", "Mason Clark", "Scheduled"],
        ];

  const stageColumns: Array<{ id: ProjectStage; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = [
    { id: "backlog", label: "Backlog", icon: CircleDashed },
    { id: "todo", label: "To Do", icon: ListTodo },
    { id: "pending", label: "Pending", icon: Timer },
    { id: "run", label: "Run", icon: PlayCircle },
    { id: "done", label: "Done", icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6">
      {variant === "project" && showProjectNotice ? (
        <Card className="nuxem-card-anim overflow-hidden border-[var(--theme-accent-soft)] bg-gradient-to-r from-[var(--theme-accent-bg)] via-white to-[var(--theme-accent-bg)] p-0 dark:from-[var(--theme-accent-bg-dark)] dark:via-zinc-900 dark:to-[var(--theme-accent-bg-dark)]">
          <div className="flex items-start justify-between gap-3 px-5 pb-4 pt-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]">
                Rollout update
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                Project migration phase is at <span className="font-semibold">68%</span>. QA gate remains scheduled for tomorrow morning.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowProjectNotice(false)}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-500 hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)]"
              aria-label="Close notification"
            >
              <X size={15} />
            </button>
          </div>
          <div className="px-5 pb-5">
            <div className="h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[var(--brand-fill-from)] to-[var(--brand-fill-to)] shadow-[0_8px_18px_-10px_var(--theme-accent-shadow)] transition-all duration-700" />
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="nuxem-card-anim">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">{c.eyebrow}</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold tracking-tight">{c.title}</h2>
              <Badge tone={variant === "product" ? "green" : "amber"}>
                {variant === "product" ? "Published" : "In progress"}
              </Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="primary" type="button" onClick={() => setActionOpen(true)}>
                {variant === "product" ? "Launch campaign" : "Update project plan"}
              </Button>
              <Button type="button" onClick={() => setDeleteOpen(true)}>Delete</Button>
            </div>
          </div>
          <div className="w-full shrink-0 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-950/40 lg:w-72">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">Snapshot</p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Owner</dt>
                <dd className="font-medium">{variant === "product" ? "Mira Chen" : "Alex Porter"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Updated</dt>
                <dd className="font-medium">Today · 09:41</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">{variant === "product" ? "SKU" : "Priority"}</dt>
                <dd className="font-medium">{variant === "product" ? "CBP-902" : "P1"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="nuxem-chart-rise p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{metric.value}</p>
            <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">{metric.change}</p>
          </Card>
        ))}
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
        <Card className="nuxem-card-anim">
          <h3 className="text-sm font-semibold tracking-tight">Highlights</h3>
          <ul className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">Momentum</strong> — Velocity is
              steady vs last sprint; unblockers tracked below.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">Signals</strong> — CSAT trending
              up; onboarding completion holds at 94%.
            </li>
            <li>
              <strong className="font-medium text-zinc-900 dark:text-zinc-100">Execution</strong> — Cross-functional
              sync maintained with fast feedback loops and clear ownership.
            </li>
          </ul>

          <div className="mt-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Delivery progress</p>
            {[
              { label: variant === "product" ? "Marketing assets" : "Milestones", value: variant === "product" ? 78 : 64 },
              { label: variant === "product" ? "Fulfillment readiness" : "QA readiness", value: variant === "product" ? 86 : 72 },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-300">{bar.label}</span>
                  <span className="font-semibold text-zinc-700 dark:text-zinc-200">{bar.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--brand-fill-from)] to-[var(--brand-fill-to)] transition-all duration-700"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="nuxem-card-anim">
          <h3 className="text-sm font-semibold tracking-tight">Timeline</h3>
          <ol className="mt-4 space-y-3 text-sm">
            {["Brief signed", "Design review", variant === "product" ? "Inventory sync" : "QA gate", "Ship"].map(
              (step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-[var(--theme-accent-bg)] text-xs font-semibold text-[var(--theme-accent-deep)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium">{step}</p>
                    <p className="text-xs text-zinc-500">{i === 0 ? "Completed" : "Scheduled"}</p>
                  </div>
                </li>
              ),
            )}
          </ol>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
        <Card className="nuxem-card-anim">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-tight">{variant === "product" ? "Regional performance" : "Workstream status"}</h3>
            <Badge tone={variant === "product" ? "green" : "amber"}>{variant === "product" ? "Live data" : "Weekly sync"}</Badge>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-zinc-50/80 dark:bg-zinc-900/60">
                <tr>
                  {tableRows[0].map((head) => (
                    <th key={head} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row) => (
                  <tr key={row[0]} className="nuxem-row-anim border-t border-zinc-100 dark:border-zinc-800/80">
                    {row.map((cell) => (
                      <td key={`${row[0]}-${cell}`} className="px-4 py-2.5 text-zinc-700 dark:text-zinc-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="nuxem-card-anim">
          <h3 className="text-sm font-semibold tracking-tight">Recent notes</h3>
          <ul className="mt-4 space-y-3">
            {[
              "Stakeholder review completed with no blockers.",
              "Design tokens aligned with blue default theme.",
              variant === "product" ? "Promo bundles approved for next cycle." : "Cutover checklist reviewed with ops team.",
              "Next checkpoint scheduled for Friday 10:00 AM.",
            ].map((note) => (
              <li key={note} className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-3.5 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/45 dark:text-zinc-300">
                {note}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {variant === "project" ? (
        <Card className="nuxem-card-anim">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">Execution Board</h3>
            <p className="text-sm text-zinc-500">Move project tasks across stages to track delivery progress.</p>
          </div>
          <div className="grid gap-3 xl:grid-cols-5">
            {stageColumns.map((column) => {
              const columnTasks = projectTasks.filter((task) => task.stage === column.id);
              const Icon = column.icon;
              return (
                <div
                  key={column.id}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDropStage(column.id);
                  }}
                  onDragLeave={() => setDropStage((prev) => (prev === column.id ? null : prev))}
                  onDrop={() => {
                    if (!dragTaskId) return;
                    setProjectTasks((prev) =>
                      prev.map((task) =>
                        task.id === dragTaskId
                          ? { ...task, stage: column.id, status: column.label }
                          : task,
                      ),
                    );
                    setDragTaskId(null);
                    setDropStage(null);
                  }}
                  className={`rounded-xl border p-3 transition-all ${
                    dropStage === column.id
                      ? "border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] shadow-[0_10px_24px_-18px_var(--theme-accent-shadow)] dark:bg-[var(--theme-accent-bg-dark)]"
                      : "border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/45"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      <Icon size={13} className="text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]" />
                      {column.label}
                    </p>
                    <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                      {columnTasks.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => setDragTaskId(task.id)}
                        onDragEnd={() => setDragTaskId(null)}
                        className={`cursor-grab rounded-lg border px-3 py-2.5 text-sm shadow-sm transition-all duration-200 active:cursor-grabbing ${
                          dragTaskId === task.id
                            ? "scale-[0.98] border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] shadow-[0_12px_24px_-16px_var(--theme-accent-shadow)] dark:bg-[var(--theme-accent-bg-dark)]"
                            : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-zinc-800 dark:text-zinc-100">{task.title}</p>
                          <span className="whitespace-nowrap rounded-full border border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] px-2 py-0.5 text-[10px] font-semibold text-[var(--theme-accent-deep)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]">
                            {task.status}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <p className="text-xs text-zinc-500">#{task.id}</p>
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-1.5 py-1 dark:border-zinc-700 dark:bg-zinc-800/60">
                            <span className="relative h-5 w-5 overflow-hidden rounded-full border border-white dark:border-zinc-900">
                              <Image
                                src={demoAvatarUrl(
                                  task.assignee.toLowerCase().replace(/\s+/g, "-"),
                                  72,
                                )}
                                alt={task.assignee}
                                fill
                                className="object-cover"
                              />
                            </span>
                            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">{task.assignee}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {columnTasks.length === 0 ? (
                      <p className="rounded-lg border border-dashed border-zinc-200 px-2.5 py-3 text-xs text-zinc-400 dark:border-zinc-700">
                        Drop task here
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : null}

      <ActionModal
        open={actionOpen}
        title={variant === "product" ? "Launch campaign" : "Update project plan"}
        description={variant === "product" ? "Confirm publishing this campaign workflow." : "Confirm applying project plan updates."}
        confirmLabel="Confirm"
        onClose={() => setActionOpen(false)}
        onConfirm={() => setActionOpen(false)}
      />

      <ActionModal
        open={deleteOpen}
        title={variant === "product" ? "Delete product record" : "Delete project record"}
        description="This action removes the current item from active workflow."
        confirmLabel="Delete"
        tone="danger"
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => setDeleteOpen(false)}
      />
    </div>
  );
}
