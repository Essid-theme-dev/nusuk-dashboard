import { AdminRootLayout } from "@/app/components/admin/admin-root-layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminRootLayout>{children}</AdminRootLayout>;
}
