import { clsx } from "clsx";
import type { GridTile } from "./grid-cards-data";
import { Card } from "../ui/card";

const toneBar: Record<GridTile["tone"], string> = {
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};

type GridCardsPageProps = {
  title: string;
  subtitle: string;
  tiles: GridTile[];
};

export function GridCardsPage({ title, subtitle, tiles }: GridCardsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tiles.map((tile, index) => (
          <li key={tile.id}>
            <Card className="group overflow-hidden p-0 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
              <div className={clsx("h-2 w-full", toneBar[tile.tone])} />
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                  Item {index + 1}
                </p>
                <p className="mt-1 text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {tile.title}
                </p>
                <p className="mt-2 text-sm text-zinc-500">{tile.meta}</p>
                <button
                  type="button"
                  className="mt-4 inline-flex text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Open
                </button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
