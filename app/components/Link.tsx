import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink, type NavLinkProps } from "react-router";

export default function Link({ children, className, ...props }: NavLinkProps) {
  return (
    <NavLink
      className={`group inline-block underline hover:text-primary ${className || ""}`}
      {...props}
    >
      <span>{children as ReactNode}</span>
      <ArrowRight className="inline-block h-[1.1em] mr-1 transition-transform duration-200 group-hover:translate-x-1" />
    </NavLink>
  );
}
