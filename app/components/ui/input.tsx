import { clsx } from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/85 px-3.5 text-sm outline-none ring-[var(--theme-accent-ring)] placeholder:text-slate-500 focus:border-[var(--theme-accent)] focus:bg-white focus:ring-4 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-[var(--theme-accent)]",
        className,
      )}
      {...props}
    />
  );
}
