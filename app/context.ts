import { fallbackLanguageTag, type LanguageTag } from "@sozialhelden/core";
import { createContext } from "react-router";

export const i18nContext = createContext<{
  languageTag: LanguageTag;
  token?: string;
}>({
  languageTag: fallbackLanguageTag,
});

export const apiContext = createContext<{
  baseUrl?: string;
}>({});
