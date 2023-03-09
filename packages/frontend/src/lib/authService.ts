import { safeFetch } from './safeFetch';

// async login({ username, password }) {
//     const { data } = await axios.post(`${this.host}/login`, {
//       username,
//       password,
//     });

//     return data;
//   }

interface Credentials {
  username: string;
  password: string;
}

const host = 'http://localhost:8000/';
export const login = (credential: Credentials) => {
  const params: RequestInit = {
    method: 'POST',
    body: JSON.stringify(credential),
  };

  safeFetch(`${host}login`, params);
};

export const authenticate = () =>
  safeFetch(`${host}auth`, {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  });

export const logout = () => safeFetch(`${host}logout`);
