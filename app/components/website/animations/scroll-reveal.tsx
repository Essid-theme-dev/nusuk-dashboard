"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { clsx } from "clsx";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
};

export function ScrollReveal({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass = {
    up: "nusuk-reveal-up",
    down: "nusuk-reveal-down",
    left: "nusuk-reveal-left",
    right: "nusuk-reveal-right",
    fade: "nusuk-reveal-fade",
  }[direction];

  return (
    <div
      ref={ref}
      className={clsx(dirClass, visible && "nusuk-revealed", className)}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: visible ? "0.8s" : undefined,
      }}
    >
      {children}
    </div>
  );
}
