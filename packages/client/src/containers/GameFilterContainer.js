import React from 'react';
import QueryLink from '../components/QueryLink';
import Button from '@material-ui/core/Button';
import HeroBanner from '../components/HeroBanner';
import styled from 'styled-components';

import { FiltersGame } from '../components/FiltersGame';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem 5rem 0rem;
`;

const FormTitle = styled.div`
  text-align: center;
  font-size: 3rem;
  color: #04a64b;
`;

const GameFilterContainer = ({ filterState, setFilterState }) => {
  const handleCheckboxChange = item => {
    const isChecked = filterState[item.name].includes(item.value) || false;
    if (isChecked) {
      filterState[item.name] = filterState[item.name].filter(selected => selected !== item.value);
      setFilterState({
        ...filterState,
        [item.name]: filterState[item.name].filter(selected => selected !== item.value),
      });
    } else {
      setFilterState({
        ...filterState,
        [item.name]: [...filterState[item.name], item.value],
      });
    }
  };

  return (
    <React.Fragment>
      <HeroBanner />
      <Wrapper>
        <section>
          <FormTitle>Vyfiltruj si svou aktivitu nebo metodický materiál</FormTitle>
          <FiltersGame
            isEdit={false}
            formData={filterState}
            handleCheckboxChange={handleCheckboxChange}
          />

          <QueryLink
            style={{
              backgroundColor: '#04a64b',
              color: 'black',
              textDecoration: 'none',
            }}
            to={{ pathname: '/games/', query: filterState }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: '#04a64b',
                color: 'white',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Vyhledat
            </Button>
          </QueryLink>
        </section>
      </Wrapper>
    </React.Fragment>
  );
};

export default GameFilterContainer;
