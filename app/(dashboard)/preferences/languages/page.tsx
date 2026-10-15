import { LanguageSettingsPage } from "@/app/components/blocks/language-settings-page";

export const metadata = {
  title: "Languages · Preferences",
  description: "Language selector and fallback settings",
};

export default function PreferencesLanguageRoute() {
  return <LanguageSettingsPage />;
}
