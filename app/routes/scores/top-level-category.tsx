import { ArrowRight } from "lucide-react";
import { NavLink, useOutletContext, useParams } from "react-router";
import Card from "~/components/Card";
import CategoryIcon from "~/components/category/CategoryIcon";
import ScoreBox from "~/components/score/ScoreBox";
import ScorePoints from "~/components/score/ScorePoints";
import type { Results } from "~/routes/scores/index";

export default function TopLevelCategory() {
  const { topLevelCategory: topLevelCategoryId, subCategory: subCategoryId } =
    useParams();

  const { score } = useOutletContext<Results>();

  const topLevelCategory = score.toplevelCategories.find(
    ({ topLevelCategory }) => topLevelCategory === topLevelCategoryId,
  );

  return (
    topLevelCategory && (
      <Card className={`px-6 py-4 ${!subCategoryId ? "border-gray-600!" : ""}`}>
        <div className="-mx-6 px-6 border-b-2 border-gray-300 pb-4 mb-6">
          <div className="flex justify-between gap-2 items-center">
            <h2 className="font-medium text-lg flex gap-3 items-center">
              <CategoryIcon
                category={topLevelCategory.topLevelCategory}
                size={22}
              />
              {topLevelCategory.name}
            </h2>
            <ScorePoints
              score={topLevelCategory.score}
              isColored={true}
              size="sm"
            />
          </div>
        </div>
        <ul className="-mx-6">
          {topLevelCategory.subCategories.map((subCategory) => (
            <li key={subCategory.subCategory}>
              <NavLink
                to="/"
                className="flex gap-4 justify-between items-center hover:bg-primary/20 px-6 py-2.5"
              >
                <span className="flex gap-4 items-center">
                  <ScoreBox score={subCategory.score} />
                  {subCategory.name}
                </span>
                <ArrowRight />
              </NavLink>
            </li>
          ))}
        </ul>
      </Card>
    )
  );
}
