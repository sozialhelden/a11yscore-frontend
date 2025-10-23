import type { ComponentProps } from "react";

export default function Card({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={`bg-white shadow-md px-3 py-3 rounded outline-2 outline-transparent ${className || ""}`}
    >
      {children}
    </div>
  );
}
