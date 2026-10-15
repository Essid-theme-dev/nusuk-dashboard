import DashboardShell from "@/app/components/dashboard-shell";

export default function DashboardRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>;
}
