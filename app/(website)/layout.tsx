import type { Metadata } from "next";
import { AgencySettingsProvider } from "@/app/components/website/agency-settings-provider";
import { WebsiteFooter, WebsiteHeader } from "@/app/components/website/header-footer";
import { WebsiteLanguageProvider } from "@/app/components/website/language-provider";
import { getAgencySettings } from "@/app/lib/data-store";
import { resolveTheme, themeCssVars } from "@/app/lib/theme";

export const metadata: Metadata = {
  title: "Nusuk — نسك للخدمات السياحية | Omra & Hajj",
  description: "Agence de voyage spécialisée Omra et Hajj. Programmes complets, hôtels premium et accompagnement religieux.",
};

export const dynamic = "force-dynamic";

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getAgencySettings();
  const theme = resolveTheme(settings);

  return (
    <WebsiteLanguageProvider>
      <AgencySettingsProvider settings={settings}>
        <div
          className="nusuk-website flex min-h-screen flex-col bg-[var(--nusuk-bg)]"
          style={themeCssVars(theme)}
        >
          <WebsiteHeader />
          <main className="flex-1">{children}</main>
          <WebsiteFooter />
        </div>
      </AgencySettingsProvider>
    </WebsiteLanguageProvider>
  );
}
