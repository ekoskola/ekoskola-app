import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #eee;
  }

  &:disabled {
    background-color: #ccc;
    color: #999;
    cursor: default;
  }
`;

export const PageSizeSelector = ({ pageSize, onChange }) => {
  console.log('pageSize', pageSize);
  console.log('onChange', onChange);
  return (
    <>
      <ButtonContainer>
        <Button onClick={() => onChange(15)} disabled={pageSize === 15}>
          15
        </Button>
        <Button onClick={() => onChange(30)} disabled={pageSize === 30}>
          30
        </Button>
        <Button onClick={() => onChange(45)} disabled={pageSize === 45}>
          45
        </Button>
      </ButtonContainer>
    </>
  );
};
