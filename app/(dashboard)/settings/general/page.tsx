import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

export const metadata = { title: "General · Settings", description: "General workspace settings" };

export default function SettingsGeneralPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Card>
        <div className="border-b border-zinc-200/80 pb-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold tracking-tight">Workspace identity</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Mirrors the pacing of Facit-like settings layouts—minimal, calm typography and generous gutters.
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Organization name</span>
            <input
              defaultValue="Nuxem Labs"
              className="h-10 rounded-xl border border-zinc-200 bg-zinc-50/80 px-3.5 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Default locale</span>
            <select className="h-10 rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900">
              <option value="en">English (United States)</option>
              <option value="sv">Swedish</option>
            </select>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button">Reset</Button>
          <Button variant="primary" type="button">
            Save workspace
          </Button>
        </div>
      </Card>
      <Card className="p-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
        Need granular permissions billing or integration controls? Duplicate this Card row and progressively extend the
        same component stack.
      </Card>
    </div>
  );
}
