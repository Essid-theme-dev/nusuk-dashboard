"use client";

import { useEffect, useMemo, useState } from "react";

type CountUpValueProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
};

export function parseCountUpParts(input: string): {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
} {
  const match = input.match(/^([^0-9-]*)(-?[0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return { value: 0, prefix: "", suffix: input, decimals: 0 };
  }
  const [, prefix, rawNumber, suffix] = match;
  const numeric = Number.parseFloat(rawNumber.replace(/,/g, ""));
  const decimalMatch = rawNumber.match(/\.(\d+)/);
  return {
    value: Number.isFinite(numeric) ? numeric : 0,
    prefix,
    suffix,
    decimals: decimalMatch ? decimalMatch[1].length : 0,
  };
}

export function CountUpValue({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 900,
  className,
}: CountUpValueProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCurrent(value);
      return;
    }

    const startedAt = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease-out cubic for a smoother KPI finish.
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(value * eased);
      if (progress >= 1) {
        window.clearInterval(tick);
      }
    }, 16);

    return () => window.clearInterval(tick);
  }, [durationMs, value]);

  const formatted = useMemo(
    () =>
      current.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [current, decimals],
  );

  return <span className={className}>{`${prefix}${formatted}${suffix}`}</span>;
}
