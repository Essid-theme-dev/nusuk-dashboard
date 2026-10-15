"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

function Toggle({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors ${
        checked
          ? "border-[var(--theme-accent-soft)] bg-[var(--theme-accent)] dark:border-[var(--theme-accent-soft)]"
          : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
      }`}
    >
      <span
        className={`absolute left-1 inline-block size-5 rounded-full bg-white shadow transition-[transform] ${
          checked ? "translate-x-5 bg-white" : "translate-x-0"
        }`}
      />
      <span className="sr-only">Toggle setting</span>
    </button>
  );
}

export function FormControlsBlock() {
  const [notify, setNotify] = useState(true);
  const [digest, setDigest] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-zinc-200/80 pb-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold tracking-tight">Controls</h2>
          <p className="mt-1 text-sm text-zinc-500">Checkboxes and toggle patterns with clear hierarchy.</p>
        </div>
        <div className="mt-6 space-y-5">
          <label className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Email alerts</p>
              <p className="mt-1 text-sm text-zinc-500">Notify me when a critical job fails.</p>
            </div>
            <Toggle checked={notify} onToggle={() => setNotify((v) => !v)} />
          </label>
          <label className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Weekly digest</p>
              <p className="mt-1 text-sm text-zinc-500">A Monday summary sent to inbox.</p>
            </div>
            <Toggle checked={digest} onToggle={() => setDigest((v) => !v)} />
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" defaultChecked name="tier" />
              Starter
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="tier" />
              Growth
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Theme seed</span>
            <select className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 text-sm outline-none focus:border-[var(--theme-accent)] focus:bg-white dark:border-zinc-700 dark:bg-zinc-900">
              <option>Ocean indigo</option>
              <option>Forest emerald</option>
              <option>Sunset amber</option>
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Notes</span>
            <Input placeholder="Optional caption" />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button">Cancel</Button>
          <Button type="button" variant="primary">
            Apply controls
          </Button>
        </div>
      </Card>
    </div>
  );
}
