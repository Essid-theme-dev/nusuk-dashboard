"use client";

import { Bar, BarChart, Cell, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartResponsiveContainer } from "@/app/components/charts/chart-responsive-container";
import { Card } from "../ui/card";

const channelData = [
  { name: "Organic", value: 42 },
  { name: "Paid", value: 28 },
  { name: "Social", value: 18 },
  { name: "Referral", value: 12 },
];

const funnelData = [
  { name: "Visited", value: 100 },
  { name: "Signed up", value: 63 },
  { name: "Activated", value: 39 },
  { name: "Retained", value: 24 },
];

const pieColors = ["#3b82f6", "#10b981", "#f59e0b", "#f43f5e"];

export function EngagementChartsBlock() {
  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <Card className="nuxem-chart-rise">
        <div className="mb-4">
          <h3 className="text-lg font-semibold tracking-tight">Acquisition Channels</h3>
          <p className="text-sm text-zinc-500">Traffic distribution by source</p>
        </div>
        <div className="h-64 w-full min-w-0">
          <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 256 }}>
            <BarChart data={channelData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(59,130,246,0.08)" }}
                contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7" }}
              />
              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                fill="var(--theme-accent)"
                isAnimationActive
                animationDuration={1100}
                animationEasing="ease-out"
              />
            </BarChart>
          </ChartResponsiveContainer>
        </div>
      </Card>

      <Card className="nuxem-chart-rise">
        <div className="mb-4">
          <h3 className="text-lg font-semibold tracking-tight">Conversion Funnel</h3>
          <p className="text-sm text-zinc-500">Journey from visit to retention</p>
        </div>
        <div className="h-64 w-full min-w-0">
          <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 256 }}>
            <PieChart>
              <Pie
                data={funnelData}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={84}
                paddingAngle={3}
                isAnimationActive
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {funnelData.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7" }} />
            </PieChart>
          </ChartResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}
