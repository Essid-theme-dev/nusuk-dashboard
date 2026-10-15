export type AppLanguage = "FR" | "AR";

export const APP_LANGUAGE_EVENT = "app-language-change";
export const APP_LANGUAGE_KEY = "app-language";

const htmlLangMap: Record<AppLanguage, string> = {
  FR: "fr",
  AR: "ar",
};

export function readLanguage(): AppLanguage {
  if (typeof window === "undefined") return "FR";
  const stored = window.localStorage.getItem(APP_LANGUAGE_KEY);
  if (stored === "FR" || stored === "AR") return stored;
  return "FR";
}

export function applyLanguage(next: AppLanguage) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(APP_LANGUAGE_KEY, next);
  document.documentElement.lang = htmlLangMap[next];
  document.documentElement.dir = next === "AR" ? "rtl" : "ltr";
  window.dispatchEvent(new CustomEvent(APP_LANGUAGE_EVENT, { detail: next }));
}

export function isRtl(lang: AppLanguage): boolean {
  return lang === "AR";
}
