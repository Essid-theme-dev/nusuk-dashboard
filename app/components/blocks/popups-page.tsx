"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

function Modal({
  title,
  body,
  open,
  onClose,
}: {
  title: string;
  body: string;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-zinc-500">{body}</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onClose}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PopupsPage() {
  const [openBasic, setOpenBasic] = useState(false);
  const [openDanger, setOpenDanger] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Popup patterns</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Dialogs and confirmation modals</h2>
        <p className="mt-1 text-sm text-zinc-500">Reusable modal components for alerts, confirmation, and actions.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-base font-semibold">Basic confirmation</h3>
          <p className="mt-1 text-sm text-zinc-500">Use for non-destructive actions and quick acknowledgements.</p>
          <Button variant="primary" className="mt-4" onClick={() => setOpenBasic(true)}>
            Open popup
          </Button>
        </Card>

        <Card>
          <h3 className="text-base font-semibold">Danger confirmation</h3>
          <p className="mt-1 text-sm text-zinc-500">Use for delete/archive actions requiring user confirmation.</p>
          <Button className="mt-4 border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-900/60 dark:text-rose-300 dark:hover:bg-rose-950/30" onClick={() => setOpenDanger(true)}>
            Delete popup
          </Button>
        </Card>
      </div>

      <Modal
        open={openBasic}
        onClose={() => setOpenBasic(false)}
        title="Publish this section?"
        body="This action will make the latest changes visible to all workspace members."
      />
      <Modal
        open={openDanger}
        onClose={() => setOpenDanger(false)}
        title="Delete this project?"
        body="This operation cannot be undone. All linked tasks and activity logs will be removed."
      />
    </div>
  );
}
