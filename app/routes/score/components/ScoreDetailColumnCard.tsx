import { MessageCircleQuestionMark } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import Card from "~/components/Card";
import Icon from "~/components/Icon";
import ScorePoints from "~/components/score/ScorePoints";

export default function ScoreDetailColumnCard({
  isActive,
  icon,
  name,
  score,
  children,
  className,
  description,
  ...props
}: ComponentProps<"div"> & {
  isActive?: boolean;
  icon?: string;
  name: string;
  score: number;
  description?: string | ReactNode;
}) {
  return (
    <Card
      className={`px-6 py-4 ${isActive ? "outline-gray-600!" : ""}${className || ""}`}
      {...props}
    >
      <div className="-mx-6 px-6 border-b-2 border-gray-300 pb-4 mb-6">
        <div className="flex justify-between gap-2 items-center">
          <h2 className="font-medium text-lg flex gap-3 items-center leading-tight">
            {icon && <Icon id={icon} size={22} />}
            {name}
          </h2>
          <ScorePoints score={score} isColored={true} size="sm" />
        </div>
        <div className="grid grid-cols-[min-content_1fr] gap-3 text-gray-600 text-xs *:nth-2:mt-4 *:nth-1:mt-4">
          {description && (
            <>
              <MessageCircleQuestionMark className="relative top-1" />
              <span>{description}</span>
            </>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
}
