import { Button, Progress } from "@sozialhelden/ui";
import { T, useT } from "@transifex/react";
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { ScoreCard } from "~/components/ScoreCard";
import { i18nContext } from "~/context";
import type { Route } from "./+types/index";

// TODO: add spec first workflow and generate types by the openapi spec
type ScoreResult = {
  score: number;
  name: string;
};
export type CriterionScoreResult = ScoreResult;
export type TopicScoreResult = ScoreResult & {
  criteria: CriterionScoreResult[];
};
export type SubCategoryScoreResult = ScoreResult & {
  topics: TopicScoreResult[];
};
export type TopLevelCategoryScoreResult = ScoreResult & {
  subCategories: SubCategoryScoreResult[];
};

export type Results = {
  score: {
    score: number;
    name: string;
    toplevelCategories: TopLevelCategoryScoreResult[];
  };
};

export async function loader({
  params: { adminAreaId },
  context,
}: Route.LoaderArgs) {
  const { languageTag } = context.get(i18nContext);

  const response = await fetch(
    `${process.env.API_BASE_URL}/v1/scores/${adminAreaId}?lang=${languageTag}`,
  );
  if (!response.ok) {
    throw new Response("Failed to fetch score data", {
      status: response.status,
    });
  }
  return (await response.json()) as Results;
}

export default function ScorePage() {
  const { score } = useLoaderData<Results>();
  const t = useT();

  return (
    <div className="space-y-12 py-12">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/" aria-label={t("Go back")}>
            <ArrowLeft aria-hidden />
          </Link>
        </Button>
        <h2 className="text-4xl font-medium">
          <T _str="a11y-Score for {region}" region={score.name} />
        </h2>
      </div>
      <div>
        <h3 className="font-medium text-2xl mb-6">
          <T _str="Overview" />
        </h3>
        <div className="text-md mb-2 flex justify-between">
          <span>
            <T _str="Overall score" />
          </span>
          <span>
            <T
              _str="{points} of {totalPoints} Points"
              points={score.score}
              totalPoints={100}
            />
          </span>
        </div>
        <Progress value={score.score} max={100} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {score.toplevelCategories.map((toplevelCategory) => (
          <ScoreCard
            key={toplevelCategory.name}
            toplevelCategory={toplevelCategory}
          />
        ))}
      </div>
    </div>
  );
}
