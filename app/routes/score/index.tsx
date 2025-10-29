import { useEffect, useMemo, useRef } from "react";
import { Outlet, useLoaderData, useParams } from "react-router";
import Main from "~/components/Main";
import TopLevelCategoryListItem from "~/routes/score/components/list/TopLevelCategoryListItem";
import ScoreDetailHeader from "~/routes/score/components/ScoreDetailHeader";
import ScoreDetailHeaderImage from "~/routes/score/components/ScoreDetailHeaderImage";
import ScoreDetailScrollArea, {
  type ScoreDetailsScrollAreaRef,
} from "~/routes/score/components/ScoreDetailScrollArea";
import type { ScoreResults } from "~/routes/score/types/api";
import { apiFetch } from "~/utils/api";
import { getImage, type WikimediaImage } from "~/utils/wikidata";
import type { Route } from "./+types/index";

export async function loader({
  params: { adminArea },
  context,
}: Route.LoaderArgs) {
  const { score } = await apiFetch<ScoreResults>(
    context,
    `v1/scores/${adminArea}`,
  );
  const image = await getImage(score.name);
  return { image, score };
}

export default function ScorePage() {
  const { score, image } = useLoaderData<{
    score: ScoreResults["score"];
    image: WikimediaImage;
  }>();

  const { topLevelCategory, subCategory, criterion } = useParams();
  const columnCount = useMemo(() => {
    if (criterion) return 4;
    if (subCategory) return 3;
    return 2;
  }, [subCategory, criterion]);

  const scrollAreaRef = useRef<ScoreDetailsScrollAreaRef>(null);
  useEffect(() => {
    if (criterion) {
      return scrollAreaRef.current?.scrollTo(3);
    }
    if (subCategory) {
      return scrollAreaRef.current?.scrollTo(2);
    }
    if (topLevelCategory) {
      scrollAreaRef.current?.scrollTo(1);
    }
  }, [subCategory, criterion, topLevelCategory]);

  return (
    <div>
      <ScoreDetailHeaderImage image={image} />
      <Main size="wide">
        <div className="space-y-8 md:space-y-12 pb-24">
          <ScoreDetailHeader
            name={score.name}
            score={score.score}
            lastUpdated={score.createdAt}
            className="-mt-8 md:-mt-32"
          />
          <ScoreDetailScrollArea columnCount={columnCount} ref={scrollAreaRef}>
            <div className={`space-y-4`}>
              {score.toplevelCategories
                .sort((a, b) => {
                  return (b.score || 0) - (a.score || 0);
                })
                .map((topLevelCategory) => (
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
    </div>
  );
}
