// TODO: generate api types by openapi spec

export type OsmTag = {
  key: string;
  value: string;
};

export type BaseScoreResult = {
  id: string;
  name: string;
  score: number;
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
  subCategories: SubCategoryScoreResult[];
};

export type ScoreResults = {
  score: {
    score: number;
    adminArea: {
      id: number;
      name: string;
    };
    createdAt: string;
    toplevelCategories: TopLevelCategoryScoreResult[];
  };
};
