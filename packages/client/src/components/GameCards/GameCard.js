import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { grey } from '@material-ui/core/colors';
import DownloadGame from '../DownloadGameButton';
import OpenLInkButton from '../OpenLInkButton';
import DeleteGameButton from '../DeleteGameButton';

import CardTitle from './components/CardTitle';
import CardActions from './components/CardActions';
import CardSectionText from './components/CardSectionText';
import CardSectionTitle from './components/CardSectionTitle';

const styles = {
  card: {
    maxWidth: '70rem',
    marginBottom: '2rem',
  },
  avatar: {
    backgroundColor: grey[500],
  },
};

export default function GameCard(props) {
  const { id, name, file_id, description, isAdmin, removeGame } = props;

  return (
    <Card style={styles.card}>
      <CardTitle>{name}</CardTitle>
      <CardContent>
        <CardSectionTitle>Popis aktivity:</CardSectionTitle>
        <CardSectionText>{description}</CardSectionText>
      </CardContent>
      <CardActions>
        {isAdmin ? (
          <React.Fragment>
            <OpenLInkButton path={`/edit/${id}`} label="Upravit" icon="edit" />
            <DeleteGameButton onClickRemoveGame={() => removeGame(id)} />
          </React.Fragment>
        ) : null}
        <DownloadGame fileId={file_id} />
        <OpenLInkButton path={`/games/${id}`} label="Detail aktivity" icon="open" />
      </CardActions>
    </Card>
  );
}
