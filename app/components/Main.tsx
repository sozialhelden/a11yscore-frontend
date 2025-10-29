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
      className={`grid grid-cols-1 items-center ${className || ""}`}
      {...props}
    >
      <div className={`mx-auto w-full px-4 md:px-10 ${sizeClasses[size]}`}>
        {children}
      </div>
    </main>
  );
}
