import { ArrowRight, Loader } from "lucide-react";
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
      className={`relative group flex gap-4 rounded justify-between items-center hover:bg-primary/20 px-5 py-1.5 border-2 border-transparent ${isActive ? "border-gray-600!" : ""}`}
    >
      {({ isPending }) => (
        <>
          {isPending && (
            <div className="absolute inset-0 flex justify-center items-center bg-white/80">
              <Loader className="animate animate-spin" />
            </div>
          )}
          <span className="flex gap-4 items-center">
            <ScoreBox score={score} />
            {name}
          </span>
          <ArrowRight
            className="group-hover:translate-x-1 duration-200 transition-transform"
            size={20}
          />
        </>
      )}
    </NavLink>
  );
}
