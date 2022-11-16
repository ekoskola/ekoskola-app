import React from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.section`
  background-color: #8cc152;
  height: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  @media screen and (max-width: 500px) {
    height: 55rem;
  }
`;

const TextBanner = styled.div`
  border: none;
  font-size: x-large;
  outline: 0;
  display: inline-block;
  padding: 30px 25px;
  color: #fff;
  text-align: center;
  cursor: pointer;
`;

const TitleBanner = styled.h1`
  font-size: 50px;
`;

const HeroBanner = props => {
  return (
    <BannerWrapper>
      <TextBanner>
        <TitleBanner>Vítejte v databázi aktivit Ekoškoly</TitleBanner>
        <p>
          V této databázi naleznete veškeré aktuální metodické materiály pro
          Vaší práci koordinátora Ekotýmu a zároveň si zde můžete vyfiltrovat
          všechny aktivity z doposud vytvořených metodických materiálů. Aktivity
          a materiály můžete využít do výuky i pro schůzky Ekotýmu. Aktivity
          můžete filtrovat podle níže uvedených kritérií. Pokud nezaškrtnete
          žádné kritérium, zobrazí se vám celý seznam aktivit, bez filtrování.
          Tuto databázi nám pomáhali vytvářet učitelé z Ekoškol, pokud nám
          chcete pomoci i vy s vylepšením tohoto projektu uvítáme{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSd5fIEWhp09GSK6zjF8YgPh-Ga3Vlh5r9y30ccM0zEG0-DPmg/viewform"
          >
            Vaše tipy
          </a>
          . Budeme Vám moc vděční.
        </p>
      </TextBanner>
    </BannerWrapper>
  );
};

export default HeroBanner;
