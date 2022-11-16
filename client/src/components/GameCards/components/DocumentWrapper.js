import styled from 'styled-components';

const DocumentWrapper = styled.div`
  display: flex;
  justify-content: center;
  &canvas {
    width: 1000px;
  }
  @media screen and (max-width: 500px) {
    padding-left: 11rem;
    &canvas {
      width: 500px;
      height: auto;
    }
  }
`;

export default DocumentWrapper;
