import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './styles/style.css';

import GameListContainer from './containers/GameListContainer';
import GameDetailContainer from './containers/GameDetailContainer';
import GameFilterContainer from './containers/GameFilterContainer';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import auth from './services/auth';
import { Loader } from './components/Loader';

import Layout from './components/Layout';
import AuthAsyncComponent from './components/AuthAsyncComponent';

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

const AdminCreateGameContainer = AuthAsyncComponent(() => {
  return import('./containers/CreateGameContainer');
});

const PrivateRouteCreateGame = ({ component: Component, ...rest }) => (
  <Routes>
    <Route
      {...rest}
      render={props => <AdminCreateGameContainer {...props} filterState={filterInitialState} />}
    />
  </Routes>
);

const PrivateRouteEditGame = ({ component: Component, ...rest }) => {
  console.log('PrivateRouteEditGame');
  const AdminEditGameContainer = AuthAsyncComponent(() => {
    return import('./containers/EditGameContainer');
  });
  return (
    <Routes>
      <Route
        {...rest}
        render={props => <AdminEditGameContainer {...props} filterState={filterInitialState} />}
      />
    </Routes>
  );
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
          <Route path="/create" element={<PrivateRouteCreateGame />} />
          <Route path="/edit/:id" element={<PrivateRouteEditGame />} />
          <Route component={NotFound} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

// We can pass a default namespace to translate(), in our example we're setting it to 'translations'
export default withTranslation('translations')(App);
