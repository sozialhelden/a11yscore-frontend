// TODO: generate api types by the openapi spec

export type OsmTag = {
  key: string;
  value: string;
};

export type CriterionOsmTagsUsed = {
  id: string;
  name: string;
  osmTags: OsmTag[];
};

export type SubCategoryOsmTagsUsed = {
  id: string;
  name: string;
  description: string;
  osmTags: OsmTag[];
};

export type TopLevelCategoryOsmTagsUsed = {
  id: string;
  name: string;
  subCategories: SubCategoryOsmTagsUsed[];
};

export type OsmTagsUsed = {
  topLevelCategories: TopLevelCategoryOsmTagsUsed[];
  criteria: CriterionOsmTagsUsed[];
};
