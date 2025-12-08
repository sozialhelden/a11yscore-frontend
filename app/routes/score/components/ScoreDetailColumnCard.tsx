import { Tooltip, TooltipContent, TooltipTrigger } from "@sozialhelden/ui";
import { T } from "@transifex/react";
import { MessageCircleQuestionMark } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import Card from "~/components/Card";
import Icon from "~/components/Icon";
import Link from "~/components/Link";
import ScorePoints from "~/components/score/ScorePoints";
import ScoreDetailColumnProperty from "~/routes/score/components/ScoreDetailColumnProperty";
import type { Score } from "~/routes/score/types/api";
import { getDataQualityIcon, getDataQualityRating } from "~/utils/score";

export default function ScoreDetailColumnCard({
  isActive,
  icon,
  name,
  score,
  children,
  className,
  description,
  ...props
}: ComponentProps<"div"> & {
  isActive?: boolean;
  icon?: string;
  name: string;
  score: Score;
  description?: string | ReactNode;
}) {
  const dataQualityRating = getDataQualityRating(score);

  return (
    <Card
      className={`px-6 py-4 ${isActive ? "outline-gray-600!" : ""}${className || ""}`}
      {...props}
    >
      <div className="-mx-6 px-6 border-b-2 border-gray-300 pb-4 mb-6">
        <div className="flex justify-between gap-2 items-center">
          <h2 className="font-medium text-lg flex gap-3 items-center leading-tight">
            {icon && <Icon id={icon} size={22} />}
            {name}
          </h2>
          <ScorePoints score={score} isColored={true} size="sm" />
        </div>

        <ScoreDetailColumnProperty icon={getDataQualityIcon(score)}>
          <Tooltip>
            <TooltipTrigger>
              {dataQualityRating === "excellent" && (
                <T _str="Excellent data quality" />
              )}
              {dataQualityRating === "good" && <T _str="Good data quality" />}
              {dataQualityRating === "okay" && (
                <T _str="Mediocre data quality" />
              )}
              {dataQualityRating === "poor" && <T _str="Poor data quality" />}
            </TooltipTrigger>
            <TooltipContent className="max-w-[400px]">
              <T
                _str="We measure the quality of the underlying data to have an indication how trustworthy an individual score is. Data with a low quality is weighted less when calculating scores. {learnMore}"
                learnMore={
                  <Link
                    to="/faqs/how-is-it-calculated"
                    className="hover:text-white/70!"
                  >
                    <T _str="Learn more about how the score is calculated" />
                  </Link>
                }
              />
            </TooltipContent>
          </Tooltip>
        </ScoreDetailColumnProperty>

        {description && (
          <ScoreDetailColumnProperty icon={MessageCircleQuestionMark}>
            {description}
          </ScoreDetailColumnProperty>
        )}
      </div>
      {children}
    </Card>
  );
}
