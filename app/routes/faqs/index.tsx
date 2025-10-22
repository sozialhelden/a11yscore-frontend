import type { LanguageTag } from "@sozialhelden/core";
import { Outlet, useLoaderData } from "react-router";
import FaqLinks from "~/components/FaqLinks";
import { i18nContext } from "~/context";
import { type ContentId, hasContent, loadContent } from "~/utils/content";
import type { Route } from "./+types/index";

export async function loader({ params: { slug }, context }: Route.LoaderArgs) {
  const contentId = `faqs/${slug}`;

  if (!hasContent(contentId)) {
    throw new Response(`Not Found`, {
      status: 404,
    });
  }

  const { languageTag } = context.get(i18nContext);
  return loadContent(contentId as ContentId, languageTag as LanguageTag);
}

export default function FaqPage() {
  const content = useLoaderData();

  return (
    <article
      className="prose max-w-none"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: this comes from a file we control
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
