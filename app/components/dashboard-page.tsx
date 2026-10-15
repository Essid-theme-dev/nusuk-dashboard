import Image from "next/image";
import { Activity, ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { RevenueChartBlock } from "./blocks/revenue-chart-block";
import { StatsGrid } from "./blocks/stats-grid";
import { TeamGroups } from "./blocks/team-groups";
import { UsersTableBlock } from "./blocks/users-table-block";
import { EngagementChartsBlock } from "./blocks/engagement-charts-block";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const salesSpotlights = [
  {
    title: "Enterprise pipeline",
    region: "North America",
    lift: "+18.6%",
    value: "$1.24M",
    image: "https://picsum.photos/seed/sales-enterprise-boardroom/1200/720",
  },
  {
    title: "Retention campaign",
    region: "Europe",
    lift: "+12.1%",
    value: "$840K",
    image: "https://picsum.photos/seed/sales-retention-team/1200/720",
  },
  {
    title: "Product-led growth",
    region: "MENA",
    lift: "+9.4%",
    value: "$620K",
    image: "https://picsum.photos/seed/sales-product-growth/1200/720",
  },
];

export default function DashboardPage() {
  return (
    <div className="sales-ui-scope space-y-6">
      <Card className="nuxem-card-anim relative overflow-hidden border-[var(--theme-accent-soft)] bg-gradient-to-br from-[var(--theme-accent-bg)] via-white to-white p-6 dark:from-[var(--theme-accent-bg-dark)] dark:via-zinc-900 dark:to-zinc-900">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--theme-accent-ring)] blur-3xl" />
        <div className="absolute -bottom-14 left-1/3 h-32 w-32 rounded-full bg-[var(--theme-accent-soft)] blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-[var(--theme-accent-soft)] bg-white/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--theme-accent-deep)] dark:bg-zinc-900/70 dark:text-[var(--theme-accent-ink)]">
              <Sparkles size={12} />
              Sales control center
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Revenue momentum is strong this week
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
              Monitor conversion, team execution, and regional growth from one dynamic surface.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <Button variant="primary" className="h-10 w-full px-4 sm:w-auto">
              <TrendingUp size={15} className="mr-1.5" />
              View growth report
            </Button>
            <Button className="h-10 w-full px-4 sm:w-auto">
              <Activity size={15} className="mr-1.5" />
              Open live feed
            </Button>
          </div>
        </div>
      </Card>
      <section className="grid gap-4 lg:grid-cols-3">
        {salesSpotlights.map((item) => (
          <Card
            key={item.title}
            className="nuxem-card-anim group overflow-hidden border-zinc-200/80 p-0 shadow-[0_14px_36px_-30px_rgba(15,23,42,0.55)] dark:border-zinc-800"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={`${item.title} visual`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/30 bg-black/35 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                <TrendingUp size={12} />
                High intent
              </div>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{item.region}</p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                  {item.lift}
                  <ArrowUpRight size={12} />
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-zinc-500">Forecasted quarter value</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{item.value}</p>
                </div>
                <Button className="h-8 px-3 text-xs">View details</Button>
              </div>
            </div>
          </Card>
        ))}
      </section>
      <TeamGroups />
      <StatsGrid />
      <RevenueChartBlock />
      <EngagementChartsBlock />
      <UsersTableBlock />
    </div>
  );
}
