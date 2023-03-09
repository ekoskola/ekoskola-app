import styled from 'styled-components';

const StyledFooter = styled.div`
  color: #656d78;
  padding: 40px 0;
  background-color: #f5f7fa;
`;

export const Footer = () => (
  <StyledFooter>
    <div>
      <a title="Ekoškola" href="/">
        <img src="/images/logo.png" alt="Logo" />
      </a>
      <br />
      <p>
        Ekoškola pomáhá žákům, učitelům a rodičům proměnit školu v příjemnější, demokratičtější a k
        přírodě bližší místo k životu.
      </p>
    </div>
  </StyledFooter>
);
