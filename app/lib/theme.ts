import type { CSSProperties } from "react";

export const DEFAULT_THEME = {
  primaryColor: "#111111",
  accentColor: "#c87941",
  backgroundColor: "#ffffff",
} as const;

export type ThemeColors = {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
};

export function resolveTheme(settings?: Partial<ThemeColors>): ThemeColors {
  return {
    primaryColor: settings?.primaryColor || DEFAULT_THEME.primaryColor,
    accentColor: settings?.accentColor || DEFAULT_THEME.accentColor,
    backgroundColor: settings?.backgroundColor || DEFAULT_THEME.backgroundColor,
  };
}

export function themeCssVars(theme: ThemeColors): CSSProperties {
  return {
    "--agency-primary": theme.primaryColor,
    "--agency-accent": theme.accentColor,
    "--agency-bg": theme.backgroundColor,
  } as CSSProperties;
}

/** Premium Makkah / Kaaba imagery (Unsplash, high-res) */
export const SACRED_IMAGES = {
  kaaba: "https://images.unsplash.com/photo-1591604129939-f1efa4d9a211?w=1920&q=85",
  kaabaNight: "https://images.unsplash.com/photo-1633542116865-8a88a83a77c4?w=1920&q=85",
  makkah: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&q=85",
  madinah: "https://images.unsplash.com/photo-1586724376265-3a60a8939a91?w=1920&q=85",
  haram: "https://images.unsplash.com/photo-1542816416-0974c7a77656?w=1920&q=85",
  pilgrims: "https://images.unsplash.com/photo-1519748172191-a2951f772315?w=1920&q=85",
  mosque: "https://images.unsplash.com/photo-1609590248906-f767b9d3d9b4?w=1920&q=85",
  jeddah: "https://images.unsplash.com/photo-1578895101408-9c5ccf79b168?w=1920&q=85",
} as const;
