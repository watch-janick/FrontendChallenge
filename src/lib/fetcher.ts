import path from "path";

export interface FetcherOptions {
  urlParams?: Record<string, string | number | boolean>;
  method?: FetcherMethods;
  body?: Record<string, unknown>;
}

export enum FetcherMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const DEFAULT_OPTIONS: Required<FetcherOptions> = {
  urlParams: {},
  method: FetcherMethods.GET,
  body: {},
};

export interface FetcherResponse<T> {
  status: string;
  message: string;
  data: T;
}

// This is a simplified version of what could be a more complex fetcher
// that handles authorization, etc...
// I usually use axios for this but for simplicity I'm using fetch in this test
export const fetcher = async <T>(
  urlPath: string,
  options?: FetcherOptions,
): Promise<T> => {
  const { urlParams, method } = { ...DEFAULT_OPTIONS, ...options };

  const url = new URL(
    path.join(
      process.env.NEXT_PUBLIC_API_BASE_URL!,
      buildPath(urlPath, urlParams),
    ),
  );

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(options?.body),
  });

  if (!response.ok) {
    // Needs better error handling in a real app
    throw new Error(response.statusText);
  }

  const payload = (await response.json()) as FetcherResponse<T>;

  return payload.data;
};

// Used to replace the params in the url path
// ex: /update/:id becomes /update/1
export const buildPath = (
  urlPath: string,
  params: Record<string, string | number | boolean>,
): string => {
  const processedUrl = Object.keys(params).reduce(
    (acc, key) => acc?.replace(`:${key}`, params[key]?.toString() ?? ""),
    urlPath,
  );

  return processedUrl;
};
