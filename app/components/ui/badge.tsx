import { clsx } from "clsx";

type BadgeTone = "green" | "amber" | "red";

type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const toneClasses: Record<BadgeTone, string> = {
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  red: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
};

export function Badge({ children, tone = "green", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
