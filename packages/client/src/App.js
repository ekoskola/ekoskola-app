import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './styles/style.css';

import GameListContainer from './containers/GameListContainer';
import GameDetailContainer from './containers/GameDetailContainer';
import GameFilterContainer from './containers/GameFilterContainer';
import CreateGameContainer from './containers/CreateGameContainer';
import EditGameContainer from './containers/EditGameContainer';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import auth from './services/auth';
import { Loader } from './components/Loader';

import Layout from './components/Layout';

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

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterState, setFilterState] = useState(filterInitialState);

  const authenticate = async () => {
    try {
      await auth.authenticate();
      setIsAdmin(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await auth.logout();
      setIsAdmin(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Layout isAdmin={isAdmin} logout={logout}>
        <Routes>
          <Route
            path="/"
            element={
              <GameFilterContainer filterState={filterState} setFilterState={setFilterState} />
            }
          />
          <Route path="/games" element={<GameListContainer isAdmin={isAdmin} />} />
          <Route path="/games/:id" element={<GameDetailContainer />} />
          <Route path="/login" element={<Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          <Route path="/create" element={<CreateGameContainer />} />
          <Route path="/edit/:id" element={<EditGameContainer />} />
          <Route component={NotFound} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

// We can pass a default namespace to translate(), in our example we're setting it to 'translations'
export default withTranslation('translations')(App);
