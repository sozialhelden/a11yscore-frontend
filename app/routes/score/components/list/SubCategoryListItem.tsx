import BaseListItem from "~/routes/score/components/list/BaseListItem";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";
import type { Score } from "~/routes/score/types/api";

export default function SubCategoryListItem({
  id,
  score,
  name,
}: {
  id: string;
  score: Score;
  name: string;
}) {
  const { isChildOfSubCategoryActive, getSubCategoryUrl } = useScoreRoutes();

  const url = getSubCategoryUrl(id);
  const isActive = isChildOfSubCategoryActive(id);

  return (
    <BaseListItem to={url} name={name} score={score} isActive={isActive} />
  );
}
