import {
  Button,
  ScrollArea,
  type ScrollAreaRef,
  ScrollBar,
} from "@sozialhelden/ui";
import { useT } from "@transifex/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type RefAttributes,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useBreakpoints } from "~/hooks/useBreakpoints";
import { useScrollArea } from "~/routes/score/hooks/useScrollArea";

export type ScoreDetailsScrollAreaRef = {
  scrollTo: (columnIndex: number) => void;
};

export default function ScoreDetailScrollArea({
  columnCount = 2,
  children,
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ScrollArea> &
  RefAttributes<ScoreDetailsScrollAreaRef> & {
    columnCount: number;
  }) {
  const t = useT();
  const { greaterOrEqual } = useBreakpoints();

  const columns = useMemo(
    () => new Array(columnCount).fill(null),
    [columnCount],
  );

  const scrollAreaRef = useRef<ScrollAreaRef>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>(columns);

  const columnsInViewport = useMemo(
    () => (greaterOrEqual("md") ? 2 : 1),
    [greaterOrEqual],
  );
  const overflowWidth = useMemo(() => {
    if (greaterOrEqual("xl")) {
      return 100;
    }
    if (greaterOrEqual("lg")) {
      return 40;
    }
    if (greaterOrEqual("md")) {
      return 34;
    }
    return 16;
  }, [greaterOrEqual]);

  const gap = useMemo(() => {
    if (greaterOrEqual("xl")) {
      return 32;
    }
    if (greaterOrEqual("lg")) {
      return 24;
    }
    if (greaterOrEqual("md")) {
      return 16;
    }
    return 10;
  }, [greaterOrEqual]);

  const { scrollTo, calculateScrollIndex, scrollIndex, next, previous } =
    useScrollArea({
      columnCount,
      scrollAreaRef,
      columnRefs,
    });

  useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);

  return (
    <div className="space-y-2">
      <ul className="flex justify-between sticky md:static top-0 z-40 ">
        <li>
          <Button
            variant="outline"
            type="button"
            size="icon"
            onClick={previous}
            aria-label={t("Previous column")}
            hidden={scrollIndex === 0}
          >
            <ArrowLeft aria-hidden />
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            type="button"
            size="icon"
            onClick={next}
            aria-label={t("Next column")}
            hidden={scrollIndex === columnCount - columnsInViewport}
          >
            <ArrowRight aria-hidden />
          </Button>
        </li>
      </ul>

      <ScrollArea
        {...props}
        // Notice the double child div selector here. The default display: table on the element inside the scroll area,
        // that wraps the content messes up our calculations on mobile, as it is wider than the parent and our
        // calculations are based on percentages. So we need to force a fixed table layout with full width to ensure
        // it is as wide as the parent. This could be added to the ui-library directly, but as this is a very specific
        // on-off use-case, I prefer this solution.
        className={`*:snap-x *:snap-mandatory [&>div>div:first-child]:table-fixed [&>div>div:first-child]:w-full ${className}`}
        style={{
          // As we want to overflow on both sides, we need to increase the width by overflowWidth * 2 and then apply
          // negative margins.
          width: `calc(100% + ${overflowWidth * 2}px)`,
          marginLeft: `-${overflowWidth}px`,
          marginRight: `-${overflowWidth}px`,
        }}
        ref={scrollAreaRef}
        type="always"
        onScroll={calculateScrollIndex}
      >
        <div
          className="z-30 absolute right-0 top-0 bottom-0 pointer-events-none bg-linear-to-r from-gray-100/0 to-gray-100"
          style={{ width: `${overflowWidth}px` }}
        />
        <div
          className="z-30 absolute left-0 top-0 bottom-0 pointer-events-none bg-linear-to-l from-gray-100/0 to-gray-100"
          style={{ width: `${overflowWidth}px` }}
        />

        {columnCount > columnsInViewport && (
          <ScrollBar
            orientation="horizontal"
            style={{
              left: `${overflowWidth}px`,
              right: `${overflowWidth}px`,
            }}
          />
        )}

        <div
          style={{
            // Let's start from the inner calc and walk slowly to the outside. This sets the width of the scrollable
            // area. We need to set the width manually, otherwise scrolling would not work. Due to the overflow, the
            // scroll-container is greater than the inner "scroll-viewport" where we want to display columns, so we
            // need to subtract the width of the overflow from both sides to get the actual width of the inner
            // "scroll viewport". As we want to fit x columns in this "scroll viewport" we multiply it by the
            // column-count / x. Finally, we need to add back the overflow widths as well as the gaps between the
            // columns
            width: `calc( calc( calc(100% - ${overflowWidth * 2}px) * ${columnCount / columnsInViewport}) + ${overflowWidth * 2 + (gap / 2) * (columnCount - columnsInViewport)}px)`,
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
                // This is for debugging purposes to visualize the snapping points, uncomment to see them
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
      </ScrollArea>
    </div>
  );
}
