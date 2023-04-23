import React from 'react';
import EkoskolaIcon from './EkoskolaIcon';
import styled from 'styled-components';
import { link } from 'react-router-dom';

const HeaderTag = styled.header`
  height: 85px;
`;

const HeaderWrapper = styled.div`
  overflow: hidden;
  background-color: #04a64b;
  padding: 0px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const HeaderLink = styled.a`
  float: left;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  color: #fff;
  line-height: 4rem;
  border-radius: 4px;
  &:hover {
    text-decoration: none;
    color: #fff;
    background-color: #8cc152;
  }
  &.active {
    text-decoration: none;
    color: #fff;
    background-color: #8cc152;
  }
  @media screen and (max-width: 500px) {
    float: none;
    display: block;
    text-align: left;
    &.active {
      text-decoration: none;
      color: #fff;
      background-color: #8cc152;
    }
  }
`;

const HeaderLogo = styled(HeaderLink)`
  font-size: 25px;
  font-weight: bold;
  &:hover {
    background-color: #8cc152;
  }
`;

const HeaderActions = styled.div`
  float: right;
  @media screen and (max-width: 500px) {
    float: none;
    &.active {
      text-decoration: none;
      color: #fff;
      background-color: #8cc152;
    }
  }
`;

const Header = props => {
  const { isAdmin, logout } = props;

  return (
    <HeaderTag>
      <HeaderWrapper>
        <HeaderLogo>
          <EkoskolaIcon />
        </HeaderLogo>
        <HeaderActions>
          {isAdmin ? (
            <React.Fragment>
              <HeaderLink href="/create">Vytvořit</HeaderLink>
              <HeaderLink href="/" onClick={logout}>
                Logout
              </HeaderLink>
            </React.Fragment>
          ) : (
            <HeaderLink href="/login">Login</HeaderLink>
          )}
        </HeaderActions>
      </HeaderWrapper>
    </HeaderTag>
  );
};

export default Header;
