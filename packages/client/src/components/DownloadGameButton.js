import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import ColorButton from './ColorButton';

function DownloadGameButton({ fileId }) {
  const url = `${window.location.origin}/api`;

  return (
    <React.Fragment>
      <ColorButton
        variant="contained"
        color="primary"
        href={`${url}/download/${fileId}`}
        title="Stáhnout hru"
        download
        startIcon={
          <IconButton aria-label="Download game">
            <CloudDownloadIcon style={{ fill: 'white' }} />
          </IconButton>
        }
      >
        Stáhnout
      </ColorButton>
    </React.Fragment>
  );
}

export default DownloadGameButton;
