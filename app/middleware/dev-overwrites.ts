import type { MiddlewareFunction } from "react-router";
import { apiContext } from "~/context";

export async function devOverwritesMiddleware({
  request,
  context,
}: Parameters<MiddlewareFunction>[0]) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  // this allows to overwrite the base-url used in api calls
  const url = new URL(request.url);
  if (url.searchParams.has("baseUrl")) {
    context.set(apiContext, { baseUrl: url.searchParams.get("baseUrl")! });
  }
}
