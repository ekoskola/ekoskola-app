import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { grey } from '@material-ui/core/colors';

import DownloadGameButton from '../DownloadGameButton';

import CardTitle from './components/CardTitle';
import CardActions from './components/CardActions';
import CardSectionTitle from './components/CardSectionTitle';
import CardSectionText from './components/CardSectionText';
import DocumentWrapper from './components/DocumentWrapper';
import StarRating from '../StarRating';
import VoteGameButton from '../VoteGameButton';
import { SuccessModal } from '../SuccessModal';
import ApiService from '../../ApiService';

const styles = {
  card: {
    maxWidth: '70rem',
  },
  avatar: {
    backgroundColor: grey[500],
  },
};

const GameDetails = ({
  id,
  name,
  file_id,
  description,
  objetive_1,
  objetive_2,
  objetive_3,
  votes_count,
  votes_value,
}) => {
  const [initialRating, setInitialRating] = useState(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [rating, setRating] = useState(0);
  const url = window.location.origin;

  useEffect(() => {
    const starts = votes_value / votes_count;
    setInitialRating(starts);
  }, [votes_count, votes_value]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleRatingChange = value => {
    setRating(value);
  };

  const handleVoteGame = async () => {
    // TODO: make some reaction after voting.
    const response = await ApiService.voteGameById(id, rating);
    console.log('response', response);
    setIsSuccessModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <Card style={styles.card}>
      <CardTitle>
        {name} <StarRating initialRating={initialRating} readOnly={true} />
      </CardTitle>
      <CardContent>
        <CardSectionTitle>Cíle:</CardSectionTitle>
        <ul>
          <li>
            <CardSectionText>{objetive_1}</CardSectionText>
          </li>
          {objetive_2 ? (
            <li>
              <CardSectionText>{objetive_2}</CardSectionText>
            </li>
          ) : null}
          {objetive_3 ? (
            <li>
              <CardSectionText>{objetive_3}</CardSectionText>
            </li>
          ) : null}
        </ul>
        <CardSectionTitle>Popis aktivity:</CardSectionTitle>
        <CardSectionText>{description}</CardSectionText>
      </CardContent>
      <CardActions>
        <StarRating onChange={handleRatingChange} />
        <VoteGameButton onClick={handleVoteGame} />
        <DownloadGameButton fileId={file_id} />
      </CardActions>
      {file_id && (
        <DocumentWrapper>
          <Document file={`${url}/api/download/${file_id}`} onLoadSuccess={onDocumentLoadSuccess}>
            {[...new Array(numPages)].map((item, index) => (
              <Page pageNumber={index + 1} width="1000" />
              // <Page pageNumber={index + 1} />
            ))}
          </Document>
        </DocumentWrapper>
      )}
      <SuccessModal isOpen={isSuccessModalOpen} closeModal={handleCloseModal} />
    </Card>
  );
};

export default GameDetails;
