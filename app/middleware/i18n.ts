import {
  fallbackLanguageTag,
  getILanguageTagsFromAcceptLanguageHeader,
  getMostPreferableLanguageTag,
} from "@sozialhelden/core";
import type { MiddlewareFunction } from "react-router";
import { i18nContext } from "~/context";

export async function i18nMiddleware({
  request,
  context,
}: Parameters<MiddlewareFunction>[0]) {
  const acceptLanguageHeader = request.headers.get("accept-language");

  const languageTag = acceptLanguageHeader
    ? getMostPreferableLanguageTag(
        getILanguageTagsFromAcceptLanguageHeader(acceptLanguageHeader),
      )
    : fallbackLanguageTag;

  context.set(i18nContext, { languageTag });
}
