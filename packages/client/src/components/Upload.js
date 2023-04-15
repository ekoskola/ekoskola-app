import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';

const UploadWrapper = styled.div`
  position: relative;
  width: 30rem;
  margin-left: 13rem;
  height: 5rem;
  border-width: 2px;
  border-color: rgb(102, 102, 102);
  border-style: dashed;
  border-radius: 5px;
`;

function Upload({ handleDrop }) {
  const [state, setState] = useState({
    file: null,
  });

  const clearFile = () => {
    setState({
      file: null,
    });
  };

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setState({
        file,
      });
      handleDrop(file);
    },
    [handleDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (state.file) {
    return (
      <UploadWrapper>
        <h1>
          {state.file.name} <ClearIcon onClick={clearFile} />
        </h1>
      </UploadWrapper>
    );
  }

  return (
    <UploadWrapper {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Přetáhni soubor pdf sem ...</p>
      ) : (
        <p>
          Přetáhni soubor pdf sem, nebo klikni a vyber soubor ze složky. Max. velikost pdf je 2 Mb.
          Povolený formát pouze pdf.
        </p>
      )}
    </UploadWrapper>
  );
}

export default Upload;
