import BaseListItem from "~/routes/score/components/list/BaseListItem";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";

export default function CriterionListItem({
  id,
  score,
  name,
}: {
  id: string;
  score: number;
  name: string;
}) {
  const { isCriterionActive, getCriterionUrl } = useScoreRoutes();

  const url = getCriterionUrl(id);
  const isActive = isCriterionActive(id);

  return (
    <BaseListItem to={url} name={name} score={score} isActive={isActive} />
  );
}
