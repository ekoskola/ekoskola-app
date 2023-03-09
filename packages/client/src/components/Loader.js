import React from 'react';

function Loader() {
  return (
    <React.Fragment>
      <img
        className="image-loader"
        src="/images/ekoskola.svg"
        style={{ backgroundColor: '#04a64b' }}
        alt="Ekoškola"
      />
    </React.Fragment>
  );
}

export default Loader;
