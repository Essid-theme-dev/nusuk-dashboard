"use client";

import Image from "next/image";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { demoAvatarUrl } from "@/app/lib/demo-avatars";
import { users, type UserRow } from "./dashboard-data";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { ActionModal } from "../ui/action-modal";

type UserStatus = UserRow["status"];
type UserWithAvatar = UserRow & { avatar?: string };

export function UsersTableBlock() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rows, setRows] = useState<UserWithAvatar[]>(users);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftEmail, setDraftEmail] = useState("");
  const [draftStatus, setDraftStatus] = useState<UserStatus>("Active");
  const [draftAvatar, setDraftAvatar] = useState("");

  const resetDraft = () => {
    setDraftName("");
    setDraftEmail("");
    setDraftStatus("Active");
    setDraftAvatar("");
  };

  const selectedUser = rows.find((row) => row.email === selectedEmail) ?? null;

  const userColumns = useMemo<ColumnDef<UserWithAvatar>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const user = row.original;
          const seed = user.email.replace(/[^a-zA-Z0-9]/g, "");
          return (
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700">
                <Image
                  src={user.avatar || demoAvatarUrl(seed, 96)}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium">{user.name}</span>
            </div>
          );
        },
      },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const tone = status === "Active" ? "green" : status === "Pending" ? "amber" : "red";
          return <Badge tone={tone}>{status}</Badge>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-1.5">
              <Button
                className="h-8 px-2.5 text-xs"
                onClick={() => {
                  setSelectedEmail(user.email);
                  setDraftName(user.name);
                  setDraftEmail(user.email);
                  setDraftStatus(user.status);
                  setDraftAvatar(user.avatar ?? "");
                  setEditOpen(true);
                }}
              >
                Edit
              </Button>
              <button
                type="button"
                className="inline-flex h-8 items-center justify-center rounded-xl border border-red-600 bg-red-600 px-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-red-700 hover:bg-red-700 active:translate-y-0 dark:border-red-700 dark:bg-red-700 dark:hover:border-red-600 dark:hover:bg-red-600"
                onClick={() => {
                  setSelectedEmail(user.email);
                  setDeleteOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: rows,
    columns: userColumns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setDraftAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="nuxem-card-anim hover-lift">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Users</h2>
          <p className="text-sm text-zinc-500">Search and paginate user records</p>
        </div>
        <div className="flex gap-2">
          <Input
            type="search"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search name, email, status..."
            className="sm:w-80"
          />
          <Button variant="primary" className="h-10 px-3" onClick={() => setCreateOpen(true)}>
            Add user
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-200"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUpAZ size={12} />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDownAZ size={12} />
                        ) : null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="nuxem-row-anim border-b border-zinc-100 transition-colors hover:bg-zinc-50/80 dark:border-zinc-800/80 dark:hover:bg-zinc-800/40"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={userColumns.length} className="px-3 py-8 text-center text-zinc-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </p>
        <div className="flex gap-2">
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      <ActionModal
        open={createOpen}
        title="Add user"
        description="Create a new user account record."
        confirmLabel="Create user"
        onClose={() => {
          setCreateOpen(false);
          resetDraft();
        }}
        onConfirm={() => {
          if (!draftName.trim() || !draftEmail.trim()) return;
          const nextEmail = draftEmail.trim().toLowerCase();
          const exists = rows.some((item) => item.email.toLowerCase() === nextEmail);
          if (exists) return;
          setRows((prev) => [
            { name: draftName.trim(), email: nextEmail, status: draftStatus, avatar: draftAvatar || undefined },
            ...prev,
          ]);
          setCreateOpen(false);
          resetDraft();
        }}
      >
        <Input placeholder="Full name" value={draftName} onChange={(event) => setDraftName(event.target.value)} />
        <Input placeholder="Email address" value={draftEmail} onChange={(event) => setDraftEmail(event.target.value)} />
        <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/45">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">User photo</p>
          <label className="mt-1 block cursor-pointer rounded-xl border border-dashed border-zinc-300 bg-white px-3 py-4 text-center text-xs font-medium text-zinc-600 hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)]">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarFileChange}
              className="hidden"
            />
            Click to choose photo
          </label>
          {draftAvatar ? (
            <div className="mt-4 inline-flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs dark:border-zinc-700 dark:bg-zinc-900">
              <span className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={draftAvatar} alt="Avatar preview" fill className="object-cover" />
              </span>
              <span className="font-medium text-zinc-600 dark:text-zinc-300">Preview ready</span>
            </div>
          ) : (
            <p className="mt-3 text-xs text-zinc-500">Upload a clear square photo for best result.</p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["Active", "Pending", "Suspended"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setDraftStatus(status)}
              className={`rounded-xl border px-2.5 py-2 text-xs font-semibold transition ${
                draftStatus === status
                  ? "border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] text-[var(--theme-accent-deep)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]"
                  : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </ActionModal>

      <ActionModal
        open={editOpen}
        title={`Edit user ${selectedUser?.name ?? ""}`}
        description="Update user profile and status."
        confirmLabel="Save changes"
        onClose={() => {
          setEditOpen(false);
          setSelectedEmail(null);
          resetDraft();
        }}
        onConfirm={() => {
          if (!selectedEmail || !draftName.trim() || !draftEmail.trim()) return;
          const nextEmail = draftEmail.trim().toLowerCase();
          const emailConflict = rows.some(
            (item) => item.email.toLowerCase() === nextEmail && item.email !== selectedEmail,
          );
          if (emailConflict) return;
          setRows((prev) =>
            prev.map((item) =>
              item.email === selectedEmail
                ? {
                    ...item,
                    name: draftName.trim(),
                    email: nextEmail,
                    status: draftStatus,
                    avatar: draftAvatar || undefined,
                  }
                : item,
            ),
          );
          setEditOpen(false);
          setSelectedEmail(null);
          resetDraft();
        }}
      >
        <Input placeholder="Full name" value={draftName} onChange={(event) => setDraftName(event.target.value)} />
        <Input placeholder="Email address" value={draftEmail} onChange={(event) => setDraftEmail(event.target.value)} />
        <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/45">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">User photo</p>
          <label className="mt-1 block cursor-pointer rounded-xl border border-dashed border-zinc-300 bg-white px-3 py-4 text-center text-xs font-medium text-zinc-600 hover:border-[var(--theme-accent-soft)] hover:text-[var(--theme-accent-deep)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-[var(--theme-accent-soft)] dark:hover:text-[var(--theme-accent-ink)]">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarFileChange}
              className="hidden"
            />
            Click to choose photo
          </label>
          {draftAvatar ? (
            <div className="mt-4 inline-flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs dark:border-zinc-700 dark:bg-zinc-900">
              <span className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={draftAvatar} alt="Avatar preview" fill className="object-cover" />
              </span>
              <span className="font-medium text-zinc-600 dark:text-zinc-300">Preview ready</span>
            </div>
          ) : (
            <p className="mt-3 text-xs text-zinc-500">Upload a clear square photo for best result.</p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["Active", "Pending", "Suspended"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setDraftStatus(status)}
              className={`rounded-xl border px-2.5 py-2 text-xs font-semibold transition ${
                draftStatus === status
                  ? "border-[var(--theme-accent-soft)] bg-[var(--theme-accent-bg)] text-[var(--theme-accent-deep)] dark:bg-[var(--theme-accent-bg-dark)] dark:text-[var(--theme-accent-ink)]"
                  : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </ActionModal>

      <ActionModal
        open={deleteOpen}
        title="Delete user"
        description={`Are you sure you want to delete ${selectedUser?.name ?? "this user"}?`}
        confirmLabel="Delete"
        tone="danger"
        onClose={() => {
          setDeleteOpen(false);
          setSelectedEmail(null);
        }}
        onConfirm={() => {
          if (!selectedEmail) return;
          setRows((prev) => prev.filter((item) => item.email !== selectedEmail));
          setDeleteOpen(false);
          setSelectedEmail(null);
        }}
      />
    </Card>
  );
}
