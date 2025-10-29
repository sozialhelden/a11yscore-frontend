import { fallbackLanguageTag, type LanguageTag } from "@sozialhelden/core";
import { createContext, type ReactNode, useContext } from "react";

export type I18nContextType = {
  languageTag: LanguageTag;
};

export const I18nContext = createContext<I18nContextType>({
  languageTag: fallbackLanguageTag,
});

export function I18nContextProvider({
  languageTag,
  children,
}: {
  languageTag: LanguageTag;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ languageTag }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
