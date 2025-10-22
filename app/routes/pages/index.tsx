import type { LanguageTag } from "@sozialhelden/core";
import { Button } from "@sozialhelden/ui";
import { T } from "@transifex/react";
import { ArrowLeft } from "lucide-react";
import { NavLink, Outlet, useLoaderData } from "react-router";
import Main from "~/components/Main";
import { i18nContext } from "~/context";
import { type ContentId, hasContent, loadContent } from "~/utils/content";
import type { Route } from "./+types/index";

export async function loader({ context, params: { slug } }: Route.LoaderArgs) {
  const contentId = `pages/${slug}`;

  if (!hasContent(contentId)) {
    throw new Response(`Not Found`, {
      status: 404,
    });
  }

  const { languageTag } = context.get(i18nContext);
  return loadContent(contentId as ContentId, languageTag as LanguageTag);
}

export default function Page() {
  const content = useLoaderData();

  return (
    <Main className="bg-white" size="narrow">
      <article
        className="prose max-w-none my-12"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: this is a markdown file we control
        dangerouslySetInnerHTML={{ __html: content }}
      ></article>
    </Main>
  );
}
