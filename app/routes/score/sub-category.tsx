import { T, useT } from "@transifex/react";
import { TriangleAlert } from "lucide-react";
import { Outlet, useOutletContext } from "react-router";
import Link from "~/components/Link";
import OSMTag from "~/components/OSMTag";
import OSMTagList from "~/components/OSMTagList";
import ExplanationItem from "~/routes/score/components/explanation/ExplanationItem";
import NoDataWarning from "~/routes/score/components/explanation/NoDataWarning";
import CriterionListItem from "~/routes/score/components/list/CriterionListItem";
import ScoreDetailColumnCard from "~/routes/score/components/ScoreDetailColumnCard";
import { useScoreRoutes } from "~/routes/score/hooks/useScoreRoutes";
import type {
  ScoreResults,
  TopLevelCategoryScoreResult,
} from "~/routes/score/types/api";
import { getScoreRating } from "~/utils/score";

type OutletContext = ScoreResults & {
  topLevelCategory: TopLevelCategoryScoreResult;
};

export default function SubCategory() {
  const t = useT();

  const { getSubCategoryId, isSubCategoryActive } = useScoreRoutes();
  const { score, topLevelCategory } = useOutletContext<OutletContext>();

  const subCategory = topLevelCategory.subCategories.find(
    ({ subCategory }) => subCategory === getSubCategoryId(),
  );
  const isActive = isSubCategoryActive();

  const tags = <OSMTagList tags={subCategory?.osmTags || []} />;

  return (
    subCategory && (
      <>
        <ScoreDetailColumnCard
          icon={subCategory.subCategory}
          name={subCategory.name}
          score={subCategory.score}
          description={subCategory.description}
          isActive={isActive}
        >
          <div className="space-y-12">
            {getScoreRating(subCategory.score) === "unavailable" && (
              <>
                <NoDataWarning name={subCategory.name} />
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
                    _str="There are no places or there is no geometry tagged with {tags} in the selected region on Open Street Map. Or those places / this geometry doesn't use any accessibility related tags."
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
                    _str="Use {tags} on Open Street Map to tag places / geometry, so the a11y-Score algorithm can pick it up. Also add accessibility related tags to those places / this geometry."
                    tags={tags}
                  />
                </ExplanationItem>
              </>
            )}
            {getScoreRating(subCategory.score) !== "unavailable" && (
              <>
                <p className="text-sm">
                  <T
                    _str='The score for "{category}" is calculated using the following accessibility criteria:'
                    category={subCategory.name}
                  />
                </p>
                <div className="space-y-6">
                  {subCategory.topics
                    .sort((a, b) => {
                      return (b.score || 0) - (a.score || 0);
                    })
                    .map((topic) => (
                      <div key={topic.topic}>
                        <h4 className="font-medium">{topic.name}</h4>
                        <ul className="-mx-6">
                          {topic.criteria
                            .sort((a, b) => {
                              return (b.score || 0) - (a.score || 0);
                            })
                            .map(({ criterion, name, score }) => (
                              <li key={criterion}>
                                <CriterionListItem
                                  criterion={criterion}
                                  score={score}
                                  name={name}
                                />
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </ScoreDetailColumnCard>
        <Outlet context={{ subCategory, topLevelCategory, score }} />
      </>
    )
  );
}
