import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  0% { height: 100px; width: 100px; }
  30% { height: 120px; width: 120px; opacity: 1 }
  40% { height: 125px; width: 123px; opacity: 0.3; }
  100% { height: 100px; width: 100px; opacity: 0.6; }
`;

const Img = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  margin: -60px 0 0 -60px;
  animation-name: ${animation};
  animation-duration: 8s;
  animation-iteration-count: infinite;
`;

export const Loader = () => (
  <Img
    className="image-loader"
    src="/images/ekoskola.svg"
    style={{ backgroundColor: '#04a64b' }}
    alt="Ekoškola"
  />
);
