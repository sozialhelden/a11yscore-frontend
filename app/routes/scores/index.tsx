import { T } from "@transifex/react";
import DOMPurify from "dompurify";
import { useMemo } from "react";
import { Outlet, useLoaderData } from "react-router";
import TopLevelCategoryCard from "~/components/category/TopLevelCategoryCard";
import Main from "~/components/Main";
import ScoreMeter from "~/components/score/ScoreMeter";
import ScorePoints from "~/components/score/ScorePoints";
import { ScoreRating } from "~/components/score/ScoreRating";
import { apiFetch } from "~/utils/api";
import { getImage, type WikimediaImage } from "~/utils/wikidata";
import type { Route } from "./+types/index";

// TODO: generate types by openapi spec
export type ScoreResult = {
  score: number;
  name: string;
};
export type CriterionScoreResult = ScoreResult & {
  criterion: string;
};
export type TopicScoreResult = ScoreResult & {
  topic: string;
  criteria: CriterionScoreResult[];
};
export type SubCategoryScoreResult = ScoreResult & {
  description?: string;
  subCategory: string;
  topics: TopicScoreResult[];
};
export type TopLevelCategoryScoreResult = ScoreResult & {
  interpretation: string;
  topLevelCategory: string;
  subCategories: SubCategoryScoreResult[];
};
export type Results = {
  score: {
    score: number;
    name: string;
    createdAt: string;
    toplevelCategories: TopLevelCategoryScoreResult[];
  };
};

export async function loader({
  params: { adminArea },
  context,
}: Route.LoaderArgs) {
  const { score } = await apiFetch<Results>(context, `v1/scores/${adminArea}`);
  const image = await getImage(score.name);

  return { image, score };
}

export default function ScorePage() {
  const { score, image } = useLoaderData<{
    score: Results["score"];
    image: WikimediaImage;
  }>();

  const sanitizedArtist = useMemo(
    () =>
      DOMPurify.sanitize(image?.artist, {
        FORBID_TAGS: ["b", "small", "i", "u", "em", "strong"],
      }),
    [image.artist],
  );

  return (
    <div>
      <div
        className="aspect-[16/6] bg-cover bg-center bg-linear-to-br from-indigo-300 to-gray-500 relative"
        style={
          image?.url ? { backgroundImage: `url(${image.url}?width=1920)` } : {}
        }
      >
        {image && sanitizedArtist && (
          <span className="bg-white/60 text-gray-900 px-0.5 text-[10px] absolute top-1 right-1">
            <T
              _str="&copy; {artist} ({license})"
              license={image.license}
              artist={
                <span
                  className="underline"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: it's sanitized above with dompurify
                  dangerouslySetInnerHTML={{ __html: sanitizedArtist }}
                />
              }
            />
          </span>
        )}
      </div>

      <Main size="wide">
        <div className="space-y-12 pb-24">
          <div className="bg-white pb-6 pt-8 px-8 shadow-md transform -mt-32 relative rounded-lg grid grid-cols-[1fr_min-content] gap-4">
            <div className="flex flex-col gap-4 justify-between">
              <h2 className="text-2xl md:text-5xl font-medium">{score.name}</h2>
              <p className="flex flex-col gap-2">
                <span>
                  <T
                    _str="{lastUpdated}: {time}"
                    time={score.createdAt}
                    lastUpdated={
                      <span className="font-medium">
                        <T _str="Last updated" />
                      </span>
                    }
                  />
                </span>
              </p>
            </div>
            <div className="">
              <ScoreMeter score={score.score}>
                <ScorePoints score={score.score} />
                <ScoreRating score={score.score} />
              </ScoreMeter>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {score.toplevelCategories.map((topLevelCategory) => (
                <TopLevelCategoryCard
                  key={topLevelCategory.topLevelCategory}
                  topLevelCategory={topLevelCategory}
                />
              ))}
            </div>
            <Outlet context={{ score }} />
          </div>
        </div>
      </Main>
    </div>
  );
}
