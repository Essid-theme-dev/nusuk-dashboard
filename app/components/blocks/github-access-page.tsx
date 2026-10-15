"use client";

import { CheckCircle2, ExternalLink, FolderGit, KeyRound, Link2, Shield, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

type Scope = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

const repos = [
  { name: "nuxem/web-app", branch: "main", permission: "Admin", synced: "2m ago" },
  { name: "nuxem/design-system", branch: "develop", permission: "Write", synced: "11m ago" },
  { name: "nuxem/api-gateway", branch: "main", permission: "Read", synced: "24m ago" },
  { name: "nuxem/infra", branch: "release", permission: "Read", synced: "1h ago" },
];

const members = [
  { name: "Alex Carter", role: "Owner", access: "Admin" },
  { name: "Mira Stone", role: "Maintainer", access: "Write" },
  { name: "Dylan Fox", role: "Developer", access: "Read" },
  { name: "Sophie Evans", role: "Analyst", access: "Read" },
];

const activity = [
  "Scope `repo` granted by Alex Carter.",
  "Repository `nuxem/design-system` synchronized.",
  "Personal access token rotated.",
  "Member access changed: Mira Stone -> Write.",
];

export function GitHubAccessPage() {
  const [scopes, setScopes] = useState<Scope[]>([
    { id: "repo", label: "repo", description: "Full control of private repositories.", enabled: true },
    { id: "read-org", label: "read:org", description: "Read organization and team membership.", enabled: true },
    { id: "workflow", label: "workflow", description: "Update GitHub Actions workflows.", enabled: false },
    { id: "admin:repo_hook", label: "admin:repo_hook", description: "Manage repository webhooks.", enabled: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                <FolderGit size={14} />
                GitHub access
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">Connected to `nuxem` organization</h2>
              <p className="max-w-2xl text-sm text-zinc-500">
                Manage repository permissions, OAuth scopes, and member-level access from one surface.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
              <CheckCircle2 size={14} />
              Connection healthy
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="primary">
              <Link2 size={15} className="mr-1.5" />
              Reconnect app
            </Button>
            <Button>
              <ExternalLink size={15} className="mr-1.5" />
              Open GitHub settings
            </Button>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Token status</p>
          <p className="mt-3 text-lg font-semibold">Personal access token</p>
          <p className="mt-1 text-sm text-zinc-500">Last rotated 4 days ago by Alex Carter.</p>
          <div className="mt-4 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900/50">
            <p className="font-medium">Expires in 26 days</p>
            <p className="mt-1 text-zinc-500">Set reminder to rotate before expiration.</p>
          </div>
          <Button className="mt-4 w-full">
            <KeyRound size={15} className="mr-1.5" />
            Rotate token
          </Button>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_minmax(0,1fr)]">
        <Card>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Repositories</h3>
              <p className="text-sm text-zinc-500">Connected repositories and granted permissions</p>
            </div>
            <Input placeholder="Filter repositories..." className="max-w-[240px]" />
          </div>
          <div className="overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Repository</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Branch</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Permission</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Synced</th>
                </tr>
              </thead>
              <tbody>
                {repos.map((repo) => (
                  <tr key={repo.name} className="nuxem-row-anim border-b border-zinc-100 hover:bg-zinc-50/80 dark:border-zinc-800/80 dark:hover:bg-zinc-800/30">
                    <td className="px-4 py-3 font-medium">{repo.name}</td>
                    <td className="px-4 py-3 text-zinc-500">{repo.branch}</td>
                    <td className="px-4 py-3">
                      <Badge tone={repo.permission === "Admin" ? "red" : repo.permission === "Write" ? "amber" : "green"}>
                        {repo.permission}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{repo.synced}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold tracking-tight">OAuth scopes</h3>
          <p className="mt-1 text-sm text-zinc-500">Choose what this integration can access.</p>
          <div className="mt-4 space-y-2.5">
            {scopes.map((scope) => (
              <label key={scope.id} className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/45">
                <span>
                  <span className="text-sm font-semibold">{scope.label}</span>
                  <span className="mt-0.5 block text-xs text-zinc-500">{scope.description}</span>
                </span>
                <input
                  type="checkbox"
                  checked={scope.enabled}
                  onChange={() => setScopes((prev) => prev.map((item) => (item.id === scope.id ? { ...item, enabled: !item.enabled } : item)))}
                  className="mt-1 h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                />
              </label>
            ))}
          </div>
          <Button variant="primary" className="mt-4 w-full">
            <Shield size={15} className="mr-1.5" />
            Save scopes
          </Button>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold tracking-tight">Team access</h3>
          <p className="mt-1 text-sm text-zinc-500">Organization members with integration rights</p>
          <div className="mt-4 space-y-2.5">
            {members.map((member) => (
              <div key={member.name} className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-3.5 py-3 dark:border-zinc-800 dark:bg-zinc-900/45">
                <div>
                  <p className="text-sm font-semibold">{member.name}</p>
                  <p className="text-xs text-zinc-500">{member.role}</p>
                </div>
                <Badge tone={member.access === "Admin" ? "red" : member.access === "Write" ? "amber" : "green"}>
                  {member.access}
                </Badge>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full">
            <Users size={15} className="mr-1.5" />
            Manage members
          </Button>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold tracking-tight">Audit activity</h3>
          <p className="mt-1 text-sm text-zinc-500">Latest changes to GitHub access and policies</p>
          <ol className="mt-4 space-y-3">
            {activity.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  {index + 1}
                </span>
                <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-3.5 py-2.5 text-sm dark:border-zinc-800 dark:bg-zinc-900/45">
                  {item}
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
