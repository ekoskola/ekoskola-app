import { taskEither } from 'fp-ts';

interface FetchError {
  readonly type: 'FetchError';
  readonly error: unknown;
}

export const safeFetch = (url: RequestInfo | URL, payload?: RequestInit | undefined) =>
  taskEither.tryCatch<FetchError, Response>(
    () => fetch(url, payload),
    (error): FetchError => ({ type: 'FetchError', error }),
  );
