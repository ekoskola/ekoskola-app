import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import ApiService from '../ApiService';
import FiltersGame from '../components/FiltersGame';
import Upload from '../components/Upload';
import Loader from '../components/Loader';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: '13rem',
    width: '30rem',
  },
}));

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

const FormTexts = styled.article`
  display: flex;
  flex-direction: column;
`;

const TextAreaLabel = styled.label`
  margin-left: 13rem;
  font-size: 1.375em;
  font-weight: 700;
  color: rgb(4, 166, 75);
`;

const EditGameContainer = props => {
  const { match, history } = props;
  const [loading, setLoading] = useState(true);
  const formState = {
    name: '',
    description: '',
    objetive_1: '',
    objetive_2: '',
    objetive_3: '',
    location: [],
    grade: [],
    topics: [],
    classes: [],
    subjects: [],
    ekoskola_steps: [],
    timing: [],
    physical_activity: [],
    number_teachers: [],
  };

  const [form, setForm] = useState(formState);

  const [gameId] = useState(parseInt(match.params.id, 10));

  const [file, setFile] = useState({
    file: null,
  });

  const styles = useStyles();

  const fetchGame = async () => {
    try {
      const game = await ApiService.getGameById({ id: gameId });
      setForm(game);
      setLoading(false);
    } catch (error) {
      console.error(
        `An error occured while loading game for id ${gameId}: ${error}`
      );
    }
  };

  useEffect(() => {
    fetchGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTextChange = event => {
    form[event.target.name] = event.target.value;
    setForm(Object.assign({}, form));
  };

  const handleCheckboxChange = item => {
    const isChecked = form[item.name].includes(item.value) || false;
    if (isChecked) {
      form[item.name] = form[item.name].filter(
        selected => selected !== item.value
      );
    } else {
      form[item.name].push(item.value);
    }
    setForm(Object.assign({}, form));
  };

  const handleRadioButtonChange = event => {
    if (event && event.target && event.target.name) {
      form[event.target.name].length = 0;
      form[event.target.name].push(event.target.value);

      setForm(Object.assign({}, form));
    }
  };

  const editGame = async event => {
    try {
      let formData = new FormData();

      if (file.file) {
        formData.append('file', file.file, 'test.pdf');
      }
      formData.append('game', JSON.stringify(form));

      setLoading(true);

      await ApiService.update(formData, gameId);
      history.push(`/games/${gameId}`);
    } catch (error) {
      console.error(`there was an error ${error.message}`);
    }
  };
  const { name, description, objetive_1, objetive_2, objetive_3 } = form;

  const handleDrop = file => {
    setFile({
      file,
    });
  };

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <section>
          <FormTitle>Upravit hru</FormTitle>
          <Upload handleDrop={handleDrop} />
          <FormTexts>
            <TextAreaLabel for="name">Jmeno</TextAreaLabel>
            <TextField
              required
              // error
              id="name"
              name="name"
              value={name}
              className={styles.textField}
              margin="normal"
              onChange={handleTextChange}
            />
            <TextAreaLabel for="description">Krátký popis</TextAreaLabel>
            <TextareaAutosize
              required
              id="description"
              name="description"
              label="Krátký popis"
              value={description}
              className={styles.textField}
              style={{ height: '5rem' }}
              margin="normal"
              onChange={handleTextChange}
            />
            <TextAreaLabel for="objetive_1">Cíl 1</TextAreaLabel>
            <TextareaAutosize
              required
              id="objetive_1"
              name="objetive_1"
              label="Cíl 1"
              value={objetive_1}
              className={styles.textField}
              style={{ height: '5rem' }}
              margin="normal"
              onChange={handleTextChange}
            />
            <TextAreaLabel for="objetive_2">Cíl 2</TextAreaLabel>
            <TextareaAutosize
              required
              id="objetive_2"
              name="objetive_2"
              label="Cíl 2"
              value={objetive_2}
              className={styles.textField}
              style={{ height: '5rem' }}
              margin="normal"
              onChange={handleTextChange}
            />
            <TextAreaLabel for="objetive_3">Cíl 3</TextAreaLabel>
            <TextareaAutosize
              required
              id="objetive_3"
              name="objetive_3"
              label="Cíl 3"
              value={objetive_3}
              className={styles.textField}
              style={{ height: '5rem' }}
              margin="normal"
              onChange={handleTextChange}
            />
          </FormTexts>
          <FiltersGame
            isEdit={true}
            formData={form}
            handleCheckboxChange={handleCheckboxChange}
            handleRadioButtonChange={handleRadioButtonChange}
          />

          <Button
            variant="contained"
            style={{
              backgroundColor: '#04a64b',
              color: '#fff',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onClick={editGame}
          >
            Upravit
          </Button>
        </section>
      )}
    </Wrapper>
  );
};

export default EditGameContainer;
