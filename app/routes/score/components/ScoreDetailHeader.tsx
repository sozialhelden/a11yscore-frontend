import { T } from "@transifex/react";
import { DateTime } from "luxon";
import type { ComponentProps } from "react";
import Link from "~/components/Link";
import ScoreMeter from "~/components/score/ScoreMeter";
import ScorePoints from "~/components/score/ScorePoints";
import { ScoreRating } from "~/components/score/ScoreRating";
import { useI18n } from "~/hooks/useI18n";
import type { Score } from "~/routes/score/types/api";

export default function ScoreDetailHeader({
  name,
  score,
  lastUpdated,
  className,
  ...props
}: ComponentProps<"div"> & {
  name: string;
  score: Score;
  lastUpdated: string;
}) {
  const { languageTag } = useI18n();
  const lastUpdatedDate = DateTime.fromISO(lastUpdated).setLocale(languageTag);

  return (
    <div
      className={`bg-white pb-6 pt-8 px-8 shadow-md transform relative rounded-lg grid grid-cols-1 sm:grid-cols-[1fr_min-content] gap-4 ${className}`}
      {...props}
    >
      <div className="flex flex-col gap-4 justify-between">
        <h2 className="text-3xl md:text-5xl font-medium">{name}</h2>
        <p className="flex flex-col gap-2">
          <span>
            <T
              _str="{lastUpdated}: {time}"
              time={lastUpdatedDate.toLocaleString(DateTime.DATE_FULL)}
              lastUpdated={
                <span className="font-medium">
                  <T _str="Last updated" />
                </span>
              }
            />
          </span>
          <Link to="/faqs/how-is-it-calculated">
            <T _str="Learn more about how we calculate scores" />
          </Link>
        </p>
      </div>
      <div className="flex justify-center md:justify-end">
        <ScoreMeter score={score}>
          <ScorePoints score={score} />
          <ScoreRating score={score} />
        </ScoreMeter>
      </div>
    </div>
  );
}
