import { ScrollArea, type ScrollAreaRef, ScrollBar } from "@sozialhelden/ui";
import {
  type ComponentPropsWithoutRef,
  type RefAttributes,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

export type ScoreDetailsScrollAreaRef = {
  scrollTo: (columnIndex: number) => void;
};

export default function ScoreDetailScrollArea({
  columnCount = 2,
  children,
  ref,
  ...props
}: ComponentPropsWithoutRef<typeof ScrollArea> &
  RefAttributes<ScoreDetailsScrollAreaRef> & {
    columnCount: number;
  }) {
  const columns = useMemo(
    () => new Array(columnCount).fill(null),
    [columnCount],
  );

  const scrollAreaRef = useRef<ScrollAreaRef>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>(columns);

  const overflowWidth = 100;
  const gap = 32;

  useImperativeHandle(
    ref,
    () => ({
      scrollTo: (index: number) => {
        if (!columnRefs.current[index]) {
          return;
        }
        scrollAreaRef.current?.scrollTo({
          left: columnRefs.current[index]?.offsetLeft,
          behavior: "smooth",
        });
      },
    }),
    [],
  );

  return (
    <ScrollArea
      ref={scrollAreaRef}
      type="always"
      className="*:snap-x *:snap-mandatory"
      style={{
        // As we want to overflow on both sides, we need to increase the width by overflowWidth * 2
        // and then apply negative margins on both sides.
        width: `calc(100% + ${overflowWidth * 2}px)`,
        marginLeft: `-${overflowWidth}px`,
        marginRight: `-${overflowWidth}px`,
      }}
      {...props}
    >
      <div
        className="z-30 absolute right-0 top-0 bottom-0 pointer-events-none bg-linear-to-r from-gray-100/0 to-gray-100"
        style={{ width: `${overflowWidth}px` }}
      />
      <div
        className="z-30 absolute left-0 top-0 bottom-0 pointer-events-none bg-linear-to-l from-gray-100/0 to-gray-100"
        style={{ width: `${overflowWidth}px` }}
      />

      <div
        style={{
          // Let's start from the inner calc and walk slowly to the outside. This sets the width of the
          // scrollable area. As due to the overflow the scroll-container is greater than the inner "viewport",
          // where we want to display columns, we need to subtract the width of the overflow from both sides
          // to get the actual width of the inner "viewport". As we want to fit 2 columns in this "viewport",
          // we multiply it by half of the column count. Finally, we need to add back the overflow widths as
          // well as the gaps between the columns (except for the first one) to get the final width.
          width: `calc( calc( calc(100% - ${overflowWidth * 2}px) * ${columnCount / 2}) + ${overflowWidth * 2 + (gap / 2) * (columnCount - 2)}px)`,
        }}
      >
        <div className="flex *:snap-start *:snap-always h-1">
          {columns.map((_, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: this element is literally just an index
              key={index}
              ref={(element) => {
                columnRefs.current[index] = element;
              }}
              // This is for debugging purposes to visualize the snapping points
              // className="border-r-4 border-gray-900 bg-gray-300"
              style={{
                // This is similar to the width calculation above, but now we calculate points for snapping.
                // The innermost calc calculates the width of a single column by taking the full width minus
                // gaps and overflows divided by the column count. Then we add back a single gap to get the
                // correct snapping point. This is necessary, as due to the overflows, the actual columns are
                // not the place where the scroll position should snap to. You can debug the snapping points
                // visually, by uncommenting the className above.
                width: `calc( calc( calc(100% - ${overflowWidth * 2 + gap * (columnCount - 1)}px) / ${columnCount}) + ${gap}px)`,
              }}
            ></div>
          ))}
        </div>
        <div
          className="grid pt-2 pb-6"
          style={{
            gap: `${gap}px`,
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            marginLeft: `${overflowWidth}px`,
            marginRight: `${overflowWidth}px`,
          }}
        >
          {children}
        </div>
      </div>

      {columnCount > 2 && (
        <ScrollBar
          orientation="horizontal"
          className="left-[100px]! right-[100px]!"
        />
      )}
    </ScrollArea>
  );
}
