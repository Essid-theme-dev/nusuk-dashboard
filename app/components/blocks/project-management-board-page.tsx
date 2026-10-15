"use client";

import { ArrowRightLeft, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type Column = "Backlog" | "In progress" | "Review" | "Done";

type Task = {
  id: string;
  title: string;
  column: Column;
  owner: string;
};

export function ProjectManagementBoardPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "t1", title: "Define launch checklist", column: "Backlog", owner: "Alex Carter" },
    { id: "t2", title: "Write migration notes", column: "Backlog", owner: "Mira Stone" },
    { id: "t3", title: "Revamp onboarding flow", column: "In progress", owner: "Noah Kim" },
    { id: "t4", title: "Stripe webhook retry policy", column: "In progress", owner: "Emma Lewis" },
    { id: "t5", title: "Mobile QA sweep", column: "Review", owner: "Sophie Evans" },
    { id: "t6", title: "Infra dashboard cleanup", column: "Done", owner: "Dylan Fox" },
  ]);

  const columns: Column[] = ["Backlog", "In progress", "Review", "Done"];

  const grouped = useMemo(
    () =>
      columns.map((column) => ({
        title: column,
        items: tasks.filter((task) => task.column === column),
      })),
    [tasks],
  );

  const moveTask = (id: string, direction: "next" | "prev") => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const currentIndex = columns.indexOf(task.column);
        const nextIndex =
          direction === "next"
            ? Math.min(columns.length - 1, currentIndex + 1)
            : Math.max(0, currentIndex - 1);
        return { ...task, column: columns[nextIndex] };
      }),
    );
  };

  const progress = {
    done: tasks.filter((task) => task.column === "Done").length,
    total: tasks.length,
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Project board</h2>
          <p className="text-sm text-zinc-500">Kanban-style overview for active project tasks.</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
            {progress.done}/{progress.total} done
          </p>
          <Button variant="primary" className="h-9">
            <Plus size={14} className="mr-1" />
            Add task
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {grouped.map((column) => (
          <Card key={column.title} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">{column.title}</p>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                {column.items.length}
              </span>
            </div>
            <div className="mt-3 space-y-2.5">
              {column.items.map((task) => (
                <div
                  key={task.id}
                  className="space-y-2 rounded-xl border border-zinc-200/80 bg-white/70 px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-900/60"
                >
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-zinc-500">{task.owner}</p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveTask(task.id, "prev")}
                      className="rounded-lg border border-zinc-200 px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => moveTask(task.id, "next")}
                      className="rounded-lg border border-zinc-200 px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Next
                    </button>
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400">
                      <ArrowRightLeft size={12} />
                      Move
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
