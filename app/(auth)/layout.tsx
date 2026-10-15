export default function AuthRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden px-4 py-12 text-slate-900 dark:text-zinc-100">
      <div className="absolute inset-x-0 top-[-30%] h-[560px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.22),transparent_62%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_62%)]" />
      <div className="absolute inset-x-0 top-[-10%] h-[560px] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.16),transparent_58%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.12),transparent_62%)]" />
      <div className="relative mx-auto">{children}</div>
    </div>
  );
}
