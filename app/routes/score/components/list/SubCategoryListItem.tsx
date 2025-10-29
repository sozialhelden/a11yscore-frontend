import BaseListItem from "~/routes/score/components/list/BaseListItem";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";

export default function SubCategoryListItem({
  id,
  score,
  name,
}: {
  id: string;
  score: number;
  name: string;
}) {
  const { isChildOfSubCategoryActive, getSubCategoryUrl } = useScoreRoutes();

  const url = getSubCategoryUrl(id);
  const isActive = isChildOfSubCategoryActive(id);

  return (
    <BaseListItem to={url} name={name} score={score} isActive={isActive} />
  );
}
