import { T } from "@transifex/react";
import { Outlet, useOutletContext } from "react-router";
import Card from "~/components/Card";
import Icon from "~/components/Icon";
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
    topLevelCategory &&
    (topLevelCategory.planned ? (
      <Card className="px-6 py-4 flex flex-col items-center justify-center min-h-40 text-center gap-4">
        <Icon id={topLevelCategory.id} size={48} />
        <div>
          <h2 className="font-medium text-lg">{topLevelCategory.name}</h2>
          <p className="text-gray-500 italic">{topLevelCategory.description}</p>
        </div>
      </Card>
    ) : (
      <>
        <ScoreDetailColumnCard
          icon={topLevelCategory.id}
          name={topLevelCategory.name}
          score={topLevelCategory.score}
          description={topLevelCategory.description}
          isActive={isActive}
        >
          <p className="text-sm pb-6">
            <T
              _str='The score for "{category}" is calculated based on the scores of these subcategories:'
              category={topLevelCategory.name}
            />
          </p>
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
    ))
  );
}
