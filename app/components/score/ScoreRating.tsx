import { T } from "@transifex/react";
import { Frown, Meh, Smile, SmilePlus } from "lucide-react";
import type { Score } from "~/routes/score/types/api";
import { getScoreColors, getScoreRating } from "~/utils/score";

export function ScoreRating({ score }: { score: Score }) {
  const rating = getScoreRating(score);

  return (
    <span
      className={`inline-flex uppercase gap-1.5 md:gap-2 font-medium md:text-lg items-center leading-tight ${getScoreColors(score).fg}`}
    >
      {rating === "excellent" && (
        <>
          <SmilePlus size={18} className="scale-90 md:scale-100" />
          <T _str="Excellent" />
        </>
      )}
      {rating === "good" && (
        <>
          <Smile size={18} className="scale-90 md:scale-100" />
          <T _str="Good" />
        </>
      )}
      {rating === "okay" && (
        <>
          <Meh size={18} className="scale-90 md:scale-100" />
          <T _str="Okay" />
        </>
      )}
      {rating === "poor" && (
        <>
          <Frown size={18} className="scale-90 md:scale-100" />
          <T _str="Poor" />
        </>
      )}
    </span>
  );
}
