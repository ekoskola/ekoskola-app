import { safeFetch } from './safeFetch';

const host = 'http://localhost:8000/';

export const getGame = (gameId: number) => safeFetch(`${host}game/${gameId}`);
