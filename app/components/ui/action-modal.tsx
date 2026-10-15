"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./button";

type ActionModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "default" | "danger";
  onClose: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
};

export function ActionModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  onClose,
  onConfirm,
  children,
}: ActionModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!open) return null;
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] grid place-items-center bg-black/45 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {description ? <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p> : null}
        {children ? <div className="mt-4 space-y-3">{children}</div> : null}
        <div className="mt-5 flex items-center justify-end gap-2">
          <Button type="button" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={tone === "danger" ? "secondary" : "primary"}
            onClick={onConfirm}
            style={tone === "danger" ? { color: "#ffffff" } : undefined}
            className={tone === "danger" ? "border-red-600 bg-red-600 !text-white hover:border-red-700 hover:bg-red-700 hover:!text-white dark:border-red-700 dark:bg-red-700 dark:hover:border-red-600 dark:hover:bg-red-600 dark:hover:!text-white" : ""}
          >
            {tone === "danger" ? <span className="text-white">{confirmLabel}</span> : confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
