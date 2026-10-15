"use client";

import { useEffect, useRef, useState } from "react";
import { CountUpValue, parseCountUpParts } from "@/app/components/ui/count-up-value";

type AnimatedStatProps = {
  value: string;
  suffix?: string | null;
  className?: string;
};

export function AnimatedStat({ value, suffix, className }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const parsed = parseCountUpParts(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const extraSuffix = suffix ?? parsed.suffix;

  return (
    <span ref={ref} className={className}>
      {started ? (
        <>
          <CountUpValue
            value={parsed.value}
            prefix={parsed.prefix}
            decimals={parsed.decimals}
            durationMs={1400}
          />
          {extraSuffix ? <span className="text-[var(--nusuk-accent)]">{extraSuffix}</span> : null}
        </>
      ) : (
        <>
          {parsed.prefix}0{extraSuffix ? <span className="text-[var(--nusuk-accent)]">{extraSuffix}</span> : null}
        </>
      )}
    </span>
  );
}
