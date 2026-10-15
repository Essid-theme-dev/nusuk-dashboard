"use client";

import { ResponsiveContainer, type ResponsiveContainerProps } from "recharts";

/** Recharts defaults to -1×-1 before layout; that spams warnings during Next static generation. */
const CHART_SSR_FALLBACK = { width: 640, height: 320 } as const;

export type ChartResponsiveContainerProps = Omit<ResponsiveContainerProps, "initialDimension"> & {
  initialDimension?: ResponsiveContainerProps["initialDimension"];
};

export function ChartResponsiveContainer({
  children,
  initialDimension = CHART_SSR_FALLBACK,
  ...rest
}: ChartResponsiveContainerProps) {
  return (
    <ResponsiveContainer initialDimension={initialDimension} {...rest}>
      {children}
    </ResponsiveContainer>
  );
}
