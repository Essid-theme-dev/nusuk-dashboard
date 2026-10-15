import { AdminLoginForm } from "@/app/components/admin/admin-login-form";

export const metadata = {
  title: "Connexion · Nusuk Admin",
  description: "Connexion à l'espace d'administration",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-zinc-100 px-4 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <AdminLoginForm />
    </div>
  );
}
