export type WebsiteLanguage = "FR" | "AR";

export const WEBSITE_LANGUAGE_KEY = "nusuk-lang";
export const WEBSITE_LANGUAGE_EVENT = "nusuk-lang-change";

const htmlLangMap: Record<WebsiteLanguage, string> = {
  FR: "fr",
  AR: "ar",
};

export function readWebsiteLanguage(): WebsiteLanguage {
  if (typeof window === "undefined") return "FR";
  const stored = window.localStorage.getItem(WEBSITE_LANGUAGE_KEY);
  if (stored === "FR" || stored === "AR") return stored;
  return "FR";
}

export function applyWebsiteLanguage(lang: WebsiteLanguage) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WEBSITE_LANGUAGE_KEY, lang);
  document.documentElement.lang = htmlLangMap[lang];
  document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
  window.dispatchEvent(new CustomEvent(WEBSITE_LANGUAGE_EVENT, { detail: lang }));
}

export function isRtl(lang: WebsiteLanguage): boolean {
  return lang === "AR";
}
