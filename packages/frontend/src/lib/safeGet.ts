import { taskEither } from 'fp-ts';

interface FetchError {
  readonly type: 'FetchError';
  readonly error: unknown;
}

export const safeGet = (url: string) =>
  taskEither.tryCatch<FetchError, Response>(
    () => fetch(url),
    (error): FetchError => ({ type: 'FetchError', error }),
  );
