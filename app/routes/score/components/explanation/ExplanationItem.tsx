import type { ReactNode } from "react";
import Link from "~/components/Link";

export default function ExplanationItem({
  headline,
  links = [],
  children,
}: {
  headline: string;
  links?: { to: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <section className="space-y-2 text-sm">
      <h4 className="font-medium text-base">{headline}</h4>
      <p>{children}</p>
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
