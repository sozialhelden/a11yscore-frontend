import { getTranslations, type LanguageTag } from "@sozialhelden/core";
import { marked } from "marked";
import calculationDe from "../../content/de/faqs/calculation.md?raw";
import contributeDe from "../../content/de/faqs/contribute.md?raw";
import dataDe from "../../content/de/faqs/data.md?raw";
import feedbackDe from "../../content/de/faqs/feedback.md?raw";
import scoreDe from "../../content/de/faqs/score.md?raw";
import whatDe from "../../content/de/faqs/what.md?raw";
import legalDe from "../../content/de/pages/legal.md?raw";
import calculationEn from "../../content/en/faqs/calculation.md?raw";
import contributeEn from "../../content/en/faqs/contribute.md?raw";
import dataEn from "../../content/en/faqs/data.md?raw";
import feedbackEn from "../../content/en/faqs/feedback.md?raw";
import scoreEn from "../../content/en/faqs/score.md?raw";
import whatEn from "../../content/en/faqs/what.md?raw";
import legalEn from "../../content/en/pages/legal.md?raw";

export type ContentId =
  | "faqs/how-is-it-calculated"
  | "faqs/how-to-contribute"
  | "faqs/what-data-is-being-used"
  | "faqs/give-feedback"
  | "faqs/how-to-interpret-the-score"
  | "faqs/what-is-a11y-score"
  | "pages/legal";

const content: Record<ContentId, Partial<Record<LanguageTag, string>>> = {
  "faqs/how-is-it-calculated": {
    en: calculationEn,
    de: calculationDe,
  },
  "faqs/how-to-contribute": {
    en: contributeEn,
    de: contributeDe,
  },
  "faqs/what-data-is-being-used": {
    en: dataEn,
    de: dataDe,
  },
  "faqs/give-feedback": {
    en: feedbackEn,
    de: feedbackDe,
  },
  "faqs/how-to-interpret-the-score": {
    en: scoreEn,
    de: scoreDe,
  },
  "faqs/what-is-a11y-score": {
    en: whatEn,
    de: whatDe,
  },
  "pages/legal": {
    en: legalEn,
    de: legalDe,
  },
};

export function hasContent(id: string) {
  return Object.keys(content).includes(id);
}

export function loadContent(
  identifier: ContentId,
  languageTag: LanguageTag,
): Promise<string> | string {
  if (!content[identifier]) {
    throw new Error(`No content found for identifier: ${identifier}`);
  }

  return marked.parse(
    getTranslations(content[identifier], languageTag as LanguageTag) || "",
  );
}
