import { useParams } from "react-router";

export function useScoreRoutes() {
  const { adminArea, topLevelCategory, subCategory, criterion } = useParams();

  const isTopLevelCategoryActive = (topLevelCategoryId?: string) => {
    return topLevelCategory === topLevelCategoryId && !subCategory;
  };
  const isChildOfTopLevelCategoryActive = (topLevelCategoryId?: string) => {
    return topLevelCategory === topLevelCategoryId;
  };
  const getTopLevelCategoryUrl = (topLevelCategoryId?: string) => {
    return `/scores/${adminArea}/${topLevelCategoryId || topLevelCategory}`;
  };
  const getTopLevelCategoryId = () => {
    return topLevelCategory;
  };

  const isSubCategoryActive = (subCategoryId?: string) => {
    return subCategory === subCategoryId && !criterion;
  };
  const isChildOfSubCategoryActive = (subCategoryId?: string) => {
    return subCategory === subCategoryId;
  };
  const getSubCategoryUrl = (subCategoryId?: string) => {
    return `/scores/${adminArea}/${topLevelCategory}/${subCategoryId || subCategory}`;
  };
  const getSubCategoryId = () => {
    return subCategory;
  };

  const isCriterionActive = (criterionId?: string) => {
    return criterion === criterionId;
  };
  const getCriterionUrl = (criterionId?: string) => {
    return `/scores/${adminArea}/${topLevelCategory}/${subCategory}/${criterionId || criterion}`;
  };
  const getCriterionId = () => {
    return criterion;
  };

  return {
    isTopLevelCategoryActive,
    isChildOfTopLevelCategoryActive,
    getTopLevelCategoryUrl,
    getTopLevelCategoryId,
    isSubCategoryActive,
    isChildOfSubCategoryActive,
    getSubCategoryUrl,
    getSubCategoryId,
    isCriterionActive,
    getCriterionUrl,
    getCriterionId,
  };
}
