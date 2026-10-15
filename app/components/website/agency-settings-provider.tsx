"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AgencySettings } from "@/app/lib/mappers";

const AgencySettingsContext = createContext<AgencySettings | null>(null);

export function AgencySettingsProvider({
  settings,
  children,
}: {
  settings: AgencySettings;
  children: ReactNode;
}) {
  return (
    <AgencySettingsContext.Provider value={settings}>{children}</AgencySettingsContext.Provider>
  );
}

export function useAgencySettings() {
  const ctx = useContext(AgencySettingsContext);
  if (!ctx) {
    throw new Error("useAgencySettings must be used within AgencySettingsProvider");
  }
  return ctx;
}
