import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink, type NavLinkProps } from "react-router";

export default function FaqLink({
  to,
  children,
}: {
  to: NavLinkProps["to"];
  children?: ReactNode;
}) {
  const defaultClassNames =
    "font-medium inline-flex items-center gap-2 hover:underline hover:text-primary px-2 py-1 rounded";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${defaultClassNames}${isActive ? " text-primary bg-primary/10" : ""}`
      }
    >
      <ArrowRight size={16} aria-hidden className="shrink-0" />
      {children}
    </NavLink>
  );
}
