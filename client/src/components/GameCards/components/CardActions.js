import styled from 'styled-components';

const CardActions = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: unset;
  }
`;

export default CardActions;
