import { CircleSlash } from "lucide-react";

function getScoreColorClassNames(score: number) {
  if (score >= 75) return "bg-green-200 text-green-900";
  if (score >= 30) return "bg-amber-200 text-amber-900";
  if (score > 0) return "bg-red-200 text-red-900";
  return "bg-gray-200 text-gray-900";
}

const sizeClassNames = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

export function Score({
  score,
  size = "lg",
}: {
  score: number;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={`rounded-md flex items-center justify-center font-bold flex-shrink-0 ${getScoreColorClassNames(score)} ${sizeClassNames[size]}`}
    >
      {score !== 0 ? score : <CircleSlash size={16} />}
    </div>
  );
}
