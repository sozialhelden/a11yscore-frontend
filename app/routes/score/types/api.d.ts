// TODO: generate types by openapi spec

export type OsmTag = {
  key: string;
  value: string;
};

export type BaseScoreResult = {
  score: number;
  name: string;
};

export type CriterionScoreResult = BaseScoreResult & {
  criterion: string;
  reason: string;
  osmTags: OsmTag[];
};

export type TopicScoreResult = BaseScoreResult & {
  topic: string;
  criteria: CriterionScoreResult[];
};

export type SubCategoryScoreResult = BaseScoreResult & {
  description?: string;
  subCategory: string;
  osmTags: OsmTag[];
  topics: TopicScoreResult[];
};

export type TopLevelCategoryScoreResult = BaseScoreResult & {
  interpretation: string;
  topLevelCategory: string;
  subCategories: SubCategoryScoreResult[];
};

export type ScoreResults = {
  score: {
    score: number;
    name: string;
    createdAt: string;
    toplevelCategories: TopLevelCategoryScoreResult[];
  };
};
