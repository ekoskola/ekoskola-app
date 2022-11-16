import React from 'react';
import { Link } from 'react-router-dom';

function EkoskolaIcon() {
  return (
    <Link title="Ekoškola" to="/">
      <img src="/images/ekoskola.svg" width="60" height="60" alt="Ekoškola" />
    </Link>
  );
}

export default EkoskolaIcon;
