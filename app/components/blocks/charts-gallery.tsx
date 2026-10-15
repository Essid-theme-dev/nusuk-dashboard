"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartResponsiveContainer } from "@/app/components/charts/chart-responsive-container";
import { Card } from "../ui/card";

const areaData = [
  { x: "W1", y: 12 },
  { x: "W2", y: 18 },
  { x: "W3", y: 16 },
  { x: "W4", y: 22 },
];

const barData = [
  { name: "Mon", val: 32 },
  { name: "Tue", val: 40 },
  { name: "Wed", val: 28 },
  { name: "Thu", val: 54 },
];

const lineData = [
  { month: "Jan", active: 420, churn: 48 },
  { month: "Feb", active: 510, churn: 55 },
  { month: "Mar", active: 620, churn: 49 },
  { month: "Apr", active: 700, churn: 53 },
  { month: "May", active: 780, churn: 47 },
  { month: "Jun", active: 860, churn: 42 },
];

const stackedData = [
  { label: "Email", won: 24, lost: 12 },
  { label: "Ads", won: 31, lost: 18 },
  { label: "Referrals", won: 20, lost: 8 },
  { label: "SEO", won: 28, lost: 11 },
];

const funnelPieData = [
  { name: "Visited", value: 100 },
  { name: "Qualified", value: 66 },
  { name: "Proposal", value: 38 },
  { name: "Closed", value: 22 },
];

const radialProgress = [{ name: "Goal", value: 78, fill: "var(--theme-accent)" }];
const pieColors = ["#3b82f6", "#10b981", "#f59e0b", "#f43f5e"];

export function ChartsGallery() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="nuxem-chart-rise">
        <h3 className="text-sm font-semibold tracking-tight">Area pulse</h3>
        <p className="text-sm text-zinc-500">Smoothed area for pacing metrics.</p>
        <div className="mt-4 h-[220px] w-full min-w-0">
          <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 220 }}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e4e4e7" />
              <XAxis dataKey="x" stroke="#71717a" axisLine={false} tickLine={false} />
              <YAxis stroke="#71717a" axisLine={false} tickLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="y"
                stroke="var(--theme-accent)"
                fill="color-mix(in srgb, var(--theme-accent) 24%, transparent)"
                strokeWidth={2}
                isAnimationActive
                animationDuration={900}
              />
            </AreaChart>
          </ChartResponsiveContainer>
        </div>
      </Card>
      <Card className="nuxem-chart-rise">
        <h3 className="text-sm font-semibold tracking-tight">Bar rhythm</h3>
        <p className="text-sm text-zinc-500">Compact bars ideal for categorical comparisons.</p>
        <div className="mt-4 h-[220px] w-full min-w-0">
          <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 220 }}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e4e4e7" />
              <XAxis dataKey="name" stroke="#71717a" axisLine={false} tickLine={false} />
              <YAxis stroke="#71717a" axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="val" fill="var(--theme-accent)" radius={[8, 8, 8, 8]} isAnimationActive animationDuration={1000} />
            </BarChart>
          </ChartResponsiveContainer>
        </div>
      </Card>

      <Card className="nuxem-chart-rise">
        <h3 className="text-sm font-semibold tracking-tight">Growth vs Churn</h3>
        <p className="text-sm text-zinc-500">Dual-line trend with animated transitions.</p>
        <div className="mt-4 h-[220px] w-full min-w-0">
          <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 220 }}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e4e4e7" />
              <XAxis dataKey="month" stroke="#71717a" axisLine={false} tickLine={false} />
              <YAxis stroke="#71717a" axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend
                wrapperStyle={{ paddingTop: 10 }}
                formatter={(value) => <span className="nuxem-legend-chip">{String(value)}</span>}
              />
              <Line type="monotone" dataKey="active" stroke="var(--theme-accent)" strokeWidth={2.5} dot={false} isAnimationActive animationDuration={900} />
              <Line type="monotone" dataKey="churn" stroke="#f97316" strokeWidth={2.5} dot={false} isAnimationActive animationDuration={1100} />
            </LineChart>
          </ChartResponsiveContainer>
        </div>
      </Card>

      <Card className="nuxem-chart-rise">
        <h3 className="text-sm font-semibold tracking-tight">Stacked Results</h3>
        <p className="text-sm text-zinc-500">Won vs lost opportunities by channel.</p>
        <div className="mt-4 h-[220px] w-full min-w-0">
          <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 220 }}>
            <ComposedChart data={stackedData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e4e4e7" />
              <XAxis dataKey="label" stroke="#71717a" axisLine={false} tickLine={false} />
              <YAxis stroke="#71717a" axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend
                wrapperStyle={{ paddingTop: 10 }}
                formatter={(value) => <span className="nuxem-legend-chip">{String(value)}</span>}
              />
              <Bar dataKey="won" stackId="a" fill="var(--theme-accent)" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={900} />
              <Bar dataKey="lost" stackId="a" fill="#f97316" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={1150} />
            </ComposedChart>
          </ChartResponsiveContainer>
        </div>
      </Card>

      <Card className="nuxem-chart-rise">
        <h3 className="text-sm font-semibold tracking-tight">Funnel Split</h3>
        <p className="text-sm text-zinc-500">Stage distribution from top to conversion.</p>
        <div className="mt-4 h-[220px] w-full min-w-0">
          <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 220 }}>
            <PieChart>
              <Pie data={funnelPieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={82} paddingAngle={3} isAnimationActive animationDuration={1200}>
                {funnelPieData.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartResponsiveContainer>
        </div>
      </Card>

      <Card className="nuxem-chart-rise">
        <h3 className="text-sm font-semibold tracking-tight">Quarter Goal</h3>
        <p className="text-sm text-zinc-500">Radial progress with motion.</p>
        <div className="mt-4 h-[220px] w-full min-w-0">
          <ChartResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 220 }}>
            <RadialBarChart innerRadius="58%" outerRadius="92%" data={radialProgress} startAngle={90} endAngle={-270}>
              <RadialBar background dataKey="value" cornerRadius={10} isAnimationActive animationDuration={1200} />
              <Tooltip />
            </RadialBarChart>
          </ChartResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-sm font-semibold text-[var(--theme-accent-deep)] dark:text-[var(--theme-accent-ink)]">78% completed</p>
      </Card>
    </div>
  );
}
