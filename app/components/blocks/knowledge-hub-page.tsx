"use client";

import { BookMarked, Command, FileText, Lightbulb, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

const collections = [
  { title: "Onboarding", docs: 42, completion: 76 },
  { title: "Engineering", docs: 128, completion: 91 },
  { title: "Support", docs: 67, completion: 64 },
];

const topArticles = [
  { title: "Incident Response Checklist", owner: "Alex Carter", updated: "2h ago", status: "Updated" },
  { title: "Release Approval Workflow", owner: "Mira Stone", updated: "Today", status: "Pinned" },
  { title: "Customer Escalation Playbook", owner: "Sophie Evans", updated: "1d ago", status: "Updated" },
  { title: "Billing Dispute Policy", owner: "Lina Moore", updated: "2d ago", status: "Review" },
];

const resourceTags = [
  "API Standards",
  "Design Tokens",
  "Incident Postmortem",
  "Security Checklist",
  "On-call Handover",
  "Product Launch",
  "SLA Policy",
  "Support Macros",
];

const faqs = [
  {
    q: "How do we publish a new internal playbook?",
    a: "Draft in the knowledge editor, request review from one owner, then publish with version notes and visibility scope.",
  },
  {
    q: "Can we restrict docs by team?",
    a: "Yes, every article can be scoped to a team, role, or specific members through workspace permissions.",
  },
  {
    q: "What happens when content is outdated?",
    a: "Outdated docs are flagged automatically after 90 days and moved into the review queue with owner reminders.",
  },
];

export function KnowledgeHubPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="space-y-6">
      <Card className="nuxem-card-anim p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Apps · Knowledge</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Knowledge Hub Workspace</h2>
            <p className="mt-1 max-w-2xl text-sm text-zinc-500">
              Centralize playbooks, SOPs, release notes, and training material with clear ownership and publishing flow.
            </p>
          </div>
          <Button variant="primary">Create article</Button>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Command className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder="Search docs, tags, owners, and procedures..."
              className="h-11 pl-10 pr-20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:border-zinc-700">
              Ctrl K
            </span>
          </div>
          <div className="flex gap-2">
            <Button>Import docs</Button>
            <Button>Review queue</Button>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        {collections.map((item) => (
          <Card key={item.title} className="nuxem-chart-rise p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{item.title}</p>
              <BookMarked size={16} className="text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]" />
            </div>
            <p className="mt-1 text-xs text-zinc-500">{item.docs} docs</p>
            <div className="mt-3 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--brand-fill-from)] to-[var(--brand-fill-to)]"
                style={{ width: `${item.completion}%` }}
              />
            </div>
            <p className="mt-1 text-xs font-semibold text-zinc-500">{item.completion}% freshness</p>
          </Card>
        ))}
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_minmax(0,1fr)]">
        <Card className="nuxem-card-anim">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">Top Articles</h3>
            <Badge tone="green">Live index</Badge>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-zinc-50/80 dark:bg-zinc-900/60">
                <tr>
                  {["Article", "Owner", "Updated", "Status"].map((head) => (
                    <th key={head} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topArticles.map((article) => (
                  <tr key={article.title} className="nuxem-row-anim border-t border-zinc-100 dark:border-zinc-800/80">
                    <td className="px-4 py-2.5 font-medium text-zinc-700 dark:text-zinc-200">{article.title}</td>
                    <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-300">{article.owner}</td>
                    <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-300">{article.updated}</td>
                    <td className="px-4 py-2.5">
                      <Badge tone={article.status === "Pinned" ? "amber" : article.status === "Review" ? "red" : "green"}>
                        {article.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="nuxem-card-anim">
          <h3 className="text-lg font-semibold tracking-tight">Learning Path</h3>
          <ol className="mt-4 space-y-3">
            {[
              "Knowledge structure and taxonomy",
              "Write high-signal documentation",
              "Review and approval workflow",
              "Publishing and discoverability",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 inline-flex size-7 items-center justify-center rounded-full bg-[var(--theme-accent-bg)] text-xs font-semibold text-[var(--theme-accent-deep)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]">
                  {i + 1}
                </span>
                <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900/45">
                  {step}
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
        <Card className="nuxem-card-anim">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]" />
            <h3 className="text-lg font-semibold tracking-tight">Resource Components</h3>
          </div>
          <p className="mt-1 text-sm text-zinc-500">Quick reusable knowledge blocks for internal docs.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {resourceTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </Card>

        <Card className="nuxem-card-anim">
          <h3 className="text-lg font-semibold tracking-tight">FAQ</h3>
          <div className="mt-4 space-y-2">
            {faqs.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/45">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(index)}
                    className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left text-sm font-semibold"
                  >
                    <span>{item.q}</span>
                    <Star size={14} className={`transition-all duration-300 ${open ? "rotate-12 text-[var(--theme-accent)]" : "text-zinc-400"}`} />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-3.5 pb-3 text-sm text-zinc-600 dark:text-zinc-300">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="nuxem-card-anim">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">AI Suggestions</h3>
            <p className="text-sm text-zinc-500">Generate missing docs and improve consistency with one click.</p>
          </div>
          <div className="flex gap-2">
            <Button><FileText size={14} className="mr-1.5" />Draft SOP</Button>
            <Button variant="primary"><Lightbulb size={14} className="mr-1.5" />Generate summary</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
