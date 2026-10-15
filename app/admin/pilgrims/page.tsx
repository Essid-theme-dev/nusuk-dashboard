import { Suspense } from "react";
import { PilgrimsAdminList } from "@/app/components/admin/pilgrims-admin-list";

export const metadata = { title: "Pilgrims · Nusuk Admin" };

export default function AdminPilgrimsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">…</div>}>
      <PilgrimsAdminList />
    </Suspense>
  );
}
