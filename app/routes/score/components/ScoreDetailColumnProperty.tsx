import type { ComponentProps, FC } from "react";

export default function ScoreDetailColumnProperty({
  children,
  className,
  icon,
  ...props
}: ComponentProps<"div"> & { icon?: FC }) {
  const IconComponent = icon;

  return (
    <div
      className={`grid grid-cols-[min-content_1fr] gap-3 text-gray-600 text-xs *:nth-2:mt-4 *:nth-1:mt-4 ${className}`}
      {...props}
    >
      {IconComponent && (
        <span className="relative top-0.5">
          <IconComponent />
        </span>
      )}
      <span className="flex flex-col min-h-7 justify-center">
        <span>{children}</span>
      </span>
    </div>
  );
}
