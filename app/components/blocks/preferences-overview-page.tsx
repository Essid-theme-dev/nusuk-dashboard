"use client";

import { Bell, Globe2, Lock, Monitor, ShieldCheck, Sparkles, UserCog } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

export function PreferencesOverviewPage() {
  const [displayName, setDisplayName] = useState("Alex Carter");
  const [jobTitle, setJobTitle] = useState("Product Operations Lead");
  const [emailDigest, setEmailDigest] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionLock, setSessionLock] = useState(true);

  return (
    <div className="space-y-6">
      <Card className="nuxem-card-anim relative overflow-hidden border-[var(--theme-accent-soft)] bg-gradient-to-br from-[var(--theme-accent-bg)] via-white to-white p-6 dark:from-[var(--theme-accent-bg-dark)] dark:via-zinc-900 dark:to-zinc-900">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--theme-accent-ring)] blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-[var(--theme-accent-soft)] bg-white/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--theme-accent-deep)] dark:bg-zinc-900/70 dark:text-[var(--theme-accent-ink)]">
              <Sparkles size={12} />
              Preferences center
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Personalize your workspace</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Configure identity, alerts, language, and account security from a single professional dashboard.
            </p>
          </div>
          <Badge tone="green">All settings synced</Badge>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_minmax(0,1fr)]">
        <Card className="nuxem-card-anim">
          <div className="mb-4 flex items-center gap-2">
            <UserCog size={16} className="text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]" />
            <h3 className="text-lg font-semibold tracking-tight">Profile preferences</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-zinc-600 dark:text-zinc-300">Display name</span>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium text-zinc-600 dark:text-zinc-300">Role</span>
              <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            </label>
            <label className="space-y-1.5 text-sm sm:col-span-2">
              <span className="font-medium text-zinc-600 dark:text-zinc-300">Timezone</span>
              <Input defaultValue="(GMT+01:00) Europe/Paris" />
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button>Reset</Button>
            <Button variant="primary">Save profile</Button>
          </div>
        </Card>

        <Card className="nuxem-card-anim">
          <div className="mb-4 flex items-center gap-2">
            <Globe2 size={16} className="text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]" />
            <h3 className="text-lg font-semibold tracking-tight">Regional settings</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3.5 py-3 dark:border-zinc-800 dark:bg-zinc-900/45">
              <p className="font-semibold">Language profile</p>
              <p className="mt-0.5 text-zinc-500">Primary: English · Fallback: French</p>
            </div>
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3.5 py-3 dark:border-zinc-800 dark:bg-zinc-900/45">
              <p className="font-semibold">Date format</p>
              <p className="mt-0.5 text-zinc-500">DD/MM/YYYY · 24-hour clock</p>
            </div>
            <Button variant="primary" className="w-full">Open language settings</Button>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="nuxem-card-anim">
          <div className="mb-3 flex items-center gap-2">
            <Bell size={16} className="text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]" />
            <h3 className="text-base font-semibold">Notification controls</h3>
          </div>
          <div className="space-y-2">
            {[
              { label: "Email digest", value: emailDigest, set: setEmailDigest },
              { label: "Push alerts", value: pushAlerts, set: setPushAlerts },
              { label: "Weekly summary", value: weeklySummary, set: setWeeklySummary },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => item.set(!item.value)}
                className="flex w-full items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3 py-2 text-sm hover:border-[var(--theme-accent-soft)] dark:border-zinc-800 dark:bg-zinc-900/45"
              >
                <span>{item.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.value ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"}`}>
                  {item.value ? "On" : "Off"}
                </span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="nuxem-card-anim">
          <div className="mb-3 flex items-center gap-2">
            <Lock size={16} className="text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]" />
            <h3 className="text-base font-semibold">Security</h3>
          </div>
          <div className="space-y-2">
            {[
              { label: "Two-factor authentication", value: twoFactor, set: setTwoFactor },
              { label: "Session lock after idle", value: sessionLock, set: setSessionLock },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => item.set(!item.value)}
                className="flex w-full items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3 py-2 text-sm hover:border-[var(--theme-accent-soft)] dark:border-zinc-800 dark:bg-zinc-900/45"
              >
                <span>{item.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.value ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"}`}>
                  {item.value ? "Enabled" : "Disabled"}
                </span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="nuxem-card-anim">
          <div className="mb-3 flex items-center gap-2">
            <Monitor size={16} className="text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]" />
            <h3 className="text-base font-semibold">Connected sessions</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              "Chrome on macOS · Paris",
              "Safari on iPhone · Paris",
              "Edge on Windows · Berlin",
            ].map((session) => (
              <li key={session} className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/45">
                {session}
              </li>
            ))}
          </ul>
          <Button className="mt-3 w-full">Revoke other sessions</Button>
        </Card>
      </div>

      <Card className="nuxem-card-anim border-[var(--theme-accent-soft)]/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]">
              <ShieldCheck size={15} />
              Account protection active
            </p>
            <p className="mt-1 text-sm text-zinc-500">Last security review completed 2 days ago with no critical issues.</p>
          </div>
          <Button variant="primary">Run security check</Button>
        </div>
      </Card>
    </div>
  );
}
