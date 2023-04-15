import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import GameDetails from '../components/GameCards/GameDetails';
import ApiService from '../ApiService';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';

const GameDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchGame = async () => {
    const gameId = parseInt(id, 10);
    try {
      const game = await ApiService.getGameById(gameId);
      setGame(game);
      setLoading(false);
    } catch (error) {
      console.error(`Error while loading game for id ${gameId}: ${error}`);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  return (
    <Container fixed>
      <IconButton onClick={() => navigate(-1)} aria-label="zpět na seznam her">
        <ArrowBackIcon />
        Zpět na seznam her
      </IconButton>
      {loading ? <h1 className="text-center">...loading</h1> : <GameDetails {...game} />}
    </Container>
  );
};

export default GameDetailContainer;
