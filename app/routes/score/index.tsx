import {
  Alert,
  AlertDescription,
  AlertTitle,
  Progress,
} from "@sozialhelden/ui";
import { T, useT } from "@transifex/react";
import DOMPurify from "dompurify";
import { ArrowRight, Meh, Smile, TriangleAlert } from "lucide-react";
import { NavLink, useLoaderData } from "react-router";
import Main from "~/components/Main";
import Meter from "~/components/Meter";
import { ScoreCard } from "~/components/ScoreCard";
import { apiFetch } from "~/utils/api";
import { getImage, type WikimediaImage } from "~/utils/wikidata";
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
    createdAt: string;
    toplevelCategories: TopLevelCategoryScoreResult[];
  };
};

export async function loader({
  params: { adminAreaId },
  context,
}: Route.LoaderArgs) {
  const { score } = await apiFetch<Results>(
    context,
    `v1/scores/${adminAreaId}`,
  );
  const image = await getImage(score.name);

  return { image, score };
}

export default function ScorePage() {
  const { score, image } = useLoaderData<Results & { image: WikimediaImage }>();
  const t = useT();

  const artist = DOMPurify.sanitize(image?.artist, {
    FORBID_TAGS: ["b", "small", "i", "u", "em", "strong"],
  });

  return (
    <div>
      <div
        className="aspect-[16/6] bg-cover bg-center bg-linear-to-br from-indigo-300 to-gray-500 relative"
        style={
          image?.url ? { backgroundImage: `url(${image.url}?width=1920)` } : {}
        }
      >
        {image && artist && (
          <span className="bg-white/60 text-gray-900 px-0.5 text-[10px] absolute top-1 right-1">
            <T
              _str="&copy; by {artist} ({license})"
              artist={
                <span
                  className="underline"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: it's sanitized above with dompurify
                  dangerouslySetInnerHTML={{ __html: artist }}
                />
              }
              license={image.license}
            />
          </span>
        )}
      </div>
      <Main>
        <div className="space-y-12 pb-24">
          <div className="bg-white pb-6 pt-8 px-8 shadow-md transform -mt-32 relative rounded-xl grid grid-cols-[1fr_min-content] gap-4">
            <div className="flex flex-col gap-4 justify-between">
              <h2 className="text-2xl md:text-5xl font-medium">{score.name}</h2>
              <p className="flex flex-col gap-2">
                <span>
                  <T
                    _str="{lastUpdated}: {time}"
                    time={score.createdAt}
                    lastUpdated={
                      <span className="font-medium">
                        <T _str="Last updated" />
                      </span>
                    }
                  />
                </span>
                {/*<NavLink*/}
                {/*  to="/faqs/how-is-it-calculated"*/}
                {/*  className="hover:text-primary hover:underline inline-flex gap-2 items-center"*/}
                {/*>*/}
                {/*  <T _str="Learn more on how we calculate scores" />*/}
                {/*  <ArrowRight size={18} />*/}
                {/*</NavLink>*/}
              </p>
            </div>
            <div className="">
              <Meter percentage={0.42}>
                <div className="whitespace-nowrap inline-flex gap-2 leading-tight items-center text-sm">
                  <T
                    _str="{score} of 100{br}points"
                    br={<br />}
                    score={
                      <span className="font-bold text-6xl">
                        {score.score || 42}
                      </span>
                    }
                  />
                </div>
                <div className="flex uppercase gap-2 font-medium text-lg items-center leading-tight text-amber-700">
                  <Meh size={18} />
                  <T _str="Okay" />
                </div>
              </Meter>
            </div>
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
      </Main>
    </div>
  );
}
