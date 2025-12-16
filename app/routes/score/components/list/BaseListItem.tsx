import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router";
import ScoreBox from "~/components/score/ScoreBox";
import type { Score } from "~/routes/score/types/api";

export default function BaseListItem({
  to,
  score,
  name,
  isActive,
}: {
  to: string;
  score: Score;
  name: string;
  isActive: boolean;
}) {
  return (
    <NavLink
      to={to}
      preventScrollReset={true}
      className={`group flex gap-4 rounded justify-between items-center px-5 py-1.5 border-2 border-transparent ${isActive ? "border-gray-600!" : ""}`}
    >
      <span className="flex gap-4 items-center">
        <ScoreBox score={score} />
        {name}
      </span>
      <ArrowRight
        className={`${isActive ? "opacity-100" : "opacity-0"} group-hover:opacity-100 group-hover:translate-x-1 group-focus:opacity-100 group-focus:translate-x-1 duration-500 transition-all`}
        size={20}
      />
    </NavLink>
  );
}
