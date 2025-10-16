import type { LanguageTag } from "@sozialhelden/core";
import { useLoaderData } from "react-router";
import { i18nContext } from "~/context";
import { loadMarkdownDocument } from "~/utils/content";
import type { Route } from "./+types/legal";

export async function loader({ context }: Route.LoaderArgs) {
  const { languageTag } = context.get(i18nContext);
  return loadMarkdownDocument("pages/legal", languageTag as LanguageTag);
}

export default function FaqData() {
  const content = useLoaderData();

  return (
    <article
      className="prose max-w-none"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: this is a markdown file we control
      dangerouslySetInnerHTML={{ __html: content }}
    ></article>
  );
}
