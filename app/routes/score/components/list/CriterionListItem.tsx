import BaseListItem from "~/routes/score/components/list/BaseListItem";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";

export default function CriterionListItem({
  criterion,
  score,
  name,
}: {
  criterion: string;
  score: number;
  name: string;
}) {
  const { isCriterionActive, getCriterionUrl } = useScoreRoutes();

  const url = getCriterionUrl(criterion);
  const isActive = isCriterionActive(criterion);

  return (
    <BaseListItem to={url} name={name} score={score} isActive={isActive} />
  );
}
