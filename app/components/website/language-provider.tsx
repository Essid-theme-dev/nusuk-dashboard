"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  applyWebsiteLanguage,
  readWebsiteLanguage,
  WEBSITE_LANGUAGE_EVENT,
  type WebsiteLanguage,
} from "@/app/lib/website-language";

type WebsiteLanguageContextValue = {
  lang: WebsiteLanguage;
  setLang: (lang: WebsiteLanguage) => void;
  isRtl: boolean;
};

const WebsiteLanguageContext = createContext<WebsiteLanguageContextValue>({
  lang: "FR",
  setLang: () => {},
  isRtl: false,
});

export function WebsiteLanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<WebsiteLanguage>("FR");

  useEffect(() => {
    const initial = readWebsiteLanguage();
    setLangState(initial);
    applyWebsiteLanguage(initial);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<WebsiteLanguage>).detail;
      setLangState(detail);
    };
    window.addEventListener(WEBSITE_LANGUAGE_EVENT, handler);
    return () => window.removeEventListener(WEBSITE_LANGUAGE_EVENT, handler);
  }, []);

  const setLang = (next: WebsiteLanguage) => {
    applyWebsiteLanguage(next);
    setLangState(next);
  };

  return (
    <WebsiteLanguageContext.Provider value={{ lang, setLang, isRtl: lang === "AR" }}>
      {children}
    </WebsiteLanguageContext.Provider>
  );
}

export function useWebsiteLanguage() {
  return useContext(WebsiteLanguageContext);
}
