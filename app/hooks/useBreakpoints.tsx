import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const breakpoints = {
  initial: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export type BreakpointContextType = {
  active: Breakpoint;
  greaterOrEqual: (givenBreakpoint: Breakpoint) => boolean;
  greater: (givenBreakpoint: Breakpoint) => boolean;
  smallerOrEqual: (givenBreakpoint: Breakpoint) => boolean;
  smaller: (givenBreakpoint: Breakpoint) => boolean;
  between: (
    lowerBreakpoint: Breakpoint,
    higherBreakpoint: Breakpoint,
  ) => boolean;
};

export const BreakpointContext = createContext<BreakpointContextType>({
  greaterOrEqual: () => false,
  greater: () => false,
  smallerOrEqual: () => false,
  smaller: () => false,
  between: () => false,
  active: "initial",
});

export function useBreakpoints() {
  return useContext(BreakpointContext);
}

export function BreakpointContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("sm");

  const calculate = () => {
    setBreakpoint(
      Object.entries(breakpoints)
        .reverse()
        .find(([_, minWidth]) => {
          return window.matchMedia(`(min-width: ${minWidth}px)`).matches;
        })
        ?.shift() as Breakpoint,
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  const greaterOrEqual = useCallback(
    (givenBreakpoint: Breakpoint) =>
      breakpoints[givenBreakpoint] <= breakpoints[breakpoint],
    [breakpoint],
  );
  const greater = useCallback(
    (givenBreakpoint: Breakpoint) =>
      breakpoints[givenBreakpoint] < breakpoints[breakpoint],
    [breakpoint],
  );
  const smallerOrEqual = useCallback(
    (givenBreakpoint: Breakpoint) =>
      breakpoints[givenBreakpoint] >= breakpoints[breakpoint],
    [breakpoint],
  );
  const smaller = useCallback(
    (givenBreakpoint: Breakpoint) =>
      breakpoints[givenBreakpoint] > breakpoints[breakpoint],
    [breakpoint],
  );
  const between = useCallback(
    (lowerBreakpoint: Breakpoint, higherBreakpoint: Breakpoint) =>
      breakpoints[lowerBreakpoint] <= breakpoints[breakpoint] &&
      breakpoints[higherBreakpoint] >= breakpoints[breakpoint],
    [breakpoint],
  );

  return (
    <BreakpointContext.Provider
      value={{
        greaterOrEqual,
        greater,
        smallerOrEqual,
        smaller,
        between,
        active: breakpoint,
      }}
    >
      {children}
    </BreakpointContext.Provider>
  );
}
