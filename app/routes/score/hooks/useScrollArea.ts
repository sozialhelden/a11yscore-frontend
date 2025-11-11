import type { ScrollAreaRef } from "@sozialhelden/ui";
import { type RefObject, useCallback, useState } from "react";

export function useScrollArea({
  columnCount,
  scrollAreaRef,
  columnRefs,
}: {
  columnCount: number;
  scrollAreaRef: RefObject<ScrollAreaRef | null>;
  columnRefs: RefObject<(HTMLDivElement | null)[]>;
}) {
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (!columnRefs.current[index]) {
        return;
      }
      scrollAreaRef.current?.scrollTo({
        left: columnRefs.current[index]?.offsetLeft,
        behavior: "smooth",
      });
    },
    [columnRefs, scrollAreaRef],
  );

  const calculateScrollIndex = useCallback(() => {
    const scrollPosition = scrollAreaRef.current?.getScrollPosition().left || 0;
    // get the index of the column that is closest to the current scroll position
    const { index } =
      columnRefs.current
        .map((column, index) => {
          return {
            index,
            distance: Math.abs((column?.offsetLeft || 0) - scrollPosition),
          };
        })
        .sort((a, b) => a.distance - b.distance)
        .shift() || {};
    setScrollIndex(index || 0);
  }, [columnRefs, scrollAreaRef]);

  const next = useCallback(() => {
    // currently scrolling
    if (scrollIndex === -1) {
      return;
    }
    scrollTo(Math.min(columnCount - 1, scrollIndex + 1));
  }, [scrollTo, columnCount, scrollIndex]);

  const previous = useCallback(() => {
    // currently scrolling
    if (scrollIndex === -1) {
      return;
    }
    scrollTo(Math.max(0, scrollIndex - 1));
  }, [scrollTo, scrollIndex]);

  return {
    scrollTo,
    calculateScrollIndex,
    next,
    previous,
    scrollIndex,
  };
}
