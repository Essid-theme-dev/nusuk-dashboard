import { clsx } from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={clsx(
        "rounded-[20px] border border-slate-200/85 bg-[var(--sidebar-surface)] p-6 shadow-[0_12px_40px_-34px_rgba(15,23,42,0.22)] ring-1 ring-white/65 transition-all duration-250 hover:-translate-y-[1px] hover:shadow-[0_18px_46px_-34px_rgba(15,23,42,0.32)] dark:border-white/10 dark:bg-zinc-950/55 dark:ring-white/[0.05] nuxem-card-anim",
        className,
      )}
    >
      {children}
    </section>
  );
}
