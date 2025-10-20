import type { LanguageTag } from "@sozialhelden/core";
import { createContext } from "react-router";

export const i18nContext = createContext<{
  languageTag?: LanguageTag;
  token?: string;
}>({});

export const apiContext = createContext<{
  baseUrl?: string;
}>({});
