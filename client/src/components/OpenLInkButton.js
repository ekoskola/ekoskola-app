import React from 'react';

import ColorButton from './ColorButton';

import IconButton from '@material-ui/core/IconButton';
import PageviewIcon from '@material-ui/icons/Pageview';
import EditIcon from '@material-ui/icons/Edit';

function OpenLInkButton({ path, label, icon }) {
  return (
    <React.Fragment>
      <ColorButton
        variant="contained"
        color="primary"
        href={path}
        title="Otevřít hru"
        startIcon={
          <IconButton aria-label="Otevřít hru">
            {icon === 'edit' ? (
              <EditIcon style={{ fill: 'white' }} />
            ) : (
              <PageviewIcon style={{ fill: 'white' }} />
            )}
          </IconButton>
        }
      >
        {label}
      </ColorButton>
    </React.Fragment>
  );
}

export default OpenLInkButton;
