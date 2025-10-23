import { useLayoutEffect, useMemo, useRef } from "react";
import { Outlet, useLoaderData, useParams } from "react-router";
import Main from "~/components/Main";
import ScoreDetailHeader from "~/routes/scores/components/ScoreDetailHeader";
import ScoreDetailHeaderImage from "~/routes/scores/components/ScoreDetailHeaderImage";
import ScoreDetailScrollArea, {
  type ScoreDetailsScrollAreaRef,
} from "~/routes/scores/components/ScoreDetailScrollArea";
import TopLevelCategoryListItem from "~/routes/scores/components/TopLevelCategoryListItem";
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

  const { subCategory, criterion } = useParams();

  const columnCount = useMemo(() => {
    if (criterion) return 4;
    if (subCategory) return 3;
    return 2;
  }, [subCategory, criterion]);

  const scrollAreaRef = useRef<ScoreDetailsScrollAreaRef>(null);
  useLayoutEffect(() => {
    if (criterion) {
      scrollAreaRef.current?.scrollTo(3);
    }
    if (subCategory) {
      return scrollAreaRef.current?.scrollTo(2);
    }
  }, [subCategory, criterion]);

  return (
    <>
      <ScoreDetailHeaderImage image={image} />
      <Main size="wide">
        <div className="space-y-12 pb-24">
          <ScoreDetailHeader
            name={score.name}
            score={score.score}
            lastUpdated={score.createdAt}
          />
          <ScoreDetailScrollArea columnCount={columnCount} ref={scrollAreaRef}>
            <div className={`space-y-4`}>
              {score.toplevelCategories.map((topLevelCategory) => (
                <TopLevelCategoryListItem
                  key={topLevelCategory.topLevelCategory}
                  topLevelCategory={topLevelCategory}
                />
              ))}
            </div>
            <Outlet context={{ score }} />
          </ScoreDetailScrollArea>
        </div>
      </Main>
    </>
  );
}
