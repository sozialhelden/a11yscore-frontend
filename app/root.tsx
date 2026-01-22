import { useTX } from "@transifex/react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { i18nContext } from "~/context";
import { i18nMiddleware } from "~/middleware/i18n";
import type { Route } from "./+types/root";

import "./app.css";
import { TooltipProvider } from "@sozialhelden/ui";
import { BreakpointContextProvider } from "~/hooks/useBreakpoints";
import { I18nContextProvider } from "~/hooks/useI18n";
import { devOverwritesMiddleware } from "~/middleware/dev-overwrites";

export const middleware: Route.MiddlewareFunction[] = [
  i18nMiddleware,
  devOverwritesMiddleware,
];

export async function loader({ context }: Route.LoaderArgs) {
  return { ...context.get(i18nContext), token: process.env.TRANSIFEX_TOKEN };
}

export default function App() {
  // Transifex unfortunately refused to play well with react-router. So this
  // implementation is not ideal... (but it works)
  // We need SSR in order to support runtime configuration via environment
  // variables, and we don't want to use route-params but base the selected
  // language on accept-language request header. The client-side has no access
  // to request headers, so I used a server middleware to determine the locale,
  // and pass it via router-context to a server loader, which then passes it, as
  // well as the transifex token, to this main app component, which puts both on
  // the html element. The locale is then set at first render in the client.
  // The only way to initialize Transifex with the token, is using the `entry.client.tsx`
  // file. Everywhere else, the import from "@transifex/native" resolved to `undefined`
  // on the client side. I'm not 100% sure why, but as I had issues with bundlers and
  // "@transifex/native" before, I guess it's a weird implementation on their side.
  // E.g. if you import { tx } from "@transifex/native" in this file, vite complains,
  // that it is a CommonJS module and not an ES module and cannot be imported that way.
  // So, in order to do that, I used a data-attribute on the html element in order to
  // pass the token to react-routers Browser entrypoint.
  // I tried a multitude of different approaches, but doing i18n only on the client-side
  // was the only way to get it working without hydration miss-match issues.
  const [isLoading, setIsLoading] = useState(true);
  const { languageTag, token } = useLoaderData();
  const tx = useTX();

  // biome-ignore lint/correctness/useExhaustiveDependencies: tx.setCurrentLocale doesn't change
  useEffect(() => {
    setIsLoading(true);
    tx.setCurrentLocale(languageTag)
      .catch((error: Error) => {
        console.error("Failed to set Transifex locale:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [languageTag]);

  return (
    <html lang={languageTag} data-transifex={token}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <I18nContextProvider languageTag={languageTag}>
          <BreakpointContextProvider>
            <TooltipProvider>
              {isLoading ? (
                <div className="fixed inset-0 bg-white flex items-center justify-center z-2000">
                  <LoaderCircle size={30} className="animate animate-spin" />
                </div>
              ) : (
                <Outlet />
              )}
            </TooltipProvider>
          </BreakpointContextProvider>
        </I18nContextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
