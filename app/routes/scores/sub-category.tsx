import { ArrowRight } from "lucide-react";
import { NavLink, useOutletContext, useParams } from "react-router";
import Card from "~/components/Card";
import CategoryIcon from "~/components/category/CategoryIcon";
import ScoreBox from "~/components/score/ScoreBox";
import ScorePoints from "~/components/score/ScorePoints";
import type { TopLevelCategoryScoreResult } from "~/routes/scores/index";

export default function TopLevelCategory() {
  const { topLevelCategory: topLevelCategoryId, subCategory: subCategoryId } =
    useParams();

  const { topLevelCategory } = useOutletContext<{
    topLevelCategory: TopLevelCategoryScoreResult;
  }>();

  const subCategory = topLevelCategory.subCategories.find(
    ({ subCategory }) => subCategory === subCategoryId,
  );

  return (
    subCategory && (
      <Card
        className={`px-6 py-4 ${!subCategoryId ? "outline-gray-600!" : ""}`}
      >
        asdf
      </Card>
    )
  );
}
