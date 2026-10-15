import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-[var(--brand-fill-from)] via-[var(--brand-fill-from)] to-[var(--brand-fill-to)] text-white hover:brightness-105 hover:shadow-md",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-[var(--theme-accent-soft)] hover:bg-[var(--theme-accent-bg)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-[var(--theme-accent-soft)] dark:hover:bg-[var(--theme-accent-bg-dark)]",
};

export function Button({ className, variant = "secondary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
