import { type ComponentProps, useId } from "react";
import type { Score } from "~/routes/score/types/api";
import { getScorePercentage } from "~/utils/score";

export type MeterSize = "lg";

export default function ScoreMeter({
  score,
  size = "lg",
  children,
  className,
  ...props
}: ComponentProps<"div"> & {
  score: Score;
  size?: MeterSize;
}) {
  const id = useId();
  const percentage = getScorePercentage(score);

  // this is the radius of a circle filling the whole svg
  const radius = 200;
  // this is the offset from the actual drawn circle to the border of the svg
  const borderOffset = 30;
  // this is the stroke width of the circle
  const circleStroke = 18;
  // this is the stroke width of the line
  const lineStroke = 4;

  const circleCircumference = 2 * Math.PI * radius;

  // To get the angle for the upper half of a circle you would normally
  // multiply 180 degrees (or π) with the percentage and subtract π to start
  // from the left side. However, since our half circle is not a full half
  // circle we need to adjust the angle calculation slightly and add/subtract
  // the few degrees (in radians) that it actually differs from 180. I measured
  // the difference of the angle in degrees manually (using a set square that
  // I hold against my screen, lol), converted it to radians and adjusted it
  // slightly so it looks good visually. This is how I came up with the 0.26
  // and 0.13 values below.
  const angle = (Math.PI - 0.26) * percentage - Math.PI + 0.13;

  const sizeClasses = {
    lg: "w-[220px] md:w-[280px]",
  }[size];

  return (
    <div className={`${sizeClasses} relative ${className}`} {...props}>
      <div
        className="absolute inset-0 flex flex-col items-center justify-end"
        style={{ paddingBottom: `${(borderOffset / 8 / radius) * 100}%` }}
      >
        {children}
      </div>
      {/** biome-ignore lint/a11y/noSvgWithoutTitle: it's hidden for screen-readers, as it is just a visualization */}
      <svg
        className="w-full"
        viewBox="0 0 400 194"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <mask id={id}>
            <circle
              stroke="white"
              strokeWidth={circleStroke * 6}
              // these values are not 50/50 because the circle is actually not a full circle.
              // similar to the process mentioned above, I did some measuring, came up with
              // some numbers and adjusted them slightly so it looks good visually. That's
              // how I ended up with 2% and 4% percent change in circumference
              strokeDasharray={`${circleCircumference * 0.46 * percentage + 0.52 * circleCircumference},${circleCircumference}`}
              fill="none"
              cx={radius}
              cy={radius}
              r={radius}
            />
          </mask>
        </defs>
        <g>
          <path
            d="M29.5151 167.201C29.5151 167.201 40.7138 110.098 85.793 68.5912C87.8959 66.6549 90.0726 64.7526 92.3253 62.8916"
            className="stroke-red-200"
            strokeWidth={circleStroke}
            strokeLinecap="round"
          />
          <path
            d="M117.001 46.0674C122.384 43.2516 128.079 40.6741 134.104 38.3864C152.752 31.3049 174.554 27 200 27C225.446 27 247.248 31.3049 265.896 38.3864C271.921 40.6741 277.616 43.2516 282.999 46.0674"
            className="stroke-amber-200"
            strokeWidth={circleStroke}
            strokeLinecap="round"
          />

          <path
            d="M370.484 167.201C370.484 167.201 359.286 110.098 314.207 68.5912C312.104 66.6549 309.927 64.7526 307.674 62.8916"
            className="stroke-lime-200"
            strokeWidth={circleStroke}
            strokeLinecap="round"
          />
        </g>
        <g mask={`url(#${id})`}>
          <path
            d="M29.5151 167.201C29.5151 167.201 40.7138 110.098 85.793 68.5912C87.8959 66.6549 90.0726 64.7526 92.3253 62.8916"
            className="stroke-red-400"
            strokeWidth={circleStroke}
            strokeLinecap="round"
          />
          <path
            d="M117.001 46.0674C122.384 43.2516 128.079 40.6741 134.104 38.3864C152.752 31.3049 174.554 27 200 27C225.446 27 247.248 31.3049 265.896 38.3864C271.921 40.6741 277.616 43.2516 282.999 46.0674"
            className="stroke-amber-400"
            strokeWidth={circleStroke}
            strokeLinecap="round"
          />
          <path
            d="M370.484 167.201C370.484 167.201 359.286 110.098 314.207 68.5912C312.104 66.6549 309.927 64.7526 307.674 62.8916"
            className="stroke-lime-400"
            strokeWidth={circleStroke}
            strokeLinecap="round"
          />
        </g>
        <line
          x1={radius + (radius - borderOffset + circleStroke) * Math.cos(angle)}
          y1={radius + (radius - borderOffset + circleStroke) * Math.sin(angle)}
          x2={radius - lineStroke / 2}
          y2={radius}
          strokeWidth={lineStroke}
          strokeLinecap="round"
          strokeDasharray={`${circleStroke * 1.8},${radius}`}
          className="stroke-gray-900"
        />
      </svg>
    </div>
  );
}
