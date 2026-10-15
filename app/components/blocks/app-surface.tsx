import { Card } from "../ui/card";

export function AppSurface({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-500">{body}</p>
      </div>
      <Card className="p-10 text-center shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <div className="mx-auto mb-6 flex max-w-lg flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Composable app shell</p>
          <p className="text-sm text-zinc-500">
            This block stands in for richer app workflows (search results, authoring tools, questionnaires). Drop in
            your domain components here—the surrounding chrome already matches your admin layout.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3">
          {["Draft", "In review", "Published"].map((label, index) => (
            <button
              key={label}
              type="button"
              className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3 py-4 text-sm font-medium text-zinc-700 hover:border-[var(--theme-accent-soft)] hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/30 dark:text-zinc-200 dark:hover:border-[var(--theme-accent-soft)]"
            >
              <span className="block text-2xl font-semibold">{10 + index * 4}</span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-zinc-400">{label}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
