import { T } from "@transifex/react";
import { getScoreColors } from "~/utils/score";

export default function ScorePoints({
  score,
  size = "lg",
  isColored = false,
}: {
  score: number;
  size?: "sm" | "lg";
  isColored?: boolean;
}) {
  const colors = getScoreColors(score);

  const sizeWrapperClasses = {
    sm: "leading-none text-xs",
    lg: "leading-tight text-sm",
  };

  const sizeScoreClasses = {
    sm: "text-3xl font-medium",
    lg: "text-6xl font-bold",
  };

  return (
    <div
      className={`whitespace-nowrap inline-flex gap-2 items-center ${sizeWrapperClasses[size]}`}
    >
      <T
        _str="{score} of 100{br}points"
        br={<br />}
        score={
          <span
            className={`${sizeScoreClasses[size]} ${isColored ? colors.fg : ""}`}
          >
            {score}
          </span>
        }
      />
    </div>
  );
}
