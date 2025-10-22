import type { ComponentProps } from "react";
import { NavLink, useMatch, useParams } from "react-router";
import Card from "~/components/Card";
import CategoryIcon from "~/components/category/CategoryIcon";
import ScoreBox from "~/components/score/ScoreBox";
import type { TopLevelCategoryScoreResult } from "~/routes/scores";

export default function TopLevelCategoryCard({
  topLevelCategory,
}: ComponentProps<"div"> & {
  topLevelCategory: TopLevelCategoryScoreResult;
}) {
  const { adminArea } = useParams();

  const isActive = useMatch(
    `/scores/${adminArea}/${topLevelCategory.topLevelCategory}`,
  );

  return (
    <Card
      className={`space-y-2 relative hover:border-primary! ${isActive ? "border-gray-500!" : ""}`}
      key={topLevelCategory.topLevelCategory}
    >
      <div className="flex justify-between items-start">
        <NavLink
          to={`/scores/${adminArea}/${topLevelCategory.topLevelCategory}`}
          className="after:content-[''] after:absolute after:inset-0"
        >
          <h4 className="font-medium leading-none flex gap-3 items-center">
            <CategoryIcon
              category={topLevelCategory.topLevelCategory}
              aria-hidden
              size={20}
            />
            {topLevelCategory.name}
          </h4>
        </NavLink>
        <ScoreBox
          className="relative z-20"
          score={topLevelCategory.score}
          trend="stable"
        />
      </div>
      <div className="text-sm text-gray-600">
        {topLevelCategory.interpretation}
      </div>
    </Card>
  );
}
