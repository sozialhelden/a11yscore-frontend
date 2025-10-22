import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@sozialhelden/ui";
import { T } from "@transifex/react";
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import type { ComponentProps } from "react";
import { getScoreColors, type ScoreTrend } from "~/utils/score";
export default function ScoreBox({
  score,
  trend,
  className,
  ...props
}: {
  score: number;
  trend?: ScoreTrend;
} & ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={`justify-center inline-flex gap-1 items-center py-0.5 px-1.5 leading-none rounded font-medium text-md ${getScoreColors(score).both} ${className || ""}`}
    >
      <span className="min-w-5 text-center">
        {score === null && <span>-</span>}
        {score}
      </span>
      {trend && (
        <TooltipProvider>
          <Tooltip>
            {trend === "down" && (
              <>
                <TooltipTrigger className="cursor-help">
                  <TrendingDown size={18} />
                </TooltipTrigger>
                <TooltipContent>
                  <T _str="This score has been decreasing in the last 6 months" />
                </TooltipContent>
              </>
            )}
            {trend === "up" && (
              <>
                <TooltipTrigger className="cursor-help">
                  <TrendingUp size={18} />
                </TooltipTrigger>
                <TooltipContent>
                  <T _str="This score has been increasing in the last 6 months" />
                </TooltipContent>
              </>
            )}
            {trend === "stable" && (
              <>
                <TooltipTrigger className="cursor-help">
                  <MoveRight size={18} />
                </TooltipTrigger>
                <TooltipContent>
                  <T _str="This score has been stable in the last 6 months" />
                </TooltipContent>
              </>
            )}
          </Tooltip>
        </TooltipProvider>
      )}
    </span>
  );
}
