import BaseListItem from "~/routes/score/components/list/BaseListItem";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";

export default function SubCategoryListItem({
  subCategory,
  score,
  name,
}: {
  subCategory: string;
  score: number;
  name: string;
}) {
  const { isChildOfSubCategoryActive, getSubCategoryUrl } = useScoreRoutes();

  const url = getSubCategoryUrl(subCategory);
  const isActive = isChildOfSubCategoryActive(subCategory);

  return (
    <BaseListItem to={url} name={name} score={score} isActive={isActive} />
  );
}
