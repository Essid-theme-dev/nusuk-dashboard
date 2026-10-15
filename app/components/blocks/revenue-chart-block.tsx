"use client";

import { Area, AreaChart, CartesianGrid, Line, Tooltip, XAxis, YAxis } from "recharts";
import { ChartResponsiveContainer } from "@/app/components/charts/chart-responsive-container";
import { revenueData } from "./dashboard-data";
import { Card } from "../ui/card";

export function RevenueChartBlock() {
  return (
    <Card className="nuxem-card-anim nuxem-chart-glow border-[var(--theme-accent-soft)]/40">
      <div className="mb-5">
        <h2 className="text-lg font-semibold tracking-tight">Revenue Trend</h2>
        <p className="text-sm text-zinc-500">Monthly performance overview</p>
      </div>

      <div className="h-72 w-full min-w-0">
        <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 288 }}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e4e4e7" />
            <XAxis dataKey="name" stroke="#71717a" axisLine={false} tickLine={false} />
            <YAxis stroke="#71717a" axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e4e4e7",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="none"
              fill="url(#revenueArea)"
              fillOpacity={1}
              isAnimationActive
              animationDuration={700}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--theme-accent)"
              strokeWidth={3}
              dot={{ r: 0 }}
              activeDot={{ r: 6 }}
              isAnimationActive
              animationDuration={900}
              animationBegin={120}
              animationEasing="ease-in-out"
            />
            <defs>
              <linearGradient id="revenueArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--theme-accent)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--theme-accent)" stopOpacity={0.03} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartResponsiveContainer>
      </div>
    </Card>
  );
}
