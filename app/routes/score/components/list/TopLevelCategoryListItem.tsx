import type { ComponentProps } from "react";
import { NavLink } from "react-router";
import Card from "~/components/Card";
import CategoryIcon from "~/components/Icon";
import ScoreBox from "~/components/score/ScoreBox";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";
import type { TopLevelCategoryScoreResult } from "~/routes/score/types/api";

export default function TopLevelCategoryListItem({
  topLevelCategory: { id, name, score, interpretation },
  className,
  ...props
}: ComponentProps<"div"> & {
  topLevelCategory: TopLevelCategoryScoreResult;
}) {
  const { isChildOfTopLevelCategoryActive, getTopLevelCategoryUrl } =
    useScoreRoutes();

  const url = getTopLevelCategoryUrl(id);
  const isActive = isChildOfTopLevelCategoryActive(id);

  return (
    <Card
      className={`space-y-2 px-4 py-3.5 relative hover:outline-primary! ${isActive ? "outline-gray-500!" : ""} ${className}`}
      {...props}
    >
      <div className="flex justify-between items-start">
        <NavLink
          to={url}
          className="after:content-[''] after:absolute after:inset-0"
          preventScrollReset={true}
        >
          <h4 className="leading-none flex gap-3 items-center text-lg">
            <CategoryIcon id={id} aria-hidden size={24} />
            {name}
          </h4>
        </NavLink>
        <ScoreBox className="relative z-20" score={score} />
      </div>
      <div className="text-md text-gray-600">{interpretation}</div>
    </Card>
  );
}
