import React from 'react';
import styled from 'styled-components';

export const VotedText = ({ count }) => {
  let text;
  switch (count) {
    case null:
    case undefined:
    case 0:
      text = 'Hlasování ještě nebylo zahájeno';
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      text = `Hlasováno ${count}x`;
      break;
    default:
      text = `Hlasováno ${count}krát`;
      break;
  }
  return <Text>{text}</Text>;
};

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-top: 20px;
  margin-right: 10px;
`;
