import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styled from 'styled-components';

import topicsFilter from '../filters/topics';
import locationFilter from '../filters/location';
import gradesFilter from '../filters/grades';
import subjectsCheckboxes from '../filters/subjects';
import ekoskolaStepsCheckboxes from '../filters/ekoskola_steps';
import timingCheckboxes from '../filters/timing';

const FilterWrapper = styled.article`
  display: grid;
  grid-template-columns: 12rem 10rem 10rem 10rem;
  grid-gap: 10px;
  padding: 10px;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

const FilterTitle = styled.div`
  grid-row: 1 / 6;
  font-size: 1.375em;
  font-weight: 700;
  text-align: right;
  color: #04a64b;
  padding-right: 3rem;
  @media screen and (max-width: 500px) {
    text-align: left;
  }
`;

const RadioList = ({
  title,
  handleChange,
  selected,
  radioButtons,
  groupName,
}) => {
  return (
    <FilterWrapper>
      <FilterTitle>{title}</FilterTitle>
      <RadioGroup name={groupName} value={selected} onChange={handleChange} row>
        {radioButtons.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={<Radio color="primary" />}
            label={item.label}
            labelPlacement="end"
          />
        ))}
      </RadioGroup>
    </FilterWrapper>
  );
};

const CheckboxList = ({
  title = 'titulo',
  checkboxes,
  selectedItems,
  handleChange,
}) => {
  return (
    <FilterWrapper>
      <FilterTitle>{title}</FilterTitle>
      {checkboxes.map((item, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={selectedItems.includes(item.value)}
              onChange={() => handleChange(item)}
              name={item.name}
              value={item.name}
              color="primary"
            />
          }
          label={item.label}
        />
      ))}
    </FilterWrapper>
  );
};

const FiltersGame = props => {
  const {
    isEdit,
    handleCheckboxChange,
    handleRadioButtonChange,
    formData,
  } = props;

  const {
    location,
    grade,
    topics,
    subjects,
    ekoskola_steps,
    timing,
  } = formData;

  return (
    <React.Fragment>
      <FormGroup row>
        <CheckboxList
          title={gradesFilter.title.label}
          checkboxes={gradesFilter.checkboxes}
          selectedItems={grade}
          handleChange={handleCheckboxChange}
        />
      </FormGroup>
      <Divider variant="inset" />
      <FormGroup row>
        <CheckboxList
          title={locationFilter.title.label}
          checkboxes={locationFilter.checkboxes}
          selectedItems={location}
          handleChange={handleCheckboxChange}
        />
      </FormGroup>
      <Divider variant="inset" />
      <FormGroup row>
        <CheckboxList
          title={topicsFilter.title.label}
          checkboxes={topicsFilter.checkboxes}
          selectedItems={topics}
          handleChange={handleCheckboxChange}
        />
      </FormGroup>
      <Divider variant="inset" />
      <FormGroup row>
        <CheckboxList
          title={subjectsCheckboxes.title.label}
          checkboxes={subjectsCheckboxes.checkboxes}
          selectedItems={subjects}
          handleChange={handleCheckboxChange}
        />
      </FormGroup>
      <Divider variant="inset" />
      <FormGroup row>
        <CheckboxList
          title={ekoskolaStepsCheckboxes.title.label}
          checkboxes={ekoskolaStepsCheckboxes.checkboxes}
          selectedItems={ekoskola_steps}
          handleChange={handleCheckboxChange}
        />
      </FormGroup>
      <Divider variant="inset" />
      <FormGroup row>
        {isEdit ? (
          <RadioList
            title={timingCheckboxes.title.label}
            selected={timing[0]}
            radioButtons={timingCheckboxes.checkboxes}
            groupName={timingCheckboxes.title.name}
            handleChange={handleRadioButtonChange}
          />
        ) : (
          <CheckboxList
            title={timingCheckboxes.title.label}
            checkboxes={timingCheckboxes.checkboxes}
            selectedItems={timing}
            handleChange={handleCheckboxChange}
          />
        )}
      </FormGroup>
    </React.Fragment>
  );
};

export default FiltersGame;
