import React from 'react';

const Footer = () => (
  <footer
    style={{
      color: '#656D78',
      padding: '40px 0',
      backgroundColor: '#F5F7FA',
    }}
  >
    <div className="container">
      <div className="text-center">
        <a title="Ekoškola" href="/">
          <img src="/images/logo.png" alt="Logo" />
        </a>
        <br />
        <p>
          Ekoškola pomáhá žákům, učitelům a rodičům proměnit školu v příjemnější, demokratičtější a
          k přírodě bližší místo k životu.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
