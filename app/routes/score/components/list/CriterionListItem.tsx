import BaseListItem from "~/routes/score/components/list/BaseListItem";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";
import type { Score } from "~/routes/score/types/api";

export default function CriterionListItem({
  id,
  score,
  name,
}: {
  id: string;
  score: Score;
  name: string;
}) {
  const { isCriterionActive, getCriterionUrl } = useScoreRoutes();

  const url = getCriterionUrl(id);
  const isActive = isCriterionActive(id);

  return (
    <BaseListItem to={url} name={name} score={score} isActive={isActive} />
  );
}
