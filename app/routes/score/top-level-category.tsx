import { Outlet, useOutletContext } from "react-router";
import SubCategoryListItem from "~/routes/score/components/list/SubCategoryListItem";
import ScoreDetailColumnCard from "~/routes/score/components/ScoreDetailColumnCard";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";
import type { ScoreResults } from "~/routes/score/types/api";

export default function TopLevelCategory() {
  const { getTopLevelCategoryId, isTopLevelCategoryActive } = useScoreRoutes();
  const { score } = useOutletContext<ScoreResults>();

  const topLevelCategory = score.toplevelCategories.find(
    ({ topLevelCategory }) => topLevelCategory === getTopLevelCategoryId(),
  );

  const isActive = isTopLevelCategoryActive();

  return (
    topLevelCategory && (
      <>
        <ScoreDetailColumnCard
          icon={topLevelCategory.topLevelCategory}
          name={topLevelCategory.name}
          score={topLevelCategory.score}
          isActive={isActive}
        >
          <ul className="-mx-6">
            {topLevelCategory.subCategories
              .sort((a, b) => {
                return (b.score || 0) - (a.score || 0);
              })
              .map(({ subCategory, score, name }) => (
                <li key={subCategory}>
                  <SubCategoryListItem
                    subCategory={subCategory}
                    name={name}
                    score={score}
                  />
                </li>
              ))}
          </ul>
        </ScoreDetailColumnCard>
        <Outlet context={{ topLevelCategory, score }} />
      </>
    )
  );
}
