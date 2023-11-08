import React, { useEffect, useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

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
import { VotedText } from '../VotedText';
import ApiService from '../../ApiService';

const maxWidth = 1200;

const options = {
  // TODO: this could be copied to `public`.
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};

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
  // `isVoted` is used to disable voting button after voting, user can still reload and vote.
  const [isVoted, setIsVoted] = useState(false);
  const url = window.location.origin;
  const fileUrl = `${url}/api/download/${file_id}`;

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
    if (isVoted) return;
    await ApiService.voteGameById(id, rating);
    setIsVoted(true);
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
        <VotedText count={votes_count} />
        <StarRating onChange={handleRatingChange} />
        <VoteGameButton isDisabled={isVoted} onClick={handleVoteGame} />
        <DownloadGameButton fileId={file_id} />
      </CardActions>
      {file_id && (
        <DocumentWrapper>
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {[...new Array(numPages)].map((item, index) => (
              <Page
                renderTextLayer={false}
                renderAnnotationLayer={false}
                pageNumber={index + 1}
                width={maxWidth}
              />
            ))}
          </Document>
        </DocumentWrapper>
      )}
      <SuccessModal isOpen={isSuccessModalOpen} closeModal={handleCloseModal} />
    </Card>
  );
};

export default GameDetails;
