import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Progress,
} from "@sozialhelden/ui";
import { T, useT } from "@transifex/react";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { ScoreCard } from "~/components/ScoreCard";
import { i18nContext } from "~/context";
import type { Route } from "./+types/index";

// TODO: add spec first workflow and generate types by the openapi spec
export type ScoreResult = {
  score: number;
  name: string;
};
export type CriterionScoreResult = ScoreResult;
export type TopicScoreResult = ScoreResult & {
  criteria: CriterionScoreResult[];
};
export type SubCategoryScoreResult = ScoreResult & {
  description?: string;
  topics: TopicScoreResult[];
};
export type TopLevelCategoryScoreResult = ScoreResult & {
  interpretation: string;
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
  return await apiFetch<Results>(context, `v1/scores/${adminAreaId}`);
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
        <h2 className="text-2xl md:text-4xl font-medium">
          <T _str="a11y-Score for {region}" region={score.name} />
        </h2>
      </div>
      <Alert>
        <AlertTitle className="flex gap-2 items-center">
          <TriangleAlert size={16} />
          <T _str="Beta Warning!" />
        </AlertTitle>
        <AlertDescription>
          <T _str="This application is in early beta and still in heavy development. The current scores may be incomplete and inaccurate." />
        </AlertDescription>
      </Alert>
      <div>
        <h3 className="font-medium text-xl md:text-2xl mb-6">
          <T _str="Overview" />
        </h3>
        <div className="text-sm md:text-md mb-2 flex justify-between">
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
      <div className="grid md:grid-cols-2 gap-4">
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
