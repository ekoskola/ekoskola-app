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
        Aktivity a publikace nejsou v tomto výběru k dispozici. Pokud vám něco chybí napište nám,
        rádi tuto oblast doplníme. Zkuste zatím jiný výběr. Děkujeme za pochopení.
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
