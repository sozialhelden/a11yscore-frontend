// TODO: generate api types by openapi spec

export type OsmTag = {
  key: string;
  value: string;
};

export type Score = {
  score: number;
  dataQualityFactor: number;
  dataIsUnavailable: boolean;
};

export type BaseScoreResult = {
  id: string;
  name: string;
  score: Score;
};

export type CriterionScoreResult = BaseScoreResult & {
  reason: string;
  recommendations: string[];
  links: { url: string; label: string }[];
  osmTags: OsmTag[];
};

export type TopicScoreResult = BaseScoreResult & {
  criteria: CriterionScoreResult[];
};

export type SubCategoryScoreResult = BaseScoreResult & {
  description?: string;
  osmTags: OsmTag[];
  topics: TopicScoreResult[];
};

export type TopLevelCategoryScoreResult = BaseScoreResult & {
  interpretation: string;
  description: string;
  planned: boolean;
  subCategories?: SubCategoryScoreResult[];
};

export type ScoreResults = {
  adminArea: {
    id: string;
    name: string;
    slug: string;
    osmId: number;
    wikidata: string;
    image?: {
      artist?: string;
      url?: string;
      license?: string;
    };
  };
  score: {
    score: Score;
    createdAt: string;
    toplevelCategories: TopLevelCategoryScoreResult[];
  };
};
