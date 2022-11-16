import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ColorButton from './ColorButton';

function DeleteGameButton({ onClickRemoveGame }) {
  return (
    <React.Fragment>
      <ColorButton
        variant="contained"
        title="Smazat hru"
        style={{ backgroundColor: 'red', color: 'white', paddingTop: 0 }}
        onClick={onClickRemoveGame}
        startIcon={
          <IconButton aria-label="Smazat hru">
            <DeleteIcon style={{ fill: 'white' }} />
          </IconButton>
        }
      >
        Smazat hru
      </ColorButton>
    </React.Fragment>
  );
}

export default DeleteGameButton;
