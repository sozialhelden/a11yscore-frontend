import type { ReactNode } from "react";
import { NavLink, type NavLinkProps } from "react-router";

export default function FooterLink({
  to,
  children,
}: {
  to: NavLinkProps["to"];
  children: ReactNode;
}) {
  const defaultClassNames =
    "underline text-gray-500 hover:text-primary inline-block px-2 py-0.5 rounded";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${defaultClassNames}${isActive ? " bg-primary/10" : ""}`
      }
    >
      {children}
    </NavLink>
  );
}
