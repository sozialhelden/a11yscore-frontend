import type { ComponentProps } from "react";

export default function Main({
  children,
  className,
  size = "normal",
  ...props
}: ComponentProps<"main"> & { size?: "narrow" | "normal" | "wide" }) {
  const sizeClasses = {
    narrow: "md:max-w-[640px]",
    normal: "md:max-w-[800px]",
    wide: "md:max-w-[1024px]",
  };

  return (
    <main
      className={`grid items-center px-4 md:px-10 ${className || ""}`}
      {...props}
    >
      <div className="w-full overflow-x-hidden md:overflow-x-clip">
        <div className={`mx-auto ${sizeClasses[size]}`}>{children}</div>
      </div>
    </main>
  );
}
