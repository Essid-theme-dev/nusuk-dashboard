"use client";

import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { ActionModal } from "../ui/action-modal";
import { CountUpValue, parseCountUpParts } from "../ui/count-up-value";

const summary = [
  { label: "Total invoiced", value: "$248,900", change: "+9.4%" },
  { label: "Paid this month", value: "$81,240", change: "+12.1%" },
  { label: "Pending", value: "$34,880", change: "8 invoices" },
  { label: "Overdue", value: "$12,400", change: "3 invoices" },
];

const initialInvoices = [
  { id: "INV-2031", client: "Orbit Labs", amount: "$8,240", due: "May 12, 2026", status: "Paid" },
  { id: "INV-2032", client: "North Clinic", amount: "$5,980", due: "May 14, 2026", status: "Pending" },
  { id: "INV-2033", client: "Nova Retail", amount: "$12,120", due: "May 09, 2026", status: "Overdue" },
  { id: "INV-2034", client: "BluePeak", amount: "$9,640", due: "May 18, 2026", status: "Pending" },
  { id: "INV-2035", client: "Aster Group", amount: "$6,430", due: "May 21, 2026", status: "Paid" },
];

export function FacturationPage() {
  const [query, setQuery] = useState("");
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [collectOpen, setCollectOpen] = useState(false);
  const [draftClient, setDraftClient] = useState("");
  const [draftAmount, setDraftAmount] = useState("");
  const [draftDue, setDraftDue] = useState("");

  const selectedInvoice = invoices.find((i) => i.id === selectedId) ?? null;
  const filteredInvoices = useMemo(
    () =>
      invoices.filter((invoice) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return invoice.id.toLowerCase().includes(q) || invoice.client.toLowerCase().includes(q);
      }),
    [invoices, query],
  );

  const resetDraft = () => {
    setDraftClient("");
    setDraftAmount("");
    setDraftDue("");
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <Card key={item.label} className="nuxem-chart-rise p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{item.label}</p>
            <AnimatedSummaryValue className="mt-2 text-2xl font-semibold tracking-tight" value={item.value} />
            <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">{item.change}</p>
          </Card>
        ))}
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
        <Card className="nuxem-card-anim">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Invoices</h3>
              <p className="text-sm text-zinc-500">Track all billing documents and payment status.</p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search by invoice or client..."
                className="h-9 w-60"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Button variant="primary" className="h-9 px-3 text-xs" onClick={() => setCreateOpen(true)}>
                Create invoice
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-zinc-50/80 dark:bg-zinc-900/60">
                <tr>
                  {["Invoice", "Client", "Amount", "Due date", "Status", "Action"].map((head) => (
                    <th key={head} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="nuxem-row-anim border-t border-zinc-100 dark:border-zinc-800/80">
                    <td className="px-4 py-2.5 font-semibold text-zinc-700 dark:text-zinc-200">{invoice.id}</td>
                    <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-200">{invoice.client}</td>
                    <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-200">{invoice.amount}</td>
                    <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-300">{invoice.due}</td>
                    <td className="px-4 py-2.5">
                      <Badge tone={invoice.status === "Paid" ? "green" : invoice.status === "Pending" ? "amber" : "red"}>
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <Button
                          className="h-8 px-2.5 text-xs"
                          onClick={() => {
                            setSelectedId(invoice.id);
                            if (invoice.status === "Paid") {
                              setEditOpen(true);
                              setDraftClient(invoice.client);
                              setDraftAmount(invoice.amount.replace("$", "").replace(",", ""));
                              setDraftDue(invoice.due);
                            } else {
                              setCollectOpen(true);
                            }
                          }}
                        >
                          {invoice.status === "Paid" ? "Edit" : "Collect"}
                        </Button>
                        <Button
                          className="h-8 px-2.5 text-xs border-rose-300 text-rose-700 hover:bg-rose-50 dark:border-rose-900/60 dark:text-rose-300 dark:hover:bg-rose-950/40"
                          onClick={() => {
                            setSelectedId(invoice.id);
                            setDeleteOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="nuxem-card-anim">
          <h3 className="text-lg font-semibold tracking-tight">Payment Schedule</h3>
          <p className="mt-1 text-sm text-zinc-500">Upcoming expected cash flow for the next 7 days.</p>
          <ul className="mt-4 space-y-3">
            {[
              { day: "Mon", label: "Orbit Labs", amount: "$8,240", status: "Expected" },
              { day: "Tue", label: "North Clinic", amount: "$5,980", status: "Expected" },
              { day: "Wed", label: "Nova Retail", amount: "$12,120", status: "Late" },
              { day: "Fri", label: "BluePeak", amount: "$9,640", status: "Expected" },
            ].map((item) => (
              <li key={`${item.day}-${item.label}`} className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-3.5 py-3 dark:border-zinc-800 dark:bg-zinc-900/45">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{item.day} · {item.label}</p>
                  <span className="text-sm font-semibold">{item.amount}</span>
                </div>
                <p className={`mt-1 text-xs font-medium ${item.status === "Late" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                  {item.status}
                </p>
              </li>
            ))}
          </ul>
          <Button variant="primary" className="mt-4 w-full">Download statement</Button>
        </Card>
      </div>

      <ActionModal
        open={createOpen}
        title="Create invoice"
        description="Add a new invoice record to facturation."
        confirmLabel="Create"
        onClose={() => {
          setCreateOpen(false);
          resetDraft();
        }}
        onConfirm={() => {
          if (!draftClient.trim() || !draftAmount.trim() || !draftDue.trim()) return;
          const nextId = `INV-${2036 + invoices.length}`;
          setInvoices((prev) => [
            { id: nextId, client: draftClient.trim(), amount: `$${draftAmount.trim()}`, due: draftDue.trim(), status: "Pending" },
            ...prev,
          ]);
          setCreateOpen(false);
          resetDraft();
        }}
      >
        <Input placeholder="Client name" value={draftClient} onChange={(e) => setDraftClient(e.target.value)} />
        <Input placeholder="Amount (e.g. 7,450)" value={draftAmount} onChange={(e) => setDraftAmount(e.target.value)} />
        <Input placeholder="Due date (e.g. May 30, 2026)" value={draftDue} onChange={(e) => setDraftDue(e.target.value)} />
      </ActionModal>

      <ActionModal
        open={editOpen}
        title={`Edit invoice ${selectedInvoice?.id ?? ""}`}
        description="Update client and billing details."
        confirmLabel="Save changes"
        onClose={() => {
          setEditOpen(false);
          setSelectedId(null);
          resetDraft();
        }}
        onConfirm={() => {
          if (!selectedId) return;
          setInvoices((prev) =>
            prev.map((item) =>
              item.id === selectedId
                ? { ...item, client: draftClient.trim() || item.client, amount: `$${(draftAmount.trim() || item.amount).replace("$", "")}`, due: draftDue.trim() || item.due }
                : item,
            ),
          );
          setEditOpen(false);
          setSelectedId(null);
          resetDraft();
        }}
      >
        <Input placeholder="Client name" value={draftClient} onChange={(e) => setDraftClient(e.target.value)} />
        <Input placeholder="Amount" value={draftAmount} onChange={(e) => setDraftAmount(e.target.value)} />
        <Input placeholder="Due date" value={draftDue} onChange={(e) => setDraftDue(e.target.value)} />
      </ActionModal>

      <ActionModal
        open={deleteOpen}
        title="Delete invoice"
        description={`Are you sure you want to remove ${selectedInvoice?.id ?? "this invoice"}?`}
        confirmLabel="Delete"
        tone="danger"
        onClose={() => {
          setDeleteOpen(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (!selectedId) return;
          setInvoices((prev) => prev.filter((item) => item.id !== selectedId));
          setDeleteOpen(false);
          setSelectedId(null);
        }}
      />

      <ActionModal
        open={collectOpen}
        title="Collect payment"
        description={`Mark ${selectedInvoice?.id ?? "invoice"} as paid and record payment.`}
        confirmLabel="Mark as paid"
        onClose={() => {
          setCollectOpen(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (!selectedId) return;
          setInvoices((prev) => prev.map((item) => (item.id === selectedId ? { ...item, status: "Paid" } : item)));
          setCollectOpen(false);
          setSelectedId(null);
        }}
      />
    </div>
  );
}

function AnimatedSummaryValue({ value, className }: { value: string; className: string }) {
  const parsed = parseCountUpParts(value);
  return (
    <CountUpValue
      value={parsed.value}
      prefix={parsed.prefix}
      suffix={parsed.suffix}
      decimals={parsed.decimals}
      durationMs={880}
      className={className}
    />
  );
}
