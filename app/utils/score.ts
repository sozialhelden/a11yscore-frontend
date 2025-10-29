export type ScoreRating =
  | "excellent"
  | "good"
  | "okay"
  | "poor"
  | "unavailable";

export type ScoreTrend = "up" | "stable" | "down";

const maxPoints = 100;

export function getScorePercentage(score: number): number {
  return score / maxPoints;
}

export function getScoreRating(score: number): ScoreRating {
  if (score === null || score === 0) {
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

export function getScoreColors(score: number): {
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
