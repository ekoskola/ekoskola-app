import React, { useState } from 'react';
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

const styles = {
  card: {
    maxWidth: '70rem',
  },
  avatar: {
    backgroundColor: grey[500],
  },
};

const GameDetails = props => {
  const {
    name,
    file_id,
    description,
    objetive_1,
    objetive_2,
    objetive_3,
  } = props;

  const [numPages, setNumPages] = useState(null);
  const url = window.location.origin;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Card style={styles.card}>
      <CardTitle>{name}</CardTitle>
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
        <DownloadGameButton fileId={file_id} />
      </CardActions>
      {file_id && (
        <DocumentWrapper>
          <Document
            file={`${url}/download/${file_id}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {[...new Array(numPages)].map((item, index) => (
              <Page pageNumber={index + 1} width="1000" />
              // <Page pageNumber={index + 1} />
            ))}
          </Document>
        </DocumentWrapper>
      )}
    </Card>
  );
};

export default GameDetails;
