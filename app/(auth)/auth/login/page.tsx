import Link from "next/link";
import { LogoLockup } from "@/app/components/brand/logo";
import { LoginForm } from "@/app/components/auth/login-form";
import { PageTabs } from "@/app/components/layout/page-tabs";
import { authPageTabs } from "@/app/config/navigation";

export const metadata = { title: "Login · Nuxem", description: "Sign in" };

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4">
      <div className="flex justify-center pb-2">
        <LogoLockup tagline="Modern admin UI" />
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold tracking-tight text-zinc-500">Welcome back</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sign in to continue
        </p>
      </div>

      <PageTabs items={authPageTabs} />

      <LoginForm />

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500">
        <Link href="#" className="font-medium hover:underline">
          Privacy policy
        </Link>
        <Link href="#" className="font-medium hover:underline">
          Terms of use
        </Link>
        <Link href="/" className="font-semibold text-indigo-700 hover:underline dark:text-indigo-400">
          Back to dashboard shell
        </Link>
      </div>

      <p className="text-center text-sm text-zinc-500">
        New here?
        <Link
          href="/auth/sign-up"
          className="ml-2 font-semibold text-indigo-700 hover:underline dark:text-indigo-400"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
