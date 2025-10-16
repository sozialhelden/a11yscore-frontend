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

export type MarkdownDocument =
  | "faqs/calculation"
  | "faqs/contribute"
  | "faqs/data"
  | "faqs/feedback"
  | "faqs/score"
  | "faqs/what"
  | "pages/legal";

const content: Record<
  MarkdownDocument,
  Partial<Record<LanguageTag, string>>
> = {
  "faqs/calculation": {
    en: calculationEn,
    de: calculationDe,
  },
  "faqs/contribute": {
    en: contributeEn,
    de: contributeDe,
  },
  "faqs/data": {
    en: dataEn,
    de: dataDe,
  },
  "faqs/feedback": {
    en: feedbackEn,
    de: feedbackDe,
  },
  "faqs/score": {
    en: scoreEn,
    de: scoreDe,
  },
  "faqs/what": {
    en: whatEn,
    de: whatDe,
  },
  "pages/legal": {
    en: legalEn,
    de: legalDe,
  },
};

export function loadMarkdownDocument(
  identifier: MarkdownDocument,
  languageTag: LanguageTag,
): Promise<string> | string {
  if (!content[identifier]) {
    throw new Error(`No content found for identifier: ${identifier}`);
  }

  return marked.parse(
    getTranslations(content[identifier], languageTag as LanguageTag) || "",
  );
}
