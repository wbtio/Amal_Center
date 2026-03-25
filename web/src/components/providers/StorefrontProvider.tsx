"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  LANGUAGE_COOKIE,
  getDirection,
  getMessages,
  translate,
  type StorefrontLanguage,
} from "@/lib/storefront";

type StorefrontContextValue = {
  language: StorefrontLanguage;
  isRTL: boolean;
  setLanguage: (language: StorefrontLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  messages: ReturnType<typeof getMessages>;
};

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

type StorefrontProviderProps = {
  children: ReactNode;
  initialLanguage: StorefrontLanguage;
};

function writeLanguage(language: StorefrontLanguage) {
  document.documentElement.lang = language;
  document.documentElement.dir = getDirection(language);
  document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=31536000; samesite=lax`;
  window.localStorage.setItem(LANGUAGE_COOKIE, language);
}

export function StorefrontProvider({
  children,
  initialLanguage,
}: StorefrontProviderProps) {
  const [language, setLanguageState] =
    useState<StorefrontLanguage>(initialLanguage);

  useEffect(() => {
    writeLanguage(language);
  }, [language]);

  const value = useMemo<StorefrontContextValue>(
    () => ({
      language,
      isRTL: getDirection(language) === "rtl",
      setLanguage: (nextLanguage) => {
        setLanguageState(nextLanguage);
        writeLanguage(nextLanguage);
      },
      toggleLanguage: () => {
        const nextLanguage = language === "ar" ? "en" : "ar";
        setLanguageState(nextLanguage);
        writeLanguage(nextLanguage);
      },
      t: (key) => translate(language, key),
      messages: getMessages(language),
    }),
    [language]
  );

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error("useStorefront must be used within StorefrontProvider");
  }

  return context;
}
