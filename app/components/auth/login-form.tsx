"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";

export function LoginForm() {
  return (
    <Card className="p-8">
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Username or email</span>
          <Input autoComplete="username" defaultValue="john" />
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Looks good!</span>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Password</span>
          <Input type="password" autoComplete="current-password" defaultValue="@ABC123" />
        </label>
        <Button variant="primary" type="submit" className="mt-6 h-11 w-full text-base font-semibold">
          Continue
        </Button>

        <p className="mt-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          <span className="flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800" aria-hidden />OR
          <span className="flex-1 border-t border-dashed border-zinc-200 dark:border-zinc-800" aria-hidden />
        </p>

        <div className="grid gap-2">
          <Button type="button" className="h-11 w-full">
            <span className="mr-2 inline-flex size-4 items-center justify-center" aria-hidden>
              <svg viewBox="0 0 24 24" className="size-4" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 4 1.5l2.7-2.6C17 3.3 14.8 2.5 12 2.5A9.5 9.5 0 0 0 12 21.5c5.5 0 9.2-3.8 9.2-9.2 0-.6-.1-1.1-.2-1.6H12z"/>
                <path fill="#4285F4" d="M3.6 7.9 6.8 10.3A6 6 0 0 1 12 6c1.9 0 3.2.8 4 1.5l2.7-2.6C17 3.3 14.8 2.5 12 2.5 8.3 2.5 5.1 4.6 3.6 7.9z"/>
                <path fill="#FBBC05" d="M12 21.5c2.7 0 4.9-.9 6.6-2.4l-3.1-2.5c-.8.6-2 1-3.5 1-2.6 0-4.8-1.8-5.6-4.1l-3.2 2.5A9.5 9.5 0 0 0 12 21.5z"/>
                <path fill="#34A853" d="M3.2 16l3.2-2.5A6 6 0 0 1 6 12c0-.5.1-1 .3-1.5L3.1 8A9.5 9.5 0 0 0 2.5 12c0 1.4.3 2.8.7 4z"/>
              </svg>
            </span>
            Continue with Google
          </Button>
          <Button type="button" className="h-11 w-full">
            <span className="mr-2 inline-flex size-4 items-center justify-center text-zinc-900 dark:text-zinc-100" aria-hidden>
              <svg viewBox="0 0 24 24" className="size-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.37 12.44c.02 2.58 2.26 3.43 2.28 3.44-.02.06-.35 1.2-1.14 2.38-.68 1.02-1.39 2.03-2.5 2.05-1.08.02-1.43-.64-2.68-.64-1.25 0-1.64.62-2.66.66-1.07.04-1.88-1.07-2.57-2.08-1.41-2.04-2.48-5.77-1.04-8.28.72-1.24 2-2.03 3.4-2.05 1.06-.02 2.07.72 2.68.72.61 0 1.76-.9 2.96-.77.5.02 1.9.2 2.8 1.52-.07.05-1.67.97-1.65 2.89ZM14.9 6.22c.57-.69.95-1.65.84-2.61-.82.03-1.81.54-2.4 1.23-.52.6-.98 1.57-.86 2.5.92.07 1.85-.46 2.42-1.12Z"/>
              </svg>
            </span>
            Sign in with Apple
          </Button>
        </div>
      </form>
    </Card>
  );
}
