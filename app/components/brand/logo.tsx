"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { publicAssetPath } from "@/app/lib/public-asset";

type LogoMarkProps = {
  width?: number;
  height?: number;
  className?: string;
  variant?: "default" | "white";
  src?: string;
};

export function LogoMark({ width = 120, height = 48, className, variant = "default", src }: LogoMarkProps) {
  const logoSrc = src ?? publicAssetPath("/logo.jpg");
  return (
    <Image
      src={logoSrc}
      alt="Nusuk — نسك للخدمات السياحية"
      width={width}
      height={height}
      className={clsx(
        "shrink-0 rounded-lg object-contain",
        variant === "white" && "brightness-110 drop-shadow-lg",
        className,
      )}
      priority
    />
  );
}

type LogoLockupProps = {
  collapsed?: boolean;
  tagline?: string;
  variant?: "default" | "white";
  logoSrc?: string;
};

export function LogoLockup({ collapsed = false, tagline, variant = "default", logoSrc }: LogoLockupProps) {
  if (collapsed) {
    return <LogoMark width={40} height={40} variant={variant} src={logoSrc} className="rounded-lg" />;
  }

  return (
    <div className={clsx("flex flex-col items-center gap-0.5", tagline && "text-center")}>
      <LogoMark width={110} height={44} variant={variant} src={logoSrc} />
      {tagline ? (
        <p className={clsx("text-[10px] font-medium tracking-wide", variant === "white" ? "text-[var(--nusuk-accent-light)]" : "text-zinc-500")}>
          {tagline}
        </p>
      ) : null}
    </div>
  );
}
