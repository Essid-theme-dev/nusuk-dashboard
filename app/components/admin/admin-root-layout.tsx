"use client";

import { usePathname } from "next/navigation";
import DashboardShell from "@/app/components/dashboard-shell";

export function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <DashboardShell>
      <div className="nusuk-admin-scope">{children}</div>
    </DashboardShell>
  );
}
