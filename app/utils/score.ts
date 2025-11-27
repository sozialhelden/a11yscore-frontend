import { BadgeCheck, BadgeInfo, BadgePlus, BadgeX } from "lucide-react";
import type { Score } from "~/routes/score/types/api";

export type ScoreRating =
  | "excellent"
  | "good"
  | "okay"
  | "poor"
  | "unavailable";

export type ScoreTrend = "up" | "stable" | "down";

const maxPoints = 100;

export function getScorePercentage({ score }: Score): number {
  return score / maxPoints;
}

export function getScoreRating({
  score,
  dataIsUnavailable,
}: Score): ScoreRating {
  if (score === null || score === 0 || dataIsUnavailable) {
    return "unavailable";
  }
  if (score >= 80) {
    return "excellent";
  }
  if (score >= 65) {
    return "good";
  }
  if (score >= 20) {
    return "okay";
  }
  return "poor";
}

export function getScoreColors(score: Score): {
  fg: string;
  bg: string;
  both: string;
} {
  const colors: Record<ScoreRating, { fg: string; bg: string }> = {
    excellent: { fg: "text-lime-700", bg: "bg-lime-200" },
    good: { fg: "text-lime-700", bg: "bg-lime-200" },
    okay: { fg: "text-yellow-700", bg: "bg-yellow-200" },
    poor: { fg: "text-red-700", bg: "bg-red-200" },
    unavailable: { fg: "text-gray-700", bg: "bg-gray-200" },
  };

  const selection = colors[getScoreRating(score)];

  return {
    ...selection,
    both: `${selection.fg} ${selection.bg}`,
  };
}

export function sortByScore(a: { score: Score }, b: { score: Score }): number {
  return (b.score.score || 0) - (a.score.score || 0);
}

export function getDataQualityIcon(score: Score) {
  const rating = getDataQualityRating(score);
  if (rating === "excellent") {
    return BadgePlus;
  }
  if (rating === "good") {
    return BadgeCheck;
  }
  if (rating === "okay") {
    return BadgeInfo;
  }
  return BadgeX;
}

export function getDataQualityRating(score: Score): ScoreRating {
  if (score.dataQualityFactor >= 0.9) {
    return "excellent";
  }
  if (score.dataQualityFactor >= 0.7) {
    return "good";
  }
  if (score.dataQualityFactor >= 0.3) {
    return "okay";
  }
  return "poor";
}
