import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const Content = styled.div`
  @media screen and (max-width: 500px) {
    padding-top: 5rem;
  }
`;

const Layout = ({ isAdmin, logout, children }) => {
  return (
    <div className="layouts">
      <Header isAdmin={isAdmin} logout={logout} />
      <Content className="content">{children}</Content>
      <Footer />
    </div>
  );
};
export default Layout;
