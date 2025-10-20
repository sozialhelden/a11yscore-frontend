import type { RouterContextProvider } from "react-router";
import { apiContext, i18nContext } from "~/context";

export function getApiUrl(
  context: Readonly<RouterContextProvider>,
  path: string,
): string {
  const { languageTag } = context.get(i18nContext);
  const { baseUrl } = context.get(apiContext);

  const url = new URL(
    `${baseUrl || process.env.API_BASE_URL}/a11yscore/${path}`,
  );
  url.searchParams.append("lang", languageTag!);

  return url.toString();
}

export async function apiFetch<R>(
  context: Readonly<RouterContextProvider>,
  path: string,
  options?: RequestInit,
): Promise<R> {
  const response = await fetch(getApiUrl(context, path), options);

  if (!response.ok) {
    throw new Response(`Failed to fetch: ${path}`, {
      status: response.status,
    });
  }

  return (await response.json()) as R;
}
