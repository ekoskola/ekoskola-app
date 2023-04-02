import React from 'react';

import ColorButton from './ColorButton';

function VoteGameButton({ onClick }) {
  return (
    <React.Fragment>
      <ColorButton variant="contained" title="hlasovací hra" color="primary" onClick={onClick}>
        Hlasovací hra
      </ColorButton>
    </React.Fragment>
  );
}

export default VoteGameButton;
