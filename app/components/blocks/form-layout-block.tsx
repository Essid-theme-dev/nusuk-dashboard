import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

export function FormLayoutBlock() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-zinc-200/80 pb-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold tracking-tight">Profile</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Grouped sections with breathable spacing—the same rhythm as Facit form layouts (inspired UI, original
            copy).
          </p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">First name</span>
            <Input defaultValue="Ava" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Last name</span>
            <Input defaultValue="Johnson" />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-medium">Role</span>
            <Input defaultValue="Product designer" placeholder="Role" />
          </label>
        </div>
      </Card>

      <Card>
        <div className="border-b border-zinc-200/80 pb-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
          <p className="mt-1 text-sm text-zinc-500">Emails and links used for invitations and reminders.</p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-medium">Email</span>
            <Input type="email" defaultValue="ava.johnson@example.com" />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-medium">Bio</span>
            <textarea
              className="min-h-[112px] w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-3.5 py-3 text-sm outline-none placeholder:text-zinc-500 focus:border-indigo-300 focus:bg-white dark:border-zinc-700 dark:bg-zinc-900"
              defaultValue="Designing approachable analytics experiences for SMB teams."
            />
          </label>
        </div>
      </Card>

      <div className="flex flex-wrap justify-end gap-3">
        <Button type="button">Discard</Button>
        <Button type="button" variant="primary">
          Save changes
        </Button>
      </div>
    </div>
  );
}
