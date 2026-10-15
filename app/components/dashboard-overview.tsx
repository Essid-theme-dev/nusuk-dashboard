"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartResponsiveContainer } from "@/app/components/charts/chart-responsive-container";

type User = {
  name: string;
  email: string;
  status: "Active" | "Pending" | "Suspended";
};

const stats = [
  { label: "Revenue", value: "$82,450", change: "+12.4%" },
  { label: "Users", value: "3,284", change: "+8.1%" },
  { label: "Orders", value: "1,209", change: "+5.6%" },
  { label: "Growth", value: "14.2%", change: "+2.3%" },
];

const chartData = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 16800 },
  { name: "Mar", revenue: 14900 },
  { name: "Apr", revenue: 19200 },
  { name: "May", revenue: 22400 },
  { name: "Jun", revenue: 23800 },
  { name: "Jul", revenue: 26100 },
];

const users: User[] = [
  { name: "Ava Johnson", email: "ava.johnson@example.com", status: "Active" },
  { name: "Liam Carter", email: "liam.carter@example.com", status: "Pending" },
  { name: "Noah Smith", email: "noah.smith@example.com", status: "Active" },
  { name: "Emma Williams", email: "emma.williams@example.com", status: "Suspended" },
  { name: "Mason Brown", email: "mason.brown@example.com", status: "Active" },
  { name: "Sophia Davis", email: "sophia.davis@example.com", status: "Pending" },
  { name: "Lucas Miller", email: "lucas.miller@example.com", status: "Active" },
  { name: "Isabella Wilson", email: "isabella.wilson@example.com", status: "Suspended" },
  { name: "Ethan Moore", email: "ethan.moore@example.com", status: "Active" },
  { name: "Mia Taylor", email: "mia.taylor@example.com", status: "Pending" },
];

const userColumns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
];

export default function DashboardOverview() {
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data: users,
    columns: userColumns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{stat.value}</p>
            <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {stat.change} this month
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-5">
          <h2 className="text-lg font-semibold tracking-tight">Revenue Trend</h2>
          <p className="text-sm text-zinc-500">Monthly performance overview</p>
        </div>

        <div className="h-72 w-full min-w-0">
          <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 288 }}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e4e4e7" />
              <XAxis dataKey="name" stroke="#71717a" axisLine={false} tickLine={false} />
              <YAxis stroke="#71717a" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e4e4e7",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartResponsiveContainer>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Users</h2>
            <p className="text-sm text-zinc-500">Search and paginate user records</p>
          </div>
          <input
            type="search"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search name, email, status..."
            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-3.5 text-sm outline-none placeholder:text-zinc-500 focus:border-indigo-300 focus:bg-white sm:w-80 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b border-zinc-100 transition-colors hover:bg-zinc-50/80 dark:border-zinc-800/80 dark:hover:bg-zinc-800/40">
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
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
