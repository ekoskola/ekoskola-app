import React from 'react';
import GameCard from './GameCards/GameCard';
// import { withRouter } from 'react-router-dom';

import styled from 'styled-components';

const GameListWrapper = styled.div``;

const GameList = props => {
  const { games, isAdmin, removeGame } = props;
  if (!games || !games.length) {
    return (
      <h2>
        Tvůj výběr byl moc specifický, zkus ubrat nějaké zaškrtnutí. Když nezaškrtneš nic, objeví se
        ti všechny aktivity co máme.{' '}
      </h2>
    );
  }

  return (
    <GameListWrapper>
      {games.map((item, index) => (
        <GameCard isAdmin={isAdmin} removeGame={removeGame} key={index} {...item} />
      ))}
    </GameListWrapper>
  );
};

export default GameList;
