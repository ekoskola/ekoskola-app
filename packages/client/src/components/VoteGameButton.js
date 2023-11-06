import React from 'react';

import ColorButton from './ColorButton';

function VoteGameButton({ onClick, isDisabled }) {
  return (
    <React.Fragment>
      <ColorButton
        variant="contained"
        title="Hodnocení aktivity"
        color="primary"
        disabled={isDisabled}
        onClick={onClick}
      >
        Hodnocení aktivity
      </ColorButton>
    </React.Fragment>
  );
}

export default VoteGameButton;
