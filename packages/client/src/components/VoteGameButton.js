import React from 'react';

import ColorButton from './ColorButton';

function VoteGameButton({ onClick }) {
  return (
    <React.Fragment>
      <ColorButton variant="contained" title="Hodnocení aktivity" color="primary" onClick={onClick}>
        Hodnocení aktivity
      </ColorButton>
    </React.Fragment>
  );
}

export default VoteGameButton;
