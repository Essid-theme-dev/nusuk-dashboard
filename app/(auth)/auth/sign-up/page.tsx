import Link from "next/link";
import { LogoLockup } from "@/app/components/brand/logo";
import { SignUpForm } from "@/app/components/auth/sign-up-form";
import { PageTabs } from "@/app/components/layout/page-tabs";
import { authPageTabs } from "@/app/config/navigation";

export const metadata = { title: "Sign up · Nuxem", description: "Create account" };

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-10">
      <div className="flex justify-center pb-2">
        <LogoLockup tagline="Modern admin UI" />
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold tracking-tight text-zinc-500">Create workspace</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Spin up your Nuxem org
        </p>
      </div>

      <PageTabs items={authPageTabs} />

      <SignUpForm />

      <p className="text-center text-sm text-zinc-500">
        Already onboarded?
        <Link
          href="/auth/login"
          className="ml-2 font-semibold text-indigo-700 hover:underline dark:text-indigo-400"
        >
          Back to login
        </Link>
        <span aria-hidden className="mx-2 text-zinc-300 dark:text-zinc-700">
          ·
        </span>
        <Link href="/" className="font-semibold hover:underline">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
