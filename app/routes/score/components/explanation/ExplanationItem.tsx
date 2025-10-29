import { marked } from "marked";
import type { ReactNode } from "react";
import Link from "~/components/Link";

export default function ExplanationItem({
  headline,
  links = [],
  text,
  children,
}: {
  headline: string;
  links?: { to: string; label: string }[];
  text?: string;
  children?: ReactNode;
}) {
  const renderedMarkdown = marked.parse(text || "");

  return (
    <section className="space-y-2 text-sm">
      <h4 className="font-medium text-base">{headline}</h4>
      {text && (
        <div
          className="prose prose-sm prose-ul:pl-3"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: we control this data
          dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
        ></div>
      )}
      {children && (
        <div className="prose prose-sm prose-ul:pl-3">{children}</div>
      )}
      <p className="flex flex-col gap-1">
        {links.map(({ to, label }) => (
          <Link to={to} key={to}>
            {label}
          </Link>
        ))}
      </p>
    </section>
  );
}
