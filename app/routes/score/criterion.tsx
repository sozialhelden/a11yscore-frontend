import { T, useT } from "@transifex/react";
import { useCallback, useMemo } from "react";
import { useOutletContext } from "react-router";
import OSMTagList from "~/components/OSMTagList";
import ExplanationItem from "~/routes/score/components/explanation/ExplanationItem";
import NoDataWarning from "~/routes/score/components/explanation/NoDataWarning";
import ScoreDetailColumnCard from "~/routes/score/components/ScoreDetailColumnCard";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";
import type {
  ScoreResults,
  SubCategoryScoreResult,
  TopLevelCategoryScoreResult,
} from "~/routes/score/types/api";
import { getScoreRating } from "~/utils/score";

type OutletContext = ScoreResults & {
  topLevelCategory: TopLevelCategoryScoreResult;
  subCategory: SubCategoryScoreResult;
};

export default function TopLevelCategory() {
  const t = useT();

  const { getCriterionId, isCriterionActive } = useScoreRoutes();
  const { subCategory } = useOutletContext<OutletContext>();

  const findCriterion = useCallback(
    ({ id }: { id: string }) => id === getCriterionId(),
    [getCriterionId],
  );

  const topic = useMemo(
    () =>
      subCategory.topics.find(({ criteria }) => criteria.find(findCriterion)),
    [subCategory, findCriterion],
  );
  const criterion = useMemo(
    () => topic?.criteria.find(findCriterion),
    [topic, findCriterion],
  );

  const isActive = isCriterionActive();
  const tags = <OSMTagList tags={criterion?.osmTags || []} />;

  return (
    criterion && (
      <ScoreDetailColumnCard
        icon={criterion.id}
        name={criterion.name}
        score={criterion.score}
        isActive={isActive}
      >
        <div className="space-y-12">
          {getScoreRating(criterion.score) === "unavailable" && (
            <>
              <NoDataWarning name={criterion.name} />
              <ExplanationItem
                headline={t("Why is this data missing?")}
                links={[
                  {
                    to: "/faqs/what-data-is-being-used",
                    label: t("Learn more about what data a11y-Score uses"),
                  },
                ]}
              >
                <T
                  _str="There are no places or there is no geometry tagged with {tags} in the selected region on Open Street Map."
                  tags={tags}
                />
              </ExplanationItem>
              <ExplanationItem
                headline={t("How can I add/improve this data?")}
                links={[
                  {
                    to: "/faqs/how-to-contribute",
                    label: t("Learn more about how to contribute"),
                  },
                  {
                    to: "/faqs/what-data-is-being-used",
                    label: t("List of Open Street Map tags used"),
                  },
                ]}
              >
                <T
                  _str="Use {tags} on Open Street Map to tag places / geometry, so the a11y-Score algorithm can pick it up."
                  tags={tags}
                />
              </ExplanationItem>
            </>
          )}
          {getScoreRating(criterion.score) !== "unavailable" && (
            <>
              <ExplanationItem
                headline={t("Why is this important?")}
                text={criterion.reason}
              />
              <ExplanationItem
                headline={t("How can I make this more accessible?")}
                text={criterion.recommendations
                  .map((text) =>
                    criterion.recommendations.length > 1 ? `* ${text}` : text,
                  )
                  .join("\n\n")}
                links={criterion.links.map(({ url, label }) => ({
                  to: url,
                  label,
                }))}
              />
            </>
          )}
        </div>
      </ScoreDetailColumnCard>
    )
  );
}
