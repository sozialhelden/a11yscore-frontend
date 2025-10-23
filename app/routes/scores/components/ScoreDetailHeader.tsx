import { T } from "@transifex/react";
import ScoreMeter from "~/components/score/ScoreMeter";
import ScorePoints from "~/components/score/ScorePoints";
import { ScoreRating } from "~/components/score/ScoreRating";

export default function ScoreDetailHeader({
  name,
  score,
  lastUpdated,
}: {
  name: string;
  score: number;
  lastUpdated: string;
}) {
  return (
    <div className="bg-white pb-6 pt-8 px-8 shadow-md transform -mt-32 relative rounded-lg grid grid-cols-[1fr_min-content] gap-4">
      <div className="flex flex-col gap-4 justify-between">
        <h2 className="text-2xl md:text-5xl font-medium">{name}</h2>
        <p className="flex flex-col gap-2">
          <span>
            <T
              _str="{lastUpdated}: {time}"
              time={lastUpdated}
              lastUpdated={
                <span className="font-medium">
                  <T _str="Last updated" />
                </span>
              }
            />
          </span>
        </p>
      </div>
      <div className="">
        <ScoreMeter score={score}>
          <ScorePoints score={score} />
          <ScoreRating score={score} />
        </ScoreMeter>
      </div>
    </div>
  );
}
