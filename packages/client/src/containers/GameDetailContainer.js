import React, { useState, useEffect } from 'react';
import GameDetails from '../components/GameCards/GameDetails';
import ApiService from '../ApiService';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';

const GameDetailContainer = props => {
  const { match, history } = props;
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);

  const fetchGame = async () => {
    const gameId = parseInt(match.params.id, 10);
    try {
      const game = await ApiService.getGameById({ id: gameId });
      setGame(game);
      setLoading(false);
    } catch (error) {
      console.error(`An error occured while loading game for id ${gameId}: ${error}`);
    }
  };

  useEffect(() => {
    fetchGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fixed>
      <IconButton onClick={() => history.goBack()} aria-label="zpět na seznam her">
        <ArrowBackIcon />
        Zpět na seznam her
      </IconButton>
      {loading ? <h1 className="text-center">...loading</h1> : <GameDetails {...game} />}
    </Container>
  );
};

export default GameDetailContainer;
