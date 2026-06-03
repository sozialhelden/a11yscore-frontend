import type { ComponentProps } from "react";

/**
 * Wraps text in a <bdi> element to isolate its directionality.
 * Use this for user-generated or multilingual text (e.g. admin area names)
 * that may be in a RTL script (Arabic, Hebrew, etc.) embedded in a LTR page,
 * or vice versa.
 */
export default function BidiText(props: ComponentProps<"bdi">) {
  return <bdi {...props} />;
}
