import { T } from "@transifex/react";
import { Frown, Meh, Smile, SmilePlus } from "lucide-react";
import { getScoreColors, getScoreRating } from "~/utils/score";

export function ScoreRating({ score }: { score: number }) {
  const rating = getScoreRating(score);

  return (
    <span
      className={`inline-flex uppercase gap-2 font-medium text-lg items-center leading-tight ${getScoreColors(score).fg}`}
    >
      {rating === "excellent" && (
        <>
          <SmilePlus size={18} />
          <T _str="Excellent" />
        </>
      )}
      {rating === "good" && (
        <>
          <Smile size={18} />
          <T _str="Good" />
        </>
      )}
      {rating === "okay" && (
        <>
          <Meh size={18} />
          <T _str="Okay" />
        </>
      )}
      {rating === "poor" && (
        <>
          <Frown size={18} />
          <T _str="Poor" />
        </>
      )}
    </span>
  );
}
