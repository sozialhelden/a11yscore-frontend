import { Outlet, useOutletContext } from "react-router";
import SubCategoryListItem from "~/routes/score/components/list/SubCategoryListItem";
import ScoreDetailColumnCard from "~/routes/score/components/ScoreDetailColumnCard";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";
import type { ScoreResults } from "~/routes/score/types/api";
import { sortByScore } from "~/utils/score";

export default function TopLevelCategory() {
  const { getTopLevelCategoryId, isTopLevelCategoryActive } = useScoreRoutes();
  const { score } = useOutletContext<ScoreResults>();

  const topLevelCategory = score.toplevelCategories.find(
    ({ id }) => id === getTopLevelCategoryId(),
  );

  const isActive = isTopLevelCategoryActive();

  return (
    topLevelCategory && (
      <>
        <ScoreDetailColumnCard
          icon={topLevelCategory.id}
          name={topLevelCategory.name}
          score={topLevelCategory.score}
          description={topLevelCategory.description}
          isActive={isActive}
        >
          <ul className="-mx-6">
            {topLevelCategory.subCategories
              .sort(sortByScore)
              .map((subCategory) => (
                <li key={subCategory.id}>
                  <SubCategoryListItem
                    id={subCategory.id}
                    name={subCategory.name}
                    score={subCategory.score}
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
