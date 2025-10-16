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
import OSMTag from "~/components/OSMTag";
import { i18nContext } from "~/context";
import { loadMarkdownDocument } from "~/utils/content";
import type { Route } from "./+types/data";

// TODO: add spec first workflow and generate types by the openapi spec
export type OsmTag = {
  key: string;
  value: string;
};
export type CriterionOsmTagsUsed = {
  id: string;
  name: string;
  osmTags: OsmTag[];
};
export type SubCategoryOsmTagsUsed = {
  id: string;
  name: string;
  description: string;
  osmTags: OsmTag[];
};
export type TopLevelCategoryOsmTagsUsed = {
  id: string;
  name: string;
  subCategories: SubCategoryOsmTagsUsed[];
};
export type OsmTagsUsed = {
  topLevelCategories: TopLevelCategoryOsmTagsUsed[];
  criteria: CriterionOsmTagsUsed[];
};

export async function loader({ context }: Route.LoaderArgs) {
  const { languageTag } = context.get(i18nContext);

  const response = await fetch(
    `${process.env.API_BASE_URL}/a11yscore/v1/osm-tags/?lang=${languageTag}`,
  );
  if (!response.ok) {
    throw new Response("Failed to fetch osm-tag data", {
      status: response.status,
    });
  }

  return {
    content: await loadMarkdownDocument(
      "faqs/data",
      languageTag as LanguageTag,
    ),
    data: (await response.json()) as OsmTagsUsed,
  };
}

export default function FaqData() {
  const { content, data } = useLoaderData<{
    content: string;
    data: OsmTagsUsed;
  }>();

  return (
    <article className="prose max-w-none">
      <div // biome-ignore lint/security/noDangerouslySetInnerHtml: this is a markdown file we control
        dangerouslySetInnerHTML={{ __html: content }}
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
                <TableCell className="align-top py-3 font-bold">
                  {index === 0 ? category.name : ""}
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
