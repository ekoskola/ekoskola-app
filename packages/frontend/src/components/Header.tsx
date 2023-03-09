import styled from 'styled-components';

import { EkoskolaIcon } from './Icon';

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

const HeaderIcon = styled(EkoskolaIcon)`
  display: inline;
`;

interface HederProps {
  isAdmin: boolean;
  logout: () => void;
}

export const Header = (props: HederProps) => {
  const { isAdmin, logout } = props;

  return (
    <HeaderTag>
      <HeaderWrapper>
        <EkoskolaIcon />
        <HeaderActions>
          {isAdmin ? (
            <>
              <HeaderLink href="/create">Vytvořit</HeaderLink>
              <HeaderLink href="/" onClick={logout}>
                Logout
              </HeaderLink>
            </>
          ) : (
            <HeaderLink href="/login">Login</HeaderLink>
          )}
        </HeaderActions>
      </HeaderWrapper>
    </HeaderTag>
  );
};
