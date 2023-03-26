import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { either, option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { Loader } from './components/Loader';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root';
import { ErrorPage } from './routes/error-page';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { authenticate, logout } from './lib/authService';
import { GameDetailRoute } from './routes/GameDetailRoute';

const user = pipe(1, (x: number) => option.none);

const filterInitialState = {
  location: [],
  grade: [],
  topics: [],
  classes: [],
  subjects: [],
  ekoskola_steps: [],
  timing: [],
  physical_activity: [],
  number_teachers: [],
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'test',
        element: <Loader />,
      },
      {
        path: 'game/:id',
        element: <GameDetailRoute id={1} />,
      },
    ],
  },
]);

function App() {
  // const [filterState, setFilterState] = useState(filterInitialState);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const createLogout = async () => {
    setLoading(true);
    const out = logout();
    out().then(e =>
      pipe(
        e,
        either.fold(
          err => {
            console.log('err', err);
            setLoading(false);
          },
          x => {
            setLoading(false);
            setIsAdmin(false);
          },
        ),
      ),
    );
  };

  useEffect(() => {
    const auth = authenticate();
    auth().then(e =>
      pipe(
        e,
        either.fold(
          err => {
            console.log('e', e);
            setLoading(false);
            setIsAdmin(false);
          },
          x => {
            setLoading(false);
            if (x.status === 403) {
              setIsAdmin(false);
            } else {
              // TODO: do it otherwise
              setIsAdmin(true);
            }
          },
        ),
      ),
    );
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
