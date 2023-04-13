import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import GameList from '../components/GameList';
import { Link } from 'react-router-dom';
import ApiService from '../ApiService';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';

import { Loader } from '../components/Loader';
import Pagination from '../components/Pagination';
import { PageSizeSelector } from '../components/PageSizeSelector';

const style = {
  linkBack: {
    fontSize: '4rem',
  },
};

const TopNavigationWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const PageInditatorWrapper = styled.span`
  padding-top: 3rem;
  padding-right: 6rem;
  font-size: 1.5rem;
`;

const GameListContainer = props => {
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  const { location, history, isAdmin } = props;
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [query] = useState(
    queryString.parse(location.search, {
      parseBooleans: true,
      arrayFormat: 'bracket',
    }),
  );

  const path = `${history.location.pathname}${history.location.search}`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchGames = async () => {
    try {
      const gamesData = await ApiService.getGames({
        ...query,
        limit: pageSize,
        offset,
      });
      if (gamesData.count) {
        setTotalPages(Math.ceil(gamesData.count / pageSize));
      }
      setGames(gamesData.games);
    } catch (error) {
      console.error(`An error occurred while loading games: ${error}`);
    }
    setLoading(false);
  };

  const removeGame = async gameId => {
    setLoading(true);

    try {
      await ApiService.removeGame(gameId);
      await fetchGames();
    } catch (error) {
      console.error(`An error occurred while deleting a game: ${error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, pageSize]);

  const onPageChanged = data => {
    const { currentPage } = data;

    setCurrentPage(currentPage);
    setOffset((currentPage - 1) * pageSize);
  };

  const handlePageSizeChange = async size => {
    if (pageSize === size) return;
    await setPageSize(size);
  };

  return (
    <Container fixed>
      <TopNavigationWrapper>
        <Link className="game-link-back" to="/" style={style.linkBack}>
          <IconButton onClick={() => history.push('/')} aria-label="Zpět na filtry">
            <ArrowBackIcon />
            Zpět na filtry
          </IconButton>
        </Link>
        <PageSizeSelector pageSize={pageSize} onChange={handlePageSizeChange} />
        {currentPage && (
          <PageInditatorWrapper className="current-page d-inline-block h-100 pl-4 text-secondary">
            Strana <span className="font-weight-bold">{currentPage}</span> /{' '}
            <span className="font-weight-bold">{totalPages}</span>
          </PageInditatorWrapper>
        )}
      </TopNavigationWrapper>

      {loading ? (
        <Loader />
      ) : (
        <GameList listPath={path} games={games} isAdmin={isAdmin} removeGame={removeGame} />
      )}

      <Pagination totalPages={totalPages} onPageChanged={onPageChanged} />
    </Container>
  );
};

export default GameListContainer;
