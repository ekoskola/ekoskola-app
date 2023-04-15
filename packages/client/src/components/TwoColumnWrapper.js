import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Column = styled.div`
  width: 48%;
`;

export default function TwoColumnWrapper({ children }) {
  const columnChildren = React.Children.toArray(children);

  return (
    <Wrapper>
      <Column>{columnChildren.slice(0, Math.ceil(columnChildren.length / 2))}</Column>
      <Column>{columnChildren.slice(Math.ceil(columnChildren.length / 2))}</Column>
    </Wrapper>
  );
}
