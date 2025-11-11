import type { LanguageTag } from "@sozialhelden/core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sozialhelden/ui";
import { T } from "@transifex/react";
import { useLoaderData } from "react-router";
import CategoryIcon from "~/components/Icon";
import OSMTag from "~/components/OSMTag";
import { i18nContext } from "~/context";
import type { OsmTagsUsed } from "~/routes/faqs/types/api";
import { apiFetch } from "~/utils/api";
import { loadContent } from "~/utils/content";
import type { Route } from "./+types/data";

export async function loader({ context }: Route.LoaderArgs) {
  const { languageTag } = context.get(i18nContext);

  const data = await apiFetch<OsmTagsUsed>(context, "v1/osm-tags");
  const content = loadContent(
    "faqs/what-data-is-being-used",
    languageTag as LanguageTag,
  );

  return { data, content };
}

export default function FaqData() {
  const { data, content } = useLoaderData<{
    data: OsmTagsUsed;
    content: string;
  }>();

  return (
    <article className="prose max-w-none">
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: we control this
        dangerouslySetInnerHTML={{ __html: content }}
        className="[&_h2]:first:mt-0"
      />

      <h2>
        <T _str="Tags used for categories" />
      </h2>

      <Table className="not-prose">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">
              <T _str="Top-level Category" />
            </TableHead>
            <TableHead className="w-1/3">
              <T _str="Sub Category" />
            </TableHead>
            <TableHead className="w-1/3">
              <T _str="Relevant OSM Tags" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.topLevelCategories.map((category) => {
            return category.subCategories.map((subCategory, index) => (
              <TableRow key={subCategory.id}>
                <TableCell className="align-top py-3">
                  {index === 0 && (
                    <span className="inline-flex items-center gap-2 underline font-medium">
                      <CategoryIcon id={category.id} aria-hidden size={20} />
                      <span>{category.name}</span>
                    </span>
                  )}
                </TableCell>
                <TableCell className="align-top py-3 font-medium">
                  {subCategory.name}
                </TableCell>
                <TableCell className="align-top py-3">
                  <ul className="space-y-2">
                    {subCategory.osmTags.map((tag) => (
                      <li key={JSON.stringify(tag)}>
                        <OSMTag tag={tag} />
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>

      <h2>
        <T _str="Tags used for criteria" />
      </h2>

      <Table className="not-prose">
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3">
              <T _str="Criterion" />
            </TableHead>
            <TableHead className="w-1/3">
              <T _str="Relevant OSM Tags" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.criteria.map((criterion) => {
            return (
              <TableRow key={criterion.id}>
                <TableCell className="align-top py-3 font-medium">
                  {criterion.name}
                </TableCell>
                <TableCell className="align-top py-3">
                  <ul className="space-y-2">
                    {criterion.osmTags.map((tag) => (
                      <li key={JSON.stringify(tag)}>
                        <OSMTag tag={tag} />
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </article>
  );
}
