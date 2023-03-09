import { pipe } from 'fp-ts/lib/function';
import { either } from 'fp-ts';

import { useEffect, useState } from 'react';
import { getGame } from '../lib/gameService';

interface GameDetailRouteProps {
  id: number;
}
export const GameDetailRoute = (props: GameDetailRouteProps) => {
  const { id } = props;
  const [gameToDisplay, setGameToDisplay] = useState(null);

  useEffect(() => {
    console.log('useEffect');
    const game = getGame(id);
    game().then(e =>
      pipe(
        e,
        either.fold(
          err => {
            console.log('err', err);
          },
          x => {
            x.json().then(game => {
              console.log('game', game);
              setGameToDisplay(game);
            });
          },
        ),
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>test</div>;
};
