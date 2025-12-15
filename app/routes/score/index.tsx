import { useEffect, useMemo, useRef } from "react";
import { Outlet, redirect, useLoaderData, useParams } from "react-router";
import Main from "~/components/Main";
import TopLevelCategoryListItem from "~/routes/score/components/list/TopLevelCategoryListItem";
import ScoreDetailHeader from "~/routes/score/components/ScoreDetailHeader";
import ScoreDetailHeaderImage from "~/routes/score/components/ScoreDetailHeaderImage";
import ScoreDetailScrollArea, {
  type ScoreDetailsScrollAreaRef,
} from "~/routes/score/components/ScoreDetailScrollArea";
import type { ScoreResults } from "~/routes/score/types/api";
import { apiFetch } from "~/utils/api";
import { decodeOsmIdHash } from "~/utils/osmIds";
import type { Route } from "./+types/index";

export async function loader({
  params: { adminArea },
  context,
}: Route.LoaderArgs) {
  const [hash, ...slugParts] = adminArea.split("-");
  const slug = slugParts.join("-");

  if (!hash) {
    throw new Response("Not Found", { status: 404 });
  }

  const osmId = decodeOsmIdHash(hash);
  const results = await apiFetch<ScoreResults>(
    context,
    `v1/admin-areas/osm:${osmId}/scores/latest`,
  );

  if (slug !== results.adminArea.slug) {
    const correctSlug = results.adminArea.slug;
    throw redirect(`/scores/${hash}-${correctSlug}`, 301);
  }

  return results;
}

export default function ScorePage() {
  const { score, adminArea } = useLoaderData<ScoreResults>();

  const { topLevelCategory, subCategory, criterion } = useParams();
  const columnCount = useMemo(() => {
    if (criterion) return 4;
    if (subCategory) return 3;
    return 2;
  }, [subCategory, criterion]);

  const verticalScrollContainerRef = useRef<HTMLDivElement>(null);

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

  const verticalScrollIntoView = () => {
    // waiting for the child resize to complete before scrolling
    setTimeout(() => {
      if (!verticalScrollContainerRef.current) return;

      verticalScrollContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  };

  return (
    <div>
      <ScoreDetailHeaderImage image={adminArea.image} />
      <Main size="wide" onClick={verticalScrollIntoView}>
        <div className="space-y-8 md:space-y-12 pb-24">
          <ScoreDetailHeader
            name={adminArea.name}
            score={score.score}
            lastUpdated={score.createdAt}
            className="-mt-8 md:-mt-32"
          />
          <div ref={verticalScrollContainerRef}>
            <ScoreDetailScrollArea
              columnCount={columnCount}
              ref={scrollAreaRef}
            >
              <div className={`space-y-4`}>
                {score.toplevelCategories
                  .sort((a, b) => {
                    return (b.score.score || 0) - (a.score.score || 0);
                  })
                  .map((topLevelCategory) => (
                    <TopLevelCategoryListItem
                      key={topLevelCategory.id}
                      topLevelCategory={topLevelCategory}
                    />
                  ))}
              </div>
              <Outlet context={{ score }} />
            </ScoreDetailScrollArea>
          </div>
        </div>
      </Main>
    </div>
  );
}
