"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";

export function SignUpForm() {
  return (
    <Card className="p-8">
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">First name</span>
            <Input autoComplete="given-name" placeholder="Ada" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Last name</span>
            <Input autoComplete="family-name" placeholder="Lovelace" />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Work email</span>
          <Input type="email" autoComplete="email" placeholder="you@company.com" />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Password</span>
          <Input type="password" autoComplete="new-password" placeholder="At least 8 characters" />
        </label>
        <label className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input type="checkbox" className="mt-1" />
          <span>
            I agree to the placeholder terms—these mirror common Facit onboarding screens without copying prose.
          </span>
        </label>
        <Button variant="primary" type="submit" className="h-11 w-full text-base font-semibold">
          Create account
        </Button>
      </form>
    </Card>
  );
}
