import type { ComponentProps } from "react";

export default function Main({
  children,
  className,
  ...props
}: ComponentProps<"main">) {
  return (
    <main className={`grid items-center px-4 md:px-10 ${className}`} {...props}>
      <div className="w-full overflow-x-hidden md:overflow-x-clip">
        <div className="md:max-w-[800px] mx-auto">{children}</div>
      </div>
    </main>
  );
}
